import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { NgxPopper } from 'angular-popper';
import { RouterModule, Routes } from '@angular/router';
//Components
import { SigninComponent } from './components/user/signin/signin.component';
import { SignupComponent } from './components/user/signup/signup.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { SidebarComponent } from './components/shared/sidebar/sidebar.component';
import { FooterComponent } from './components/shared/footer/footer.component';




const appRoutes :Routes = [

  {
    path: 'signin',
    component: SigninComponent
  },

  {
    path: 'signup',
    component: SignupComponent
  },

  {
    path: 'dashboard',
    component: DashboardComponent
  }


];


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SidebarComponent,
    DashboardComponent,
    FooterComponent,
    SigninComponent,
    SignupComponent,
   
   

  ],
  imports: [
    [RouterModule.forRoot(appRoutes)],
    BrowserModule,
    NgxPopper
  ],
  exports: [RouterModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
