import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navigation.html', // Ajoute .component ici
  styleUrls: ['./navigation.css']    // Ajoute .component ici
})
export class NavigationComponent {
  // On écrit en dur les informations de ton image
  navInstructions = {
    distance: 'DANS 15 METRES',
    action: 'A DROITE',
    street: 'RUE ....',
    eta: '14:36',
    timeLeft: '5 MIN',
    metersLeft: '500m'
  };
}
