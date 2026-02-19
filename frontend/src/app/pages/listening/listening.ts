// import { Component, OnInit, NgZone } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { MatIconModule } from '@angular/material/icon';
// import { MatButtonModule } from '@angular/material/button';

// @Component({
//   selector: 'app-listening',
//   standalone: true,
//   imports: [CommonModule, MatIconModule, MatButtonModule],
//   templateUrl: './listening.html',
//   styleUrls: ['./listening.css']
// })
// export class Listening implements OnInit {
//   recognition: any;
//   isListening = false;
//   transcript = ''; // Texte définitif
//   interimTranscript = ''; // Texte pendant que tu parles

//   constructor(private ngZone: NgZone) {}

//   ngOnInit() {
//     const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
//     if (!SpeechRecognition) return;

//     this.recognition = new SpeechRecognition();
//     this.recognition.lang = 'fr-FR';
//     this.recognition.continuous = true;
//     this.recognition.interimResults = true;

//     this.recognition.onresult = (event: any) => {
//       let interim = '';
//       let final = '';

//       for (let i = event.resultIndex; i < event.results.length; ++i) {
//         if (event.results[i].isFinal) {
//           final += event.results[i][0].transcript;
//         } else {
//           interim += event.results[i][0].transcript;
//         }
//       }

//       this.ngZone.run(() => {
//         this.transcript = final;
//         this.interimTranscript = interim;
//       });
//     };

//     this.recognition.onend = () => {
//       this.ngZone.run(() => { this.isListening = false; });
//     };
//   }

//   toggleListening() {
//     if (this.isListening) {
//       this.recognition.stop();
//       this.isListening = false;
//     } else {
//       this.transcript = '';
//       this.interimTranscript = '';
//       this.recognition.start();
//       this.isListening = true;
//     }
//   }
// }




// ------------------------------VERSION 2
// import { Component, OnInit, NgZone, OnDestroy } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { MatIconModule } from '@angular/material/icon';
// import { MatButtonModule } from '@angular/material/button';

// @Component({
//   selector: 'app-listening',
//   standalone: true,
//   imports: [CommonModule, MatIconModule, MatButtonModule],
//   templateUrl: './listening.html',
//   styleUrls: ['./listening.css']
// })
// export class Listening implements OnInit, OnDestroy {
//   recognition: any;
//   isListening = false;
//   transcript = ''; 
//   interimTranscript = '';
//   private silenceTimer: any;

//   constructor(private ngZone: NgZone) {}

//   ngOnInit() {
//     const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
//     if (!SpeechRecognition) return;

//     this.recognition = new SpeechRecognition();
//     this.recognition.lang = 'fr-FR';
//     this.recognition.continuous = true;
//     this.recognition.interimResults = true;

//     this.recognition.onresult = (event: any) => {
//       this.clearSilenceTimer(); // On annule le compte à rebours dès qu'on entend un son

//       let interim = '';
//       let final = '';

//       for (let i = event.resultIndex; i < event.results.length; ++i) {
//         if (event.results[i].isFinal) {
//           final += event.results[i][0].transcript;
//         } else {
//           interim += event.results[i][0].transcript;
//         }
//       }

//       this.ngZone.run(() => {
//         // On accumule le texte final et on met à jour l'interim
//         if (final) this.transcript += final;
//         this.interimTranscript = interim;
        
//         // On lance le chrono de 2 secondes de silence avant coupure
//         this.startSilenceTimer();
//       });
//     };

//     this.recognition.onend = () => {
//       this.ngZone.run(() => { this.isListening = false; });
//     };

//     // --- ACTION : LANCEMENT AUTOMATIQUE ---
//     this.startListening();
//   }

//   // Pour éviter les bugs si on quitte la page
//   ngOnDestroy() {
//     this.stopListening();
//   }

//    // Modifie aussi ton toggleListening pour être sûr
//   toggleListening() {
//     if (this.isListening) {
//       this.clearTimer();
//       this.recognition.stop();
//       this.isListening = false;
//     } else {
//       this.startListening();
//     }
//   }

//   startListening() {
//     try {
//       this.transcript = '';
//       this.interimTranscript = '';
//       this.recognition.start();
//       this.isListening = true;
//       // On lance aussi le timer au cas où l'utilisateur ne dit rien du tout
//       this.startSilenceTimer();
//     } catch (e) {
//       console.log("Le micro est peut-être déjà actif ou bloqué.");
//     }
//   }

//  stopListening() {
//     this.clearSilenceTimer();
//     if (this.recognition) {
//       this.recognition.stop();
//     }
//     // C'est cette ligne qui fait disparaître le néon et remet le texte initial
//     this.ngZone.run(() => {
//       this.isListening = false;
//       this.interimTranscript = ''; // On nettoie le texte "en cours"
//     });
//   }

//   private startSilenceTimer() {
//     this.clearSilenceTimer();
//     this.silenceTimer = setTimeout(() => {
//       this.stopListening();
//     }, 2000); // Se coupe après 2 secondes de silence
//   }

//   private clearSilenceTimer() {
//     if (this.silenceTimer) clearTimeout(this.silenceTimer);
//   }

//   private startTimer() {
//     this.clearTimer();
//     this.silenceTimer = setTimeout(() => {
//       // 1. On arrête physiquement le micro
//       if (this.recognition) {
//         this.recognition.stop();
//       }
      
//       // 2. On force le retour à la normale de l'interface
//       this.ngZone.run(() => {
//         this.isListening = false;
//         this.interimTranscript = ''; 
//         console.log("Silence détecté : Retour à l'état initial");
//       });
//     }, 2000); 
//   }

//   private clearTimer() {
//     if (this.silenceTimer) {
//       clearTimeout(this.silenceTimer);
//     }
//   }


// }



// ------------------------------VERSION 3

import { Component, OnInit, NgZone, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-listening',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule],
  templateUrl: './listening.html',
  styleUrls: ['./listening.css']
})
export class Listening implements OnInit {
  recognition: any;
  isListening = false;
  transcript = '';
  interimTranscript = '';
  private silenceTimer: any;

  constructor(
    private ngZone: NgZone,
    private cdr: ChangeDetectorRef // <--- Ajoute ça pour forcer le HTML
  ) {}

  ngOnInit() {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) return;

    this.recognition = new SpeechRecognition();
    this.recognition.lang = 'fr-FR';
    this.recognition.continuous = true;
    this.recognition.interimResults = true;

    this.recognition.onresult = (event: any) => {
      this.clearSilenceTimer();
      let interim = '';
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          this.transcript = event.results[i][0].transcript;
        } else {
          interim += event.results[i][0].transcript;
        }
      }

      this.ngZone.run(() => {
        this.interimTranscript = interim;
        this.startSilenceTimer();
        this.cdr.detectChanges(); // Force Angular à voir le texte
      });
    };

    // Si le micro s'arrête (pour n'importe quelle raison)
    this.recognition.onend = () => {
      this.resetInterface();
    };

    this.startListening();
  }

  toggleListening() {
    if (this.isListening) {
      this.stopListening();
    } else {
      this.startListening();
    }
  }

  startListening() {
    try {
      this.isListening = true;
      this.transcript = '';
      this.interimTranscript = '';
      this.recognition.start();
      this.cdr.detectChanges();
    } catch (e) { console.error(e); }
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
      this.cdr.detectChanges(); // FORCE le retrait du néon et du texte "Parlez"
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