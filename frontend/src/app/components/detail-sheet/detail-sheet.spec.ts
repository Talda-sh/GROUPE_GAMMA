import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailSheet } from './detail-sheet';

describe('DetailSheet', () => {
  let component: DetailSheet;
  let fixture: ComponentFixture<DetailSheet>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailSheet]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailSheet);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
