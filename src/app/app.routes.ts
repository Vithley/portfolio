import { Routes } from '@angular/router';

import { HomeComponent } from './portfolio-core/home/home.component';
import { MainWrapperComponent } from './portfolio-core/main/main-wrapper/main-wrapper.component';
import { AdventureComponent } from './portfolio-core/adventure/adventure.component';



export const routes: Routes = [
  {
    path: '',
    component: MainWrapperComponent,
    children: [
      {
        path: '',
        component: HomeComponent 
      },
      {
        path: 'aventura',
        component: AdventureComponent 
      },
    ],
  }
];

