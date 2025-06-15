import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as AOS from 'aos';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  
private clickSound: HTMLAudioElement;

  constructor(private router: Router) {
    this.clickSound = new Audio('assets/sound/retro-click-236673.mp3'); // SIN barra al inicio
  }

  ngOnInit(): void {
    AOS.init({
      once: true,
      duration: 1000,
      easing: 'ease-out-cubic'
    });

    setTimeout(() => {
      AOS.refresh();
    }, 100);
  }

  enterMode(mode: 'cv' | 'aventura') {
    this.clickSound.currentTime = 0;
    this.clickSound.play().then(() => {
      console.log('🔊 Sonido reproducido');
    }).catch(err => {
      console.warn('⚠️ No se pudo reproducir el sonido:', err);
    });

    setTimeout(() => {
      this.router.navigate([mode]);
    }, 400);
  }
  
}

