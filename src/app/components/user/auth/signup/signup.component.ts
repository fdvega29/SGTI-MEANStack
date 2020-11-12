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
  // tslint:disable-next-line: max-line-length
  private emailPattern: any = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


  signupFormUser: FormGroup;

  createFormGroupUser() {
    return new FormGroup({
      apellido: new FormControl('', [Validators.required, Validators.minLength(2)]),
      nombre: new FormControl('', [Validators.required, Validators.minLength(3)]),
      telefono: new FormControl('', [Validators.required, Validators.minLength(10)]),
      email: new FormControl('', [Validators.required, Validators.minLength(5), Validators.pattern(this.emailPattern)]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      confirmPassword: new FormControl('', [Validators.required, Validators.minLength(8)])
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
  get apellido() { return this.signupFormUser.get('apellido'); }
  get nombre() { return this.signupFormUser.get('nombre'); }
  get telefono() { return this.signupFormUser.get('telefono'); }
  get email() { return this.signupFormUser.get('email'); }
  get password() { return this.signupFormUser.get('password'); }
  get confirmPassword() { return this.signupFormUser.get('confirmPassword'); }
}
