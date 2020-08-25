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
      pageSize: 'LEGAL',

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
              [{text: ' 2 ', fontSize: 14, bold: true, alignment: 'center' }, { text: 'Ubicación del inmueble - Medidas - Linderos: ', bold: true, alignment: 'left', fontSize: 13}]
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
            widths: [30, '*', 30 , '*'],
            body: [
              [{text: ' 3 ', fontSize: 14, bold: true, alignment: 'center' }, { text: 'Antecedentes de Dominio: ', bold: true, alignment: 'left', fontSize: 13}, {text: ' 4 ', fontSize: 14, bold: true, alignment: 'center' }, { text: 'N° Matricula Registral: ', bold: true, alignment: 'left', fontSize: 13}]


            ]
          }
        },
        {
          style: 'tableExample',
          table: {
            widths: ['*','*'],
            headerRows: 1,
            body: [
              [
                {
                  table: {
                    widths: [40, 80, '*'],
                    headerRows: 1,
                    heights: [20, 20, 20],
                    body: [
                      [{text: 'Lote: ', style: 'tableHeader', alignment: 'center'},{text: 'Manzana: ', style: 'tableHeader', alignment: 'center'}, {text: 'Localidad: ', style: 'tableHeader', alignment: 'center'}],
                      [ ' ', ' ', ' '],
                    ]
                  }
                },
                {text: ' ', style: 'tableHeader'},

              ],
              [
                {
                  table: {
                    widths: ['*', '*', '*', '*'],
                    heights: [20,20,20,20],
                    headerRows: 1,
                    body: [
                      [{text: 'T°: ', style: 'tableHeader', alignment: 'left'},{text: 'F°: ', style: 'tableHeader', alignment: 'left'}, {text: 'N°: ', style: 'tableHeader', alignment: 'left'}, {text: 'Año°: ', style: 'tableHeader', alignment: 'left'}],
                      [ ' ', ' ', ' ', ' '],
                    ]
                  }
                },


                {
                  table: {
                    widths: ['*','*','*','*'],
                    heights: [40,40,40,40],
                    headerRows: 1,
                    body: [
                      [{text: 'Plano: ', alignment: 'center'},
                        {text: 'T°:',  alignment: 'left'},
                        {text: 'F°:',  alignment: 'left'},
                        {text: 'A°:',  alignment: 'left'}
                        ]
                    ]
                  }
                }

              ],

            ]
          }
        },



        {
          style: 'tableExample',
          table: {
            widths: [50, 30, 50, 50, 50, 50, 50, 30, "*"],
            body: [
              [
                { text: ' 5 ', fontSize: 14, bold: true, alignment: 'center'},
                { text: 'N° : ', bold: true, alignment: 'left', fontSize: 12},
                { text: 'Circuns. : ', bold: true, alignment: 'center', fontSize: 12},
                { text: 'Sección : ', bold: true, alignment: 'center', fontSize: 12},
                { text: 'Manzana: ', bold: true, alignment: 'center', fontSize: 12},
                { text: 'Parcela: ', bold: true, alignment: 'center', fontSize: 12},
                { text: 'Depto.: ', bold: true, alignment: 'center', fontSize: 12},
                { text: 'Hoja: ', bold: true, alignment: 'center', fontSize: 12},
                { text: 'Coordenadas: ', bold: true, alignment: 'center', fontSize: 12}
              ]
            ]
          }
        },

        {
          style: 'tableExample',
          table: {
            widths: [85, 50, 50, 50, 50, 50, 30, "*"],
            body: [
              [
                { text: ' Matricula \n Catastral:', fontSize: 14, bold: true, alignment: 'center'},
                { text: ' ', bold: true, alignment: 'center', fontSize: 12},
                { text: ' ', bold: true, alignment: 'center', fontSize: 12},
                { text: ' ', bold: true, alignment: 'center', fontSize: 12},
                { text: ' ', bold: true, alignment: 'center', fontSize: 12},
                { text: ' ', bold: true, alignment: 'center', fontSize: 12},
                { text: ' ', bold: true, alignment: 'center', fontSize: 12},
                { text: ' ', bold: true, alignment: 'center', fontSize: 12}
              ]
            ]
          }
        },

        {
          style: 'tableExample',
          table: {
            widths: [50, 40, 30, 50, 50, 70, "*"],
            body: [
              [
                { text: ' 6 ', fontSize: 14, bold: true, alignment: 'center'},
                { text: 'Unidad: ', bold: true, alignment: 'left', fontSize: 12},
                { text: 'Piso : ', bold: true, alignment: 'center', fontSize: 12},
                { text: 'Sub-Total : ', bold: true, alignment: 'center', fontSize: 12},
                { text: 'Porcent.: ', bold: true, alignment: 'center', fontSize: 12},
                { text: 'Destinada a: ', bold: true, alignment: 'center', fontSize: 12},
                { text: ' COMPLEMENTARIAS : ', bold: true, alignment: 'center', fontSize: 12}
              ]
            ]
          }
        },

        {
          style: 'tableExample',
          table: {
            widths: [100, 30, 50, 50, 70, '*'],
            body: [
              [
                { text: ' ', bold: true, alignment: 'center', fontSize: 12},
                { text: ' ', bold: true, alignment: 'center', fontSize: 12},
                { text: ' ', bold: true, alignment: 'center', fontSize: 12},
                { text: ' ', bold: true, alignment: 'center', fontSize: 12},
                { text: ' ', bold: true, alignment: 'center', fontSize: 12},
                { text: ' ', bold: true, alignment: 'center', fontSize: 12}
              ]
            ]
          }
        },


        {
          style: 'tableExample',
          table: {
            widths: [50, '*'],
            body: [
              [{text: ' 7 ', fontSize: 14, bold: true, alignment: 'center' }, { text: 'Identidad del Titular del Dominio: ', bold: true, alignment: 'left', fontSize: 13}]
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
            widths: ['*'],
            body: [
              [{ text: 'Firma y Sello: ', bold: true, alignment: 'center', fontSize: 13}]
            ]
          }
        },
        {
          style: 'tableExample',
          table: {
            widths: ['*'],
            heights: [80],
            body: [
              [{ text: ' ' , italics: true, alignment: 'center'}]
            ]
          }
        },
        {text: 'Registro General de la Propiedad Inmueble', style: 'paddingBottom'},
        {text: 'La Rioja - Republica Argentina', style: 'subheader'},



        ////////////////
        ////////Pagina 2
        ////////////////



        {
          style: 'tableExample',
          table: {
            widths: [50, '*'],
            body: [
              [{text: ' 8 ', fontSize: 14, bold: true, alignment: 'center' }, { text: 'Observaciones: ', bold: true, alignment: 'left', fontSize: 13}]
            ]
          },
          pageBreak: 'before'
        },
        {
          style: 'tableExample',
          table: {
            widths: ['*'],
            heights: [50],
            body: [
              [{ text: ' ' , italics: true, alignment: 'center'}]
            ]
          }
        },

        {
          style: 'tableExample',
          table: {
            widths: [50, '*'],
            body: [
              [{text: ' 9 ', fontSize: 14, bold: true, alignment: 'center' }, { text: 'El dominio consta a nombre de: ', bold: true, alignment: 'left', fontSize: 13}]
            ]
          }
        },
        {
          style: 'tableExample',
          table: {
            widths: ['*'],
            heights: [70],
            body: [
              [{ text: ' ' , italics: true, alignment: 'center'}]
            ]
          }
        },
        {
          style: 'tableExample',
          table: {
            widths: [50, '*'],
            body: [
              [{text: ' 10 ', fontSize: 14, bold: true, alignment: 'center' }, { text: 'Prevenciones: ', bold: true, alignment: 'left', fontSize: 13}]
            ]
          }
        },
        {
          style: 'tableDescripcion',
          table: {
            widths: ['*'],
            body: [
              [
                  {
                    text: ' Articulo 25 Ley 17.801 - con Fecha:                       de                                         de             ',
                    fontSize: 12,
                    alignment: 'left',
                    margin: [0, 12, 0, 0]
                  }
              ],
              [
                  {
                    text:' Entró Certificado N°                                                       Operación                                 ',
                    fontSize: 12,
                    alignment: 'left',
                    margin: [0, 12, 0, 0]
                  }
              ],
              [
                {
                  text:' Escribano registro N°                                                   de                                            ',
                  fontSize: 12,
                  alignment: 'left',
                  margin: [0, 12, 0, 0]
                }
              ]
            ]
          },
          layout: {
            hLineWidth: function (i, node) {
              return (i === 0 || i === node.table.body.length) ? 1 : 1;
            },
            vLineWidth: function (i, node) {
              return (i === 0 || i === node.table.widths.length) ? 1 : 1;
            },
            hLineColor: function (i, node) {
              return (i === 0 || i === node.table.body.length) ? 'black' : 'gray';
            },
            vLineColor: function (i, node) {
              return (i === 0 || i === node.table.widths.length) ? 'black' : 'gray';
            },

          }
        },
        {
          style: 'tableExample',
          table: {
            widths: [50, 55, 100, "*", 80, 50],
            body: [
              [
                {text: ' 8 ', fontSize: 14, bold: true, alignment: 'center'},
                { text: 'Hipoteca: ', bold: true, alignment: 'center', fontSize: 12},
                { text: 'Fecha de la escritura: ', bold: true, alignment: 'center', fontSize: 12},
                { text: 'Escribano o Autoridad Administrativa: ', bold: true, alignment: 'center', fontSize: 12},
                { text: 'Acreedor: ', bold: true, alignment: 'center', fontSize: 12},
                { text: 'Monto: ', bold: true, alignment: 'center', fontSize: 12}
              ]
            ]
          }
        },
        {
          style: 'tableExample',
          table: {
            widths: [30, 30, 35, 100, 60, '*', 80, 50],
            body: [
              [
                { text: ' N° : ', bold: true, alignment: 'center', fontSize: 12},
                { text: ' F° :', bold: true, alignment: 'center', fontSize: 12},
                { text: ' A° :', bold: true, alignment: 'center', fontSize: 12},
                { text: '', bold: true, alignment: 'center', fontSize: 12},
                { text: 'Registro: ', bold: true, alignment: 'center', fontSize: 11},
                { text: 'Lugar : ', bold: true, alignment: 'center', fontSize: 11},
                { text: ' ', bold: true, alignment: 'center', fontSize: 12},
                { text: ' ', bold: true, alignment: 'center', fontSize: 12}
              ]
            ]
          }
        },
        {
          style: 'tableExample',
          table: {
            widths: [30, 30, 35, 100, 60, '*', 80, 50],
            body: [
              [
                { text: ' ', bold: true, alignment: 'center', fontSize: 12},
                { text: ' ', bold: true, alignment: 'center', fontSize: 12},
                { text: ' ', bold: true, alignment: 'center', fontSize: 12},
                { text: ' ', bold: true, alignment: 'center', fontSize: 12},
                { text: ' ', bold: true, alignment: 'center', fontSize: 11},
                { text: ' ', bold: true, alignment: 'center', fontSize: 11},
                { text: ' ', bold: true, alignment: 'center', fontSize: 12},
                { text: ' ', bold: true, alignment: 'center', fontSize: 12}
              ]
            ]
          }
        },
        {
          style: 'tableExample',
          table: {
            widths: [30, 30, 35, 100, 60, '*', 80, 50],
            body: [
              [
                { text: ' ', bold: true, alignment: 'center', fontSize: 12},
                { text: ' ', bold: true, alignment: 'center', fontSize: 12},
                { text: ' ', bold: true, alignment: 'center', fontSize: 12},
                { text: ' ', bold: true, alignment: 'center', fontSize: 12},
                { text: ' ', bold: true, alignment: 'center', fontSize: 11},
                { text: ' ', bold: true, alignment: 'center', fontSize: 11},
                { text: ' ', bold: true, alignment: 'center', fontSize: 12},
                { text: ' ', bold: true, alignment: 'center', fontSize: 12}
              ]
            ]
          }
        },
        {
          style: 'tableExample',
          table: {
            widths: [30, 30, 35, 100, 60, '*', 80, 50],
            body: [
              [
                { text: ' ', bold: true, alignment: 'center', fontSize: 12},
                { text: ' ', bold: true, alignment: 'center', fontSize: 12},
                { text: ' ', bold: true, alignment: 'center', fontSize: 12},
                { text: ' ', bold: true, alignment: 'center', fontSize: 12},
                { text: ' ', bold: true, alignment: 'center', fontSize: 11},
                { text: ' ', bold: true, alignment: 'center', fontSize: 11},
                { text: ' ', bold: true, alignment: 'center', fontSize: 12},
                { text: ' ', bold: true, alignment: 'center', fontSize: 12}
              ]
            ]
          }
        },
        {
          style: 'tableExample',
          table: {
            widths: [30, 30, 35, 100, 60, '*', 80, 50],
            body: [
              [
                { text: ' ', bold: true, alignment: 'center', fontSize: 12},
                { text: ' ', bold: true, alignment: 'center', fontSize: 12},
                { text: ' ', bold: true, alignment: 'center', fontSize: 12},
                { text: ' ', bold: true, alignment: 'center', fontSize: 12},
                { text: ' ', bold: true, alignment: 'center', fontSize: 11},
                { text: ' ', bold: true, alignment: 'center', fontSize: 11},
                { text: ' ', bold: true, alignment: 'center', fontSize: 12},
                { text: ' ', bold: true, alignment: 'center', fontSize: 12}
              ]
            ]
          }
        },
        {
          style: 'tableExample',
          table: {
            widths: [30, 30, 35, 100, 60, '*', 80, 50],
            body: [
              [
                { text: ' ', bold: true, alignment: 'center', fontSize: 12},
                { text: ' ', bold: true, alignment: 'center', fontSize: 12},
                { text: ' ', bold: true, alignment: 'center', fontSize: 12},
                { text: ' ', bold: true, alignment: 'center', fontSize: 12},
                { text: ' ', bold: true, alignment: 'center', fontSize: 11},
                { text: ' ', bold: true, alignment: 'center', fontSize: 11},
                { text: ' ', bold: true, alignment: 'center', fontSize: 12},
                { text: ' ', bold: true, alignment: 'center', fontSize: 12}
              ]
            ]
          }
        },
        {
          style: 'tableExample',
          table: {
            widths: ['*',120],
            body: [
              [
                { text: 'Intervino: ', bold: true, alignment: 'center', fontSize: 12},

                { text: '  ', bold: true, alignment: 'center', fontSize: 12},

              ],
              [
                {text: '  ', style: 'tableHeader'},

                {
                  table: {
                    widths: [30, 30, 30],
                    headerRows: 1,
                    alignment: 'center',
                    body: [
                      [
                        { text: ' D ', bold: true, alignment: 'center', fontSize: 12},
                        { text: ' M ', bold: true, alignment: 'center', fontSize: 12},
                        { text: ' A ', bold: true, alignment: 'center', fontSize: 12}
                        ],
                      [ ' ', ' ', ' '],
                    ]
                  }
                },
              ],
            ]
          }
        },
        {
          style: 'tableExample',
          table: {
            widths: [50, '*', 70, 70, 70, 70, 50],
            body: [
              [
                {text: ' 11 ', fontSize: 14, bold: true, alignment: 'center'},
                { text: 'Embargos y otras Anotaciones: ', bold: true, alignment: 'center', fontSize: 11},
                { text: 'Fecha: ', bold: true, alignment: 'center', fontSize: 12},
                { text: 'Autos: ', bold: true, alignment: 'center', fontSize: 12},
                { text: 'Juzgado: ', bold: true, alignment: 'center', fontSize: 12},
                { text: 'Secretaría: ', bold: true, alignment: 'center', fontSize: 12},
                { text: 'Monto: ', bold: true, alignment: 'center', fontSize: 12}
              ]
            ]
          }
        },
        {
          style: 'tableExample',
          table: {
            widths: [30, 30, 30,30, 70, 70, 70, 70, 50],
            body: [
              [
                { text: ' T° : ', bold: true, alignment: 'center', fontSize: 12},
                { text: ' N° :', bold: true, alignment: 'center', fontSize: 12},
                { text: ' F° :', bold: true, alignment: 'center', fontSize: 12},
                { text: ' A° :', bold: true, alignment: 'center', fontSize: 12},
                { text: '', bold: true, alignment: 'center', fontSize: 12},
                { text: ' ', bold: true, alignment: 'center', fontSize: 11},
                { text: ' ', bold: true, alignment: 'center', fontSize: 11},
                { text: ' ', bold: true, alignment: 'center', fontSize: 12},
                { text: ' ', bold: true, alignment: 'center', fontSize: 12}
              ]
            ]
          }
        },
        {
          style: 'tableExample',
          table: {
            widths: [30, 30, 30,30, 70, 70, 70, 70, 50],
            body: [
              [
                { text: ' ', bold: true, alignment: 'center', fontSize: 12},
                { text: ' ', bold: true, alignment: 'center', fontSize: 12},
                { text: ' ', bold: true, alignment: 'center', fontSize: 12},
                { text: ' ', bold: true, alignment: 'center', fontSize: 12},
                { text: ' ', bold: true, alignment: 'center', fontSize: 12},
                { text: ' ', bold: true, alignment: 'center', fontSize: 11},
                { text: ' ', bold: true, alignment: 'center', fontSize: 11},
                { text: ' ', bold: true, alignment: 'center', fontSize: 12},
                { text: ' ', bold: true, alignment: 'center', fontSize: 12}
              ]
            ]
          }
        },
        {
          style: 'tableExample',
          table: {
            widths: [30, 30, 30,30, 70, 70, 70, 70, 50],
            body: [
              [
                { text: ' ', bold: true, alignment: 'center', fontSize: 12},
                { text: ' ', bold: true, alignment: 'center', fontSize: 12},
                { text: ' ', bold: true, alignment: 'center', fontSize: 12},
                { text: ' ', bold: true, alignment: 'center', fontSize: 12},
                { text: ' ', bold: true, alignment: 'center', fontSize: 12},
                { text: ' ', bold: true, alignment: 'center', fontSize: 11},
                { text: ' ', bold: true, alignment: 'center', fontSize: 11},
                { text: ' ', bold: true, alignment: 'center', fontSize: 12},
                { text: ' ', bold: true, alignment: 'center', fontSize: 12}
              ]
            ]
          }
        },
        {
          style: 'tableExample',
          table: {
            widths: [30, 30, 30,30, 70, 70, 70, 70, 50],
            body: [
              [
                { text: ' ', bold: true, alignment: 'center', fontSize: 12},
                { text: ' ', bold: true, alignment: 'center', fontSize: 12},
                { text: ' ', bold: true, alignment: 'center', fontSize: 12},
                { text: ' ', bold: true, alignment: 'center', fontSize: 12},
                { text: ' ', bold: true, alignment: 'center', fontSize: 12},
                { text: ' ', bold: true, alignment: 'center', fontSize: 11},
                { text: ' ', bold: true, alignment: 'center', fontSize: 11},
                { text: ' ', bold: true, alignment: 'center', fontSize: 12},
                { text: ' ', bold: true, alignment: 'center', fontSize: 12}
              ]
            ]
          }
        },
        {
          style: 'tableExample',
          table: {
            widths: [30, 30, 30,30, 70, 70, 70, 70, 50],
            body: [
              [
                { text: ' ', bold: true, alignment: 'center', fontSize: 12},
                { text: ' ', bold: true, alignment: 'center', fontSize: 12},
                { text: ' ', bold: true, alignment: 'center', fontSize: 12},
                { text: ' ', bold: true, alignment: 'center', fontSize: 12},
                { text: ' ', bold: true, alignment: 'center', fontSize: 12},
                { text: ' ', bold: true, alignment: 'center', fontSize: 11},
                { text: ' ', bold: true, alignment: 'center', fontSize: 11},
                { text: ' ', bold: true, alignment: 'center', fontSize: 12},
                { text: ' ', bold: true, alignment: 'center', fontSize: 12}
              ]
            ]
          }
        },
        {
          style: 'tableExample',
          table: {
            widths: [30, 30, 30,30, 70, 70, 70, 70, 50],
            body: [
              [
                { text: ' ', bold: true, alignment: 'center', fontSize: 12},
                { text: ' ', bold: true, alignment: 'center', fontSize: 12},
                { text: ' ', bold: true, alignment: 'center', fontSize: 12},
                { text: ' ', bold: true, alignment: 'center', fontSize: 12},
                { text: ' ', bold: true, alignment: 'center', fontSize: 12},
                { text: ' ', bold: true, alignment: 'center', fontSize: 11},
                { text: ' ', bold: true, alignment: 'center', fontSize: 11},
                { text: ' ', bold: true, alignment: 'center', fontSize: 12},
                { text: ' ', bold: true, alignment: 'center', fontSize: 12}
              ]
            ]
          }
        },
        {
          style: 'tableExample',
          table: {
            widths: ['*',120],
            body: [
              [
                { text: 'Intervino: ', bold: true, alignment: 'center', fontSize: 12},

                { text: '  ', bold: true, alignment: 'center', fontSize: 12},

              ],
              [
                {text: '  ', style: 'tableHeader'},

                {
                  table: {
                    widths: [30, 30, 30],
                    headerRows: 1,
                    alignment: 'center',
                    body: [
                      [
                        { text: ' D ', bold: true, alignment: 'center', fontSize: 12},
                        { text: ' M ', bold: true, alignment: 'center', fontSize: 12},
                        { text: ' A ', bold: true, alignment: 'center', fontSize: 12}
                      ],
                      [ ' ', ' ', ' '],
                    ]
                  }
                },
              ],
            ]
          }
        },
        {
          style: 'tableExample',
          table: {
            widths: [50, '*'],
            body: [
              [{text: ' 12 ', fontSize: 14, bold: true, alignment: 'center' }, { text: 'Fecha: ', bold: true, alignment: 'left', fontSize: 13}]
            ]
          }
        },
        {
          style: 'tableExample',
          table: {
            widths: [50, 50, 50,'*'],
            heights: [50, 50 , 50, 50],
            body: [
              [
                { text: ' Día ', bold: true, alignment: 'center', fontSize: 12},
                { text: ' Mes ', bold: true, alignment: 'center', fontSize: 12},
                { text: ' Año ', bold: true, alignment: 'center', fontSize: 12},
                { text: ' Firma y Sello ', bold: true, alignment: 'center', fontSize: 12}
              ]
            ]
          }
        },



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
          margin: [0, 0, 0, 0],
          heights: [20]
        },
        tableHeader: {
          bold: true,
          fontSize: 13,
          color: 'black'
        },
        tableDescripcion:{
          margin: [0, 0, 0, 0],
          heights: [20],
          padding: [50, 100, 50, 100]
        },
        paddingBottom: {
          alignment: 'center',
          margin: [0, 20, 0, 10]
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
      pageSize: 'LEGAL',

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
              [{text: ' 2 ', fontSize: 14, bold: true, alignment: 'center' }, { text: 'Ubicación del inmueble - Medidas - Linderos: ', bold: true, alignment: 'left', fontSize: 13}]
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
            widths: [30, '*', 30 , '*'],
            body: [
              [{text: ' 3 ', fontSize: 14, bold: true, alignment: 'center' }, { text: 'Antecedentes de Dominio: ', bold: true, alignment: 'left', fontSize: 13}, {text: ' 4 ', fontSize: 14, bold: true, alignment: 'center' }, { text: 'N° Matricula Registral: ', bold: true, alignment: 'left', fontSize: 13}]


            ]
          }
        },
        {
          style: 'tableExample',
          table: {
            widths: ['*','*'],
            headerRows: 1,
            body: [
              [
                {
                  table: {
                    widths: [40, 80, '*'],
                    headerRows: 1,
                    heights: [20, 20, 20],
                    body: [
                      [{text: 'Lote: ', style: 'tableHeader', alignment: 'center'},{text: 'Manzana: ', style: 'tableHeader', alignment: 'center'}, {text: 'Localidad: ', style: 'tableHeader', alignment: 'center'}],
                      [ ' ', ' ', ' '],
                    ]
                  }
                },
                {text: ' ', style: 'tableHeader'},

              ],
              [
                {
                  table: {
                    widths: ['*', '*', '*', '*'],
                    heights: [20,20,20,20],
                    headerRows: 1,
                    body: [
                      [{text: 'T°: ', style: 'tableHeader', alignment: 'left'},{text: 'F°: ', style: 'tableHeader', alignment: 'left'}, {text: 'N°: ', style: 'tableHeader', alignment: 'left'}, {text: 'Año°: ', style: 'tableHeader', alignment: 'left'}],
                      [ ' ', ' ', ' ', ' '],
                    ]
                  }
                },


                {
                  table: {
                    widths: ['*','*','*','*'],
                    heights: [40,40,40,40],
                    headerRows: 1,
                    body: [
                      [{text: 'Plano: ', alignment: 'center'},
                        {text: 'T°:',  alignment: 'left'},
                        {text: 'F°:',  alignment: 'left'},
                        {text: 'A°:',  alignment: 'left'}
                      ]
                    ]
                  }
                }

              ],

            ]
          }
        },



        {
          style: 'tableExample',
          table: {
            widths: [50, 30, 50, 50, 50, 50, 50, 30, "*"],
            body: [
              [
                { text: ' 5 ', fontSize: 14, bold: true, alignment: 'center'},
                { text: 'N° : ', bold: true, alignment: 'left', fontSize: 12},
                { text: 'Circuns. : ', bold: true, alignment: 'center', fontSize: 12},
                { text: 'Sección : ', bold: true, alignment: 'center', fontSize: 12},
                { text: 'Manzana: ', bold: true, alignment: 'center', fontSize: 12},
                { text: 'Parcela: ', bold: true, alignment: 'center', fontSize: 12},
                { text: 'Depto.: ', bold: true, alignment: 'center', fontSize: 12},
                { text: 'Hoja: ', bold: true, alignment: 'center', fontSize: 12},
                { text: 'Coordenadas: ', bold: true, alignment: 'center', fontSize: 12}
              ]
            ]
          }
        },

        {
          style: 'tableExample',
          table: {
            widths: [85, 50, 50, 50, 50, 50, 30, "*"],
            body: [
              [
                { text: ' Matricula \n Catastral:', fontSize: 14, bold: true, alignment: 'center'},
                { text: ' ', bold: true, alignment: 'center', fontSize: 12},
                { text: ' ', bold: true, alignment: 'center', fontSize: 12},
                { text: ' ', bold: true, alignment: 'center', fontSize: 12},
                { text: ' ', bold: true, alignment: 'center', fontSize: 12},
                { text: ' ', bold: true, alignment: 'center', fontSize: 12},
                { text: ' ', bold: true, alignment: 'center', fontSize: 12},
                { text: ' ', bold: true, alignment: 'center', fontSize: 12}
              ]
            ]
          }
        },

        {
          style: 'tableExample',
          table: {
            widths: [50, 40, 30, 50, 50, 70, "*"],
            body: [
              [
                { text: ' 6 ', fontSize: 14, bold: true, alignment: 'center'},
                { text: 'Unidad: ', bold: true, alignment: 'left', fontSize: 12},
                { text: 'Piso : ', bold: true, alignment: 'center', fontSize: 12},
                { text: 'Sub-Total : ', bold: true, alignment: 'center', fontSize: 12},
                { text: 'Porcent.: ', bold: true, alignment: 'center', fontSize: 12},
                { text: 'Destinada a: ', bold: true, alignment: 'center', fontSize: 12},
                { text: ' COMPLEMENTARIAS : ', bold: true, alignment: 'center', fontSize: 12}
              ]
            ]
          }
        },

        {
          style: 'tableExample',
          table: {
            widths: [100, 30, 50, 50, 70, '*'],
            body: [
              [
                { text: ' ', bold: true, alignment: 'center', fontSize: 12},
                { text: ' ', bold: true, alignment: 'center', fontSize: 12},
                { text: ' ', bold: true, alignment: 'center', fontSize: 12},
                { text: ' ', bold: true, alignment: 'center', fontSize: 12},
                { text: ' ', bold: true, alignment: 'center', fontSize: 12},
                { text: ' ', bold: true, alignment: 'center', fontSize: 12}
              ]
            ]
          }
        },


        {
          style: 'tableExample',
          table: {
            widths: [50, '*'],
            body: [
              [{text: ' 7 ', fontSize: 14, bold: true, alignment: 'center' }, { text: 'Identidad del Titular del Dominio: ', bold: true, alignment: 'left', fontSize: 13}]
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
            widths: ['*'],
            body: [
              [{ text: 'Firma y Sello: ', bold: true, alignment: 'center', fontSize: 13}]
            ]
          }
        },
        {
          style: 'tableExample',
          table: {
            widths: ['*'],
            heights: [80],
            body: [
              [{ text: ' ' , italics: true, alignment: 'center'}]
            ]
          }
        },
        {text: 'Registro General de la Propiedad Inmueble', style: 'paddingBottom'},
        {text: 'La Rioja - Republica Argentina', style: 'subheader'},



        ////////////////
        ////////Pagina 2
        ////////////////



        {
          style: 'tableExample',
          table: {
            widths: [50, '*'],
            body: [
              [{text: ' 8 ', fontSize: 14, bold: true, alignment: 'center' }, { text: 'Observaciones: ', bold: true, alignment: 'left', fontSize: 13}]
            ]
          },
          pageBreak: 'before'
        },
        {
          style: 'tableExample',
          table: {
            widths: ['*'],
            heights: [50],
            body: [
              [{ text: ' ' , italics: true, alignment: 'center'}]
            ]
          }
        },

        {
          style: 'tableExample',
          table: {
            widths: [50, '*'],
            body: [
              [{text: ' 9 ', fontSize: 14, bold: true, alignment: 'center' }, { text: 'El dominio consta a nombre de: ', bold: true, alignment: 'left', fontSize: 13}]
            ]
          }
        },
        {
          style: 'tableExample',
          table: {
            widths: ['*'],
            heights: [70],
            body: [
              [{ text: ' ' , italics: true, alignment: 'center'}]
            ]
          }
        },
        {
          style: 'tableExample',
          table: {
            widths: [50, '*'],
            body: [
              [{text: ' 10 ', fontSize: 14, bold: true, alignment: 'center' }, { text: 'Prevenciones: ', bold: true, alignment: 'left', fontSize: 13}]
            ]
          }
        },
        {
          style: 'tableDescripcion',
          table: {
            widths: ['*'],
            body: [
              [
                {
                  text: ' Articulo 25 Ley 17.801 - con Fecha:                       de                                         de             ',
                  fontSize: 12,
                  alignment: 'left',
                  margin: [0, 12, 0, 0]
                }
              ],
              [
                {
                  text:' Entró Certificado N°                                                       Operación                                 ',
                  fontSize: 12,
                  alignment: 'left',
                  margin: [0, 12, 0, 0]
                }
              ],
              [
                {
                  text:' Escribano registro N°                                                   de                                            ',
                  fontSize: 12,
                  alignment: 'left',
                  margin: [0, 12, 0, 0]
                }
              ]
            ]
          },
          layout: {
            hLineWidth: function (i, node) {
              return (i === 0 || i === node.table.body.length) ? 1 : 1;
            },
            vLineWidth: function (i, node) {
              return (i === 0 || i === node.table.widths.length) ? 1 : 1;
            },
            hLineColor: function (i, node) {
              return (i === 0 || i === node.table.body.length) ? 'black' : 'gray';
            },
            vLineColor: function (i, node) {
              return (i === 0 || i === node.table.widths.length) ? 'black' : 'gray';
            },

          }
        },
        {
          style: 'tableExample',
          table: {
            widths: [50, 55, 100, "*", 80, 50],
            body: [
              [
                {text: ' 8 ', fontSize: 14, bold: true, alignment: 'center'},
                { text: 'Hipoteca: ', bold: true, alignment: 'center', fontSize: 12},
                { text: 'Fecha de la escritura: ', bold: true, alignment: 'center', fontSize: 12},
                { text: 'Escribano o Autoridad Administrativa: ', bold: true, alignment: 'center', fontSize: 12},
                { text: 'Acreedor: ', bold: true, alignment: 'center', fontSize: 12},
                { text: 'Monto: ', bold: true, alignment: 'center', fontSize: 12}
              ]
            ]
          }
        },
        {
          style: 'tableExample',
          table: {
            widths: [30, 30, 35, 100, 60, '*', 80, 50],
            body: [
              [
                { text: ' N° : ', bold: true, alignment: 'center', fontSize: 12},
                { text: ' F° :', bold: true, alignment: 'center', fontSize: 12},
                { text: ' A° :', bold: true, alignment: 'center', fontSize: 12},
                { text: '', bold: true, alignment: 'center', fontSize: 12},
                { text: 'Registro: ', bold: true, alignment: 'center', fontSize: 11},
                { text: 'Lugar : ', bold: true, alignment: 'center', fontSize: 11},
                { text: ' ', bold: true, alignment: 'center', fontSize: 12},
                { text: ' ', bold: true, alignment: 'center', fontSize: 12}
              ]
            ]
          }
        },
        {
          style: 'tableExample',
          table: {
            widths: [30, 30, 35, 100, 60, '*', 80, 50],
            body: [
              [
                { text: ' ', bold: true, alignment: 'center', fontSize: 12},
                { text: ' ', bold: true, alignment: 'center', fontSize: 12},
                { text: ' ', bold: true, alignment: 'center', fontSize: 12},
                { text: ' ', bold: true, alignment: 'center', fontSize: 12},
                { text: ' ', bold: true, alignment: 'center', fontSize: 11},
                { text: ' ', bold: true, alignment: 'center', fontSize: 11},
                { text: ' ', bold: true, alignment: 'center', fontSize: 12},
                { text: ' ', bold: true, alignment: 'center', fontSize: 12}
              ]
            ]
          }
        },
        {
          style: 'tableExample',
          table: {
            widths: [30, 30, 35, 100, 60, '*', 80, 50],
            body: [
              [
                { text: ' ', bold: true, alignment: 'center', fontSize: 12},
                { text: ' ', bold: true, alignment: 'center', fontSize: 12},
                { text: ' ', bold: true, alignment: 'center', fontSize: 12},
                { text: ' ', bold: true, alignment: 'center', fontSize: 12},
                { text: ' ', bold: true, alignment: 'center', fontSize: 11},
                { text: ' ', bold: true, alignment: 'center', fontSize: 11},
                { text: ' ', bold: true, alignment: 'center', fontSize: 12},
                { text: ' ', bold: true, alignment: 'center', fontSize: 12}
              ]
            ]
          }
        },
        {
          style: 'tableExample',
          table: {
            widths: [30, 30, 35, 100, 60, '*', 80, 50],
            body: [
              [
                { text: ' ', bold: true, alignment: 'center', fontSize: 12},
                { text: ' ', bold: true, alignment: 'center', fontSize: 12},
                { text: ' ', bold: true, alignment: 'center', fontSize: 12},
                { text: ' ', bold: true, alignment: 'center', fontSize: 12},
                { text: ' ', bold: true, alignment: 'center', fontSize: 11},
                { text: ' ', bold: true, alignment: 'center', fontSize: 11},
                { text: ' ', bold: true, alignment: 'center', fontSize: 12},
                { text: ' ', bold: true, alignment: 'center', fontSize: 12}
              ]
            ]
          }
        },
        {
          style: 'tableExample',
          table: {
            widths: [30, 30, 35, 100, 60, '*', 80, 50],
            body: [
              [
                { text: ' ', bold: true, alignment: 'center', fontSize: 12},
                { text: ' ', bold: true, alignment: 'center', fontSize: 12},
                { text: ' ', bold: true, alignment: 'center', fontSize: 12},
                { text: ' ', bold: true, alignment: 'center', fontSize: 12},
                { text: ' ', bold: true, alignment: 'center', fontSize: 11},
                { text: ' ', bold: true, alignment: 'center', fontSize: 11},
                { text: ' ', bold: true, alignment: 'center', fontSize: 12},
                { text: ' ', bold: true, alignment: 'center', fontSize: 12}
              ]
            ]
          }
        },
        {
          style: 'tableExample',
          table: {
            widths: [30, 30, 35, 100, 60, '*', 80, 50],
            body: [
              [
                { text: ' ', bold: true, alignment: 'center', fontSize: 12},
                { text: ' ', bold: true, alignment: 'center', fontSize: 12},
                { text: ' ', bold: true, alignment: 'center', fontSize: 12},
                { text: ' ', bold: true, alignment: 'center', fontSize: 12},
                { text: ' ', bold: true, alignment: 'center', fontSize: 11},
                { text: ' ', bold: true, alignment: 'center', fontSize: 11},
                { text: ' ', bold: true, alignment: 'center', fontSize: 12},
                { text: ' ', bold: true, alignment: 'center', fontSize: 12}
              ]
            ]
          }
        },
        {
          style: 'tableExample',
          table: {
            widths: ['*',120],
            body: [
              [
                { text: 'Intervino: ', bold: true, alignment: 'center', fontSize: 12},

                { text: '  ', bold: true, alignment: 'center', fontSize: 12},

              ],
              [
                {text: '  ', style: 'tableHeader'},

                {
                  table: {
                    widths: [30, 30, 30],
                    headerRows: 1,
                    alignment: 'center',
                    body: [
                      [
                        { text: ' D ', bold: true, alignment: 'center', fontSize: 12},
                        { text: ' M ', bold: true, alignment: 'center', fontSize: 12},
                        { text: ' A ', bold: true, alignment: 'center', fontSize: 12}
                      ],
                      [ ' ', ' ', ' '],
                    ]
                  }
                },
              ],
            ]
          }
        },
        {
          style: 'tableExample',
          table: {
            widths: [50, '*', 70, 70, 70, 70, 50],
            body: [
              [
                {text: ' 11 ', fontSize: 14, bold: true, alignment: 'center'},
                { text: 'Embargos y otras Anotaciones: ', bold: true, alignment: 'center', fontSize: 11},
                { text: 'Fecha: ', bold: true, alignment: 'center', fontSize: 12},
                { text: 'Autos: ', bold: true, alignment: 'center', fontSize: 12},
                { text: 'Juzgado: ', bold: true, alignment: 'center', fontSize: 12},
                { text: 'Secretaría: ', bold: true, alignment: 'center', fontSize: 12},
                { text: 'Monto: ', bold: true, alignment: 'center', fontSize: 12}
              ]
            ]
          }
        },
        {
          style: 'tableExample',
          table: {
            widths: [30, 30, 30,30, 70, 70, 70, 70, 50],
            body: [
              [
                { text: ' T° : ', bold: true, alignment: 'center', fontSize: 12},
                { text: ' N° :', bold: true, alignment: 'center', fontSize: 12},
                { text: ' F° :', bold: true, alignment: 'center', fontSize: 12},
                { text: ' A° :', bold: true, alignment: 'center', fontSize: 12},
                { text: '', bold: true, alignment: 'center', fontSize: 12},
                { text: ' ', bold: true, alignment: 'center', fontSize: 11},
                { text: ' ', bold: true, alignment: 'center', fontSize: 11},
                { text: ' ', bold: true, alignment: 'center', fontSize: 12},
                { text: ' ', bold: true, alignment: 'center', fontSize: 12}
              ]
            ]
          }
        },
        {
          style: 'tableExample',
          table: {
            widths: [30, 30, 30,30, 70, 70, 70, 70, 50],
            body: [
              [
                { text: ' ', bold: true, alignment: 'center', fontSize: 12},
                { text: ' ', bold: true, alignment: 'center', fontSize: 12},
                { text: ' ', bold: true, alignment: 'center', fontSize: 12},
                { text: ' ', bold: true, alignment: 'center', fontSize: 12},
                { text: ' ', bold: true, alignment: 'center', fontSize: 12},
                { text: ' ', bold: true, alignment: 'center', fontSize: 11},
                { text: ' ', bold: true, alignment: 'center', fontSize: 11},
                { text: ' ', bold: true, alignment: 'center', fontSize: 12},
                { text: ' ', bold: true, alignment: 'center', fontSize: 12}
              ]
            ]
          }
        },
        {
          style: 'tableExample',
          table: {
            widths: [30, 30, 30,30, 70, 70, 70, 70, 50],
            body: [
              [
                { text: ' ', bold: true, alignment: 'center', fontSize: 12},
                { text: ' ', bold: true, alignment: 'center', fontSize: 12},
                { text: ' ', bold: true, alignment: 'center', fontSize: 12},
                { text: ' ', bold: true, alignment: 'center', fontSize: 12},
                { text: ' ', bold: true, alignment: 'center', fontSize: 12},
                { text: ' ', bold: true, alignment: 'center', fontSize: 11},
                { text: ' ', bold: true, alignment: 'center', fontSize: 11},
                { text: ' ', bold: true, alignment: 'center', fontSize: 12},
                { text: ' ', bold: true, alignment: 'center', fontSize: 12}
              ]
            ]
          }
        },
        {
          style: 'tableExample',
          table: {
            widths: [30, 30, 30,30, 70, 70, 70, 70, 50],
            body: [
              [
                { text: ' ', bold: true, alignment: 'center', fontSize: 12},
                { text: ' ', bold: true, alignment: 'center', fontSize: 12},
                { text: ' ', bold: true, alignment: 'center', fontSize: 12},
                { text: ' ', bold: true, alignment: 'center', fontSize: 12},
                { text: ' ', bold: true, alignment: 'center', fontSize: 12},
                { text: ' ', bold: true, alignment: 'center', fontSize: 11},
                { text: ' ', bold: true, alignment: 'center', fontSize: 11},
                { text: ' ', bold: true, alignment: 'center', fontSize: 12},
                { text: ' ', bold: true, alignment: 'center', fontSize: 12}
              ]
            ]
          }
        },
        {
          style: 'tableExample',
          table: {
            widths: [30, 30, 30,30, 70, 70, 70, 70, 50],
            body: [
              [
                { text: ' ', bold: true, alignment: 'center', fontSize: 12},
                { text: ' ', bold: true, alignment: 'center', fontSize: 12},
                { text: ' ', bold: true, alignment: 'center', fontSize: 12},
                { text: ' ', bold: true, alignment: 'center', fontSize: 12},
                { text: ' ', bold: true, alignment: 'center', fontSize: 12},
                { text: ' ', bold: true, alignment: 'center', fontSize: 11},
                { text: ' ', bold: true, alignment: 'center', fontSize: 11},
                { text: ' ', bold: true, alignment: 'center', fontSize: 12},
                { text: ' ', bold: true, alignment: 'center', fontSize: 12}
              ]
            ]
          }
        },
        {
          style: 'tableExample',
          table: {
            widths: [30, 30, 30,30, 70, 70, 70, 70, 50],
            body: [
              [
                { text: ' ', bold: true, alignment: 'center', fontSize: 12},
                { text: ' ', bold: true, alignment: 'center', fontSize: 12},
                { text: ' ', bold: true, alignment: 'center', fontSize: 12},
                { text: ' ', bold: true, alignment: 'center', fontSize: 12},
                { text: ' ', bold: true, alignment: 'center', fontSize: 12},
                { text: ' ', bold: true, alignment: 'center', fontSize: 11},
                { text: ' ', bold: true, alignment: 'center', fontSize: 11},
                { text: ' ', bold: true, alignment: 'center', fontSize: 12},
                { text: ' ', bold: true, alignment: 'center', fontSize: 12}
              ]
            ]
          }
        },
        {
          style: 'tableExample',
          table: {
            widths: ['*',120],
            body: [
              [
                { text: 'Intervino: ', bold: true, alignment: 'center', fontSize: 12},

                { text: '  ', bold: true, alignment: 'center', fontSize: 12},

              ],
              [
                {text: '  ', style: 'tableHeader'},

                {
                  table: {
                    widths: [30, 30, 30],
                    headerRows: 1,
                    alignment: 'center',
                    body: [
                      [
                        { text: ' D ', bold: true, alignment: 'center', fontSize: 12},
                        { text: ' M ', bold: true, alignment: 'center', fontSize: 12},
                        { text: ' A ', bold: true, alignment: 'center', fontSize: 12}
                      ],
                      [ ' ', ' ', ' '],
                    ]
                  }
                },
              ],
            ]
          }
        },
        {
          style: 'tableExample',
          table: {
            widths: [50, '*'],
            body: [
              [{text: ' 12 ', fontSize: 14, bold: true, alignment: 'center' }, { text: 'Fecha: ', bold: true, alignment: 'left', fontSize: 13}]
            ]
          }
        },
        {
          style: 'tableExample',
          table: {
            widths: [50, 50, 50,'*'],
            heights: [50, 50 , 50, 50],
            body: [
              [
                { text: ' Día ', bold: true, alignment: 'center', fontSize: 12},
                { text: ' Mes ', bold: true, alignment: 'center', fontSize: 12},
                { text: ' Año ', bold: true, alignment: 'center', fontSize: 12},
                { text: ' Firma y Sello ', bold: true, alignment: 'center', fontSize: 12}
              ]
            ]
          }
        },



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
          margin: [0, 0, 0, 0],
          heights: [20]
        },
        tableHeader: {
          bold: true,
          fontSize: 13,
          color: 'black'
        },
        tableDescripcion:{
          margin: [0, 0, 0, 0],
          heights: [20],
          padding: [50, 100, 50, 100]
        },
        paddingBottom: {
          alignment: 'center',
          margin: [0, 20, 0, 10]
        }
      }
    };

    pdfMake.createPdf(FormularioMinG).download('Minuta G - '+ apellido + ' ' + nombre);
  }


  // Minuta H
    //Imprimir y Descargar


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
      pageSize: 'LEGAL',

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
            widths: [150, '*'],
            body: [
              [{text: 'Fecha de Nacimiento: ', fontSize: 14, bold: true, alignment: 'left' }, {text: fechNac, fontSize: 12, bold: true, alignment: 'center' }]

            ]
          }
        },

        {
          style: 'tableExample',
          table: {
            widths: [50, '*'],
            body: [
              [{text: ' 3 ', fontSize: 14, bold: true, alignment: 'center' }, { text: 'Nombre de la sociedad: ', bold: true, alignment: 'left', fontSize: 13}]
            ]
          }
        },
        {
          style: 'tableExample',
          table: {
            widths: ['*'],
            body: [
              [
                {
                  text: '  ',
                  fontSize: 12,
                  alignment: 'left',
                  margin: [0, 12, 0, 0]
                }
              ],
              [
                {
                  text: ' Domicilio: ',
                  fontSize: 12,
                  alignment: 'left',
                  margin: [0, 12, 0, 0]
                }
              ],
              [
                {
                  text: ' Insc. Reg. Pub. Com.: ',
                  fontSize: 12,
                  alignment: 'left',
                  margin: [0, 12, 0, 0]
                }
              ]
            ]
          }
        },

        {
          style: 'tableExample',
          table: {
            widths: [50, '*'],
            body: [
              [{text: ' 4 ', fontSize: 14, bold: true, alignment: 'center' }, { text: 'Si se trata de asociaciones civiles, consignar datos pertinentes: ', bold: true, alignment: 'left', fontSize: 13}]
            ]
          }
        },
        {
          style: 'tableExample',
          table: {
            widths: ['*'],
            heights: [50],
            body: [
              [{ text: ' ' , italics: true, alignment: 'center'}]
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
          }
        },

        {
          style: 'tableExample',
          table: {
            widths: [150,'*'],
            headerRows: 1,
            body: [
              [{text: 'Domicilio: ', style: 'tableHeader'}, {text: '   ', alignment: 'center'}]
            ]
          }
        },

        {
          style: 'tableExample',
          table: {
            widths: [50,'*'],
            body: [
              [{text: ' 5 ', fontSize: 14, bold: true, alignment: 'center' }, { text: 'Firma y Sello: ', bold: true, alignment: 'center', fontSize: 13}]
            ]
          }
        },
        {
          style: 'tableExample',
          table: {
            widths: ['*'],
            heights: [100],
            body: [
              [{ text: ' ' , italics: true, alignment: 'center'}]
            ]
          }
        },
        {text: 'Dirección General de Registro de la Propiedad Inmueble', style: 'subheader'},
        {text: 'La Rioja - Republica Argentina', style: 'subheader'},



        ////////////////
        ////////Pagina 2
        ////////////////



        {
          style: 'tableExample',
          table: {
            widths: [50, '*'],
            body: [
              [{text: ' 6 ', fontSize: 14, bold: true, alignment: 'center' }, { text: 'Observaciones: Salvedad de enmendaduras:  ', bold: true, alignment: 'left', fontSize: 13}]
            ]
          },
          pageBreak: 'before'
        },

        {
          style: 'tableExample',
          table: {
            widths: ['*'],
            heights: [50],
            body: [
              [{ text: ' ' , italics: true, alignment: 'center'}]
            ]
          }
        },


        {
          style: 'tableExample',
          table: {
            widths: [50, '*'],
            body: [
              [{text: ' 7 ', fontSize: 14, bold: true, alignment: 'center' }, { text: 'Búsqueda por indices de Titulares:  ', bold: true, alignment: 'left', fontSize: 13}]
            ]
          }
        },

        {
          style: 'tableExample',
          table: {
            widths: [30, 30, 30, 30, 30, 30, 30, 30, '*'],
            body: [
              [
                { text: ' T°: ', bold: true, alignment: 'center', fontSize: 12},
                { text: ' N° : ', bold: true, alignment: 'center', fontSize: 12},
                { text: ' F° :', bold: true, alignment: 'center', fontSize: 12},
                { text: ' A° :', bold: true, alignment: 'center', fontSize: 12},
                { text: ' T°: ', bold: true, alignment: 'center', fontSize: 12},
                { text: ' N° : ', bold: true, alignment: 'center', fontSize: 12},
                { text: ' F° :', bold: true, alignment: 'center', fontSize: 12},
                { text: ' A° :', bold: true, alignment: 'center', fontSize: 12},
                { text: ' Matricula N° ', bold: true, alignment: 'center', fontSize: 12}
              ]
            ]
          }
        },

        {
          style: 'tableExample',
          table: {
            widths: [30, 30, 30, 30, 30, 30, 30, 30, '*'],
            body: [
              [
                { text: ' ', bold: true, alignment: 'center', fontSize: 12},
                { text: ' ', bold: true, alignment: 'center', fontSize: 12},
                { text: ' ', bold: true, alignment: 'center', fontSize: 12},
                { text: ' ', bold: true, alignment: 'center', fontSize: 12},
                { text: ' ', bold: true, alignment: 'center', fontSize: 12},
                { text: ' ', bold: true, alignment: 'center', fontSize: 12},
                { text: ' ', bold: true, alignment: 'center', fontSize: 12},
                { text: ' ', bold: true, alignment: 'center', fontSize: 12},
                { text: ' ', bold: true, alignment: 'center', fontSize: 12}
              ]
            ]
          }
        },

        {
          style: 'tableExample',
          table: {
            widths: [30, 30, 30, 30, 30, 30, 30, 30, '*'],
            body: [
              [
                { text: ' ', bold: true, alignment: 'center', fontSize: 12},
                { text: ' ', bold: true, alignment: 'center', fontSize: 12},
                { text: ' ', bold: true, alignment: 'center', fontSize: 12},
                { text: ' ', bold: true, alignment: 'center', fontSize: 12},
                { text: ' ', bold: true, alignment: 'center', fontSize: 12},
                { text: ' ', bold: true, alignment: 'center', fontSize: 12},
                { text: ' ', bold: true, alignment: 'center', fontSize: 12},
                { text: ' ', bold: true, alignment: 'center', fontSize: 12},
                { text: ' ', bold: true, alignment: 'center', fontSize: 12}
              ]
            ]
          }
        },

        {
          style: 'tableExample',
          table: {
            widths: [30, 30, 30, 30, 30, 30, 30, 30, '*'],
            body: [
              [
                { text: ' ', bold: true, alignment: 'center', fontSize: 12},
                { text: ' ', bold: true, alignment: 'center', fontSize: 12},
                { text: ' ', bold: true, alignment: 'center', fontSize: 12},
                { text: ' ', bold: true, alignment: 'center', fontSize: 12},
                { text: ' ', bold: true, alignment: 'center', fontSize: 12},
                { text: ' ', bold: true, alignment: 'center', fontSize: 12},
                { text: ' ', bold: true, alignment: 'center', fontSize: 12},
                { text: ' ', bold: true, alignment: 'center', fontSize: 12},
                { text: ' ', bold: true, alignment: 'center', fontSize: 12}
              ]
            ]
          }
        },

        {
          style: 'tableExample',
          table: {
            widths: [30, 30, 30, 30, 30, 30, 30, 30, '*'],
            body: [
              [
                { text: ' ', bold: true, alignment: 'center', fontSize: 12},
                { text: ' ', bold: true, alignment: 'center', fontSize: 12},
                { text: ' ', bold: true, alignment: 'center', fontSize: 12},
                { text: ' ', bold: true, alignment: 'center', fontSize: 12},
                { text: ' ', bold: true, alignment: 'center', fontSize: 12},
                { text: ' ', bold: true, alignment: 'center', fontSize: 12},
                { text: ' ', bold: true, alignment: 'center', fontSize: 12},
                { text: ' ', bold: true, alignment: 'center', fontSize: 12},
                { text: ' ', bold: true, alignment: 'center', fontSize: 12}
              ]
            ]
          }
        },


        {
          style: 'tableExample',
          table: {
            widths: ['*',120],
            body: [
              [
                { text: 'Firma y Sello : ', bold: true, alignment: 'center', fontSize: 12},

                { text: '  ', bold: true, alignment: 'center', fontSize: 12},

              ],
              [
                {text: '  ', style: 'tableHeader'},

                {
                  table: {
                    widths: [30, 30, 30],
                    headerRows: 1,
                    alignment: 'center',
                    body: [
                      [
                        { text: ' D ', bold: true, alignment: 'center', fontSize: 12},
                        { text: ' M ', bold: true, alignment: 'center', fontSize: 12},
                        { text: ' A ', bold: true, alignment: 'center', fontSize: 12}
                      ],
                      [ ' ', ' ', ' '],
                    ]
                  }
                },
              ],
            ]
          }
        },


        {
          style: 'tableExample',
          table: {
            widths: [50, '*'],
            body: [
              [{text: ' 8 ', fontSize: 14, bold: true, alignment: 'center' }, { text: 'Búsqueda por indices de Titulares:  ', bold: true, alignment: 'left', fontSize: 13}]
            ]
          }
        },

        {
          style: 'tableExample',
          table: {
            widths: [30, 30, 30, 30, 30, 30, 30, 30, '*'],
            body: [
              [
                { text: ' T°: ', bold: true, alignment: 'center', fontSize: 12},
                { text: ' N° : ', bold: true, alignment: 'center', fontSize: 12},
                { text: ' F° :', bold: true, alignment: 'center', fontSize: 12},
                { text: ' A° :', bold: true, alignment: 'center', fontSize: 12},
                { text: ' T°: ', bold: true, alignment: 'center', fontSize: 12},
                { text: ' N° : ', bold: true, alignment: 'center', fontSize: 12},
                { text: ' F° :', bold: true, alignment: 'center', fontSize: 12},
                { text: ' A° :', bold: true, alignment: 'center', fontSize: 12},
                { text: ' Matricula N° ', bold: true, alignment: 'center', fontSize: 12}
              ]
            ]
          }
        },

        {
          style: 'tableExample',
          table: {
            widths: [30, 30, 30, 30, 30, 30, 30, 30, '*'],
            body: [
              [
                { text: ' ', bold: true, alignment: 'center', fontSize: 12},
                { text: ' ', bold: true, alignment: 'center', fontSize: 12},
                { text: ' ', bold: true, alignment: 'center', fontSize: 12},
                { text: ' ', bold: true, alignment: 'center', fontSize: 12},
                { text: ' ', bold: true, alignment: 'center', fontSize: 12},
                { text: ' ', bold: true, alignment: 'center', fontSize: 12},
                { text: ' ', bold: true, alignment: 'center', fontSize: 12},
                { text: ' ', bold: true, alignment: 'center', fontSize: 12},
                { text: ' ', bold: true, alignment: 'center', fontSize: 12}
              ]
            ]
          }
        },

        {
          style: 'tableExample',
          table: {
            widths: [30, 30, 30, 30, 30, 30, 30, 30, '*'],
            body: [
              [
                { text: ' ', bold: true, alignment: 'center', fontSize: 12},
                { text: ' ', bold: true, alignment: 'center', fontSize: 12},
                { text: ' ', bold: true, alignment: 'center', fontSize: 12},
                { text: ' ', bold: true, alignment: 'center', fontSize: 12},
                { text: ' ', bold: true, alignment: 'center', fontSize: 12},
                { text: ' ', bold: true, alignment: 'center', fontSize: 12},
                { text: ' ', bold: true, alignment: 'center', fontSize: 12},
                { text: ' ', bold: true, alignment: 'center', fontSize: 12},
                { text: ' ', bold: true, alignment: 'center', fontSize: 12}
              ]
            ]
          }
        },

        {
          style: 'tableExample',
          table: {
            widths: [30, 30, 30, 30, 30, 30, 30, 30, '*'],
            body: [
              [
                { text: ' ', bold: true, alignment: 'center', fontSize: 12},
                { text: ' ', bold: true, alignment: 'center', fontSize: 12},
                { text: ' ', bold: true, alignment: 'center', fontSize: 12},
                { text: ' ', bold: true, alignment: 'center', fontSize: 12},
                { text: ' ', bold: true, alignment: 'center', fontSize: 12},
                { text: ' ', bold: true, alignment: 'center', fontSize: 12},
                { text: ' ', bold: true, alignment: 'center', fontSize: 12},
                { text: ' ', bold: true, alignment: 'center', fontSize: 12},
                { text: ' ', bold: true, alignment: 'center', fontSize: 12}
              ]
            ]
          }
        },

        {
          style: 'tableExample',
          table: {
            widths: [30, 30, 30, 30, 30, 30, 30, 30, '*'],
            body: [
              [
                { text: ' ', bold: true, alignment: 'center', fontSize: 12},
                { text: ' ', bold: true, alignment: 'center', fontSize: 12},
                { text: ' ', bold: true, alignment: 'center', fontSize: 12},
                { text: ' ', bold: true, alignment: 'center', fontSize: 12},
                { text: ' ', bold: true, alignment: 'center', fontSize: 12},
                { text: ' ', bold: true, alignment: 'center', fontSize: 12},
                { text: ' ', bold: true, alignment: 'center', fontSize: 12},
                { text: ' ', bold: true, alignment: 'center', fontSize: 12},
                { text: ' ', bold: true, alignment: 'center', fontSize: 12}
              ]
            ]
          }
        },


        {
          style: 'tableExample',
          table: {
            widths: ['*',120],
            body: [
              [
                { text: 'Firma y Sello : ', bold: true, alignment: 'center', fontSize: 12},

                { text: '  ', bold: true, alignment: 'center', fontSize: 12},

              ],
              [
                {text: '  ', style: 'tableHeader'},

                {
                  table: {
                    widths: [30, 30, 30],
                    headerRows: 1,
                    alignment: 'center',
                    body: [
                      [
                        { text: ' D ', bold: true, alignment: 'center', fontSize: 12},
                        { text: ' M ', bold: true, alignment: 'center', fontSize: 12},
                        { text: ' A ', bold: true, alignment: 'center', fontSize: 12}
                      ],
                      [ ' ', ' ', ' '],
                    ]
                  }
                },
              ],
            ]
          }
        },


        {
          style: 'tableExample',
          table: {
            widths: [50, '*'],
            body: [
              [{text: ' 9 ', fontSize: 14, bold: true, alignment: 'center' }, { text: 'Resultado del Informe - Registración - Carácter de la misma:  ', bold: true, alignment: 'left', fontSize: 13}]
            ]
          }
        },

        {
          style: 'tableExample',
          table: {
            widths: ['*'],
            heights: [80],
            body: [
              [{ text: ' ' , italics: true, alignment: 'center'}]
            ]
          }
        },

        {
          style: 'tableExample',
          table: {
            widths: [50,'*', 120],
            body: [
              [
                { text: ' 10 ', bold: true, alignment: 'center', fontSize: 12},

                { text: ' Firma y Sello del jefe informante ', bold: true, alignment: 'center', fontSize: 12},

                { text: '  ', bold: true, alignment: 'center', fontSize: 12},

              ],
              [
                {text: '   ', style: 'tableHeader'},

                {text: '   ', style: 'tableHeader'},

                {
                  table: {
                    widths: [30, 30, 30],
                    headerRows: 1,
                    alignment: 'right',
                    body: [
                      [
                        { text: ' D ', bold: true, alignment: 'center', fontSize: 12},
                        { text: ' M ', bold: true, alignment: 'center', fontSize: 12},
                        { text: ' A ', bold: true, alignment: 'center', fontSize: 12}
                      ],
                      [ ' ', ' ', ' '],
                    ]
                  }
                },




              ],
            ]
          }
        },


        {
          style: 'tableExample',
          table: {
            widths: ['*',120],
            body: [
              [
                { text: 'Devolución de minuta H - Retirada por: ', bold: true, alignment: 'left', fontSize: 12},

                {text: ' Fecha:  ', alignment: 'center', fontSize: 13},



              ],
              [
                { text: ' Apellido y Nombre: \n' +
                    ' Domicilio: \n \n'+
                    '\n Firma: \n'
                  , bold: true, alignment: 'left', fontSize: 12},

                {
                  table: {
                    widths: [30, 30, 30],
                    headerRows: 1,
                    alignment: 'center',
                    body: [
                      [
                        { text: ' D ', bold: true, alignment: 'center', fontSize: 12},
                        { text: ' M ', bold: true, alignment: 'center', fontSize: 12},
                        { text: ' A ', bold: true, alignment: 'center', fontSize: 12}
                      ],
                      [ ' ', ' ', ' '],
                    ]
                  }
                },
              ],
            ]
          }
        },





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
          margin: [0, 0, 0, 0],
          heights: [20]
        },
        tableHeader: {
          bold: true,
          fontSize: 13,
          color: 'black'
        },
        tableDescripcion:{
          margin: [0, 0, 0, 0],
          heights: [20],
          padding: [50, 100, 50, 100]
        },
        paddingBottom: {
          alignment: 'center',
          margin: [0, 20, 0, 10]
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
      pageSize: 'LEGAL',

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
            widths: [150, '*'],
            body: [
              [{text: 'Fecha de Nacimiento: ', fontSize: 14, bold: true, alignment: 'left' }, {text: fechNac, fontSize: 12, bold: true, alignment: 'center' }]

            ]
          }
        },

        {
          style: 'tableExample',
          table: {
            widths: [50, '*'],
            body: [
              [{text: ' 3 ', fontSize: 14, bold: true, alignment: 'center' }, { text: 'Nombre de la sociedad: ', bold: true, alignment: 'left', fontSize: 13}]
            ]
          }
        },
        {
          style: 'tableExample',
          table: {
            widths: ['*'],
            body: [
              [
                {
                  text: '  ',
                  fontSize: 12,
                  alignment: 'left',
                  margin: [0, 12, 0, 0]
                }
              ],
              [
                {
                  text: ' Domicilio: ',
                  fontSize: 12,
                  alignment: 'left',
                  margin: [0, 12, 0, 0]
                }
              ],
              [
                {
                  text: ' Insc. Reg. Pub. Com.: ',
                  fontSize: 12,
                  alignment: 'left',
                  margin: [0, 12, 0, 0]
                }
              ]
            ]
          }
        },

        {
          style: 'tableExample',
          table: {
            widths: [50, '*'],
            body: [
              [{text: ' 4 ', fontSize: 14, bold: true, alignment: 'center' }, { text: 'Si se trata de asociaciones civiles, consignar datos pertinentes: ', bold: true, alignment: 'left', fontSize: 13}]
            ]
          }
        },
        {
          style: 'tableExample',
          table: {
            widths: ['*'],
            heights: [50],
            body: [
              [{ text: ' ' , italics: true, alignment: 'center'}]
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
          }
        },

        {
          style: 'tableExample',
          table: {
            widths: [150,'*'],
            headerRows: 1,
            body: [
              [{text: 'Domicilio: ', style: 'tableHeader'}, {text: '   ', alignment: 'center'}]
            ]
          }
        },

        {
          style: 'tableExample',
          table: {
            widths: [50,'*'],
            body: [
              [{text: ' 5 ', fontSize: 14, bold: true, alignment: 'center' }, { text: 'Firma y Sello: ', bold: true, alignment: 'center', fontSize: 13}]
            ]
          }
        },
        {
          style: 'tableExample',
          table: {
            widths: ['*'],
            heights: [100],
            body: [
              [{ text: ' ' , italics: true, alignment: 'center'}]
            ]
          }
        },
        {text: 'Dirección General de Registro de la Propiedad Inmueble', style: 'subheader'},
        {text: 'La Rioja - Republica Argentina', style: 'subheader'},



        ////////////////
        ////////Pagina 2
        ////////////////



        {
          style: 'tableExample',
          table: {
            widths: [50, '*'],
            body: [
              [{text: ' 6 ', fontSize: 14, bold: true, alignment: 'center' }, { text: 'Observaciones: Salvedad de enmendaduras:  ', bold: true, alignment: 'left', fontSize: 13}]
            ]
          },
          pageBreak: 'before'
        },

        {
          style: 'tableExample',
          table: {
            widths: ['*'],
            heights: [50],
            body: [
              [{ text: ' ' , italics: true, alignment: 'center'}]
            ]
          }
        },


        {
          style: 'tableExample',
          table: {
            widths: [50, '*'],
            body: [
              [{text: ' 7 ', fontSize: 14, bold: true, alignment: 'center' }, { text: 'Búsqueda por indices de Titulares:  ', bold: true, alignment: 'left', fontSize: 13}]
            ]
          }
        },

        {
          style: 'tableExample',
          table: {
            widths: [30, 30, 30, 30, 30, 30, 30, 30, '*'],
            body: [
              [
                { text: ' T°: ', bold: true, alignment: 'center', fontSize: 12},
                { text: ' N° : ', bold: true, alignment: 'center', fontSize: 12},
                { text: ' F° :', bold: true, alignment: 'center', fontSize: 12},
                { text: ' A° :', bold: true, alignment: 'center', fontSize: 12},
                { text: ' T°: ', bold: true, alignment: 'center', fontSize: 12},
                { text: ' N° : ', bold: true, alignment: 'center', fontSize: 12},
                { text: ' F° :', bold: true, alignment: 'center', fontSize: 12},
                { text: ' A° :', bold: true, alignment: 'center', fontSize: 12},
                { text: ' Matricula N° ', bold: true, alignment: 'center', fontSize: 12}
              ]
            ]
          }
        },

        {
          style: 'tableExample',
          table: {
            widths: [30, 30, 30, 30, 30, 30, 30, 30, '*'],
            body: [
              [
                { text: ' ', bold: true, alignment: 'center', fontSize: 12},
                { text: ' ', bold: true, alignment: 'center', fontSize: 12},
                { text: ' ', bold: true, alignment: 'center', fontSize: 12},
                { text: ' ', bold: true, alignment: 'center', fontSize: 12},
                { text: ' ', bold: true, alignment: 'center', fontSize: 12},
                { text: ' ', bold: true, alignment: 'center', fontSize: 12},
                { text: ' ', bold: true, alignment: 'center', fontSize: 12},
                { text: ' ', bold: true, alignment: 'center', fontSize: 12},
                { text: ' ', bold: true, alignment: 'center', fontSize: 12}
              ]
            ]
          }
        },

        {
          style: 'tableExample',
          table: {
            widths: [30, 30, 30, 30, 30, 30, 30, 30, '*'],
            body: [
              [
                { text: ' ', bold: true, alignment: 'center', fontSize: 12},
                { text: ' ', bold: true, alignment: 'center', fontSize: 12},
                { text: ' ', bold: true, alignment: 'center', fontSize: 12},
                { text: ' ', bold: true, alignment: 'center', fontSize: 12},
                { text: ' ', bold: true, alignment: 'center', fontSize: 12},
                { text: ' ', bold: true, alignment: 'center', fontSize: 12},
                { text: ' ', bold: true, alignment: 'center', fontSize: 12},
                { text: ' ', bold: true, alignment: 'center', fontSize: 12},
                { text: ' ', bold: true, alignment: 'center', fontSize: 12}
              ]
            ]
          }
        },

        {
          style: 'tableExample',
          table: {
            widths: [30, 30, 30, 30, 30, 30, 30, 30, '*'],
            body: [
              [
                { text: ' ', bold: true, alignment: 'center', fontSize: 12},
                { text: ' ', bold: true, alignment: 'center', fontSize: 12},
                { text: ' ', bold: true, alignment: 'center', fontSize: 12},
                { text: ' ', bold: true, alignment: 'center', fontSize: 12},
                { text: ' ', bold: true, alignment: 'center', fontSize: 12},
                { text: ' ', bold: true, alignment: 'center', fontSize: 12},
                { text: ' ', bold: true, alignment: 'center', fontSize: 12},
                { text: ' ', bold: true, alignment: 'center', fontSize: 12},
                { text: ' ', bold: true, alignment: 'center', fontSize: 12}
              ]
            ]
          }
        },

        {
          style: 'tableExample',
          table: {
            widths: [30, 30, 30, 30, 30, 30, 30, 30, '*'],
            body: [
              [
                { text: ' ', bold: true, alignment: 'center', fontSize: 12},
                { text: ' ', bold: true, alignment: 'center', fontSize: 12},
                { text: ' ', bold: true, alignment: 'center', fontSize: 12},
                { text: ' ', bold: true, alignment: 'center', fontSize: 12},
                { text: ' ', bold: true, alignment: 'center', fontSize: 12},
                { text: ' ', bold: true, alignment: 'center', fontSize: 12},
                { text: ' ', bold: true, alignment: 'center', fontSize: 12},
                { text: ' ', bold: true, alignment: 'center', fontSize: 12},
                { text: ' ', bold: true, alignment: 'center', fontSize: 12}
              ]
            ]
          }
        },


        {
          style: 'tableExample',
          table: {
            widths: ['*',120],
            body: [
              [
                { text: 'Firma y Sello : ', bold: true, alignment: 'center', fontSize: 12},

                { text: '  ', bold: true, alignment: 'center', fontSize: 12},

              ],
              [
                {text: '  ', style: 'tableHeader'},

                {
                  table: {
                    widths: [30, 30, 30],
                    headerRows: 1,
                    alignment: 'center',
                    body: [
                      [
                        { text: ' D ', bold: true, alignment: 'center', fontSize: 12},
                        { text: ' M ', bold: true, alignment: 'center', fontSize: 12},
                        { text: ' A ', bold: true, alignment: 'center', fontSize: 12}
                      ],
                      [ ' ', ' ', ' '],
                    ]
                  }
                },
              ],
            ]
          }
        },


        {
          style: 'tableExample',
          table: {
            widths: [50, '*'],
            body: [
              [{text: ' 8 ', fontSize: 14, bold: true, alignment: 'center' }, { text: 'Búsqueda por indices de Titulares:  ', bold: true, alignment: 'left', fontSize: 13}]
            ]
          }
        },

        {
          style: 'tableExample',
          table: {
            widths: [30, 30, 30, 30, 30, 30, 30, 30, '*'],
            body: [
              [
                { text: ' T°: ', bold: true, alignment: 'center', fontSize: 12},
                { text: ' N° : ', bold: true, alignment: 'center', fontSize: 12},
                { text: ' F° :', bold: true, alignment: 'center', fontSize: 12},
                { text: ' A° :', bold: true, alignment: 'center', fontSize: 12},
                { text: ' T°: ', bold: true, alignment: 'center', fontSize: 12},
                { text: ' N° : ', bold: true, alignment: 'center', fontSize: 12},
                { text: ' F° :', bold: true, alignment: 'center', fontSize: 12},
                { text: ' A° :', bold: true, alignment: 'center', fontSize: 12},
                { text: ' Matricula N° ', bold: true, alignment: 'center', fontSize: 12}
              ]
            ]
          }
        },

        {
          style: 'tableExample',
          table: {
            widths: [30, 30, 30, 30, 30, 30, 30, 30, '*'],
            body: [
              [
                { text: ' ', bold: true, alignment: 'center', fontSize: 12},
                { text: ' ', bold: true, alignment: 'center', fontSize: 12},
                { text: ' ', bold: true, alignment: 'center', fontSize: 12},
                { text: ' ', bold: true, alignment: 'center', fontSize: 12},
                { text: ' ', bold: true, alignment: 'center', fontSize: 12},
                { text: ' ', bold: true, alignment: 'center', fontSize: 12},
                { text: ' ', bold: true, alignment: 'center', fontSize: 12},
                { text: ' ', bold: true, alignment: 'center', fontSize: 12},
                { text: ' ', bold: true, alignment: 'center', fontSize: 12}
              ]
            ]
          }
        },

        {
          style: 'tableExample',
          table: {
            widths: [30, 30, 30, 30, 30, 30, 30, 30, '*'],
            body: [
              [
                { text: ' ', bold: true, alignment: 'center', fontSize: 12},
                { text: ' ', bold: true, alignment: 'center', fontSize: 12},
                { text: ' ', bold: true, alignment: 'center', fontSize: 12},
                { text: ' ', bold: true, alignment: 'center', fontSize: 12},
                { text: ' ', bold: true, alignment: 'center', fontSize: 12},
                { text: ' ', bold: true, alignment: 'center', fontSize: 12},
                { text: ' ', bold: true, alignment: 'center', fontSize: 12},
                { text: ' ', bold: true, alignment: 'center', fontSize: 12},
                { text: ' ', bold: true, alignment: 'center', fontSize: 12}
              ]
            ]
          }
        },

        {
          style: 'tableExample',
          table: {
            widths: [30, 30, 30, 30, 30, 30, 30, 30, '*'],
            body: [
              [
                { text: ' ', bold: true, alignment: 'center', fontSize: 12},
                { text: ' ', bold: true, alignment: 'center', fontSize: 12},
                { text: ' ', bold: true, alignment: 'center', fontSize: 12},
                { text: ' ', bold: true, alignment: 'center', fontSize: 12},
                { text: ' ', bold: true, alignment: 'center', fontSize: 12},
                { text: ' ', bold: true, alignment: 'center', fontSize: 12},
                { text: ' ', bold: true, alignment: 'center', fontSize: 12},
                { text: ' ', bold: true, alignment: 'center', fontSize: 12},
                { text: ' ', bold: true, alignment: 'center', fontSize: 12}
              ]
            ]
          }
        },

        {
          style: 'tableExample',
          table: {
            widths: [30, 30, 30, 30, 30, 30, 30, 30, '*'],
            body: [
              [
                { text: ' ', bold: true, alignment: 'center', fontSize: 12},
                { text: ' ', bold: true, alignment: 'center', fontSize: 12},
                { text: ' ', bold: true, alignment: 'center', fontSize: 12},
                { text: ' ', bold: true, alignment: 'center', fontSize: 12},
                { text: ' ', bold: true, alignment: 'center', fontSize: 12},
                { text: ' ', bold: true, alignment: 'center', fontSize: 12},
                { text: ' ', bold: true, alignment: 'center', fontSize: 12},
                { text: ' ', bold: true, alignment: 'center', fontSize: 12},
                { text: ' ', bold: true, alignment: 'center', fontSize: 12}
              ]
            ]
          }
        },


        {
          style: 'tableExample',
          table: {
            widths: ['*',120],
            body: [
              [
                { text: 'Firma y Sello : ', bold: true, alignment: 'center', fontSize: 12},

                { text: '  ', bold: true, alignment: 'center', fontSize: 12},

              ],
              [
                {text: '  ', style: 'tableHeader'},

                {
                  table: {
                    widths: [30, 30, 30],
                    headerRows: 1,
                    alignment: 'center',
                    body: [
                      [
                        { text: ' D ', bold: true, alignment: 'center', fontSize: 12},
                        { text: ' M ', bold: true, alignment: 'center', fontSize: 12},
                        { text: ' A ', bold: true, alignment: 'center', fontSize: 12}
                      ],
                      [ ' ', ' ', ' '],
                    ]
                  }
                },
              ],
            ]
          }
        },


        {
          style: 'tableExample',
          table: {
            widths: [50, '*'],
            body: [
              [{text: ' 9 ', fontSize: 14, bold: true, alignment: 'center' }, { text: 'Resultado del Informe - Registración - Carácter de la misma:  ', bold: true, alignment: 'left', fontSize: 13}]
            ]
          }
        },

        {
          style: 'tableExample',
          table: {
            widths: ['*'],
            heights: [80],
            body: [
              [{ text: ' ' , italics: true, alignment: 'center'}]
            ]
          }
        },

        {
          style: 'tableExample',
          table: {
            widths: [50,'*', 120],
            body: [
              [
                { text: ' 10 ', bold: true, alignment: 'center', fontSize: 12},

                { text: ' Firma y Sello del jefe informante ', bold: true, alignment: 'center', fontSize: 12},

                { text: '  ', bold: true, alignment: 'center', fontSize: 12},

              ],
              [
                {text: '   ', style: 'tableHeader'},

                {text: '   ', style: 'tableHeader'},

                {
                  table: {
                    widths: [30, 30, 30],
                    headerRows: 1,
                    alignment: 'right',
                    body: [
                      [
                        { text: ' D ', bold: true, alignment: 'center', fontSize: 12},
                        { text: ' M ', bold: true, alignment: 'center', fontSize: 12},
                        { text: ' A ', bold: true, alignment: 'center', fontSize: 12}
                      ],
                      [ ' ', ' ', ' '],
                    ]
                  }
                },




              ],
            ]
          }
        },


        {
          style: 'tableExample',
          table: {
            widths: ['*',120],
            body: [
              [
                { text: 'Devolución de minuta H - Retirada por: ', bold: true, alignment: 'left', fontSize: 12},

                {text: ' Fecha:  ', alignment: 'center', fontSize: 13},



              ],
              [
                { text: ' Apellido y Nombre: \n' +
                    ' Domicilio: \n \n'+
                    '\n Firma: \n'
                  , bold: true, alignment: 'left', fontSize: 12},

                {
                  table: {
                    widths: [30, 30, 30],
                    headerRows: 1,
                    alignment: 'center',
                    body: [
                      [
                        { text: ' D ', bold: true, alignment: 'center', fontSize: 12},
                        { text: ' M ', bold: true, alignment: 'center', fontSize: 12},
                        { text: ' A ', bold: true, alignment: 'center', fontSize: 12}
                      ],
                      [ ' ', ' ', ' '],
                    ]
                  }
                },
              ],
            ]
          }
        },





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
          margin: [0, 0, 0, 0],
          heights: [20]
        },
        tableHeader: {
          bold: true,
          fontSize: 13,
          color: 'black'
        },
        tableDescripcion:{
          margin: [0, 0, 0, 0],
          heights: [20],
          padding: [50, 100, 50, 100]
        },
        paddingBottom: {
          alignment: 'center',
          margin: [0, 20, 0, 10]
        }
      }
    };


    pdfMake.createPdf(FormularioMinH).download('Minuta H - '+ apellido + ' ' + nombre);
  }
}
