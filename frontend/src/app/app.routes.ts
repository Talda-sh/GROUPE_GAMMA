import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Listening } from './pages/listening/listening';
import { Map } from './pages/map/map';

export const routes: Routes = [
    { path: 'home', component: Home },
    { path: 'listening', component: Listening },
    { path: 'map', component: Map }
];


