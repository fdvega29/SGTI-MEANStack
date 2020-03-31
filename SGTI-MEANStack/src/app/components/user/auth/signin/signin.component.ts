import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
//Service
import { UserServiceService } from '../../service/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  signinFormUser: FormGroup;

  recuerdame: boolean = false;
  email: string;

  createFormGroupUser() {
    return new FormGroup({
      email: new FormControl('', Validators.email),
      password: new FormControl('', Validators.required),
      recuerdame: new FormControl('')
    });
  }

  constructor(private usersService: UserServiceService, private router: Router, private toastr: ToastrService) { 
    this.signinFormUser = this.createFormGroupUser();
  }

  ngOnInit() {

    this.email = localStorage.getItem("EMAIL") || '';
    if ( this.email.length > 1 ) {
      this.recuerdame = true;
    }

  };

  onSignin(FormGroup): void{
    console.log(this.signinFormUser.value);
    this.usersService.signin(FormGroup.value)
    .subscribe(
      res =>{
      this.router.navigate(['/dashboard/principal']);
    },
    err => console.log(err)
    )
  }

showToatr(){
    this.toastr.success('¡Bien hecho!', 'Success',{
      timeOut: 1000,
      progressBar: true,
      progressAnimation: 'increasing'
    });
}


}

 