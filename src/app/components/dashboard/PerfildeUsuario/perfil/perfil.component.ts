import { Component, OnInit } from '@angular/core';
import { sessionUser } from 'src/app/components/models/session.module';
import { UsuarioService } from 'src/app/components/services/usuario.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css'],
  providers: []
})
export class PerfilComponent implements OnInit {

  constructor(private usuarioService: UsuarioService) { }

  usuario: sessionUser;

  ngOnInit() {
    this.usuario = this.usuarioService.getCurrentUser();
  }

  getDataUser(usuario){
    console.log(usuario);
  }

}
