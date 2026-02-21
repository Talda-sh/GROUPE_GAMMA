import { describe, it, expect, beforeEach, vi } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListeningComponent } from './listening';
import { provideRouter } from '@angular/router';

// ⭐ MOCK SpeechRecognition pour les tests
class MockSpeechRecognition {
  lang = '';
  continuous = false;
  interimResults = false;
  onresult: any;
  onend: any;
  start() {}
  stop() {}
}

describe('ListeningComponent', () => {

  let component: ListeningComponent;
  let fixture: ComponentFixture<ListeningComponent>;

  beforeEach(async () => {

    //  on injecte SpeechRecognition dans window
    (window as any).SpeechRecognition = MockSpeechRecognition;
    (window as any).webkitSpeechRecognition = MockSpeechRecognition;

    await TestBed.configureTestingModule({
      imports: [ListeningComponent],
      providers: [
        provideRouter([]) // nécessaire pour Router.navigate()
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ListeningComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});