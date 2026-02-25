import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { NavigationService } from '../navigation/navigation.service';

@Component({
  selector: 'app-roadbook',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './roadbook.html',
  styleUrls: ['./roadbook.css']
})
export class Roadbook implements OnInit {

  steps: any[] = [];
  destination = '';
  hasArrived: boolean = false; //  IMPORTANT (corrige ton erreur)

  currentInstruction = '';
  isPaused = false;

  constructor(
    private navigationService: NavigationService,
    private router: Router
  ) {}

  // ================= AUDIO =================

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

  // ================= INIT =================

  ngOnInit(): void {

    // on récupère depuis le service (PLUS queryParams)
    this.steps = this.navigationService.steps || [];
    this.destination = this.navigationService.destination || '';

    if (this.steps.length) {

      this.currentInstruction = this.steps[0].text;

      this.speak(this.currentInstruction);

      // si dernière étape = arrivé
      if (this.currentInstruction.toLowerCase().includes('arrivé')) {
        this.hasArrived = true;
      }

    }

  }

}