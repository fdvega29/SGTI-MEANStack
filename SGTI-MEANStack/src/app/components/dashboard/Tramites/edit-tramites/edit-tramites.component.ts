import { Component, OnInit } from '@angular/core';
import { TramitesService } from 'src/app/components/services/tramites.service';
import { dataTramites } from 'src/app/components/models/tramites.module';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-edit-tramites',
  templateUrl: './edit-tramites.component.html',
  styleUrls: ['./edit-tramites.component.css']
})
export class EditTramitesComponent implements OnInit {

  constructor(private dataService: TramitesService) { }

  ngOnInit() {
  }

  public updateTramite(tramite: dataTramites) {
    this.dataService.editDataTram(tramite)
      .subscribe(data => {
        location.reload()
        console.log(data)
        //Swal.fire("Bien hecho", "Usuario actualizado correctamente", "success");
      });
  }
}
