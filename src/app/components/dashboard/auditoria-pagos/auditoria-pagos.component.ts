import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { SincronizacionPagosService } from '../../services/sincronizacion-pagos.service';

declare var $;

@Component({
  selector: 'app-auditoria-pagos',
  templateUrl: './auditoria-pagos.component.html',
  styleUrls: ['./auditoria-pagos.component.css']
})


export class AuditoriaPagosComponent implements OnInit {

  audiPagos: any;
  dataTable: any;

  constructor(private sincronizacionService: SincronizacionPagosService, private chRef: ChangeDetectorRef) { }

  ngOnInit() {
    this.getAllPagos();
  }

  public getAllPagos(){
    this.sincronizacionService.getAuditariaPagos().subscribe((res: any) => {
      this.audiPagos = res.data;

      this.chRef.detectChanges();
      const table: any = $('#example1');
      this.dataTable = table.DataTable();
    })
  }

}
