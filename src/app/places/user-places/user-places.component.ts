import { Component, DestroyRef, inject, signal } from '@angular/core';
// Interfaces.
import { type Place } from '../place.model';
// Services.
import { PlacesService } from '../places.service';
// Components.
import { PlacesContainerComponent } from '../places-container/places-container.component';
import { PlacesComponent } from '../places.component';

@Component({
  selector: 'app-user-places',
  standalone: true,
  templateUrl: './user-places.component.html',
  styleUrl: './user-places.component.css',
  imports: [PlacesContainerComponent, PlacesComponent],
})
export class UserPlacesComponent {
  isFetching = signal(false);
  error = signal('');

  // Services.
  placesService = inject(PlacesService);
  destroyRef = inject(DestroyRef);
  //
  places = this.placesService.loadedUserPlaces;

  ngOnInit(): void {
    this.isFetching.set(true);
    const subscription = this.placesService.loadUserPlaces().subscribe({
      complete: () => this.isFetching.set(false),
      error: (error: Error) => this.error.set(error.message),
    });
    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }
  onRemovePlace(place: Place) {
    const subscription = this.placesService.removeUserPlace(place).subscribe({
      error: (error) => {
        console.log('addPlaceToUserPlaces', error.message);
      },
    });
    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }
}
