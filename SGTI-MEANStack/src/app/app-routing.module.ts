import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components
import { SigninComponent } from './components/user/signin/signin.component';
import { SignupComponent } from './components/user/signup/signup.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AboutComponent } from './components/shared/about/about.component';
import { HomeComponent } from './components/core/home/home.component';



const routes: Routes = [
  
  {path: '', 
   redirectTo: '/home', 
   pathMatch: 'full'},

  {path: 'home/user/signin', component: SigninComponent},
  {path: 'home/user/signup', component: SignupComponent},
  {path: 'home', component: HomeComponent},
  {path: 'dashboard/principal', component: DashboardComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

