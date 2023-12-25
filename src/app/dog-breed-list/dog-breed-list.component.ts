import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DogBreed } from '../models/dog-breed-service/dog-breed.model';
import { DogBreedListItemComponent } from './dog-breed-list-item/dog-breed-list-item.component';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-dog-breed-list',
  standalone: true,
  imports: [CommonModule, DogBreedListItemComponent, MatListModule],
  templateUrl: './dog-breed-list.component.html',
  styleUrl: './dog-breed-list.component.scss'
})
export class DogBreedListComponent {
  @Input() dogBreedList: null | DogBreed[] = null;
}
