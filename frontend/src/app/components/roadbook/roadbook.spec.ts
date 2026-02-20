import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Roadbook } from './roadbook';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('Roadbook', () => {

  let component: Roadbook;
  let fixture: ComponentFixture<Roadbook>;

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      imports: [
        Roadbook,
        HttpClientTestingModule
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(Roadbook);
    component = fixture.componentInstance;

    fixture.detectChanges();

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
