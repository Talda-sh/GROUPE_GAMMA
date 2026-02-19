import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoadbookService } from './rooadbook.service';

@Component({
  selector: 'app-roadbook',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './roadbook.html',
  styleUrls: ['./roadbook.css']
})
export class Roadbook implements OnInit {

  constructor(private roadbookService: RoadbookService) {}

  // ============================
  // STEPS (temporaire en attendant backend)
  // ============================
  steps = [
    {
      distance: '15 mètres',
      text: 'Avancez tout droit',
      icon: 'straight',
      extra: 'Passez devant la machine à café'
    },
    {
      distance: '8 mètres',
      text: 'Tournez à gauche',
      icon: 'turn_left'
    },
    {
      distance: '5 mètres',
      text: 'Montez l’escalier',
      icon: 'stairs'
    },
    {
      distance: '',
      text: 'Restaurant à droite',
      icon: 'restaurant'
    }
  ];

  // ============================
  // DESTINATION (backend plus tard)
  // ============================
  destination = 'Restaurant Central';

  hasArrived = false;

  // ============================
  // AUDIO NAVIGATION
  // ============================
  currentInstruction = this.steps[0].text;
  isPaused = false;

  speak(text: string) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'fr-FR';
    speechSynthesis.speak(utterance);
  }

  repeatInstruction() {
    speechSynthesis.cancel();
    this.speak(this.currentInstruction);
  }

  togglePause() {
    if (!this.isPaused) {
      speechSynthesis.pause();
      this.isPaused = true;
    } else {
      speechSynthesis.resume();
      this.isPaused = false;
    }
  }

  // ============================
  // CONNEXION BACKEND FASTAPI
  // ============================
  ngOnInit() {

  // exemple : utilisateur veut aller au restaurant
  this.roadbookService.getRoute('restaurant')
    .subscribe((data: any) => {

      console.log("ROUTE DYNAMIQUE:", data);

      this.steps = data.steps;
      this.destination = data.destination;

    });
}

}