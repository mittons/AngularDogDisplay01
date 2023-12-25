import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-dog-breed-button',
  standalone: true,
  imports: [],
  templateUrl: './dog-breed-button.component.html',
  styleUrl: './dog-breed-button.component.scss'
})
export class DogBreedButtonComponent {
  @Output() dogBreedListRequested = new EventEmitter<void>();

  requestList(){
    this.dogBreedListRequested.emit();
  }
}
