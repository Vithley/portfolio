import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

interface GameObject {
  id: number;
  x: number;
  y: number;
  collected: boolean;
  icon: string;
}

@Component({
  selector: 'app-demo-game',
  templateUrl: './demo-game.component.html',
  imports: [CommonModule],
  styleUrl: './demo-game.component.scss'
})
export class DemoGameComponent implements OnInit, OnDestroy {

  charX = 100;
  charY = 200;

  // Game settings
  timeLimit = 30; // segundos
  totalObjects = 5;
  collectRadius = 60;

  // Game state
  timeRemaining = this.timeLimit;
  objectsCollected = 0;
  gameStarted = false;
  gameOver = false;
  gameWon = false;

  // Objects to collect
  objects: GameObject[] = [
    { id: 1, x: 150, y: 100, collected: false, icon: '⭐' },
    { id: 2, x: 400, y: 150, collected: false, icon: '💎' },
    { id: 3, x: 600, y: 250, collected: false, icon: '🏆' },
    { id: 4, x: 300, y: 300, collected: false, icon: '🎯' },
    { id: 5, x: 500, y: 80, collected: false, icon: '👑' }
  ];

  // Audio
  collectSound!: HTMLAudioElement;
  winSound!: HTMLAudioElement;
  loseSound!: HTMLAudioElement;

  private timerInterval: any;

  constructor(private router: Router) {}

  ngOnInit() {
    this.collectSound = new Audio('assets/sound/retro-beep.mp3');
    this.collectSound.volume = 0.5;

    this.winSound = new Audio('assets/sound/retro-beep.mp3');
    this.winSound.volume = 0.7;

    this.loseSound = new Audio('assets/sound/retro-beep.mp3');
    this.loseSound.volume = 0.6;
  }

  ngOnDestroy() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }
  }

  startGame() {
    this.gameStarted = true;
    this.gameOver = false;
    this.gameWon = false;
    this.timeRemaining = this.timeLimit;
    this.objectsCollected = 0;
    this.charX = 100;
    this.charY = 200;

    // Reset objects
    this.objects.forEach(obj => obj.collected = false);

    // Start timer
    this.timerInterval = setInterval(() => {
      this.timeRemaining--;

      if (this.timeRemaining <= 0) {
        this.endGame(false);
      }
    }, 1000);
  }

  goBack(event?: MouseEvent) {
    event?.stopPropagation();
    this.router.navigate(['/aventura']);
  }

  moveCharacter(event: MouseEvent) {
    if (!this.gameStarted || this.gameOver) return;

    const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();

    this.charX = event.clientX - rect.left - 36;
    this.charY = event.clientY - rect.top - 36;

    setTimeout(() => this.checkCollisions(), 100);
  }

  checkCollisions() {
    this.objects.forEach(obj => {
      if (obj.collected) return;

      const distance = Math.hypot(
        this.charX - obj.x,
        this.charY - obj.y
      );

      if (distance < this.collectRadius) {
        this.collectObject(obj);
      }
    });
  }

  collectObject(obj: GameObject) {
    obj.collected = true;
    this.objectsCollected++;

    this.collectSound.currentTime = 0;
    this.collectSound.play();

    // Check win condition
    if (this.objectsCollected >= this.totalObjects) {
      this.endGame(true);
    }
  }

  endGame(won: boolean) {
    this.gameOver = true;
    this.gameWon = won;

    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }

    if (won) {
      this.winSound.currentTime = 0;
      this.winSound.play();
    } else {
      this.loseSound.currentTime = 0;
      this.loseSound.play();
    }
  }

  restartGame() {
    this.startGame();
  }
}
