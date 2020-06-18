import { Component, OnInit } from '@angular/core';
import { MinutaHService } from 'src/app/components/services/minuta-h.service';
import { minutaH } from 'src/app/components/models/minutaH.module';

@Component({
  selector: 'app-mis-tramites',
  templateUrl: './mis-tramites.component.html',
  styleUrls: ['./mis-tramites.component.css']
})
export class MisTramitesComponent implements OnInit {

  constructor(private dataTramites: MinutaHService) { }
  listadoTram: minutaH[];

  ngOnInit() {
    this.getDataTramite();
  }

  public getDataTramite(): void {
    this.dataTramites
      .getAllTramites()
      .subscribe(data => {console.log(data)})
  }

}
