import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  template: `
    <img src="logo.png" class="logo" routerLink="public/PS.png" />
    <router-outlet></router-outlet>
  `,
  styleUrls: ['./root.css']
})
export class RootComponent {}
