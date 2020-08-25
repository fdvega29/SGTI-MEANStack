import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//Components
import { AdminPanelComponent } from './admin-panel.component';

//Modulos
import { SharedModule } from '../shared/shared.module';

//Rutas
import { AdminPanel_ROUTES } from './admin-panel.routes';

@NgModule({
  declarations: [
  	AdminPanelComponent,

  ],
  imports: [
    CommonModule,
    SharedModule,
    AdminPanel_ROUTES
  ]
})
export class AdminPanelModule { }
