import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AutenticacionService } from '../../services/autenticacion.service';
import {UsuarioService} from "../../services/usuario.service";
import {sessionUser} from "../../models/session.module";


@Injectable({

  providedIn: 'root'

})

// Creamos nuestra clase e implementamos CanActive
export class AuthGuard implements CanActivate {

  usuario : sessionUser;
  roleUsuario: string;

  constructor(public authService: AutenticacionService, public router: Router, public usuarioService : UsuarioService) {
    this.usuario = this.usuarioService.getCurrentUser();
    console.log('guards', this.usuario);
    this.roleUsuario = JSON.stringify(this.usuario['roles']);
    //Elimina "" del JSON p/ hacer comparacion
    this.roleUsuario = this.roleUsuario.replace(/['"]+/g, '');
  }

  canActivate() {

    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['user/signin']);
      return false;
    }
    return true;

    if (this.roleUsuario == 'USER_ROLE'){
      this.router.navigate(['dashboard/principal']);
      return false;
    }
    return true;

  }

  soyAdmin() {
    this.usuario = this.usuarioService.getCurrentUser();
    this.roleUsuario = JSON.stringify(this.usuario['roles']);
    //Elimina "" del JSON p/ hacer comparacion
    this.roleUsuario = this.roleUsuario.replace(/['"]+/g, '');

    if (this.roleUsuario != 'ADMIN_ROLE'){
      this.router.navigate(['dashboard/principal']);
      return false;
    }
    return true;
  }

}
