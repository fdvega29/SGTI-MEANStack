import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AreaService } from 'src/app/components/services/area.service';
import { Area } from '../../../models/area.module';
//sweetalert2
import Swal from 'sweetalert2'
declare var $;

@Component({
  selector: 'app-areas',
  templateUrl: './areas.component.html',
  styleUrls: ['./areas.component.css']
})
export class AreasComponent implements OnInit {

  dataTable: any;
  areas: any[];

  constructor(private serviceArea: AreaService, private chRef: ChangeDetectorRef) { }

  ngOnInit() {

    this.getAreas();
  }

  public getAreas(): void {
    this.serviceArea.getAllAreas()
      .subscribe((data: any) => {
        this.areas = data.area;

        this.chRef.detectChanges();
        const table: any = $('#example1');
        this.dataTable = table.DataTable();
      })
  }
  
  public onPreUdateAres(area: Area){
    this.serviceArea.selectedArea = Object.assign({}, area);
  }

  public vaciarCampos(){
    this.serviceArea.selectedArea._id = '';
    this.serviceArea.selectedArea.nombre = '';
    this.serviceArea.selectedArea.encargado = '';
  };

  public deleteArea(area: Area) {
    console.log(area);
    Swal.fire({
      title: '¿Estas seguro?',
      text: "Desea eliminar " + area.nombre,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!'
    }).then((borrar) => {
      if (borrar.value) {
        this.serviceArea.deleteArea(area._id)
          .subscribe(res => location.reload());
      }
    })
  }

}
