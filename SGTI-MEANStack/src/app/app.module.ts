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
//component
import { SigninComponent } from './components/user/auth/signin/signin.component';
import { SignupComponent } from './components/user/auth/signup/signup.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { SidebarComponent } from './components/shared/sidebar/sidebar.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { CoreModule } from './components/core/core.module';
import { CoreRoutingModule } from './components/core/core-routing.module';
import { HomeComponent } from './components/core/home/home.component';
import { AboutComponent } from './components/shared/about/about.component';
import { PerfilComponent } from './components/dashboard/perfil/perfil.component';
import { EditarPerfilComponent } from './components/dashboard/editar-perfil/editar-perfil.component';
//Services
import { UserServiceService } from './components/user/service/user.service';
import { AuthGuard} from './components/core/guards/guards';
import { CambiarPasswordComponent } from './components/dashboard/cambiar-password/cambiar-password.component';

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
    AboutComponent,
    PerfilComponent,
    EditarPerfilComponent,
    CambiarPasswordComponent,
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
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [UserServiceService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
