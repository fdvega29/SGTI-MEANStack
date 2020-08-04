import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from "./sidebar/sidebar.component";
import { FooterComponent } from "./footer/footer.component";
import { AboutComponent } from './about/about.component';
import { PipesModule } from '../pipes/pipes/pipes.module';

//Servicios
import { AutenticacionService } from '../services/autenticacion.service';
import {SidebarService} from "./sidebar/sidebar.service";
import {CommonModule} from "@angular/common";
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';

@NgModule({
    imports: [
        RouterModule,
        PipesModule,
        CommonModule
    ],
    declarations: [
        NavbarComponent,
        SidebarComponent,
        FooterComponent,
        AboutComponent,
        BreadcrumbsComponent
    ],
    exports: [
        NavbarComponent,
        SidebarComponent,
        FooterComponent,
        BreadcrumbsComponent
    ],
  providers: [AutenticacionService,SidebarService]
})

export class SharedModule{}
