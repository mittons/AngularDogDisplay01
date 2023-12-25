import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DogBreedListItemComponent } from './dog-breed-list-item.component';

describe('DogBreedListItemComponent', () => {
  let component: DogBreedListItemComponent;
  let fixture: ComponentFixture<DogBreedListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DogBreedListItemComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DogBreedListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
