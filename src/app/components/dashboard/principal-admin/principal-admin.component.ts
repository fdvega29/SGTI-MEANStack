import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

//Services
import {UsuarioService} from "../../services/usuario.service";
import { TramitesService } from '../../services/tramites.service';
//Modelo
import {usersModule} from "../../models/user.module";
//sweetalert2
import Swal from 'sweetalert2'
//PDFMake
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

declare var $;

@Component({
  selector: 'app-principal-admin',
  templateUrl: './principal-admin.component.html',
  styleUrls: ['./principal-admin.component.css']
})
export class PrincipalAdminComponent implements OnInit {

  constructor(private usuarioService: UsuarioService, private tramiteService: TramitesService ,private chRef: ChangeDetectorRef) { }
  usuarios: usersModule[];
  usuario: usersModule;

  ROL_ADM: string = 'ADMIN_ROLE';
  ROL_USR: string = 'USER_ROLE';

  total: number;
  dataTable: any;

  tramites: any = [];
  cIniciados: number = 0;
  cProceso: number = 0;
  cFinalizados: number = 0;

  ngOnInit() {
    this.getUsers();
    this.getAllDataTramites();
  }

  public getUsers(): void {
    this.usuarioService
      .getAllUser()
      .subscribe((data: any) => {
        this.usuarios = data.usuarios;
        this.total = data.total;
        console.log(this.usuarios);

        this.chRef.detectChanges();
        const table: any = $('#t-usuarios');
        this.dataTable = table.DataTable();
      })
  }

  public getAllDataTramites(){
    this.tramiteService
        .getAllTramites()
        .subscribe((data: any) => {
          this.tramites = data.allDataMinH;
          this.cIniciados = data.iniciados;
          this.cProceso = data.proceso;
          this.cFinalizados = data.finalizados;
          console.log(this.cIniciados, this.cProceso, this.cFinalizados, this.tramites.length);
        });
  }

  public deleteUser(usuario: usersModule) {

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
          .subscribe(res => location.reload());
      }
    })
  }

  public changeEstado(usuario: usersModule){
    this.usuarioService.editEstadoUserById(usuario).subscribe((res: any) => {
      console.log(res)
    });
  }

  public obtenerPdf(){
    const documentDefinition = { content: 'This is an sample PDF printed with pdfMake' };
    pdfMake.createPdf(documentDefinition).open();
  }

}
