import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components
import { SigninComponent } from './components/user/signin/signin.component';
import { SignupComponent } from './components/user/signup/signup.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AboutComponent } from './components/shared/about/about.component';



const routes: Routes = [

  {path: 'user/signin', component: SigninComponent},
  {path: 'user/signup', component: SignupComponent},
  {path: '', component: AboutComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

