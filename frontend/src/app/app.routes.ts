import { Routes } from '@angular/router';

import { Home } from './components/home/home';
import { ListeningComponent } from './components/listening/listening';
import { NavigationComponent } from './components/navigation/navigation';
import { Roadbook } from './components/roadbook/roadbook';

export const routes: Routes = [

  { path: '', redirectTo: 'home', pathMatch: 'full' },

  { path: 'home', component: Home },
  { path: 'listening', component: ListeningComponent },
  { path: 'navigation', component: NavigationComponent },
  { path: 'roadbook', component: Roadbook }

];