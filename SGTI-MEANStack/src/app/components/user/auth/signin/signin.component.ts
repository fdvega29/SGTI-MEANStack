import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
//Service
import { UserServiceService } from '../../service/user.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  signinFormUser: FormGroup;

  createFormGroupUser() {
    return new FormGroup({
      email: new FormControl(''),
      password: new FormControl('')
    });
  }

  constructor(private usersService: UserServiceService, private router: Router) { 
    this.signinFormUser = this.createFormGroupUser();
  }

  ngOnInit() {
  }

  onSignin(FormGroup): void{
    //console.log(this.signupFormUser.value);
    this.usersService.signin(FormGroup.value)
    .subscribe(
      res =>{
      this.router.navigate(['/dashboard/principal']);
    },
    err => console.log(err)
    )
  }

}
