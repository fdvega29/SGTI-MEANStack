import { Component, OnInit } from '@angular/core';
import { UsersModule } from '../../model/user/user.module';
import { UserServiceService } from '../../service/user.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
      apellido: new FormControl('', [Validators.required]),
      nombre: new FormControl('', Validators.required),
      telefono: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
      confirmPassword: new FormControl('', Validators.required)
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

/*
import swal from 'SweetAlert';

      swal("Good job!", "You clicked the button!", "success");

*/