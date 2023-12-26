import { TestBed, tick, fakeAsync, flush } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { DogBreedService } from './services/dog-breed-service/dog-breed.service';
import { MockDogBreedService } from './services/dog-breed-service/mock-dog-breed.service';
import { of, switchMap, timer } from 'rxjs';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBar } from '@angular/material/snack-bar';

// -----------------------------------------------------------------------
// | OH MY GOD - I am living for this! 
// | - I know I shouldn't make comments like this.
// |   - But, but, but...
// | But this is the moment I realized I could (2023.23.12-2220hrs):
// | - Add emojis into strings
// | - Test for emojis in strings
// | - Have emojis all over in my code
// | - Treat emojis like characters (something will ruin this I am sure)
// |
// | Today is a happy day. Christmas came early! 🎉
// -----------------------------------------------------------------------


// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
// | | Todo: Extract common code from functions into common util functions.
//  |
// | | This code is like 5x the volume it needs to be. 
//  |
// | | Also - Add some pseudocode comments for easier reading.
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

let mockService: MockDogBreedService;
let matSnackBar: MatSnackBar;

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent, NoopAnimationsModule],
    }).compileComponents();
    
    mockService = new MockDogBreedService();
    TestBed.overrideProvider(DogBreedService, {useValue: mockService});
    matSnackBar = TestBed.inject(MatSnackBar);
    
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  describe('should contain basic components on init', () => {
    it(`should have the 'Dog List Display 🎉' title`, () => {
    //----------------------
    //| Setup component
      const fixture = TestBed.createComponent(AppComponent);
      const app = fixture.componentInstance;

    //----------------------
    //| Perform test
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
    it('and display list of cards on successful service request', fakeAsync(() => {

      const fixture = TestBed.createComponent(AppComponent);
      const app = fixture.componentInstance;
      spyOn(app, 'onListRequested').and.callThrough();
      // spyOn(mockService, 'getBreeds').and.callThrough();

      // We get a pointer to the breeds function
      // - This allows us to call the function inside the spy function
      //     as the pointer in the service will be replaced with the spy function
      //     -  (calling the spy function from within the spy function => infinite loop => callstack explosion.)
      const getBreedsFunction = mockService.getBreeds;
      spyOn(mockService, 'getBreeds').and.callFake(() => {
        // Simulate network delay
        return timer(100).pipe(switchMap(() => getBreedsFunction()))
      });

      // ----------
      // | Verify elements that should appear due to state change dont exist yet
      expect(app.dogBreedList).toBeFalsy();

      expect(fixture.debugElement.nativeElement.querySelectorAll('mat-card').length).toBe(0);

      expect(fixture.nativeElement.querySelector('mat-progress-spinner')).toBeFalsy();


      // ----------
      // | Click button == CHANGE STATE
      const button = fixture.debugElement.nativeElement.querySelector('app-dog-breed-button button');
      expect(button).toBeTruthy()
      button.click();
      
      // ----------
      // | Detect immediate changes
      fixture.detectChanges();

      // ----------
      // | Verify that progress spinner appears after button is pressed
      // |   but before the service call returns
      expect(fixture.nativeElement.querySelector('mat-progress-spinner')).toBeTruthy();

      // ----------
      // | Wait for the dalyed service call to finish, then detect changes after that.
      tick(100);
      fixture.detectChanges();

      // ----------
      // |Expect progress spinner to be gone again
      expect(fixture.nativeElement.querySelector('mat-progress-spinner')).toBeFalsy();

      // ----------
      // | Verify elements that should appear due to state change have appeared
      // |   and functions that should have been called have been called
      expect(app.onListRequested).toHaveBeenCalled();
      expect(mockService.getBreeds).toHaveBeenCalled();
      
      expect(app.dogBreedList).toBeTruthy();

      expect(fixture.debugElement.nativeElement.querySelectorAll('mat-card').length).toBeGreaterThanOrEqual(1);

      flush();
    }));


    it('and display loading wheel, then a snackbar on unsuccessful service request', fakeAsync(() => {
      const fixture = TestBed.createComponent(AppComponent);
      const app = fixture.componentInstance;
      spyOn(app, 'onListRequested').and.callThrough();
      
      spyOn(matSnackBar, 'open').and.callThrough();
      expect(matSnackBar.open).toHaveBeenCalledTimes(0);
      
      spyOn(mockService, 'getBreeds').and.returnValue( 
        // Simulate network delay
        timer(100).pipe(switchMap(() => 
          of({ data: null, success: false })
        ))
      );

      // ----------
      // | Verify that elements that should not exist/appear before state change dont exist/appear.
      expect(fixture.nativeElement.querySelector('mat-progress-spinner')).toBeFalsy();

      expect(app.dogBreedList).toBeFalsy();

      // The snackbar open function should not have been called since we attached the spy.
      expect(matSnackBar.open).not.toHaveBeenCalled();
      
      // ----------
      // | Click button == CHANGE STATE      
      const button = fixture.debugElement.nativeElement.querySelector('app-dog-breed-button button');
      expect(button).toBeTruthy()
      button.click();

      // ----------
      // | Detect immediate changes      
      fixture.detectChanges();

      // ----------
      // | Verify that progress spinner appears after button is pressed
      // |   but before the service call returns
      expect(fixture.nativeElement.querySelector('mat-progress-spinner')).toBeTruthy();

      // ----------
      // | Wait for the dalyed service call to finish, then detect changes after that.
      tick(100);
      fixture.detectChanges();
      
      // ----------
      // |Expect progress spinner to be gone again
      expect(fixture.nativeElement.querySelector('mat-progress-spinner')).toBeFalsy();

      // ----------
      // | Verify that the dogBreedList has not been initialized
      // |   and that the snack bar has been opened
      expect(app.dogBreedList).toBeFalsy();
      expect(matSnackBar.open).toHaveBeenCalled();
      
      flush();
    }));
  });
});
