import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Roadbook } from './roadbook';

describe('Roadbook', () => {
  let component: Roadbook;
  let fixture: ComponentFixture<Roadbook>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Roadbook]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Roadbook);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
