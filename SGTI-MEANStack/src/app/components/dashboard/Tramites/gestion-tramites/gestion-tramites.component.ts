import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { TramitesService } from 'src/app/components/services/tramites.service';
import { dataTramites } from 'src/app/components/models/tramites.module';

//PDFMake
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { UsuarioService } from 'src/app/components/services/usuario.service';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

declare var $;

@Component({
  selector: 'app-gestion-tramites',
  templateUrl: './gestion-tramites.component.html',
  styleUrls: ['./gestion-tramites.component.css']
})
export class GestionTramitesComponent implements OnInit {

  constructor(public dataTramites: TramitesService, public userService: UsuarioService, private chRef: ChangeDetectorRef) { }

  tramites: dataTramites[] = [];
  dataTable: any;

  ngOnInit() {
    this.getDataTramite();
  }

  public getDataTramite(): void {
    this.dataTramites
      .getAllTramites()
      .subscribe( (resp: any) => {
        console.log(resp.allDataMinH);
        this.tramites = resp.allDataMinH;

        this.chRef.detectChanges();
        const table: any = $('#example1');
        this.dataTable = table.DataTable();
      })
  }

  public cargarModal(tramite: any){
    this.dataTramites.selectedTram = Object.assign({}, tramite);
    console.log(this.dataTramites.selectedTram);
  };



  public imprimirPdf(){
    const documentDefinition = { content: 'This is an sample PDF printed with pdfMake' };
    pdfMake.createPdf(documentDefinition).open();
  }

  public descargarPdf(){
    const documentDefinition = { content: 'This is an sample PDF printed with pdfMake' };
    pdfMake.createPdf(documentDefinition).download();
  }

}
