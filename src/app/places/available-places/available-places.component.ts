import { Component, signal, inject, OnInit, DestroyRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, throwError } from 'rxjs';
// Components.
import { PlacesComponent } from '../places.component';
import { PlacesContainerComponent } from '../places-container/places-container.component';
// Interfaces.
import { type Place } from '../place.model';

@Component({
  selector: 'app-available-places',
  standalone: true,
  templateUrl: './available-places.component.html',
  styleUrl: './available-places.component.css',
  imports: [PlacesComponent, PlacesContainerComponent],
})
export class AvailablePlacesComponent implements OnInit {
  places = signal<Place[] | undefined>(undefined);
  isFetching = signal(false);
  error = signal('');
  // Http Client Service injection.
  private _httpClient = inject(HttpClient);
  destroyRef = inject(DestroyRef);
  ngOnInit(): void {
    this.isFetching.set(true);
    // Return an Observable.
    const subscription = this._httpClient
      .get<{ places: Place[] }>('http://localhost:3000/places', {
        // Return the entire response datas.
        observe: 'response',
      })
      // Transforms data if needed.
      .pipe(
        map((response) => response.body?.places),
        // Optional.
        catchError((error) =>
          throwError(() => new Error('Couille in ze potage'))
        )
      )
      .subscribe({
        next: (response) => this.places.set(response),
        complete: () => this.isFetching.set(false),
        error: (error: Error) => this.error.set(error.message),
      });
    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }
  onSelectPlace(selectedPlace: Place){
    // Angular convert automatically to a JSON data.
    this._httpClient.put('http://localhost:3000/user-places', {
      placeId: selectedPlace.id,
    }).subscribe({
      next: (resData) => console.log(resData),
      complete: () => {}
    });
  }
}
