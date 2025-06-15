import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-main-wrapper',
  imports: [
    NavbarComponent,
    RouterModule
  ],
  templateUrl: './main-wrapper.component.html',
  styleUrl: './main-wrapper.component.scss'
})
export class MainWrapperComponent {

}
