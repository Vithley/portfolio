import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './main/navbar/navbar.component';
import { SidebarComponent } from './main/sidebar/sidebar.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MainWrapperComponent } from './main/main-wrapper/main-wrapper.component';



@NgModule({
  declarations: [
   
  ],
  imports: [
    CommonModule,
    MainWrapperComponent,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    NgModule,
    SidebarComponent,
  ],
  exports: [],
})
export class PortfolioCoreModule {
  static forRoot(arg0: { appName: string; appCopyrightHolder: string; }): any[] | import("@angular/core").Type<any> | import("@angular/core").ModuleWithProviders<{}> {
    throw new Error('Method not implemented.');
  }
}
