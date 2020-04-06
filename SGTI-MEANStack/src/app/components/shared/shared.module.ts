import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from "./sidebar/sidebar.component";
import { FooterComponent } from "./footer/footer.component";
import { AboutComponent } from './about/about.component';
import { PipesModule } from '../pipes/pipes/pipes.module';

@NgModule({
    imports: [
        RouterModule,
        PipesModule    
    ],
    declarations: [
        NavbarComponent,
        SidebarComponent,
        FooterComponent,
        AboutComponent
    ],
    exports: [
        NavbarComponent,
        SidebarComponent,
        FooterComponent
    ]
})

export class SharedModule{}