import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TramitesService } from '../../services/tramites.service';
import { HistorialService } from '../../services/historial.service';
declare var $;

@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.css']
})
export class HistorialComponent implements OnInit {

  refId: string;
  dataTramite: any;
  create: any;
  apellido: any;
  nombre: any;
  producto: any;
  tipoTramite: any;
  codigo: any;
  area: any;
  estado: any;
  descripcion: any;
  dataTable: any;
  historial: any;

  constructor(private tramiteService: TramitesService, private historialService: HistorialService, private activatedRoute: ActivatedRoute, private chRef: ChangeDetectorRef) { }

  ngOnInit() {
    this.setDataTramite();
    this.getDataTramById(this.refId);
    this.getDataHistorialById();
  }

  public setDataTramite(){
    this.activatedRoute.params.subscribe( param => {
      this.refId = param.id;
    })
  }

  public getDataHistorialById(): void {
    this.historialService.getAllHistorialById(this.refId)
      .subscribe( (resp: any) => {
        this.historial = resp.historialTramite;
        console.log(this.historial);
      })
  }

  public getDataTramById(id: string){
    this.tramiteService.getDataById(id)
                       .subscribe((data: any) => {
                         this.dataTramite = data.dataMinH
                         this.apellido = data.dataMinH.apellido;
                         this.nombre = data.dataMinH.nombre;
                         this.producto = data.dataMinH.producto.formulario;
                         this.descripcion = data.dataMinH.producto.descripcion;
                         this.tipoTramite = data.dataMinH.tipoTram;
                         this.area = data.dataMinH.area.nombre;
                         this.estado = data.dataMinH.estadoTram;
                         this.codigo = data.dataMinH.codigo;
                         this.create = data.dataMinH.createdAt
                      });
  }

}
