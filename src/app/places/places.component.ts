import { Component, input, output } from '@angular/core';
import { Place } from './place.model';
import { REST_BASE_URL } from './places.config';

@Component({
  selector: 'app-places',
  standalone: true,
  imports: [],
  templateUrl: './places.component.html',
  styleUrl: './places.component.css',
})
export class PlacesComponent {
  places = input.required<Place[]>();
  selectPlace = output<Place>();
  baseUrl = REST_BASE_URL;

  onSelectPlace(place: Place) {
    this.selectPlace.emit(place);
  }
}
