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
  private navigationTimer: any;

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

    // RESTORE SI ON REVIENT DE ROADBOOK
if (this.navigationService.steps.length) {

  this.steps = this.navigationService.steps;
  this.destination = this.navigationService.destination;

  const current = this.steps[0];

  this.distance = current.distance;
  this.action = current.text;
  this.icon = current.icon;
  this.nextInstruction = current.text;

}

    this.route.queryParams.subscribe(params => {

      if (params['destination']) {

        this.destination = params['destination'];

        console.log('DESTINATION VOCALE:', this.destination);

        this.loadRoute();
      }
    });
  }

  // ================= RECHERCHE CLAVIER =================

  searchFromInput(): void {

    if (!this.destination || this.destination.trim() === '') return;

    console.log('Recherche clavier:', this.destination);

    this.loadRoute();
  }

  // ================= MAP =================

  ngAfterViewInit(): void {

    this.map = L.map('map').setView([48.8566, 2.3522], 18);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap'
    }).addTo(this.map);

    setTimeout(() => {
      this.map.invalidateSize();
    }, 300);
  }

  // ================= FAKE NAVIGATION (30 sec) =================

  startFakeNavigation() {

    if (this.navigationTimer) {
      clearInterval(this.navigationTimer);
    }

    let index = 0;

    this.navigationTimer = setInterval(() => {

      if (!this.steps || index >= this.steps.length) {
        clearInterval(this.navigationTimer);
        return;
      }

      const current = this.steps[index];

      this.distance = current.distance || '';
      this.action = current.text || '';
      this.icon = current.icon || 'straight';
      this.nextInstruction = current.text || '';

      //  Mise à jour ETA / temps restant / distance
      if (index === 0) {
        this.metersLeft = '50m';
        this.timeLeft = '30 sec';
        this.eta = 'Arrivée proche';
      }
      else if (index === 1) {
        this.metersLeft = '20m';
        this.timeLeft = '20 sec';
        this.eta = 'Presque arrivé';
      }
      else if (index === 2) {
        this.metersLeft = '10m';
        this.timeLeft = '10 sec';
        this.eta = 'Arrivée imminente';
      }

      index++;

    }, 30000); // 30 secondes
  }

  // ================= BACKEND =================

  loadRoute() {

    this.navigationService.steps = this.steps;
    this.navigationService.destination = this.destination;  
    this.navigationService.getRoute(this.destination)
      .subscribe((data: any) => {

        console.log('NAVIGATION DATA:', data);

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

          //  démarre la navigation seulement après avoir reçu les steps
          this.startFakeNavigation();
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