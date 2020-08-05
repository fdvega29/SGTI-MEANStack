import { Component, OnInit } from '@angular/core';
import { TramitesService } from 'src/app/components/services/tramites.service';
import { dataTramites } from 'src/app/components/models/tramites.module';

@Component({
  selector: 'app-edit-tramites',
  templateUrl: './edit-tramites.component.html',
  styleUrls: ['./edit-tramites.component.css']
})
export class EditTramitesComponent implements OnInit {

  constructor(public dataService: TramitesService) { }

  ngOnInit() {
  }

  public updateTramite(tramite: dataTramites) {

    let areaTramite : string = tramite.area;

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
    }



    this.dataService.editDataTram(tramite)
      .subscribe(data => {
        location.reload()
        console.log(data)
        //Swal.fire("Bien hecho", "Usuario actualizado correctamente", "success");
      });
  }
}
