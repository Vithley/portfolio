import { Component, OnDestroy } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Subscription } from 'rxjs';
import * as AOS from 'aos';

@Component({
  selector: 'app-modo-cv',
  imports: [],
  templateUrl: './modo-cv.component.html',
  styleUrl: './modo-cv.component.scss'
})
export class ModoCvComponent implements OnDestroy {
  typedText = '';
  fullText = '> Desarrolladora frontend con alma de pixel-artista y amante de las aventuras gráficas retro.';
  index = 0;
  typeSound!: HTMLAudioElement;
  routerSub!: Subscription;

  constructor(private router: Router) {}
 ngOnInit(): void {
    AOS.init({ once: true, duration: 1000, easing: 'ease-out-cubic' });
    setTimeout(() => AOS.refresh(), 100);

    // Crear el audio de máquina de escribir (no loop)
    this.typeSound = new Audio('assets/sound/retro_computer_from_2s.mp3');
    this.typeSound.volume = 0.2;

    this.typeNextCharacter();

    // Detener sonido al navegar fuera
    this.routerSub = this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.stopTypeSound();
      }
    });
  }

  goToAdventure() {
    this.router.navigate(['/aventura']);
  }

  ngOnDestroy(): void {
    this.stopTypeSound();
    if (this.routerSub) this.routerSub.unsubscribe();
  }

  private stopTypeSound() {
    if (this.typeSound) {
      this.typeSound.pause();
      this.typeSound.currentTime = 0;
      this.typeSound.src = ''; // libera memoria
      this.typeSound.load();
    }
  }

  typeNextCharacter() {
    if (this.index < this.fullText.length) {
      const char = this.fullText.charAt(this.index);
      this.typedText += char;

      // Solo reproducir el sonido si no hay otra instancia sonando
      if (char !== ' ' && this.typeSound) {
        this.typeSound.currentTime = 0;
        this.typeSound.play().catch(err => console.warn('No se pudo reproducir el sonido:', err));
      }

      this.index++;
      setTimeout(() => this.typeNextCharacter(), 35);
    }
  }
}