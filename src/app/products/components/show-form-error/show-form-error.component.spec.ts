import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowFormErrorComponent } from './show-form-error.component';

describe('ShowFormErrorComponent', () => {
  let component: ShowFormErrorComponent;
  let fixture: ComponentFixture<ShowFormErrorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowFormErrorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowFormErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
