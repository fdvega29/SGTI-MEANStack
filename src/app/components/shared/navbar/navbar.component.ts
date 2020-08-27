import { Component, OnInit } from '@angular/core';
import { sessionUser } from '../../models/session.module';
import { UsuarioService } from '../../services/usuario.service';
import { AutenticacionService } from '../../services/autenticacion.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  usuario: sessionUser;
  title = 'SGTI';

  constructor(public authService: AutenticacionService, public userService : UsuarioService) { }

  ngOnInit() {
    this.usuario = this.userService.getCurrentUser();
    console.log(this.usuario);
  }

}
