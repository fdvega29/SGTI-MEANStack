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

  estado: any;

  usuario: any = {};

  ngOnInit() {
    this.usuario = this.userService.getCurrentUser();
    this.getDataTramiteById();
  }

  public getDataTramiteById(): void {
    this.dataTramites
      .getAllTramitesById(this.usuario._id)
      .subscribe( (resp: any) => {
        this.tramites = resp.allDataMinH;
        console.log(this.tramites);
      })
  }

  public descargarComprobante(apellido, nombre, product, tipoTramite, fechagenerado, estadotramite, areadestino ){
    const comprobante  = {
      content: [
        {
          text: 'Comprobante de trámite: ',
          style: 'header',
          alignment: 'center'
        },
        {
          text: [
            'Fecha: ' + fechagenerado.substr(0,10)  + '\n \n',
            'Cliente solicitante: ' + apellido + ' ' + nombre + '\n \n',
            'Tipo de trámite: ' + tipoTramite +  '\n \n',
            'Formulario: ' + product + '\n \n',
            'Área: ' + areadestino + '\n \n',
            'Estado del trámite: ' + estadotramite + '\n'
          ],
          style: 'body',
        },

        { qr: '\n' + fechagenerado.substr(0, 10) + ' \n ' + apellido + ' '+ nombre + ' \n ' + tipoTramite + ' \n ' + product , alignment: 'center'},

      ],
      styles: {
        header: {
          fontSize: 20,
          bold: true,
          alignment: 'center'
        },
        body: {
          fontSize: 14,
          alignment: 'center',
          bold: false,
          margin: [10, 5, 0, 10]
        },
      }
    };

    pdfMake.createPdf(comprobante).download('comprobanteDeTramite.pdf');
  }

  public imprimirComprobante(apellido, nombre, product, tipoTramite, fechagenerado, estadotramite, areadestino ) {
    //console.log(product.formulario, areadestino.nombre);
    const comprobante  = {
      content: [
        {
          text: 'Comprobante de trámite: ',
          style: 'header',
          alignment: 'center'
        },
        {
          text: [
            'Fecha: ' + fechagenerado.substr(0,10)  + '\n \n',
            'Cliente solicitante: ' + apellido + ' ' + nombre + '\n \n',
            'Tipo de trámite: ' + tipoTramite +  '\n \n',
            'Formulario: ' + product.formulario + '\n \n',
            'Área: ' + areadestino.nombre + '\n \n',
            'Estado del trámite: ' + estadotramite + '\n'
          ],
          style: 'body',
        },

        { qr: '\n' + fechagenerado.substr(0, 10) + ' \n ' + apellido + ' '+ nombre + ' \n ' + tipoTramite + ' \n ' + product , alignment: 'center'},

      ],
      styles: {
        header: {
          fontSize: 20,
          bold: true,
          alignment: 'center'
        },
        body: {
          fontSize: 14,
          alignment: 'center',
          bold: false,
          margin: [10, 5, 0, 10]
        },
      }
    };

    pdfMake.createPdf(comprobante).open();
  }
}
