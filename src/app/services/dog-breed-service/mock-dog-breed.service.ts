import { ServiceResult } from "../service-result";
import { DogBreed } from "../../models/dog-breed-service/dog-breed.model";
import { Observable, of } from "rxjs";
import { Injectable } from "@angular/core";
import { DogBreedService } from "./dog-breed.service";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class MockDogBreedService{

    getBreeds(): Observable<ServiceResult<DogBreed[]>> {
        const dogBreeds: DogBreed[] = [
            new DogBreed(1, "Affenpinscher", "3 - 6", "23 - 29", "10 - 12 years", "BJa4kxc4X", "Stubborn, Curious, Playful, Adventurous, Active, Fun-loving", "Small rodent hunting, lapdog", "Toy"),
            new DogBreed(2, "Afghan Hound", "23 - 27", "64 - 69", "10 - 13 years", "hMyT4CDXR", "Aloof, Clownish, Dignified, Independent, Happy", "Coursing and hunting", "Hound"),
            new DogBreed(3, "African Hunting Dog", "20 - 30", "76", "11 years", "rkiByec47", "Wild, Hardworking, Dutiful", "A wild pack animal")
        ];

        return of({data: dogBreeds, success: true})
    }
  }