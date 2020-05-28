import { Component, OnInit } from '@angular/core';
import {SidebarService} from "./sidebar.service";
import { sessionUser } from '../../models/session.module';
import { UsuarioService } from '../../services/usuario.service';
import {AutenticacionService} from "../../services/autenticacion.service";


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  providers: []
})
export class SidebarComponent implements OnInit {

  constructor(

              public _sidebar : SidebarService,
              public usuarioService : UsuarioService,
              public _autenticacion : AutenticacionService,
              ) {  }

  usuario: sessionUser;
  title = "SGTI";
  roleUsuario: string;

  ngOnInit() {
    this.usuario = this.usuarioService.getCurrentUser();
    console.log(this.usuario);

    //Obtiene el Rol de Usuario
    this.roleUsuario = JSON.stringify(this.usuario['roles']);
    //Elimina "" del JSON p/ hacer comparacion
    this.roleUsuario = this.roleUsuario.replace(/['"]+/g, '');



  }

}
