import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { UsuarioService } from 'src/app/components/services/usuario.service';
import { TramitesService } from 'src/app/components/services/tramites.service';
import { dataTramites } from 'src/app/components/models/tramites.module';


//PDFMake
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
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
  dataArea: any;

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

  public imprimirFormularioMinG(tipoTramite: string,
                                objeto: string,
                                ubicacion: string,
                                apellido: string,
                                nombre : string,
                                numdoc: string,
                                estadociv: string,
                                domicilio: string,
                                usuarioApe: string,
                                usuarioNomb: string,
                                telefono: string) {

    const usuarioSolicitante = usuarioApe + ' ' + usuarioNomb;

    const FormularioMinG = {
      content: [
        {text: 'Secretaría de Tierras y Hábitat Social', style: 'header'},
        {text: 'Dirección General de Registro de la Propiedad Inmueble', style: 'subheader'},
        {text: 'Formulario Minuta "G" ', style: 'subheader'},
        {
          style: 'tableExample',
          table: {
            widths: [200, '*'],
            body: [
              [{text: 'SOLICITUD DE INFORME: ', fontSize: 14, bold: true }, { text: tipoTramite, italics: true, alignment: 'right'}]
            ]
          }
        },
        {
          style: 'tableExample',
          table: {
            widths: [50, '*'],
            body: [
              [{text: ' 1 ', fontSize: 14, bold: true, alignment: 'center' }, { text: 'Objeto del Pedido: ', bold: true, alignment: 'left', fontSize: 13}]
            ]
          }
        },
        {
          style: 'tableExample',
          table: {
            widths: ['*'],
            body: [
              [{ text: objeto , italics: true, alignment: 'center'}]
            ]
          }
        },
        {
          style: 'tableExample',
          table: {
            widths: [50, '*'],
            body: [
              [{text: ' 2 ', fontSize: 14, bold: true, alignment: 'center' }, { text: 'Medidas del inmueble: ', bold: true, alignment: 'left', fontSize: 13}]
            ]
          }
        },
        {
          style: 'tableExample',
          table: {
            widths: ['*'],
            heights: [80],
            body: [
              [{ text: ubicacion , italics: true, alignment: 'center'}]
            ]
          }
        },
        {
          style: 'tableExample',
          table: {
            widths: [50, '*'],
            body: [
              [{text: ' 3 ', fontSize: 14, bold: true, alignment: 'center' }, { text: 'Identidad del Titular del Dominio: ', bold: true, alignment: 'left', fontSize: 13}]
            ]
          }
        },
        {
          style: 'tableExample',
          table: {
            widths: ['*', '*'],
            headerRows: 1,
            body: [
              [{text: 'Apellidos: ', style: 'tableHeader'}, {text: 'Nombres: ', style: 'tableHeader'}],
              [ apellido, nombre],
            ]
          },
          layout: 'headerLineOnly'
        },
        {
          style: 'tableExample',
          table: {
            widths: [60,'*'],
            headerRows: 1,
            body: [
              [{text: 'Doc. N°: ', style: 'tableHeader'}, {text: 'Estado Civil: ', style: 'tableHeader'}],
              [numdoc, estadociv ]
            ]
          },
          layout: 'headerLineOnly'
        },
        {
          style: 'tableExample',
          table: {
            widths: ['*'],
            headerRows: 1,
            body: [
              [{text: 'Domicilio: ', style: 'tableHeader'}],
              [domicilio],
            ]
          },
          layout: 'headerLineOnly'
        },
        {
          style: 'tableExample',
          table: {
            widths: ['*',100],
            headerRows: 1,
            body: [
              [{text: 'Solicitante: ', style: 'tableHeader'}, {text: 'Teléfono: ', style: 'tableHeader'}],
              [ usuarioSolicitante, telefono],
            ]
          },
          layout: 'headerLineOnly'
        },
        {
          style: 'tableExample',
          table: {
            widths: [50,'*'],
            body: [
              [{text: ' 4 ', fontSize: 14, bold: true, alignment: 'center' }, { text: 'Observaciones: ', bold: true, alignment: 'left', fontSize: 13}]
            ]
          }
        },
        {
          style: 'tableExample',
          table: {
            widths: ['*'],
            heights: [180],
            body: [
              [{ text: ' ' , italics: true, alignment: 'center'}]
            ]
          }
        },
        {text: 'La Rioja - Republica Argentina', style: 'subheader'},
      ],
      styles: {
        header: {
          fontSize: 22,
          bold: true,
          margin: [0, 0, 0, 5],
          alignment: 'center'
        },
        subheader: {
          fontSize: 14,
          bold: true,
          margin: [0, 5, 0, 5],
          alignment: 'center'
        },
        tableExample: {
          margin: [0, 5, 0, 0],
          heights: [20]
        },
        tableHeader: {
          bold: true,
          fontSize: 13,
          color: 'black'
        }
      }
    };

    //Enviar
    pdfMake.createPdf(FormularioMinG).open();

  }

  public descargarFormularioMinG(tipoTramite: string,
                                 objeto: string,
                                 ubicacion: string,
                                 apellido: string,
                                 nombre : string,
                                 numdoc: string,
                                 estadociv: string,
                                 domicilio: string,
                                 usuarioApe: string,
                                 usuarioNomb: string,
                                 telefono: string) {

    const usuarioSolicitante = usuarioApe + ' ' + usuarioNomb;

    const FormularioMinG = {
      content: [
        {text: 'Secretaría de Tierras y Hábitat Social', style: 'header'},
        {text: 'Dirección General de Registro de la Propiedad Inmueble', style: 'subheader'},
        {text: 'Formulario Minuta "G" ', style: 'subheader'},
        {
          style: 'tableExample',
          table: {
            widths: [200, '*'],
            body: [
              [{text: 'SOLICITUD DE INFORME: ', fontSize: 14, bold: true }, { text: tipoTramite, italics: true, alignment: 'right'}]
            ]
          }
        },
        {
          style: 'tableExample',
          table: {
            widths: [50, '*'],
            body: [
              [{text: ' 1 ', fontSize: 14, bold: true, alignment: 'center' }, { text: 'Objeto del Pedido: ', bold: true, alignment: 'left', fontSize: 13}]
            ]
          }
        },
        {
          style: 'tableExample',
          table: {
            widths: ['*'],
            body: [
              [{ text: objeto , italics: true, alignment: 'center'}]
            ]
          }
        },
        {
          style: 'tableExample',
          table: {
            widths: [50, '*'],
            body: [
              [{text: ' 2 ', fontSize: 14, bold: true, alignment: 'center' }, { text: 'Medidas del inmueble: ', bold: true, alignment: 'left', fontSize: 13}]
            ]
          }
        },
        {
          style: 'tableExample',
          table: {
            widths: ['*'],
            heights: [80],
            body: [
              [{ text: ubicacion , italics: true, alignment: 'center'}]
            ]
          }
        },
        {
          style: 'tableExample',
          table: {
            widths: [50, '*'],
            body: [
              [{text: ' 3 ', fontSize: 14, bold: true, alignment: 'center' }, { text: 'Identidad del Titular del Dominio: ', bold: true, alignment: 'left', fontSize: 13}]
            ]
          }
        },
        {
          style: 'tableExample',
          table: {
            widths: ['*', '*'],
            headerRows: 1,
            body: [
              [{text: 'Apellidos: ', style: 'tableHeader'}, {text: 'Nombres: ', style: 'tableHeader'}],
              [ apellido, nombre],
            ]
          },
          layout: 'headerLineOnly'
        },
        {
          style: 'tableExample',
          table: {
            widths: [60,'*'],
            headerRows: 1,
            body: [
              [{text: 'Doc. N°: ', style: 'tableHeader'}, {text: 'Estado Civil: ', style: 'tableHeader'}],
              [numdoc, estadociv ]
            ]
          },
          layout: 'headerLineOnly'
        },
        {
          style: 'tableExample',
          table: {
            widths: ['*'],
            headerRows: 1,
            body: [
              [{text: 'Domicilio: ', style: 'tableHeader'}],
              [domicilio],
            ]
          },
          layout: 'headerLineOnly'
        },
        {
          style: 'tableExample',
          table: {
            widths: ['*',100],
            headerRows: 1,
            body: [
              [{text: 'Solicitante: ', style: 'tableHeader'}, {text: 'Teléfono: ', style: 'tableHeader'}],
              [ usuarioSolicitante, telefono],
            ]
          },
          layout: 'headerLineOnly'
        },
        {
          style: 'tableExample',
          table: {
            widths: [50,'*'],
            body: [
              [{text: ' 4 ', fontSize: 14, bold: true, alignment: 'center' }, { text: 'Observaciones: ', bold: true, alignment: 'left', fontSize: 13}]
            ]
          }
        },
        {
          style: 'tableExample',
          table: {
            widths: ['*'],
            heights: [180],
            body: [
              [{ text: ' ' , italics: true, alignment: 'center'}]
            ]
          }
        },
        {text: 'La Rioja - Republica Argentina', style: 'subheader'},
      ],
      styles: {
        header: {
          fontSize: 22,
          bold: true,
          margin: [0, 0, 0, 5],
          alignment: 'center'
        },
        subheader: {
          fontSize: 14,
          bold: true,
          margin: [0, 5, 0, 5],
          alignment: 'center'
        },
        tableExample: {
          margin: [0, 5, 0, 0],
          heights: [20]
        },
        tableHeader: {
          bold: true,
          fontSize: 13,
          color: 'black'
        }
      }
    };

    pdfMake.createPdf(FormularioMinG).download('Minuta G - '+ apellido + ' ' + nombre);
  }


  public imprimirFormularioMinH(tipoTram: string,
                                apellido: string,
                                nombre: string,
                                nacionalidad: string,
                                estadoCivil: string,
                                nomConyu: string,
                                apeConyu: string,
                                tipoDoc: string,
                                numDoc: string,
                                fechNac: string,
                                usuarioApe: any,
                                usuarioNom: any,
                                telefono: any) {

    const apeNomConyugue = apeConyu + ' ' + nomConyu;
    const usuarioSolicitante = usuarioApe + ' ' + usuarioNom;

    const FormularioMinH = {
      content: [
        {text: 'Secretaría de Tierras y Hábitat Social', style: 'header'},
        {text: 'Dirección General de Registro de la Propiedad Inmueble', style: 'subheader'},
        {text: 'Formulario Minuta "H" ', style: 'subheader'},
        {
          style: 'tableExample',
          table: {
            widths: [200, '*'],
            body: [
              [{text: 'SOLICITUD DE INFORME: ', fontSize: 14, bold: true }, { text: tipoTram, italics: true, alignment: 'right'}]
            ]
          }
        },
        {
          style: 'tableExample',
          table: {
            widths: [50, '*'],
            body: [
              [{text: ' 1 ', fontSize: 14, bold: true, alignment: 'center' }, { text: 'Objeto del Pedido: ', bold: true, alignment: 'left', fontSize: 13}]
            ]
          }
        },
        {
          style: 'tableExample',
          table: {
            widths: ['*'],
            body: [
              [{ text: 'Se solicita información de Titularidad de Dominio ' , italics: true, alignment: 'center'}]
            ]
          }
        },
        {
          style: 'tableExample',
          table: {
            widths: [50, '*'],
            body: [
              [{text: ' 2 ', fontSize: 14, bold: true, alignment: 'center' }, { text: 'Datos de identidad de la persona: ', bold: true, alignment: 'left', fontSize: 13}]
            ]
          }
        },
        {
          style: 'tableExample',
          table: {
            widths: ['*', '*'],
            headerRows: 1,
            body: [
              [{text: 'Apellidos: ', style: 'tableHeader'}, {text: 'Nombres: ', style: 'tableHeader'}],
              [ apellido, nombre]
            ]
          }

        },
        {
          style: 'tableExample',
          table: {
            widths: ['*', 60, '*'],
            headerRows: 1,
            body: [
              [{text: 'Tipo de documento: ', style: 'tableHeader'}, {text: 'N°: ', style: 'tableHeader'}, {text: 'Nacionalidad: ', style: 'tableHeader'}],
              [tipoDoc, numDoc, nacionalidad]
            ]
          }

        },
        {
          style: 'tableExample',
          table: {
            widths: ['*', '*'],
            headerRows: 1,
            body: [
              [{text: 'Estado Civíl: ', style: 'tableHeader'}, {text: 'Conyugue: ', style: 'tableHeader'}],
              [estadoCivil, apeNomConyugue],
            ]
          }

        },
        {
          style: 'tableExample',
          table: {
            widths: ['*',100],
            headerRows: 1,
            body: [
              [{text: 'Solicitante: ', style: 'tableHeader'}, {text: 'Teléfono: ', style: 'tableHeader'}],
              [ usuarioSolicitante, telefono],
            ]
          },
          layout: 'headerLineOnly'
        },
        {
          style: 'tableExample',
          table: {
            widths: [50,'*'],
            body: [
              [{text: ' 4 ', fontSize: 14, bold: true, alignment: 'center' }, { text: 'Observaciones: ', bold: true, alignment: 'left', fontSize: 13}]
            ]
          }
        },
        {
          style: 'tableExample',
          table: {
            widths: ['*'],
            heights: [180],
            body: [
              [{ text: ' ' , italics: true, alignment: 'center'}]
            ]
          }
        },
        {text: 'La Rioja - Republica Argentina', style: 'subheader'},
      ],
      styles: {
        header: {
          fontSize: 22,
          bold: true,
          margin: [0, 0, 0, 5],
          alignment: 'center'
        },
        subheader: {
          fontSize: 14,
          bold: true,
          margin: [0, 5, 0, 5],
          alignment: 'center'
        },
        tableExample: {
          margin: [0, 5, 0, 0],
          heights: [20]
        },
        tableHeader: {
          bold: true,
          fontSize: 13,
          color: 'black'
        }
      }
    };

    pdfMake.createPdf(FormularioMinH).open();



  }

  descargarFormularioMinH(tipoTram: string,
                          apellido: string,
                          nombre: string,
                          nacionalidad: string,
                          estadoCivil: string,
                          nomConyu: string,
                          apeConyu: string,
                          tipoDoc: string,
                          numDoc: string,
                          fechNac: string,
                          usuarioApe: any,
                          usuarioNom: any,
                          telefono: any) {
    const apeNomConyugue = apeConyu + ' ' + nomConyu;
    const usuarioSolicitante = usuarioApe + ' ' + usuarioNom;

    const FormularioMinH = {
      content: [
        {text: 'Secretaría de Tierras y Hábitat Social', style: 'header'},
        {text: 'Dirección General de Registro de la Propiedad Inmueble', style: 'subheader'},
        {text: 'Formulario Minuta "H" ', style: 'subheader'},
        {
          style: 'tableExample',
          table: {
            widths: [200, '*'],
            body: [
              [{text: 'SOLICITUD DE INFORME: ', fontSize: 14, bold: true }, { text: tipoTram, italics: true, alignment: 'right'}]
            ]
          }
        },
        {
          style: 'tableExample',
          table: {
            widths: [50, '*'],
            body: [
              [{text: ' 1 ', fontSize: 14, bold: true, alignment: 'center' }, { text: 'Objeto del Pedido: ', bold: true, alignment: 'left', fontSize: 13}]
            ]
          }
        },
        {
          style: 'tableExample',
          table: {
            widths: ['*'],
            body: [
              [{ text: 'Se solicita información de Titularidad de Dominio ' , italics: true, alignment: 'center'}]
            ]
          }
        },
        {
          style: 'tableExample',
          table: {
            widths: [50, '*'],
            body: [
              [{text: ' 2 ', fontSize: 14, bold: true, alignment: 'center' }, { text: 'Datos de identidad de la persona: ', bold: true, alignment: 'left', fontSize: 13}]
            ]
          }
        },
        {
          style: 'tableExample',
          table: {
            widths: ['*', '*'],
            headerRows: 1,
            body: [
              [{text: 'Apellidos: ', style: 'tableHeader'}, {text: 'Nombres: ', style: 'tableHeader'}],
              [ apellido, nombre]
            ]
          }

        },
        {
          style: 'tableExample',
          table: {
            widths: ['*', 60, '*'],
            headerRows: 1,
            body: [
              [{text: 'Tipo de documento: ', style: 'tableHeader'}, {text: 'N°: ', style: 'tableHeader'}, {text: 'Nacionalidad: ', style: 'tableHeader'}],
              [tipoDoc, numDoc, nacionalidad]
            ]
          }

        },
        {
          style: 'tableExample',
          table: {
            widths: ['*', '*'],
            headerRows: 1,
            body: [
              [{text: 'Estado Civíl: ', style: 'tableHeader'}, {text: 'Conyugue: ', style: 'tableHeader'}],
              [estadoCivil, apeNomConyugue],
            ]
          }

        },
        {
          style: 'tableExample',
          table: {
            widths: ['*',100],
            headerRows: 1,
            body: [
              [{text: 'Solicitante: ', style: 'tableHeader'}, {text: 'Teléfono: ', style: 'tableHeader'}],
              [ usuarioSolicitante, telefono],
            ]
          },
          layout: 'headerLineOnly'
        },
        {
          style: 'tableExample',
          table: {
            widths: [50,'*'],
            body: [
              [{text: ' 4 ', fontSize: 14, bold: true, alignment: 'center' }, { text: 'Observaciones: ', bold: true, alignment: 'left', fontSize: 13}]
            ]
          }
        },
        {
          style: 'tableExample',
          table: {
            widths: ['*'],
            heights: [180],
            body: [
              [{ text: ' ' , italics: true, alignment: 'center'}]
            ]
          }
        },
        {text: 'La Rioja - Republica Argentina', style: 'subheader'},
      ],
      styles: {
        header: {
          fontSize: 22,
          bold: true,
          margin: [0, 0, 0, 5],
          alignment: 'center'
        },
        subheader: {
          fontSize: 14,
          bold: true,
          margin: [0, 5, 0, 5],
          alignment: 'center'
        },
        tableExample: {
          margin: [0, 5, 0, 0],
          heights: [20]
        },
        tableHeader: {
          bold: true,
          fontSize: 13,
          color: 'black'
        }
      }
    };


    pdfMake.createPdf(FormularioMinH).download('Minuta H - '+ apellido + ' ' + nombre);
  }
}
