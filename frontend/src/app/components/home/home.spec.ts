import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Home } from './home';

// Permet de simuler le Router 
import { provideRouter } from '@angular/router';


// Groupe de tests pour le composant Home
describe('Home', () => {

  // Variable qui contiendra l'instance du composant
  let component: Home;

  // Fixture = environnement de test Angular (DOM + composant)
  let fixture: ComponentFixture<Home>;

  // beforeEach est exécuté avant chaque test
  beforeEach(async () => {

    // Configuration du module 
    await TestBed.configureTestingModule({

      // On importe le composant standalone Home
      imports: [Home],

      // On fournit un router vide pour éviter les erreurs de navigation
      providers: [provideRouter([])] 

    }).compileComponents();

    // Création de l'environnement de test du composant
    fixture = TestBed.createComponent(Home);

    // Récupération de l'instance réelle du composant
    component = fixture.componentInstance;

    // Lance le cycle de détection des changements (ngOnInit etc.)
    fixture.detectChanges();

  });

  // Test simple : vérifie que le composant est bien créé
  it('should create', () => {
    expect(component).toBeTruthy();
  });

});