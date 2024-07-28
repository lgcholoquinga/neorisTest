import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoductsTableComponent } from './poducts-table.component';

describe('PoductsTableComponent', () => {
  let component: PoductsTableComponent;
  let fixture: ComponentFixture<PoductsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PoductsTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PoductsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
