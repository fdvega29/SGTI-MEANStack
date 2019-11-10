import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { SidebarComponent } from './components/shared/sidebar/sidebar.component';
import { NgxPopper } from 'angular-popper';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { WrapperComponent } from './components/wrapper/wrapper.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { SigninComponent } from './components/user/signin/signin.component';
import { SignupComponent } from './components/user/signup/signup.component';




@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SidebarComponent,
    DashboardComponent,
    WrapperComponent,
    FooterComponent,
    SigninComponent,
    SignupComponent,
   
   

  ],
  imports: [
    BrowserModule,
    NgxPopper
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
