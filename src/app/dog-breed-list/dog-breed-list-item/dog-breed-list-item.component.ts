import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DogBreed } from '../../models/dog-breed-service/dog-breed.model';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-dog-breed-list-item',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './dog-breed-list-item.component.html',
  styleUrl: './dog-breed-list-item.component.scss'
})
export class DogBreedListItemComponent {
  @Input() dogBreed: null | DogBreed = null;
}
