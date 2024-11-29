import { Component, DestroyRef, inject, signal } from '@angular/core';

import { PlacesContainerComponent } from '../places-container/places-container.component';
import { PlacesComponent } from '../places.component';
import { Place } from '../place.model';
import { HttpClient } from '@angular/common/http';
import { catchError, map, throwError } from 'rxjs';

@Component({
  selector: 'app-user-places',
  standalone: true,
  templateUrl: './user-places.component.html',
  styleUrl: './user-places.component.css',
  imports: [PlacesContainerComponent, PlacesComponent],
})
export class UserPlacesComponent {
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
      .get<{ places: Place[] }>('http://localhost:3000/user-places', {
        // Return the entire response datas.
        observe: 'response',
      })
      // Transforms data if needed.
      .pipe(
        map((response) => response.body?.places),
        // Optional.
        catchError((error) =>
          throwError(() => new Error('Couille in ze potage in the Users Places.'))
        )
      )
      .subscribe({
        next: (response) => this.places.set(response),
        complete: () => this.isFetching.set(false),
        error: (error: Error) => this.error.set(error.message),
      });
    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }
}
