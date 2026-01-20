import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactTerminalComponent } from './contact-terminal/contact-terminal.component';
import { Router } from '@angular/router';

type PuzzleState = {
  terminalActivated: boolean;
  emailFound: boolean;
  phoneFound: boolean;
};

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ContactTerminalComponent],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {

  message = 'Exploras la sala... parece haber varios objetos interesantes.';
  linkedinUrl = 'https://www.linkedin.com/in/carolina-millán-artola-b6602196/';
  emailAddress = 'cmillan182@gmail.com';



  puzzleState: PuzzleState = {
    terminalActivated: false,
    emailFound: false,
    phoneFound: false
  };

  showForm = false;

  constructor( private router: Router) { }

  interact(object: 'terminal' | 'email' | 'phone') {
    console.log('Click en:', object); // 👈 DEBUG

    switch (object) {
     case 'email':
    this.puzzleState.emailFound = true;
    this.message = 'Abres el sobre… contiene una dirección y una invitación a escribir.';
    const subject = 'Contacto desde tu portfolio';
    const body = 'Hola Carolina,\n\nHe visto tu portfolio y me gustaría contactar contigo.\n\n';
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${this.emailAddress}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(gmailUrl, '_blank');
    break;



      case 'phone':
      this.puzzleState.phoneFound = true;
      this.message = 'Descuelgas el teléfono… alguien responde al otro lado.';
      window.open(this.linkedinUrl, '_blank');
      break;


      case 'terminal':
      this.puzzleState.terminalActivated = true;
      this.showForm = true;
      this.message = 'El terminal se activa. Puedes enviar un mensaje.';
      break;

    }
  }

  goBack() {
    this.router.navigate(['/aventura']);
  }

}
