import { Component, OnInit } from '@angular/core';
import { TramitesService } from 'src/app/components/services/tramites.service';
import { dataTramites } from 'src/app/components/models/tramites.module';

//PDFMake
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { UsuarioService } from 'src/app/components/services/usuario.service';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-mis-tramites',
  templateUrl: './mis-tramites.component.html',
  styleUrls: ['./mis-tramites.component.css'],
  providers: []
})
export class MisTramitesComponent implements OnInit {

  constructor(public dataTramites: TramitesService, public userService: UsuarioService) { }

  tramites: dataTramites[] = [];

  usuario: any = {};

  ngOnInit() {
    this.usuario = this.userService.getCurrentUser();  
    this.getDataTramiteById();
  }

  public getDataTramite(): void {
    this.dataTramites
      .getAllTramites()
      .subscribe( (resp: any) => {
        console.log(resp.allDataMinH);
        this.tramites = resp.allDataMinH;
      })
  }

  public getDataTramiteById(): void {
    this.dataTramites
      .getAllTramitesById(this.usuario._id)
      .subscribe( (resp: any) => {
        console.log(resp.allDataMinH);
        this.tramites = resp.allDataMinH;
      })
  }

  public imprimirPdf(){
    const documentDefinition = { content: 'This is an sample PDF printed with pdfMake' };
    pdfMake.createPdf(documentDefinition).open();
  }

  public descargarPdf(){
    const documentDefinition = { content: 'This is an sample PDF printed with pdfMake' };
    pdfMake.createPdf(documentDefinition).download();
  }

}
