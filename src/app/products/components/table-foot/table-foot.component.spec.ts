import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableFootComponent } from './table-foot.component';

describe('TableFootComponent', () => {
  let component: TableFootComponent;
  let fixture: ComponentFixture<TableFootComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableFootComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableFootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
