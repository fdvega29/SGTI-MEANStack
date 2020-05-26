import { Component, OnInit } from '@angular/core';
import {SidebarService} from "./sidebar.service";
import { sessionUser } from '../../models/session.module';
import { UsuarioService } from '../../services/usuario.service';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  providers: []
})
export class SidebarComponent implements OnInit {

  constructor(

              public _sidebar : SidebarService,
              public usuarioService : UsuarioService

              ) {  }

  usuario: sessionUser;
  title = "SGTI";
  ngOnInit() {
    this.usuario = this.usuarioService.getCurrentUser();
    console.log(this.usuario);
  }

}
