import { Component, OnInit } from '@angular/core';
import {Area} from 'src/app/components/models/area.module';
import {NgForm} from '@angular/forms';
import { Location } from '@angular/common';
import { AreaService } from 'src/app/components/services/area.service';

declare var $;

@Component({
  selector: 'app-nuevo-area',
  templateUrl: './nuevo-area.component.html',
  styleUrls: ['./nuevo-area.component.css']
})
export class NuevoAreaComponent implements OnInit {

  constructor(
    private serviceArea: AreaService, 
    private location: Location) { }

  ngOnInit() {
    $('#IdArea').hide();
  }

  public onUpdateArea(area: Area){
    this.serviceArea.editDataArea(area)
                    .subscribe(res => location.reload());
  }

  public onSaveArea(areaForm: NgForm): void{
    if(areaForm.value.IdArea == null){
      console.log(areaForm.value);
      this.serviceArea.postDataArea(areaForm.value)
      .subscribe(res => location.reload());
    }
  }

}
