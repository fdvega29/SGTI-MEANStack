import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components
import { SigninComponent } from './components/user/signin/signin.component';
import { SignupComponent } from './components/user/signup/signup.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

const routes: Routes = [

  {path: 'signin', component: SigninComponent},
  {path: 'signup', component: SignupComponent},
  {path: '', component: DashboardComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
