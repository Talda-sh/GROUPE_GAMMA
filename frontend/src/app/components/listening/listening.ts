import { Component, OnInit, NgZone, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router'; // 

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-listening',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './listening.html',
  styleUrls: ['./listening.css']
})
export class ListeningComponent implements OnInit {

  recognition: any;

  isListening = false;
  transcript = '';
  interimTranscript = '';

  private silenceTimer: any;

  constructor(
    private ngZone: NgZone,
    private cdr: ChangeDetectorRef,
    private router: Router 
  ) {}

  // =========================
  // INIT
  // =========================

  ngOnInit() {

    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      console.warn('SpeechRecognition non supporté');
      return;
    }

    this.recognition = new SpeechRecognition();

    this.recognition.lang = 'fr-FR';
    this.recognition.continuous = true;
    this.recognition.interimResults = true;

    // =========================
    // RESULTATS VOCAUX
    // =========================

    this.recognition.onresult = (event: any) => {

      this.clearSilenceTimer();

      let interim = '';

      for (let i = event.resultIndex; i < event.results.length; ++i) {

        if (event.results[i].isFinal) {

          this.transcript = event.results[i][0].transcript.trim();

          //  ICI ON NAVIGUE VERS NAVIGATION
          this.ngZone.run(() => {

            this.router.navigate(['/navigation'], {
              queryParams: {
                destination: this.transcript
              }
            });

          });

        } else {
          interim += event.results[i][0].transcript;
        }

      }

      this.ngZone.run(() => {

        this.interimTranscript = interim;

        this.startSilenceTimer();

        this.cdr.detectChanges();

      });

    };

    this.recognition.onend = () => {
      this.resetInterface();
    };

    this.startListening();
  }

  toggleListening() {
    this.isListening ? this.stopListening() : this.startListening();
  }

  startListening() {

    if (!this.recognition) return;

    try {

      this.isListening = true;
      this.transcript = '';
      this.interimTranscript = '';

      this.recognition.start();

      this.cdr.detectChanges();

    } catch (e) {
      console.error(e);
    }
  }

  stopListening() {

    if (this.recognition) {
      this.recognition.stop();
    }

    this.resetInterface();
  }

  private resetInterface() {

    this.ngZone.run(() => {

      this.clearSilenceTimer();

      this.isListening = false;
      this.interimTranscript = '';

      this.cdr.detectChanges();

       this.router.navigate(['/navigation'], {
    queryParams: { destination: this.transcript }
  });

    });
  }

  private startSilenceTimer() {

    this.clearSilenceTimer();

    this.silenceTimer = setTimeout(() => {
      this.stopListening();
    }, 2000);
  }

  private clearSilenceTimer() {
    if (this.silenceTimer) clearTimeout(this.silenceTimer);
  }

}
