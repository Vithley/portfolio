import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

type Step = 'name' | 'email' | 'message' | 'done';

@Component({
  selector: 'app-contact-terminal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact-terminal.component.html',
  styleUrl: './contact-terminal.component.scss'
})
export class ContactTerminalComponent {

  step: Step = 'name';

  data = {
    name: '',
    email: '',
    message: ''
  };

  next() {

    if (this.step === 'name') {
      if (!this.data.name.trim()) {
        alert('🧙‍♂️ El terminal necesita saber tu nombre, viajero.');
        return;
      }
      this.step = 'email';
      return;
    }


    if (this.step === 'email') {
      const email = this.data.email.trim();

      if (!email) {
        alert('📧 Email vacío detectado. Sin spam, lo prometo 😉');
        return;
      }

      if (!email.includes('@')) {
        alert('🚨 Formato de email incorrecto. Este terminal es viejo, pero no tonto.');
        return;
      }

      this.step = 'message';
      return;
    }


    if (this.step === 'message') {
      const msg = this.data.message.toLowerCase().trim();

      if (!msg) {
        alert('🤖 Mensaje vacío. El silencio también comunica… pero no aquí.');
        return;
      }

      if (msg.includes('hola')) {
        alert('👋 Educación detectada. Buen comienzo.');
      }

      if (msg.includes('angular')) {
        alert('🅰️ Angular detectado. Tenemos buen gusto.');
      }

      if (msg.includes('pizza')) {
        alert('🍕 Pizza detectada. Confianza automática concedida.');
      }

      if (msg.includes('console.log')) {
        alert('👩‍💻 Modo desarrollador activado. Nos entendemos.');
      }

      this.step = 'done';
    }
  }


}
