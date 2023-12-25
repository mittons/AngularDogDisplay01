import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { DogBreed } from "../../models/dog-breed-service/dog-breed.model";
import { ServiceResult } from "../service-result";
import { catchError, map } from "rxjs/operators";
import { environment } from "../../../environments/environment";
import { AppComponent } from "../../app.component";


@Injectable()
export class DogBreedService{    
    private apiUrl = environment.apiUrl;

    constructor(private http: HttpClient) {}

    getBreeds(): Observable<ServiceResult<DogBreed[]>> {
        return this.http.get<DogBreed[]>(`${this.apiUrl}/breeds`).pipe(
            map(data => ({ data: this.mapBreeds(data), success:true })),
            catchError(error => {
                console.log(`Error when fetching data from external service: ${error}`);
                return of({ data: null, success:false })
            })
        );
    }

    // The http.get<DogBreed[]>() call seems to return a list of DogBreed but any field that
    //   is not existent in every element doesnt get included (or CommonModule doesnt see it at least).
    // Piping the response and mapping the output of the http.get call using the fromJson function seems fix it.
    mapBreeds(breedsIn: DogBreed[]): DogBreed[] {
        return breedsIn.map(DogBreed.fromJson);
    }
}