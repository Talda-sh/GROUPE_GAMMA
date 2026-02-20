import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { ListeningComponent } from './listening';

describe('ListeningComponent', () => {

  let component: ListeningComponent;
  let fixture: ComponentFixture<ListeningComponent>;

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      imports: [ListeningComponent],
      providers: [provideRouter([])] 
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListeningComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});