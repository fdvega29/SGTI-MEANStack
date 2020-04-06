import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components
import { SigninComponent } from './components/user/auth/signin/signin.component';
import { SignupComponent } from './components/user/auth/signup/signup.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HomeComponent } from './components/core/home/home.component';
import {AuthGuard} from './components/core/guards/guards';

const routes: Routes = [

  {path: '',
   redirectTo: '/home',
   pathMatch: 'full'},

  {path: 'user/signin', component: SigninComponent},
  {path: 'user/signup', component: SignupComponent},
  {path: 'home', component: HomeComponent},
  {path: 'dashboard/principal', component: DashboardComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

