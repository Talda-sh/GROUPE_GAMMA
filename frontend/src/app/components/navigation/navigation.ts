import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GoogleMapsModule } from '@angular/google-maps';

import { NavigationService } from './navigation.service';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    GoogleMapsModule
  ],
  templateUrl: './navigation.html',
  styleUrls: ['./navigation.css']
})
export class NavigationComponent implements OnInit {

  constructor(private navigationService: NavigationService) {}

  center = {
    lat: 48.8566,
    lng: 2.3522
  };

  zoom = 18;
  nextInstruction = '';

  destination = 'restaurant';

  distance = '';
  action = '';
  street = '';
  icon = 'straight';

  eta = '';
  timeLeft = '';
  metersLeft = '';

  steps: any[] = [];

  ngOnInit(): void {
    this.loadRoute();
  }

  loadRoute() {
    this.navigationService.getRoute(this.destination)
      .subscribe((data: any) => {

        console.log('NAVIGATION DATA:', data);

        this.steps = data.path_steps || [];

        if (this.steps.length) {

          const current = this.steps[0];

          this.distance = current.distance || '';
          this.action = current.text || '';
          this.icon = current.icon || 'straight';
          this.street = data.destination || '';

          this.nextInstruction = current.text || '';
        }
      });
  }

  // ⭐ AJOUTÉ POUR LE TEMPLATE
  openRoadbook() {
    console.log('ouvrir roadbook');
  }

}
