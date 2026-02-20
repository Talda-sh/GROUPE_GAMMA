import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoadbookService } from './roadbook.service'; // ✅ CORRECTION ICI

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
  // DONNÉES ROADBOOK
  // ============================

  steps: any[] = [];
  destination = '';
  hasArrived = false;

  currentInstruction = '';
  isPaused = false;

  // ============================
  // AUDIO NAVIGATION
  // ============================

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

  ngOnInit(): void {

    this.roadbookService.getRoute('restaurant')
      .subscribe((data: any) => {

        console.log('ROUTE DYNAMIQUE:', data);

        this.steps = data.steps || [];
        this.destination = data.destination || '';

        if (this.steps.length) {
          this.currentInstruction = this.steps[0].text;
        }

      });

  }

}
