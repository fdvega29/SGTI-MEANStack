import { Component, OnInit } from '@angular/core';
import { usersModule } from '../../../models/user.module';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router} from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AutenticacionService } from 'src/app/components/services/autenticacion.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  providers: []
})
export class SignupComponent implements OnInit {

  title : string = "SGTI";

  signupFormUser: FormGroup;

  createFormGroupUser() {
    return new FormGroup({
      apellido: new FormControl('', Validators.required),
      nombre: new FormControl('', Validators.required),
      telefono: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
      confirmPassword: new FormControl('', Validators.required)
    });
  }


  constructor(private authService: AutenticacionService, private router: Router, private toastr: ToastrService) {
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
    this.authService.signup(FormGroup.value)
    .subscribe( res => {
      //this.usersService.setUser(res);
      this.router.navigate(['user/signin']);
      this.msgSuccess();
    },
    err => console.log(err)
    )
  }
}
