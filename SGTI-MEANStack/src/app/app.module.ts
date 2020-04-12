//Dependencias
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { NgxPopper } from 'angular-popper';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

//Modulos
import { DashboardModule } from './components/dashboard/dashboard.module';
import { AdminPanelModule } from './components/admin-panel/admin-panel.module';

//component
import { SigninComponent } from './components/user/auth/signin/signin.component';
import { SignupComponent } from './components/user/auth/signup/signup.component';
import { CoreModule } from './components/core/core.module';
import { CoreRoutingModule } from './components/core/core-routing.module';
import { HomeComponent } from './components/core/home/home.component';
//Services
import { UserServiceService } from './components/user/service/user.service';
import { AuthGuard} from './components/core/guards/guards';
import {SharedModule} from "./components/shared";

@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    SignupComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    NgxPopper,
    CommonModule,
    AppRoutingModule,
    DashboardModule,
    AdminPanelModule,
    SharedModule,
    CoreModule,
    CoreRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [UserServiceService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
