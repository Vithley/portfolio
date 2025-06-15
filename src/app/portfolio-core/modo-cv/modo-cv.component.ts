import { Component } from '@angular/core';
import * as AOS from 'aos';

@Component({
  selector: 'app-modo-cv',
  imports: [],
  templateUrl: './modo-cv.component.html',
  styleUrl: './modo-cv.component.scss'
})
export class ModoCvComponent {
  typedText = '';
  fullText = '> Desarrolladora frontend con alma de pixel-artista y amante de las aventuras gráficas retro.';
  index = 0;

  ngOnInit(): void {
    AOS.init({ once: true, duration: 1000, easing: 'ease-out-cubic' });
    setTimeout(() => AOS.refresh(), 100);

    this.typeNextCharacter();
  }

  typeNextCharacter() {
    if (this.index < this.fullText.length) {
      this.typedText += this.fullText.charAt(this.index);
      this.index++;
      setTimeout(() => this.typeNextCharacter(), 35);
    }
  }
}
