import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/components/services/usuario.service';
import { usersModule } from '../../../models/user.module';
//sweetalert2
import Swal from 'sweetalert2'
import { sessionUser } from 'src/app/components/models/session.module';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.css']
})
export class UpdateProfileComponent implements OnInit {

  constructor(
    private userService: UsuarioService,
    private router: Router) { }

  usuario: sessionUser;

  ngOnInit() {
    this.usuario = this.userService.getCurrentUser();
  }

  updateDataUser(user: usersModule){
    this.userService.editUserById(user)
        .subscribe(data => {
          console.log(data)
          Swal.fire("Bien hecho", "Usuario actualizado correctamente", "success");
          this.router.navigate(['/dashboard/perfil']);
          localStorage.setItem("currentUser", JSON.stringify(user));
        });

  }

}
