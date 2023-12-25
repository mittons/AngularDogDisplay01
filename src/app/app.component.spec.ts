import { TestBed, waitForAsync } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { DogBreedService } from './services/dog-breed-service/dog-breed.service';
import { MockDogBreedService } from './services/dog-breed-service/mock-dog-breed.service';
import { of } from 'rxjs';
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

      const fixture = TestBed.createComponent(AppComponent);
      const app = fixture.componentInstance;
      spyOn(app, 'onListRequested').and.callThrough();
      spyOn(mockService, 'getBreeds').and.callThrough();


      expect(app.dogBreedList).toBeFalsy();
      const cardsBefore = fixture.debugElement.nativeElement.querySelectorAll('mat-card');
      expect(cardsBefore.length).toBe(0);
      
      const button = fixture.debugElement.nativeElement.querySelector('app-dog-breed-button button');
      expect(button).toBeTruthy()
      button.click();
      

      fixture.detectChanges();
      waitForAsync(() => fixture.whenStable());
      

      expect(app.onListRequested).toHaveBeenCalled();
      expect(mockService.getBreeds).toHaveBeenCalled();
      expect(app.dogBreedList).toBeTruthy();

      fixture.whenStable().then(() => {
        // assertions for the changes after the click
        const cards = fixture.debugElement.nativeElement.querySelectorAll('mat-card');
        expect(cards.length).toBeGreaterThanOrEqual(1);
      });
    }));

    it('and display a snackbar on unsuccessful service request', waitForAsync(() => {
      const fixture = TestBed.createComponent(AppComponent);
      const app = fixture.componentInstance;
      spyOn(app, 'onListRequested').and.callThrough();
      
      spyOn(matSnackBar, 'open').and.callThrough();
      expect(matSnackBar.open).toHaveBeenCalledTimes(0);
      
      spyOn(mockService, 'getBreeds').and.returnValue(of({ data: null, success:false }));

      expect(app.dogBreedList).toBeFalsy();
      
      const button = fixture.debugElement.nativeElement.querySelector('app-dog-breed-button button');
      expect(button).toBeTruthy()
      button.click();
      
      fixture.detectChanges();
      waitForAsync(() => fixture.whenStable());

      expect(app.dogBreedList).toBeFalsy();
      expect(matSnackBar.open).toHaveBeenCalled();
    }));
  });
});
