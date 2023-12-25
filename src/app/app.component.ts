import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { DogBreedButtonComponent } from './dog-breed-button/dog-breed-button.component';
import { DogBreedListComponent } from './dog-breed-list/dog-breed-list.component';
import { DogBreedService } from './services/dog-breed-service/dog-breed.service';
import { DogBreed } from './models/dog-breed-service/dog-breed.model';
import { ServiceResult } from './services/service-result';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FlexLayoutModule } from '@angular/flex-layout';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent, DogBreedButtonComponent, DogBreedListComponent, HttpClientModule, FlexLayoutModule],
  providers: [DogBreedService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Dog List Display 🎉';
  dogBreedList : null | DogBreed[] = null;

  constructor(public dogBreedService: DogBreedService, private snackBar: MatSnackBar) {}

  onListRequested() {
    this.dogBreedService.getBreeds().subscribe(result => {
      if (result.success){
        this.dogBreedList = result.data;
      }
      else {
        this.snackBar.open("The application encountered an exception while trying to fetch data from external services. Please try again later.", 'Close', {
          duration: 3000, // Message duration in milliseconds
        });
      }
    })
  }
}
