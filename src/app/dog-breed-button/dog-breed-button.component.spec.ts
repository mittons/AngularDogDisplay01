import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DogBreedButtonComponent } from './dog-breed-button.component';

describe('DogBreedButtonComponent', () => {
  let component: DogBreedButtonComponent;
  let fixture: ComponentFixture<DogBreedButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DogBreedButtonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DogBreedButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
