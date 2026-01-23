import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy, AfterViewInit, HostListener, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';

interface GameObject {
  id: number;
  x: number;
  y: number;
  displayX: number; // Posición actual en píxeles
  displayY: number; // Posición actual en píxeles
  collected: boolean;
  icon: string;
}

interface Coords {
  x: number;
  y: number;
  w: number;
  h: number;
}

@Component({
  selector: 'app-demo-game',
  templateUrl: './demo-game.component.html',
  imports: [CommonModule],
  styleUrl: './demo-game.component.scss'
})
export class DemoGameComponent implements OnInit, OnDestroy, AfterViewInit {

  charX = 100;
  charY = 200;
  
  // Dimensiones visibles de la escena
  sceneWidth = 1000;
  sceneHeight = 562;

  // Coordenadas relativas de objetos (0-1)
  private objectCoordsDesktop = {
    obj1: { x: 0.15, y: 0.18 },
    obj2: { x: 0.40, y: 0.27 },
    obj3: { x: 0.60, y: 0.45 },
    obj4: { x: 0.30, y: 0.53 },
    obj5: { x: 0.50, y: 0.14 }
  };
  
  private objectCoordsMobile = {
    obj1: { x: 0.20, y: 0.20 },
    obj2: { x: 0.50, y: 0.35 },
    obj3: { x: 0.35, y: 0.75 },
    obj4: { x: 0.55, y: 0.60 },
    obj5: { x: 0.30, y: 0.80 }
  };

  // Game settings
  timeLimit = 30; // segundos
  totalObjects = 5;
  collectRadius = 50; // Radio de colección ajustado

  // Game state
  timeRemaining = this.timeLimit;
  objectsCollected = 0;
  gameStarted = false;
  gameOver = false;
  gameWon = false;
  isMobile = false;

  objects: GameObject[] = [];

  // Audio
  collectSound!: HTMLAudioElement;
  winSound!: HTMLAudioElement;
  loseSound!: HTMLAudioElement;

  private timerInterval: any;

  constructor(private router: Router, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.checkScreenSize();
    this.updateSceneDimensions();
    this.loadObjects();

    this.collectSound = new Audio('assets/sound/click1.mp3');
    this.collectSound.volume = 0.5;

    this.winSound = new Audio('assets/sound/orchestral-win.mp3');
    this.winSound.volume = 0.7;

    this.loseSound = new Audio('assets/sound/retro-beep.mp3');
    this.loseSound.volume = 0.6;

    window.addEventListener('resize', () => {
      this.checkScreenSize();
      this.updateSceneDimensions();
      this.repositionObjects();
    });
  }

  ngAfterViewInit() {
    setTimeout(() => this.updateSceneDimensions(), 300);
  }

  @HostListener('window:orientationchange', [])
  onOrientationChange() {
    setTimeout(() => {
      this.updateSceneDimensions();
      this.repositionObjects();
    }, 300);
  }

  private updateSceneDimensions(): void {
    const scene = document.querySelector('.demo-scene') as HTMLElement;
    if (scene) {
      this.sceneWidth = scene.getBoundingClientRect().width;
      this.sceneHeight = scene.getBoundingClientRect().height;
      this.cdr.detectChanges();
    }
  }

  private repositionObjects(): void {
    const coords = this.isMobile ? this.objectCoordsMobile : this.objectCoordsDesktop;
    const coordsArray = Object.values(coords);
    
    this.objects.forEach((obj, index) => {
      if (index < coordsArray.length) {
        const coord = coordsArray[index];
        // No restamos nada porque el CSS ya hace transform: translate(-20px, -20px)
        obj.displayX = coord.x * this.sceneWidth;
        obj.displayY = coord.y * this.sceneHeight;
      }
    });
    
    this.cdr.detectChanges();
  }

  checkScreenSize(): void {
    this.isMobile = window.innerWidth <= 768;
  }

  loadObjects(): void {
    if (this.isMobile) {
      this.objects = [
        { id: 1, x: 0.20, y: 0.20, displayX: 0, displayY: 0, collected: false, icon: '⭐' },
        { id: 2, x: 0.50, y: 0.35, displayX: 0, displayY: 0, collected: false, icon: '💎' },
        { id: 3, x: 0.35, y: 0.75, displayX: 0, displayY: 0, collected: false, icon: '🏆' },
        { id: 4, x: 0.55, y: 0.60, displayX: 0, displayY: 0, collected: false, icon: '🎯' },
        { id: 5, x: 0.30, y: 0.80, displayX: 0, displayY: 0, collected: false, icon: '👑' }
      ];
    } else {
      this.objects = [
        { id: 1, x: 0.15, y: 0.18, displayX: 0, displayY: 0, collected: false, icon: '⭐' },
        { id: 2, x: 0.40, y: 0.27, displayX: 0, displayY: 0, collected: false, icon: '💎' },
        { id: 3, x: 0.60, y: 0.45, displayX: 0, displayY: 0, collected: false, icon: '🏆' },
        { id: 4, x: 0.30, y: 0.53, displayX: 0, displayY: 0, collected: false, icon: '🎯' },
        { id: 5, x: 0.50, y: 0.14, displayX: 0, displayY: 0, collected: false, icon: '👑' }
      ];
    }
    this.repositionObjects();
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
    this.charX = this.isMobile ? 50 : 100;
    this.charY = this.isMobile ? 300 : 200;

    // Reset objects
    this.loadObjects();
    this.objects.forEach(obj => obj.collected = false);
    this.repositionObjects();

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

    // El personaje es 72x72px, centrarlo en el clic
    this.charX = event.clientX - rect.left;
    this.charY = event.clientY - rect.top;

    setTimeout(() => this.checkCollisions(), 100);
  }

  checkCollisions() {
    this.objects.forEach(obj => {
      if (obj.collected) return;

      const distance = Math.hypot(
        this.charX - obj.displayX,
        this.charY - obj.displayY
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
    this.winSound.pause();
    this.winSound.currentTime = 0;
    this.loseSound.pause();
    this.loseSound.currentTime = 0;
    this.startGame();
  }
}
