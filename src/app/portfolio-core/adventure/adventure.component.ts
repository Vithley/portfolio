import { CommonModule } from '@angular/common';
import { Component, OnDestroy, HostListener, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import * as AOS from 'aos';

@Component({
  selector: 'app-adventure',
  imports: [CommonModule],
  templateUrl: './adventure.component.html',
  styleUrl: './adventure.component.scss'
})
export class AdventureComponent implements OnDestroy, AfterViewInit {
  hoverAbout = false;
  dialogText = '';
  backgroundMusic!: HTMLAudioElement;
  clickSound!: HTMLAudioElement;
  catSound!: HTMLAudioElement;
  indianaJonesSound!: HTMLAudioElement;
  hoverContact = false;
  hoverCv = false;
  hoverDemo = false;
  hoverCode = false;
  hoverCat = false;
  hoverAdventure = false;
  isMobile = false;
  
  // Coordenadas relativas a la imagen (0-1)
  private hotspotCoords = {
    contact: { x: 0.36, y: 0.48, w: 0.10, h: 0.05 },
    about: { x: 0.742, y: 0.200, w: 0.18, h: 0.06 },
    cv: { x: 0.80, y: 0.30, w: 0.14, h: 0.045 },
    demo: { x: 0.82, y: 0.40, w: 0.16, h: 0.10 },
    code: { x: 0.04, y: 0.46, w: 0.11, h: 0.10 },
    cat: { x: 0.48, y: 0.48, w: 0.07, h: 0.05 },
    adventure: { x: 0.13, y: 0.08, w: 0.28, h: 0.11 },
  };
  
  // Coordenadas para móvil (si son diferentes)
  private hotspotCoordsMobile = {
    contact: { x: 0.28, y: 0.45, w: 0.20, h: 0.08 },
    about: { x: 0.655, y: 0.150, w: 0.30, h: 0.07 },
    cv: { x: 0.80, y: 0.26, w: 0.20, h: 0.045 },
    demo: { x: 0.82, y: 0.36, w: 0.20, h: 0.10 },
    code: { x: 0.02, y: 0.53, w: 0.21, h: 0.11 },
    cat: { x: 0.58, y: 0.49, w: 0.13, h: 0.05 },
    adventure: { x: 0.05, y: 0.08, w: 0.42, h: 0.11 },
  };

  constructor(private router: Router) {}

  @HostListener('window:resize', [])
  onResize() {
    this.checkScreenSize();
    this.repositionHotspots();
  }

  @HostListener('window:orientationchange', [])
  onOrientationChange() {
    setTimeout(() => this.repositionHotspots(), 300);
  }

  checkScreenSize(): void {
    const width = window.innerWidth;
    this.isMobile = width <= 768;
  }

  ngAfterViewInit(): void {
    // Esperar a que la imagen de fondo cargue antes de posicionar
    setTimeout(() => this.repositionHotspots(), 500);
  }

  private repositionHotspots(): void {
    const scene = document.querySelector('.adventure-scene') as HTMLElement;
    if (!scene) return;

    const imageUrl = this.isMobile ? 'assets/images/room2.png' : 'assets/images/room.png';
    const img = new Image();
    img.src = imageUrl;

    img.onload = () => {
      const sceneRect = scene.getBoundingClientRect();
      const imgRatio = img.width / img.height;
      const sceneRatio = sceneRect.width / sceneRect.height;

      let visibleWidth: number, visibleHeight: number, offsetX = 0, offsetY = 0;

      // Calcular dimensiones visibles según background-size: contain o cover
      const bgSize = this.isMobile ? 'contain' : 'cover';
      
      if (bgSize === 'contain') {
        if (sceneRatio > imgRatio) {
          visibleHeight = sceneRect.height;
          visibleWidth = visibleHeight * imgRatio;
          offsetX = (sceneRect.width - visibleWidth) / 2;
        } else {
          visibleWidth = sceneRect.width;
          visibleHeight = visibleWidth / imgRatio;
          offsetY = (sceneRect.height - visibleHeight) / 2;
        }
      } else {
        // cover
        if (sceneRatio > imgRatio) {
          visibleWidth = sceneRect.width;
          visibleHeight = visibleWidth / imgRatio;
          offsetY = (sceneRect.height - visibleHeight) / 2;
        } else {
          visibleHeight = sceneRect.height;
          visibleWidth = visibleHeight * imgRatio;
          offsetX = (sceneRect.width - visibleWidth) / 2;
        }
      }

      // Usar coordenadas apropiadas según el dispositivo
      const coords = this.isMobile ? this.hotspotCoordsMobile : this.hotspotCoords;

      // Posicionar cada hotspot
      this.positionHotspot('.hotspot-contact', coords.contact, visibleWidth, visibleHeight, offsetX, offsetY);
      this.positionHotspot('.hotspot-about', coords.about, visibleWidth, visibleHeight, offsetX, offsetY);
      this.positionHotspot('.hotspot-cv', coords.cv, visibleWidth, visibleHeight, offsetX, offsetY);
      this.positionHotspot('.hotspot-demo', coords.demo, visibleWidth, visibleHeight, offsetX, offsetY);
      this.positionHotspot('.hotspot-code', coords.code, visibleWidth, visibleHeight, offsetX, offsetY);
      this.positionHotspot('.hotspot-cat', coords.cat, visibleWidth, visibleHeight, offsetX, offsetY);
      this.positionHotspot('.hotspot-adventure', coords.adventure, visibleWidth, visibleHeight, offsetX, offsetY);

    };

    // Si la imagen ya está cacheada, forzar onload
    if (img.complete) img.onload!(new Event('load'));
  }

  private positionHotspot(
    selector: string,
    coords: { x: number; y: number; w: number; h: number },
    imgW: number,
    imgH: number,
    offsetX: number,
    offsetY: number
  ): void {
    const hotspot = document.querySelector(selector) as HTMLElement;
    if (hotspot) {
      hotspot.style.left = `${offsetX + coords.x * imgW}px`;
      hotspot.style.top = `${offsetY + coords.y * imgH}px`;
      hotspot.style.width = `${coords.w * imgW}px`;
      hotspot.style.height = `${coords.h * imgH}px`;
    }
  }

  get backgroundStyle() {
    const imageUrl = this.isMobile ? 'assets/images/room2.png' : 'assets/images/room.png';
    const bgSize = this.isMobile ? 'contain' : 'cover';
    return {
      'background-image': `url(${imageUrl})`,
      'background-size': bgSize,
      'background-position': 'center',
      'background-repeat': 'no-repeat',
      'background-color': this.isMobile ? '#000' : 'transparent'
    };
  }

  ngOnInit(): void {
    this.checkScreenSize();
    
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
    
    this.catSound = new Audio('assets/sound/cat-sound.mp3');
    this.catSound.volume = 0.7;
    
    this.indianaJonesSound = new Audio('assets/sound/indiana-jones-theme.mp3');
    this.indianaJonesSound.volume = 0.6;
    
    // Debug: Agregar clase para visualización temporal
    if (typeof window !== 'undefined' && window.location.search.includes('debug')) {
      document.body.classList.add('hotspot-debug');
    }
  }

  openProject(projectId: string) {
    this.clickSound.currentTime = 0;
    this.clickSound.play().catch(err => {
      console.warn('No se pudo reproducir el sonido de clic:', err);
    });

    let hotspot: HTMLElement | null = null;
    if (projectId === 'terminal') hotspot = document.querySelector('.hotspot-computer');
    else if (projectId === 'tentaculo') hotspot = document.querySelector('.mutant-hotspot');

    if (hotspot) {
      const glow = hotspot.querySelector('.glow-overlay');
      glow?.classList.add('clicked');

      // quitar la clase clicked después de la animación
      setTimeout(() => glow?.classList.remove('clicked'), 500);
    }

    // Cambiamos el texto del narrador dependiendo del hotspot
    if (projectId === 'terminal') {
      this.dialogText = '💬 [Narrador]: La consola brilla… ¿qué secretos tendrá Angular?';
    } else if (projectId === 'tentaculo') {
      this.dialogText = '🧪 [Narrador]: Un proyecto mutante se activa… ¡cuidado con el experimento!';
    }

    // Redirigir o cambiar sección tras un delay para simular exploración
    setTimeout(() => {
      this.dialogText = '';
      if (projectId === 'terminal') this.router.navigate(['/contact']); // terminal → contacto
      else if (projectId === 'tentaculo') this.router.navigate(['/projects/tentaculo']); // mutante → proyecto
    }, 5000);
  }

  goToContact() {
    // reproducir sonido de clic
    this.clickSound.currentTime = 0;
    this.clickSound.play();

    // animación glow
    const hotspot = document.querySelector('.hotspot-contact .glow-overlay');
    hotspot?.classList.add('clicked');
    setTimeout(() => hotspot?.classList.remove('clicked'), 500);

    // mensaje narrador tipo aventura gráfica
    this.dialogText = '💬 [Narrador]: Te acercas al ordenador… ¡es hora de enviar un mensaje!';

    // después de delay, navega a la sección de contacto
    setTimeout(() => {
      this.dialogText = '';
      this.router.navigate(['/contact']);
    }, 5000);
  }

  goToAbout() {
    // reproducir sonido de clic
    this.clickSound.currentTime = 0;
    this.clickSound.play();
    // animación glow
    const hotspot = document.querySelector('.hotspot-about .glow-overlay');
    hotspot?.classList.add('clicked');
    setTimeout(() => hotspot?.classList.remove('clicked'), 500);
    // mensaje narrador tipo aventura gráfica
    this.dialogText = '💬 [Narrador]: Una figura misteriosa aparece… ¡es hora de descubrir más!'
    // después de delay, navega a la sección de about
    setTimeout(() => {
      this.dialogText = '';
      this.router.navigate(['/about']);
    }, 5000)
  }

  goToCv() {
    // reproducir sonido de clic
    this.clickSound.currentTime = 0;
    this.clickSound.play();
    // animación glow
    const hotspot = document.querySelector('.hotspot-cv .glow-overlay');
    hotspot?.classList.add('clicked');
    setTimeout(() => hotspot?.classList.remove('clicked'), 500);
    // mensaje narrador tipo aventura gráfica
    this.dialogText = '💬 [Narrador]: Encuentras un pergamino antiguo… ¡es hora de revisar tu experiencia!'
    // después de delay, navega a la sección de cv
    setTimeout(() => {
      this.dialogText = '';
      this.router.navigate(['/cv']);
    }, 5000)  
  }

  goToDemo() {
    // reproducir sonido de clic
    this.clickSound.currentTime = 0;
    this.clickSound.play();
    // animación glow
    const hotspot = document.querySelector('.hotspot-demo .glow-overlay');
    hotspot?.classList.add('clicked');
    setTimeout(() => hotspot?.classList.remove('clicked'), 500);
    // mensaje narrador tipo aventura gráfica
    this.dialogText = '💬 [Narrador]: Un portal brillante aparece… ¡es hora de probar el demo!'
    // después de delay, navega a la sección de demo
    setTimeout(() => {
      this.dialogText = '';
      this.router.navigate(['/demo']);
    }, 5000)
  } 

  goToCode() {
    this.clickSound.currentTime = 0;
    this.clickSound.play();

    const hotspot = document.querySelector('.hotspot-code .glow-overlay');
    hotspot?.classList.add('clicked');
    setTimeout(() => hotspot?.classList.remove('clicked'), 500);
    this.dialogText = '💬 [Narrador]: Descubres un cofre del tesoro… ¡es hora de ver el código fuente!'
    setTimeout(() => {
      this.dialogText = '';
       window.open('https://github.com/Vithley', '_blank');
    }, 5000)
  }

  goToCat() {
    // reproducir sonido del gato
    this.catSound.currentTime = 0;
    this.catSound.play();

    // animación glow
    const hotspot = document.querySelector('.hotspot-cat .glow-overlay');
    hotspot?.classList.add('clicked');
    setTimeout(() => hotspot?.classList.remove('clicked'), 500);

    // mensaje narrador tipo aventura gráfica
    this.dialogText = '🐱 [Narrador]: Me pareció ver un lindo gatito por aquí...';


    // después de delay, limpia el mensaje
    setTimeout(() => {
      this.dialogText = '';
    }, 5000);
  }

  goToAdventure() {
    if (this.backgroundMusic) {
      this.backgroundMusic.pause();
    }
    
    // Intentar reproducir el sonido de Indiana Jones
    this.indianaJonesSound.currentTime = 0;
    const playPromise = this.indianaJonesSound.play();
    
    if (playPromise !== undefined) {
      playPromise.catch((error) => {
        console.error('Error al reproducir música de Indiana Jones:', error);
      });
    }

    // animación glow
    const hotspot = document.querySelector('.hotspot-adventure .glow-overlay');
    hotspot?.classList.add('clicked');
    setTimeout(() => hotspot?.classList.remove('clicked'), 500);

    // mensaje narrador tipo aventura gráfica
    this.dialogText = '🏆 [Narrador]: ¡El trofeo de las aventuras épicas! ¡Que suene la música!';

    // después de delay, reanudar música de fondo
    setTimeout(() => {
      this.dialogText = '';
      if (this.backgroundMusic) {
        this.backgroundMusic.play().catch((error) => {
          console.warn('Error al reanudar música de fondo:', error);
        });
      }
    }, 8000); // 8 segundos para que suene un poco la música
  } 




  ngOnDestroy(): void {
    if (this.backgroundMusic) {
      this.backgroundMusic.pause();
      this.backgroundMusic.currentTime = 0;
    }
  }
}
