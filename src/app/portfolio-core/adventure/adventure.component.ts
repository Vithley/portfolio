import { CommonModule } from '@angular/common';
import { Component, OnDestroy, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import * as AOS from 'aos';

@Component({
  selector: 'app-adventure',
  imports: [CommonModule],
  templateUrl: './adventure.component.html',
  styleUrl: './adventure.component.scss'
})
export class AdventureComponent implements OnDestroy {
  hoverAbout = false;
  dialogText = '';
  backgroundMusic!: HTMLAudioElement;
  clickSound!: HTMLAudioElement;
  hoverContact = false;
  hoverCv = false;
  hoverDemo = false;
  hoverCode = false;
  isMobile = false;

  constructor(private router: Router) {}

  @HostListener('window:resize', [])
  onResize() {
    this.checkScreenSize();
  }

  checkScreenSize(): void {
    this.isMobile = window.innerWidth <= 768;
    console.log('isMobile:', this.isMobile, 'width:', window.innerWidth);
  }

  get backgroundStyle() {
    const imageUrl = this.isMobile ? 'assets/images/room2.png' : 'assets/images/room.png';
    console.log('Background URL:', imageUrl);
    return {
      'background-image': `url(${imageUrl})`,
      'background-size': 'cover',
      'background-position': 'center',
      'background-repeat': 'no-repeat'
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
    }, 2500);
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
    }, 2000);
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
    }, 2000)
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
    }, 2000)  
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
    }, 2000)
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
    }, 2000)
  } 




  ngOnDestroy(): void {
    if (this.backgroundMusic) {
      this.backgroundMusic.pause();
      this.backgroundMusic.currentTime = 0;
    }
  }
}
