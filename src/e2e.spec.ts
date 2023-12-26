import { TestBed, waitForAsync } from "@angular/core/testing";
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { DogBreed } from "./app/models/dog-breed-service/dog-breed.model";
import { AppComponent } from "./app/app.component";

import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { MatSnackBar } from "@angular/material/snack-bar";
import { DogBreedService } from "./app/services/dog-breed-service/dog-breed.service";
import { environment } from "./environments/environment";


// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
// | | Todo: Extract common code from functions into common util functions.
//  |
// | | This code is like 5x the volume it needs to be. 
//  |
// | | Also - Add some pseudocode comments for easier reading.
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

describe('When app is run', () => {
    let httpMock: HttpTestingController;
    let dogBreedService: DogBreedService;
    let matSnackBar: MatSnackBar;

    beforeEach(async () => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, AppComponent, NoopAnimationsModule],
            providers: [DogBreedService],
        });
        
        dogBreedService = TestBed.inject(DogBreedService);
        httpMock = TestBed.inject(HttpTestingController);
        matSnackBar = TestBed.inject(MatSnackBar);

        TestBed.compileComponents();
    });

    it('should create the app', () => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.componentInstance;
        expect(app).toBeTruthy();
    });
    describe('should contain basic components on init', () => {

        it(`should have the 'Dog List Display 🎉' title`, () => {
            const fixture = TestBed.createComponent(AppComponent);
            const app = fixture.componentInstance;
            expect(app.title).toEqual('Dog List Display 🎉');
        });

        it('should render title', () => {
            const fixture = TestBed.createComponent(AppComponent);
            fixture.detectChanges();
            const compiled = fixture.nativeElement as HTMLElement;
            expect(compiled.querySelector('app-header')?.textContent).toContain('Dog List Display 🎉');
        });

        it('should render request button', () => {
            const fixture = TestBed.createComponent(AppComponent);
            const app = fixture.componentInstance;
            const button = fixture.debugElement.nativeElement.querySelector('app-dog-breed-button button');
            expect(button).toBeTruthy()
        });
    });

    describe('should react to request button click', () => {
        it('and display list of cards on successful service request', waitForAsync(() => {
            const data = [
                {"weight":{"imperial":"6 - 13","metric":"3 - 6"},"height":{"imperial":"9 - 11.5","metric":"23 - 29"},"id":1,"name":"Affenpinscher","bred_for":"Small rodent hunting, lapdog","breed_group":"Toy","life_span":"10 - 12 years","temperament":"Stubborn, Curious, Playful, Adventurous, Active, Fun-loving","origin":"Germany, France","reference_image_id":"BJa4kxc4X"},
                {"weight":{"imperial":"50 - 60","metric":"23 - 27"},"height":{"imperial":"25 - 27","metric":"64 - 69"},"id":2,"name":"Afghan Hound","country_code":"AG","bred_for":"Coursing and hunting","breed_group":"Hound","life_span":"10 - 13 years","temperament":"Aloof, Clownish, Dignified, Independent, Happy","origin":"Afghanistan, Iran, Pakistan","reference_image_id":"hMyT4CDXR"},
                {"weight":{"imperial":"44 - 66","metric":"20 - 30"},"height":{"imperial":"30","metric":"76"},"id":3,"name":"African Hunting Dog","bred_for":"A wild pack animal","life_span":"11 years","temperament":"Wild, Hardworking, Dutiful","reference_image_id":"rkiByec47"}
            ];
            
            //We could test the interface against this data...?
            const dogBreeds = data.map(DogBreed.fromJson);

            
            const fixture = TestBed.createComponent(AppComponent);
            const app = fixture.componentInstance;


            // Apparently the AppCompontent doesn't use the service instance that is injected into the testbed
            // - So we set it here (sidenote: look into other options for doing this) 
            app.dogBreedService = dogBreedService;

            // ----------
            // | Verify that progress spinner doesnt appear before request button is pressed
            expect(fixture.nativeElement.querySelector('mat-progress-spinner')).toBeFalsy();

            // ----------
            // | Verify expected change in state havent been realized before the button click has finished.
            expect(app.dogBreedList).toBeFalsy();
            const cardsBefore = fixture.debugElement.nativeElement.querySelectorAll('mat-card');
            expect(cardsBefore.length).toBe(0);

            // ----------
            // | Click button == CHANGE STATE            
            const button = fixture.debugElement.nativeElement.querySelector('app-dog-breed-button button');
            expect(button).toBeTruthy()
            button.click();

            // ----------
            // | Expect the mock http client to have received a request
            const req = httpMock.expectOne(environment.apiUrl + "/breeds");
            expect(req.request.method).toBe('GET');

            // ----------
            // | Detect immediate changes to layout, then
            // ----------
            // | Verify that progress spinner appears after button is pressed
            // |   but before the mock http client returns a response
            fixture.detectChanges();
            expect(fixture.nativeElement.querySelector('mat-progress-spinner')).toBeTruthy();
            

            // ------------------------------------------------------
            // | Return valid response
            // ------------------------------------------------------
            req.flush(data);
            
            fixture.detectChanges();
            
            fixture.whenStable().then(() => {                
                // ----------
                // | Verify that progress spinner doesnt appear after the mock http client has responded
                expect(fixture.nativeElement.querySelector('mat-progress-spinner')).toBeFalsy();

                // ----------
                // | Verify expected changes after the button click has finished.
                const cards = fixture.debugElement.nativeElement.querySelectorAll('mat-card');
                expect(cards.length).toBeGreaterThanOrEqual(0);
            });
        }));

        describe('and displays user snackbar on unsuccessful service request', () => {
            it('like upon invalid json response from external service', waitForAsync(() => {
                const fixture = TestBed.createComponent(AppComponent);
                const app = fixture.componentInstance;

                // Apparently the AppCompontent doesn't use the service instance that is injected into the testbed
                // - So we set it here (sidenote: look into other options for doing this) 
                app.dogBreedService = dogBreedService;

                spyOn(matSnackBar, 'open').and.callThrough();

                // ----------
                // | Verify expected change in state havent been realized before the button click has finished.
                expect(matSnackBar.open).toHaveBeenCalledTimes(0);


                // ----------
                // | Click button == CHANGE STATE                            
                const button = fixture.debugElement.nativeElement.querySelector('app-dog-breed-button button');
                expect(button).toBeTruthy()
                button.click();


                // ----------
                // | Expect the mock http client to have received a request                
                const req = httpMock.expectOne(environment.apiUrl + "/breeds");
                expect(req.request.method).toBe('GET');

                // ----------
                // | Detect immediate changes to layout, then
                // ----------
                // | Verify that progress spinner appears after button is pressed
                // |   but before the mock http client returns a response
                fixture.detectChanges();
                expect(fixture.nativeElement.querySelector('mat-progress-spinner')).toBeTruthy();
                     
                
                // ------------------------------------------------------
                // | Return invalid json
                // ------------------------------------------------------
                req.flush("KA%#aA^^SF");

                fixture.detectChanges();

                fixture.whenStable().then(() => {                
                    // ----------
                    // | Verify that progress spinner doesnt appear after the mock http client has responded
                    expect(fixture.nativeElement.querySelector('mat-progress-spinner')).toBeFalsy();
    
                    // ----------
                    // | Verify expected changes after the button click has finished.
                    expect(matSnackBar.open).toHaveBeenCalled();
                });
            }));

            it('like upon 404 response from external service', waitForAsync(() => {
                const fixture = TestBed.createComponent(AppComponent);
                const app = fixture.componentInstance;

                // Apparently the AppCompontent doesn't use the service instance that is injected into the testbed
                // - So we set it here (sidenote: look into other options for doing this) 
                app.dogBreedService = dogBreedService;



                spyOn(matSnackBar, 'open').and.callThrough();

                // ----------
                // | Verify expected change in state havent been realized before the button click has finished.
                expect(matSnackBar.open).toHaveBeenCalledTimes(0);

                // ----------
                // | Click button == CHANGE STATE   
                const button = fixture.debugElement.nativeElement.querySelector('app-dog-breed-button button');
                expect(button).toBeTruthy()
                button.click();


                // ----------
                // | Expect the mock http client to have received a request
                const req = httpMock.expectOne(environment.apiUrl + "/breeds");
                expect(req.request.method).toBe('GET');

                // ----------
                // | Detect immediate changes to layout, then
                // ----------
                // | Verify that progress spinner appears after button is pressed
                // |   but before the mock http client returns a response
                fixture.detectChanges();
                expect(fixture.nativeElement.querySelector('mat-progress-spinner')).toBeTruthy();                

                // ------------------------------------------------------
                // | Return 404
                // ------------------------------------------------------
                req.flush(null, {status: 404, statusText: 'Not Found'});

                fixture.detectChanges();

                fixture.whenStable().then(() => {                
                    // ----------
                    // | Verify that progress spinner doesnt appear after the mock http client has responded
                    expect(fixture.nativeElement.querySelector('mat-progress-spinner')).toBeFalsy();
    
                    // ----------
                    // | Verify expected changes after the button click has finished.
                    expect(matSnackBar.open).toHaveBeenCalled();
                });
            }));

            it('like upon error events emitted by http request', waitForAsync(() => {
                const fixture = TestBed.createComponent(AppComponent);
                const app = fixture.componentInstance;

                // Apparently the AppCompontent doesn't use the service instance that is injected into the testbed
                // - So we set it here (sidenote: look into other options for doing this) 
                app.dogBreedService = dogBreedService;

                spyOn(matSnackBar, 'open').and.callThrough();

                // ----------
                // | Verify expected change in state havent been realized before the button click has finished.                
                expect(matSnackBar.open).toHaveBeenCalledTimes(0);

                // ----------
                // | Click button == CHANGE STATE   
                const button = fixture.debugElement.nativeElement.querySelector('app-dog-breed-button button');
                expect(button).toBeTruthy()
                button.click();

                // ----------
                // | Expect the mock http client to have received a request                
                const req = httpMock.expectOne(environment.apiUrl + "/breeds");
                expect(req.request.method).toBe('GET');

                // ----------
                // | Detect immediate changes to layout, then
                // ----------
                // | Verify that progress spinner appears after button is pressed
                // |   but before the mock http client returns a response
                fixture.detectChanges();
                expect(fixture.nativeElement.querySelector('mat-progress-spinner')).toBeTruthy();      
                
                // ------------------------------------------------------
                // | Emit error event
                // ------------------------------------------------------
                req.error(new ProgressEvent('Simulated error'));

                fixture.detectChanges();

                fixture.whenStable().then(() => {                
                    // ----------
                    // | Verify that progress spinner doesnt appear after the mock http client has responded
                    expect(fixture.nativeElement.querySelector('mat-progress-spinner')).toBeFalsy();
    
                    // ----------
                    // | Verify expected changes after the button click has finished.
                    expect(matSnackBar.open).toHaveBeenCalled();
                });
            }));
        });
    });
});