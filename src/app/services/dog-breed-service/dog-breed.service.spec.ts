import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { DogBreedService } from './dog-breed.service';
import { DogBreed } from '../../models/dog-breed-service/dog-breed.model';
import { environment } from "../../../environments/environment";

describe('When Dog Breed Service', () => {
    let dogBreedService: DogBreedService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [DogBreedService]
        });
        dogBreedService = TestBed.inject(DogBreedService);
        httpMock = TestBed.inject(HttpTestingController);
    });
      
    it('should return expected data on successful, valid, response from external service', () => {
        const data = [
            {"weight":{"imperial":"6 - 13","metric":"3 - 6"},"height":{"imperial":"9 - 11.5","metric":"23 - 29"},"id":1,"name":"Affenpinscher","bred_for":"Small rodent hunting, lapdog","breed_group":"Toy","life_span":"10 - 12 years","temperament":"Stubborn, Curious, Playful, Adventurous, Active, Fun-loving","origin":"Germany, France","reference_image_id":"BJa4kxc4X"},
            {"weight":{"imperial":"50 - 60","metric":"23 - 27"},"height":{"imperial":"25 - 27","metric":"64 - 69"},"id":2,"name":"Afghan Hound","country_code":"AG","bred_for":"Coursing and hunting","breed_group":"Hound","life_span":"10 - 13 years","temperament":"Aloof, Clownish, Dignified, Independent, Happy","origin":"Afghanistan, Iran, Pakistan","reference_image_id":"hMyT4CDXR"},
            {"weight":{"imperial":"44 - 66","metric":"20 - 30"},"height":{"imperial":"30","metric":"76"},"id":3,"name":"African Hunting Dog","bred_for":"A wild pack animal","life_span":"11 years","temperament":"Wild, Hardworking, Dutiful","reference_image_id":"rkiByec47"}
        ];
        
        const dogBreeds = data.map(DogBreed.fromJson)
        
        dogBreedService.getBreeds().subscribe(result => {
          expect(result.success).toEqual(true);
          expect(result.data).toEqual(dogBreeds);
        })
      
        const req = httpMock.expectOne(environment.apiUrl + "/breeds");
        expect(req.request.method).toBe('GET');

        // ------------------------------------------------------
        // | Return valid response
        // ------------------------------------------------------
        req.flush(data);
      });


      it('should return non success result on invalid json response', () => {        
        dogBreedService.getBreeds().subscribe(result => {
          expect(result.success).toEqual(false);
        });
      
        const req = httpMock.expectOne(environment.apiUrl + "/breeds");
        expect(req.request.method).toBe('GET');

        // ------------------------------------------------------
        // | Return invalid json
        // ------------------------------------------------------
        req.flush("KA%#aA^^SF");
      });

      describe('should return non success result on errors and exceptions from http client', () => {
        it('on 404 response', () => {
            dogBreedService.getBreeds().subscribe(result => {
                expect(result.success).toEqual(false);
            })
        
            const req = httpMock.expectOne(environment.apiUrl + "/breeds");
            expect(req.request.method).toBe('GET');

            // ------------------------------------------------------
            // | Return 404
            // ------------------------------------------------------
            req.flush(null, {status: 404, statusText: 'Not Found'});
        });

        it('on error events emitted by http request', () => {
            dogBreedService.getBreeds().subscribe(result => {
                expect(result.success).toEqual(false);
            })
        
            const req = httpMock.expectOne(environment.apiUrl + "/breeds");
            expect(req.request.method).toBe('GET');

            // ------------------------------------------------------
            // | Emit error event
            // ------------------------------------------------------            
            req.error(new ProgressEvent('Simulated error'));
        });
    });
})