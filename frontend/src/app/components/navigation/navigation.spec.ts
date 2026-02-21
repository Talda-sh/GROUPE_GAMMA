import { describe, it, expect, beforeEach, vi } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavigationComponent } from './navigation';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';

// ⭐ MOCK LEAFLET (très important pour les tests)
vi.mock('leaflet', () => {
  return {
    map: () => ({
      setView: () => {},
      invalidateSize: () => {}
    }),
    tileLayer: () => ({
      addTo: () => {}
    })
  };
});

describe('NavigationComponent (OpenStreetMap)', () => {

  let component: NavigationComponent;
  let fixture: ComponentFixture<NavigationComponent>;

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      imports: [
        NavigationComponent,
        HttpClientTestingModule
      ],
      providers: [
        provideRouter([]) // ⭐ nécessaire pour ActivatedRoute / Router
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(NavigationComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});