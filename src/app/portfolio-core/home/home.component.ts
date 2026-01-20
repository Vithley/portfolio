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
    this.clickSound = new Audio('assets/sound/retro-click-236673.mp3');
  }

  ngOnInit(): void {
    AOS.init();
  }

  startGame() {
    this.clickSound.currentTime = 0;
    this.clickSound.play();

    setTimeout(() => {
      this.router.navigate(['/aventura']); // o /world /intro
    }, 300);
  }
}

