import { Component, OnInit } from '@angular/core';
import { TramitesService } from 'src/app/components/services/tramites.service';
import { dataTramites } from 'src/app/components/models/tramites.module';
import { AreaService } from 'src/app/components/services/area.service';
import { HistorialService } from 'src/app/components/services/historial.service';
import { UsuarioService } from 'src/app/components/services/usuario.service';
declare var $;

@Component({
  selector: 'app-edit-tramites',
  templateUrl: './edit-tramites.component.html',
  styleUrls: ['./edit-tramites.component.css']
})
export class EditTramitesComponent implements OnInit {

  dataArea: any = [];
  tipo: any = [];
  historialTramite: any = [];
  usuarioLogueado: any;

  constructor(private dataService: TramitesService, private areaService: AreaService, private historialService: HistorialService, private usuarioService: UsuarioService) { }

  ngOnInit() {
    $('#idTramite').hide();
    this.getAllAreas();
    this.usuarioLogueado = this.usuarioService.getCurrentUser();
  }
  
  public getAllAreas(){
    this.areaService.getAllAreas()
                    .subscribe((data: any) =>{
                      this.dataArea = data.area;
                      console.log(this.dataArea);
                    });
  };

  public updateTramite(tramite: dataTramites) {

    /*let areaTramite : string = tramite.area;

    switch (areaTramite) {
      case "Mesa de entrada": {
        tramite.estadoTram = 'Iniciado';
        break;
      }
      case "Coordinación de trámites oficiales": {
        tramite.estadoTram = 'En proceso';
        break;
      }
      case "Despacho - Mesa de entrada": {
        tramite.estadoTram = 'Finalizado';
        break;
      }
    }*/

    this.dataService.editDataTram(tramite)
      .subscribe( (data: any) => {
        location.reload()
      });
       
  }

  public insertHistorial(tramite: dataTramites){
    this.historialTramite = {
      estTramite: tramite.estadoTram,
      area: tramite.area,
      usuario: this.usuarioLogueado._id, 
      tramite: tramite._id
    }
    console.log(this.historialTramite);
    this.historialService.postDataHistorial(this.historialTramite).subscribe(res => console.log(res));
  }

}
