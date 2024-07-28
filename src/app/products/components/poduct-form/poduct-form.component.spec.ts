import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoductFormComponent } from './poduct-form.component';

describe('PoductFormComponent', () => {
  let component: PoductFormComponent;
  let fixture: ComponentFixture<PoductFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PoductFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PoductFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
