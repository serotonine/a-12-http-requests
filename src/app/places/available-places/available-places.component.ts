import { Component, signal, inject, OnInit, DestroyRef } from '@angular/core';
// Services.
import { PlacesService } from '../places.service';
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
  placeService = inject(PlacesService);
  places = signal<Place[] | undefined>(undefined);
  isFetching = signal(false);
  error = signal('');

  destroyRef = inject(DestroyRef);
  ngOnInit(): void {
    this.isFetching.set(true);
    // Return an Observable.
    const subscription = this.placeService.loadAvailablePlaces().subscribe({
        next: (places) => this.places.set(places),
        complete: () => this.isFetching.set(false),
        error: (error: Error) => this.error.set(error.message),
      });
    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }

  onSelectPlace(selectedPlace: Place){
    console.log(selectedPlace);
  const subscription = this.placeService.addPlaceToUserPlaces(selectedPlace.id).subscribe({
      next: (resData) => console.log(resData),
      complete: () => {}
    });
    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }
}
