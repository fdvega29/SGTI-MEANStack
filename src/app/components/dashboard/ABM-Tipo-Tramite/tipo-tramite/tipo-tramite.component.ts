import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { TipoTramite } from '../../../models/tipoTramite.module';
//sweetalert2
import Swal from 'sweetalert2'
import { TipoTramiteService } from 'src/app/components/services/tipo-tramite.service';
declare var $;

@Component({
  selector: 'app-tipo-tramite',
  templateUrl: './tipo-tramite.component.html',
  styleUrls: ['./tipo-tramite.component.css']
})
export class TipoTramiteComponent implements OnInit {

  dataTable: any;
  tipoTram: any[];

  constructor(private tipoTramService: TipoTramiteService ,private chRef: ChangeDetectorRef) { }

  ngOnInit() {
    this.getTipoTramites();
  }

  public getTipoTramites(): void {
    this.tipoTramService.getAllTipoTramites()
      .subscribe((resp: any) => {
        this.tipoTram = resp.data;
        
        this.chRef.detectChanges();
        const table: any = $('#example1');
        this.dataTable = table.DataTable();
      })
  }

  public onPreUdateTipoTramites(tipoTramites: TipoTramite){
    this.tipoTramService.selectedTipoTramite = Object.assign({}, tipoTramites);
  }

  public vaciarCampos(){
    this.tipoTramService.selectedTipoTramite._id = '';
    this.tipoTramService.selectedTipoTramite.formulario = '';
    this.tipoTramService.selectedTipoTramite.descripcion = '';
    this.tipoTramService.selectedTipoTramite.costo = 0;
  };

  public deleteTipoTramites(tipoTramites: TipoTramite) {
    console.log(tipoTramites);
    Swal.fire({
      title: '¿Estas seguro?',
      text: "Desea eliminar " + tipoTramites.formulario,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!'
    }).then((borrar) => {
      if (borrar.value) {
        this.tipoTramService.deleteTipoTramites(tipoTramites._id)
          .subscribe(res => location.reload());
      }
    })
  }

}
