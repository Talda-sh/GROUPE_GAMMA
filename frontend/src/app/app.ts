import { Component } from '@angular/core';
import { NavigationComponent } from './components/navigation/navigation'; // Import de ton composant

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NavigationComponent], // On l'ajoute ici
  template: '<app-navigation></app-navigation>', // On l'affiche ici
})
export class App {}
