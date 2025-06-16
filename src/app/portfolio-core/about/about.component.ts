import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-about',
  imports: [],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent implements OnInit {
  dialogText = '';
  fullText = '> ¡Hola! Soy Carolina, tu NPC guía retro. Pregunta lo que quieras, sin pulsar F1 😉';
  index = 0;
  isCheatActivated = false;

  constructor(private modalService: NgbModal) {}

  ngOnInit(): void {
    this.typeNextCharacter();
  }

  typeNextCharacter(): void {
    if (this.index < this.fullText.length) {
      this.dialogText += this.fullText.charAt(this.index);
      this.index++;
      setTimeout(() => this.typeNextCharacter(), 40);
    }
  }

  openCuriosidadesModal(content: any): void {
    this.modalService.open(content, {
      centered: true,
      size: 'lg'
    });
  }

  activateCheat(): void {
    this.isCheatActivated = true;
    this.dialogText = '🎉 Cheat code activado: Vida infinita en modo desarrolladora. 😉';
  }
}