import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import * as L from 'leaflet';
import { Router } from '@angular/router';
import { NavigationService } from './navigation.service';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './navigation.html',
  styleUrls: ['./navigation.css']
})
export class NavigationComponent implements OnInit, AfterViewInit {

  constructor(
    private navigationService: NavigationService,
    private route: ActivatedRoute,
     private router: Router
  ) {}

  // ========================
  // MAP (Leaflet)
  // ========================

  map!: L.Map;

  // ========================
  // DONNÉES NAVIGATION
  // ========================

  nextInstruction = '';
  destination = '';
>>>>>>> dfb6686 (feat: migration navigation vers Leaflet + router standalone Angular)

  distance = '';
  action = '';
  street = '';
  icon = 'straight';

  eta = '';
  timeLeft = '';
  metersLeft = '';

  steps: any[] = [];

  ngOnInit(): void {

    this.route.queryParams.subscribe(params => {

      if (params['destination']) {
        this.destination = params['destination'];
        console.log('DESTINATION VOCALE:', this.destination);
        this.loadRoute();
      }

    });

  }

  // ========================
  // CHARGER CSS LEAFLET SANS styles.css GLOBAL
  // ========================

  private loadLeafletCSS() {
    const id = 'leaflet-css';

    if (!document.getElementById(id)) {
      const link = document.createElement('link');
      link.id = id;
      link.rel = 'stylesheet';
      link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
      document.head.appendChild(link);
    }
  }

  // ========================
  // INIT MAP LEAFLET
  // ========================

  ngAfterViewInit(): void {

    this.loadLeafletCSS();

    this.map = L.map('map').setView([48.8566, 2.3522], 18);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(this.map);

    //IMPORTANT : corrige les blocs noirs / tiles cassées ⭐⭐⭐
    setTimeout(() => {
      this.map.invalidateSize(true);
    }, 300);

  }

  // ========================
  // BACKEND ROUTE
  // ========================

>>>>>>> dfb6686 (feat: migration navigation vers Leaflet + router standalone Angular)
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
    queryParams: { destination: this.destination }
  });
>>>>>>> dfb6686 (feat: migration navigation vers Leaflet + router standalone Angular)
}

}