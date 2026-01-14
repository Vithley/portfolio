import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-about',
  imports: [CommonModule, FormsModule], 
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent implements OnInit {
  dialogText = '';
  fullText = '> ¡Hola! Soy Carolina, tu NPC guía retro. Pregunta lo que quieras, sin pulsar F1 😉';
  index = 0;
  userInput = '';
  consoleOutput = '';
  isCheatActivated = false;
  cheatPhrases = [
    "🔧 Debug mode iniciado...",
    "💾 Guardando progreso ficticio...",
    "🧪 Inyectando creatividad al sistema...",
    "👀 Carolina te observa desde producción.",
    "🛠️ Refactorizando tus pensamientos...",
    "🎨 Cargando píxeles con cariño...",
    "🧵 Compilando hilos de nostalgia...",
    "👾 Invocando sprites del pasado...",
    "📟 Conectando al servidor de aventuras...",
    "⚡ Cargando barra de energía creativa...",
    "📀 Accediendo al disco flexible virtual...",
    "🌌 Desplegando sueños en ASCII...",
    "🧠 Buffer de ideas listo para sobrecargarse...",
    "🐛 Error 404: límites no encontrados.",
    "🔋 Energía cargada al 1337%",
    "💬 Comando aceptado. Iniciando tonterías retro...",
    "🖥️ Procesador mental en overclocking.",
    "⌨️ Simulando pulsaciones con estilo.",
    "🗺️ Buscando secretos ocultos en el código...",
    "🌈 Aplicando filtro nostálgico a tu comando..."
  ];


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

  activateCheat() {
    this.isCheatActivated = !this.isCheatActivated;

    // Establecer el texto a mostrar
    this.fullText = this.isCheatActivated
      ? '🎮 Cheat code activado: Vida infinita en modo desarrolladora. 😉'
      : this.cheatPhrases[Math.floor(Math.random() * this.cheatPhrases.length)];

    // Reiniciar la animación tipo typing
    this.dialogText = '';
    this.index = 0;
    this.typeNextCharacter();
  }

  handleCommand(): void {
    if (this.userInput.trim()) {
      // Mostrar frase aleatoria
      const randomPhrase = this.cheatPhrases[Math.floor(Math.random() * this.cheatPhrases.length)];
      this.consoleOutput = `> ${this.userInput}\n${randomPhrase}`;
      this.userInput = '';
    }
  }

}