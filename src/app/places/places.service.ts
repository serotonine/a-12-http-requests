import { inject, Injectable, signal } from '@angular/core';
import { catchError, map, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { REST_BASE_URL } from './places.config';
import { Place } from './place.model';

@Injectable({
  providedIn: 'root',
})
export class PlacesService {
  // Http Client Service injection.
  private _httpClient = inject(HttpClient);
  private userPlaces = signal<Place[]>([]);
  loadedUserPlaces = this.userPlaces.asReadonly();

  loadAvailablePlaces() {
    return this.fetchPlaces('places', 'Couille in ze potage!!!');
  }
  loadUserPlaces() {
    return this.fetchPlaces('user-places', 'Couille in ze potage!!!');
  }

  private fetchPlaces(url: string, errorMessage: string) {
    return (
      this._httpClient
        .get<{ places: Place[] }>(`${REST_BASE_URL}${url}`, {
          // Return the entire response datas.
          observe: 'response',
        })
        // Transforms data if needed.
        .pipe(
          map((response) => response.body?.places),
          // Optional.
          catchError((error) => throwError(() => new Error(errorMessage)))
        )
    );
  }

  addPlaceToUserPlaces(placeId: string) {
    // Angular convert automatically to a JSON data.
    return this._httpClient.put(`${REST_BASE_URL}user-places`, {
      placeId,
    });
  }

  removeUserPlace(place: Place) {}
}
