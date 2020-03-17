import { Component, OnInit } from '@angular/core';
import { UsersModule } from '../../model/user/user.module';
import { UserServiceService } from '../../service/user.service';
import { FormControl, FormGroup } from '@angular/forms';
import { Router} from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  providers: [UsersModule]
})
export class SignupComponent implements OnInit {

  signupFormUser: FormGroup;

  createFormGroupUser() {
    return new FormGroup({
      apellido: new FormControl(''),
      nombre: new FormControl(''),
      telefono: new FormControl(''),
      email: new FormControl(''),
      password: new FormControl(''),
      confirmPassword: new FormControl('')
    });
  }


  constructor(private usersService: UserServiceService, private router: Router, private toastr: ToastrService) {
      this.signupFormUser = this.createFormGroupUser();
   }



  ngOnInit() {}

  msgSuccess(){
    this.toastr.success('¡Registro exitoso!', 'Success',{
      timeOut: 2000,
      progressBar: true,
      progressAnimation: 'increasing'
    })
  }

  onSignup(FormGroup): void{
    //console.log(this.signupFormUser.value);
    this.usersService.signup(FormGroup.value)
    .subscribe(
      res =>{
      this.router.navigate(['user/signin']);
    },
    err => console.log(err)
    )
  }
}