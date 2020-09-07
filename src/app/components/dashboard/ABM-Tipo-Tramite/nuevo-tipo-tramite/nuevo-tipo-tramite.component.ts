import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {TipoTramite} from 'src/app/components/models/tipoTramite.module';
import { Location } from '@angular/common';
import { TipoTramiteService } from 'src/app/components/services/tipo-tramite.service';

declare var $;

@Component({
  selector: 'app-nuevo-tipo-tramite',
  templateUrl: './nuevo-tipo-tramite.component.html',
  styleUrls: ['./nuevo-tipo-tramite.component.css']
})
export class NuevoTipoTramiteComponent implements OnInit {

  constructor(public tipoTramService: TipoTramiteService, private location: Location) { }

  ngOnInit() {
    $('#IdTipoTramite').hide();
  }

  public onUpdateTipoTramite(tipoTram: TipoTramite){
    this.tipoTramService.editDataTipoTramites(tipoTram)
                    .subscribe(res => location.reload());
  }

  public onSaveTipoTramite(tipoTram: NgForm): void{
    if(tipoTram.value.IdTipoTramite == null){
      console.log(tipoTram.value);
      this.tipoTramService.postDataTipoTramites(tipoTram.value)
      .subscribe(res => location.reload());
    }
  }



}
