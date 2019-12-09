import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SigninComponent } from 'src/app/components/user/signin/signin.component';
import { SignupComponent } from 'src/app/components/user/signup/signup.component';
import { DashboardComponent } from 'src/app//components/dashboard/dashboard.component';
import { HomeComponent } from 'src/app/components/core/home/home.component';


const routes: Routes = [  {path: 'user/signin', component: SigninComponent},
{path: 'user/signup', component: SignupComponent},
{path: '', component: HomeComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoreRoutingModule { }
