import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { usersModule } from '../../models/user.module';
import { Subject } from 'rxjs';
//sweetalert2
import Swal from 'sweetalert2'
//PDFMake
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

declare var $;

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css'],
  providers: []
})
export class PrincipalComponent implements OnInit {

  constructor(private usuarioService: UsuarioService, private chRef: ChangeDetectorRef) { }
  usuarios: usersModule[];
  usuario: usersModule;
  total: number;

  dataTable: any[];
  
  ngOnInit() {
    this.getUsers();
  }

  getUsers(): void {
    this.usuarioService
      .getAllUser()
      .subscribe((data: any) => {
        this.usuarios = data.usuarios;
        this.total = data.total;

        this.chRef.detectChanges();
        const table: any = $('#example1');
        this.dataTable = table.DataTable();
      })
  }

  deleteUser(usuario: usersModule) {

    console.log(usuario);

    if (usuario._id === this.usuarioService.selectedUser._id) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'No puedes eliminar tu propia cuenta'
      })
      return
    }

    Swal.fire({
      title: '¿Estas seguro?',
      text: "Estas a punto de eliminar a " + usuario.nombre,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!'
    }).then((borrar) => {
      if (borrar.value) {
        this.usuarioService.deleteUserById(usuario._id)
          .subscribe(res => {
            console.log(res);
            //Swal.fire("Bien hecho", "Usuario eliminado correctamente", "success");
            this.usuarioService.getAllUser();
          });
      }
    })
  }

  editUser(usuario: usersModule) {
    //console.log(usuario);
  }

  obtenerPdf() {
    const documentDefinition = { content: 'This is an sample PDF printed with pdfMake' };
    pdfMake.createPdf(documentDefinition).open();
  }

}
