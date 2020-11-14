import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/components/services/usuario.service';
import { usersModule } from '../../../models/user.module';
//sweetalert2
import Swal from 'sweetalert2'

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.css']
})
export class UpdateProfileComponent implements OnInit {

  usuario: any;

  user: any;

  imagenSubir: File;
  imagenTemp: any;

  constructor(
    private userService: UsuarioService,
    private router: Router) { }

  ngOnInit() {
    this.usuario = this.userService.getCurrentUser();
    this.user = this.userService.getCurrentUser();
    console.log(this.usuario);
  }

  public updateDataUser(user: usersModule){
    this.userService.editUserById(user)
        .subscribe(data => {
          console.log(data)
          this.router.navigate(['/dashboard/perfil']);
          Swal.fire({
            title: '¡Bien hecho!',
            text: 'Usuario actualizado correctamente',
            icon: 'success',
            showCancelButton: false,
            confirmButtonColor: '#2d8cff',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Confirmar'
          }).then((confirm) => {
            if (confirm.value) {
              location.reload();
              localStorage.setItem("currentUser", JSON.stringify(user));
            }
          })
        });
  }

  public seleccionImage( archivo: File ) {

    if ( !archivo ) {
      this.imagenSubir = null;
      return;
    }

    if ( archivo.type.indexOf('image') < 0 ) {
      this.imagenSubir = null;
      return;
    }

    this.imagenSubir = archivo;

    let reader = new FileReader();
    let urlImagenTemp = reader.readAsDataURL( archivo );

    reader.onloadend = () => this.imagenTemp = reader.result;

  }

  public cambiarImagen() {
    console.log(this.usuario);
    this.userService.cambiarImagen( this.imagenSubir, this.user._id );

  }

}
