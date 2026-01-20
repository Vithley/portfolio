import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModalComponent } from '../../../shared/modal/modal.component';

type Step = 'name' | 'email' | 'message' | 'done';

@Component({
  selector: 'app-contact-terminal',
  standalone: true,
  imports: [CommonModule, FormsModule, ModalComponent],
  templateUrl: './contact-terminal.component.html',
  styleUrl: './contact-terminal.component.scss'
})
export class ContactTerminalComponent {

  step: Step = 'name';
  modalMessage: string | null = null;

  showModal(msg: string) {
    this.modalMessage = msg;
  }

  closeModal() {
    this.modalMessage = null;
  }

  data = {
    name: '',
    email: '',
    message: ''
  };

 next() {

  // NAME
  if (this.step === 'name') {
    if (!this.data.name.trim()) {
      this.showModal('🧙‍♂️ El terminal necesita saber tu nombre, viajero.');
      return;
    }
    this.step = 'email';
    return;
  }

  // EMAIL
  if (this.step === 'email') {
    const email = this.data.email.trim();

    if (!email) {
      this.showModal('📧 Email vacío detectado. Sin spam, lo prometo 😉');
      return;
    }

    if (!email.includes('@')) {
      this.showModal('🚨 Formato de email incorrecto. Este terminal es viejo, pero no tonto.');
      return;
    }

    this.step = 'message';
    return;
  }

  // MESSAGE
  if (this.step === 'message') {
    const msg = this.data.message.toLowerCase().trim();

    if (!msg) {
      this.showModal('🤖 Mensaje vacío. El silencio también comunica… pero no aquí.');
      return;
    }

    if (msg.includes('hola')) {
      this.showModal('👋 Educación detectada. Buen comienzo.');
    }

    if (msg.includes('bye')) {
      this.showModal('👋 Hasta pronto baby.');
    }

    if (msg.includes('angular')) {
      this.showModal('🅰️ Angular detectado. Tenemos buen gusto.');
    }

    if (msg.includes('pizza')) {
      this.showModal('🍕 Pizza detectada. Confianza automática concedida.');
    }

    if (msg.includes('console.log')) {
      this.showModal('👩‍💻 Modo desarrollador activado. Nos entendemos.');
    }

    this.step = 'done';
  }
}



}
