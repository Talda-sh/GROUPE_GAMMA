import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import * as L from 'leaflet';

import { NavigationService } from './navigation.service';

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
export class NavigationComponent implements OnInit, AfterViewInit {

  private map!: L.Map;

  destination: string = '';

  nextInstruction = '';
  distance = '';
  action = '';
  street = '';
  icon = 'straight';

  eta = '';
  timeLeft = '';
  metersLeft = '';

  steps: any[] = [];

  constructor(
    private navigationService: NavigationService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  // ================= INIT =================

  ngOnInit(): void {

    this.route.queryParams.subscribe(params => {

      if (params['destination']) {

        this.destination = params['destination'];

        console.log('DESTINATION VOCALE:', this.destination);

        this.loadRoute();
      }

    });

  }

  searchFromInput(): void {

  if (!this.destination || this.destination.trim() === '') {
    return;
  }

  console.log('Recherche clavier:', this.destination);

  this.loadRoute();

}

  // ================= MAP =================

  ngAfterViewInit(): void {

    this.map = L.map('map').setView([48.8566, 2.3522], 18);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap'
    }).addTo(this.map);

  }

  // ================= BACKEND =================

  loadRoute() {

  this.navigationService.getRoute(this.destination)
    .subscribe((data: any) => {

      console.log('NAVIGATION DATA:', data);

      // 🔥 IMPORTANT : gérer erreur backend
      if (data.error) {
        console.warn('BACKEND ERROR:', data.error);
        this.nextInstruction = 'Destination introuvable';
        this.steps = [];
        return;
      }

      this.steps = data.path_steps || [];

      if (this.steps.length > 0) {

        const current = this.steps[0];

        this.distance = current.distance || '';
        this.action = current.text || '';
        this.icon = current.icon || 'straight';
        this.street = data.destination || '';
        this.nextInstruction = current.text || '';
      }
    });

}

  // ================= ROUTER =================

  openRoadbook(): void {

    this.router.navigate(['/roadbook'], {
      state: {
        steps: this.steps,
        destination: this.destination
      }
    });

  }

}