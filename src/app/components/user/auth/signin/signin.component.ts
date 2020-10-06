import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
//Service
import { ToastrService } from 'ngx-toastr';
import { usersModule } from '../../../models/user.module';
import { AutenticacionService } from 'src/app/components/services/autenticacion.service';
import { UsuarioService } from 'src/app/components/services/usuario.service';
//sweetalert2
import Swal from 'sweetalert2'

declare const gapi: any;


@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  title = 'SGTI';

  signinFormUser: FormGroup;
  recuerdame: boolean = false;
  email: string;
  auth2: any;

  roleUsuario : string;
  estadoUsuario: any;
  nombre: string;
  msgError: boolean = false;

  usuario: usersModule;

  createFormGroupUser() {
    return new FormGroup({
      email: new FormControl('', Validators.email),
      password: new FormControl('', Validators.required),
      recuerdame: new FormControl('')
    });
  }

  constructor(private authService: AutenticacionService, private userService: UsuarioService, private router: Router, private toastr: ToastrService) {
    this.signinFormUser = this.createFormGroupUser();
  }

  ngOnInit() {

    this.googleInit();

    this.email = localStorage.getItem("EMAIL") || '';
    if (this.email.length > 1) {
      this.recuerdame = true;
    }

  };

  onSignin(FormGroup): void {
    console.log(this.signinFormUser.value);

    this.authService.signin(FormGroup.value, FormGroup.recuerdame)
      .subscribe((data: any) => {
          console.log(data.dataUser.usuario);
          this.userService.setUser(data.dataUser.usuario);
          this.roleUsuario = data.dataUser.usuario.roles;
          this.nombre = data.dataUser.usuario.nombre;
          this.estadoUsuario = data.dataUser.usuario.estado;
          if(this.estadoUsuario == false){
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Cuenta inactiva'
            })
          }else {
            if (this.roleUsuario == "ADMIN_ROLE"){
              this.showToatr();
              window.location.href = '/dashboard/principal-admin';
            }else {
              this.showToatr();
              window.location.href = '/dashboard/principal';
            }
          }
        },
        function(err){
          this.msgError = true;
          if(this.msgError){
            Swal.fire({
              icon: 'error',
              title: 'Correo o contraseña incorrecta',
              text: 'Vuelva a intentar.'
            });  
          }   
        }
      )
  }

  googleInit() {

    gapi.load('auth2', () => {

      this.auth2 = gapi.auth2.init({
        client_id: '521536697432-9q3arjpcgm0fucbd5m6vtcsl6el34r45.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile email'
      });

      this.attachSignin(document.getElementById('btnGoogle'));

    });
  }

  attachSignin(element) {
    this.auth2.attachClickHandler(element, {}, (googleUser) => {
      const profile = googleUser.getBasicProfile();
      const token = googleUser.getAuthResponse().id_token;
      this.authService.signinGoogle(token)
        .subscribe(data => {
          this.userService.setUser(data.dataUser.usuario)
          window.location.href = 'dashboard/principal';
          //this.router.navigate(['dashboard/principal']);
          //console.log(data);
        },
        err => console.log(err));
      console.log(profile);
    });
  }

  signOut(){
    const auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function (){
      console.log('User signed out');
    });
  }

  showToatr() {
    this.toastr.success('¡Bienvenido! '+this.nombre, 'Success', {
      timeOut: 1000,
      progressBar: true,
      progressAnimation: 'increasing'
    });
  }

  showToatrError() {
    this.toastr.error('Correo o contraseña incorrecto', 'Danger', {
      timeOut: 1000,
      progressBar: true,
      progressAnimation: 'increasing'
    });
  }

}

