import { Routes } from '@angular/router';

import { HomeComponent } from './portfolio-core/home/home.component';
import { MainWrapperComponent } from './portfolio-core/main/main-wrapper/main-wrapper.component';
import { AdventureComponent } from './portfolio-core/adventure/adventure.component';
import { ModoCvComponent } from './portfolio-core/modo-cv/modo-cv.component';
import { AboutComponent } from './portfolio-core/about/about.component';
import { ContactComponent } from './portfolio-core/contact/contact.component';
import { DemoGameComponent } from './portfolio-core/demo-game/demo-game.component';



export const routes: Routes = [

  // 🟢 HOME SIN NAVBAR
  {
    path: '',
    component: HomeComponent
  },

  // 🟢 RESTO DE LA APP CON NAVBAR
  {
    path: '',
    component: MainWrapperComponent,
    children: [
      {
        path: 'aventura',
        component: AdventureComponent
      },
      {
        path: 'cv',
        component: ModoCvComponent
      },
      {
        path: 'about',
        component: AboutComponent
      },
      {
        path: 'contact',
        component: ContactComponent
      },
       {
        path: 'demo',
        component: DemoGameComponent
      }
    ]
  }
];

