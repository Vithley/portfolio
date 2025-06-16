import { CommonModule } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import * as AOS from 'aos';

@Component({
  selector: 'app-adventure',
  imports: [CommonModule],
  templateUrl: './adventure.component.html',
  styleUrl: './adventure.component.scss'
})
export class AdventureComponent implements OnDestroy {
  hoverComputer = false;
  hoverMutant = false;
  dialogText = '';
  backgroundMusic!: HTMLAudioElement;
  clickSound!: HTMLAudioElement;

  constructor(private router: Router) {}

  ngOnInit(): void {
    AOS.init({
      once: true,
      duration: 1000
    });

    setTimeout(() => AOS.refresh(), 500);

    this.dialogText = '👀 [Narrador]: Examina la habitación y busca algo interesante...';

    this.backgroundMusic = new Audio('assets/audio/retro-chiptune-adventure.mp3');
    this.backgroundMusic.loop = true;
    this.backgroundMusic.volume = 0.3;
    this.backgroundMusic.play().catch(err => {
      console.warn('Autoplay bloqueado por el navegador:', err);
    });

    this.clickSound = new Audio('assets/sound/retro-click-236673.mp3');
    this.clickSound.volume = 0.8;
  }

  openProject(projectId: string) {
    this.clickSound.currentTime = 0;
    this.clickSound.play().catch(err => {
      console.warn('No se pudo reproducir el sonido de clic:', err);
    });

    if (projectId === 'terminal') {
      this.dialogText = '💬 [Narrador]: Este ordenador parece tener un secreto...';
    } else if (projectId === 'tentaculo') {
      this.dialogText = '🧪 [Narrador]: No toques eso, ¡podrías despertar algo mutante!';
    }

    setTimeout(() => {
      this.dialogText = '';
      this.router.navigate(['/projects', projectId]);
    }, 2500);
  }

  ngOnDestroy(): void {
    if (this.backgroundMusic) {
      this.backgroundMusic.pause();
      this.backgroundMusic.currentTime = 0;
    }
  }
}
