import { Component, OnInit } from '@angular/core';
import { TramitesService } from 'src/app/components/services/tramites.service';
import { dataTramites } from 'src/app/components/models/tramites.module';

//PDFMake
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { UsuarioService } from 'src/app/components/services/usuario.service';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

declare var $;

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
  cini: number = 0;
  cproc: number = 0;
  cfina: number = 0;

  ngOnInit() {
    this.usuario = this.userService.getCurrentUser();
    this.getDataTramiteById();
    localStorage.removeItem('Minuta');
    localStorage.removeItem('Importe');
    localStorage.removeItem('Formulario');
    localStorage.removeItem('Fecha_Pago');
  }

  public getDataTramiteById(): void {
    this.dataTramites
      .getAllTramitesById(this.usuario._id)
      .subscribe( (resp: any) => {
        this.tramites = resp.allDataMinH;
        this.cini = resp.iniciados;
        this.cproc = resp.proceso;
        this.cfina = resp.finalizados;
        console.log(this.tramites);
        console.log('CPROC', this.cproc);
      })
  }

  public showHideCollapse(codigo: number){
    var btnAllInic = $('#tituAllInic' + codigo).text();
    var btnAllProc = $('#tituAllProc' + codigo).text();
    var btnAllFina = $('#tituAllFina' + codigo).text();
    var btnProc = $('#tituProc' + codigo).text();
    var btnFina = $('#tituFina' + codigo).text();

    if(btnAllInic == 'Ver menos' || btnAllProc == 'Ver menos' || btnAllFina == 'Ver menos' ||  btnProc == 'Ver menos' || btnFina == 'Ver menos' ){
      $('#tituAllInic' + codigo).html('Ver más');
      $('#tituAllProc' + codigo).html('Ver más');
      $('#tituAllFina' + codigo).html('Ver más');
      $('#tituProc' + codigo).html('Ver más');
      $('#tituFina' + codigo).html('Ver más');
    }else{
      $('#tituAllInic' + codigo).html('Ver menos');
      $('#tituAllProc' + codigo).html('Ver menos');
      $('#tituAllFina' + codigo).html('Ver menos');
      $('#tituProc' + codigo).html('Ver menos');
      $('#tituFina' + codigo).html('Ver menos');
    }
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
            'Estado del trámite: ' + estadotramite + '\n',
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

  public imprimirComprobante(apellido, nombre, product, tipoTramite, fechagenerado, estadotramite, areadestino, idOperacion, estadoOper) {
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
            'Estado del trámite: ' + estadotramite + '\n',
            'Id Operacion: ' + idOperacion + '\n',
            'Estado del Pago: ' + estadoOper + '\n'
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
