import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-roadbook',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './roadbook.html',
  styleUrls: ['./roadbook.css']
})
export class Roadbook implements OnInit {

  constructor(private route: ActivatedRoute) {}

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
  // RÉCUPÉRATION DES DONNÉES DEPUIS NAVIGATION
  // ============================

  ngOnInit(): void {

    this.route.queryParams.subscribe(params => {

      if (params['steps']) {

        try {
          this.steps = JSON.parse(params['steps']);
        } catch {
          this.steps = [];
        }

        this.destination = params['destination'] || '';

        if (this.steps.length) {

          this.currentInstruction = this.steps[0].text;

          // lecture automatique de la première instruction
          this.speak(this.currentInstruction);

        }

      }

    });

  }

}
