import { Component, OnInit } from '@angular/core';
import { MinutaHService } from 'src/app/components/services/minuta-h.service';
import { minutaH } from 'src/app/components/models/minutaH.module';

//PDFMake
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { sessionUser } from 'src/app/components/models/session.module';
import { UsuarioService } from 'src/app/components/services/usuario.service';
import { usersModule } from 'src/app/components/models/user.module';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-mis-tramites',
  templateUrl: './mis-tramites.component.html',
  styleUrls: ['./mis-tramites.component.css'],
  providers: []
})
export class MisTramitesComponent implements OnInit {

  constructor(public dataTramites: MinutaHService, public userService: UsuarioService) { }

  tramites: minutaH[] = [];

  usuario: any = {};

  ngOnInit() {
    //this.getDataTramite();
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
