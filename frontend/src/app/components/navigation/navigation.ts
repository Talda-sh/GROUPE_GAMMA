import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GoogleMapsModule } from '@angular/google-maps';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';

import { NavigationService } from './navigation.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink
  ],
  templateUrl: './navigation.html',
  styleUrls: ['./navigation.css']
})
export class NavigationComponent implements OnInit {

  constructor(
    private navigationService: NavigationService,
    private route: ActivatedRoute ,
    private router: Router
  ) {}

  // ========================
  // MAP
  // ========================

  center = {
    lat: 48.8566,
    lng: 2.3522
  };

  zoom = 18;

  // ========================
  // DONNÉES NAVIGATION
  // ========================

  nextInstruction = '';

  destination = ''; 

  distance = '';
  action = '';
  street = '';
  icon = 'straight';

  eta = '';
  timeLeft = '';
  metersLeft = '';

  steps: any[] = [];

  // ========================
  // INIT
  // ========================

  ngOnInit(): void {

    // 🔥 on récupère la destination envoyée par Listening
    this.route.queryParams.subscribe(params => {

      if (params['destination']) {

        this.destination = params['destination'];

        console.log('DESTINATION VOCALE:', this.destination);

        this.loadRoute(); // ⭐ backend réel

      }

    });

  }

  // ========================
  // BACKEND ROUTE
  // ========================

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

  // ========================
  // TEMPLATE
  // ========================

  openRoadbook() {
     this.router.navigate(['/roadbook'], {
    state: {
      steps: this.steps,
      destination: this.destination
    }
  });
  }

}
