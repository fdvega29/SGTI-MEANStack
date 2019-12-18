//Dependencias
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { NgxPopper } from 'angular-popper';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms'
//component
import { SigninComponent } from './components/user/signin/signin.component';
import { SignupComponent } from './components/user/signup/signup.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { SidebarComponent } from './components/shared/sidebar/sidebar.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { CoreModule } from './components/core/core.module';
import { CoreRoutingModule } from './components/core/core-routing.module';
import { HomeComponent } from './components/core/home/home.component';
import { AboutComponent } from './components/shared/about/about.component';
//Services
import { UserServiceService } from './components/user/userService/users.service';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SidebarComponent,
    DashboardComponent,
    FooterComponent,
    SigninComponent,
    SignupComponent,
    HomeComponent,
    AboutComponent
  ],
  imports: [
    BrowserModule,
    NgxPopper,
    CommonModule,
    AppRoutingModule,
    CoreModule,
    CoreRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [UserServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
