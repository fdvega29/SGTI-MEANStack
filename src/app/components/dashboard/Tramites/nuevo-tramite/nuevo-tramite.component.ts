import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/components/services/usuario.service';
import { TramitesService } from 'src/app/components/services/tramites.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';

// sweetalert2
import Swal from 'sweetalert2';

// Toastr
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { HistorialService } from 'src/app/components/services/historial.service';
import { TipoTramiteService } from 'src/app/components/services/tipo-tramite.service';
import { MercadoPagoService } from 'src/app/components/services/mercado-pago.service';


declare var $;

@Component({
  selector: 'app-nuevo-tramite',
  templateUrl: './nuevo-tramite.component.html',
  styleUrls: ['./nuevo-tramite.component.css']
})
export class NuevoTramiteComponent implements OnInit {

  constructor(private userService: UsuarioService,
              private dataTramite: TramitesService,
              private historialService: HistorialService,
              private tipoTramiteService: TipoTramiteService,
              private mercadopago: MercadoPagoService,
              private toastr: ToastrService,
              private activatedRoute: ActivatedRoute,
              private router: Router) {
    this.usuario = userService.getCurrentUser();
  }
  nombre: string;
  apellido: string;
  fechanac: any;
  estCivil: string;
  tdocumento: string;
  numDocu: string;
  nacionalidad: string;
  ConyuApellido: string;
  ConyuNombre: string;
  tipoTramite = '';
  tipoFormulario = '';

  historialTramite: any;

  formulario = 1;

  usuario: any;

  currenDate = new Date();

  minutaH: any = {};
  minutaG: any = {};
  MinH: any = '5f72956e391ebe0004d62574';
  MinG: any = '5f729584391ebe0004d62575';

  domicilio: string;
  objetoPedido: string;
  ubicacionInmueble: string;
  IdTramite: any;
  areaTramite: any = '5f728de1391ebe0004d62571';
  maxcodigo = 1;
  dataTipoTramite: any;
  importe: any;
  formTipoTram: any;
  global: any;
  comprobantePago: any;
  dataOper: any;
  refId: string;
  urlData: any;
  collection_id: any;
  order_id: any;
  estadoOrden: any;
  Minuta: any;
  lsImporte: any;
  lsFormulario: any;
  lsMinuta: any;
  lsMinuta2: any;
  fechaPago: any;
  redireccion = false;


  ngOnInit() {
    // Smart-Wizard
    $('#stepwizard').smartWizard({
      theme: 'dots',
      transitionEffect: 'slide',
      transitionSpeed: '400',
      selected: 0,
      autoAdjustHeight: true,
      lang: { next: 'Siguiente', previous: 'Anterior' },
      toolbarSettings: {
        showNextButton: false,
        showPreviousButton: false
      }
    });

    $('#stepwizard #btn-siguiente-1').hide();


    const localForm = localStorage.getItem('FormularioPedido');

    // Mostrar botón siguiente
    if (this.tipoFormulario != '') {
      $('#stepwizard #btn-siguiente-1').show();
    }

    // Utilizar formulario pedido desde componente Informacion

    if (localForm == this.MinH) {
      this.guardar_tipotramite('Búsqueda de titulares dominiales', localForm);

      $('#card-h').prop('checked', true);
      $('#formH').show();
      $('#formG').hide();
      $('#confirmH').show();
      $('#confirmG').hide();
      $('#finalizarH').show();
      $('#finalizarG').hide();
    } else if (localForm == this.MinG) {

      this.guardar_tipotramite('Búsqueda de estado jurídico de inmueble', localForm);

      $('#card-g').prop('checked', true);
      $('#formG').show();
      $('#formH').hide();
      $('#confirmG').show();
      $('#confirmH').hide();
      $('#finalizarG').show();
      $('#finalizarH').hide();
    }

    this.maxCodi();
    this.getParamsUrl();
  }

  public irPaso(paso: number) {
    if (paso == 1) {
      $('#stepwizard #step1').show();
      $('#stepwizard #step2').hide();
      $('#stepwizard #li2').removeClass('active');
      $('#li1').show();
    }
    if (paso == 2) {
      $('#stepwizard #step1').hide();
      $('#stepwizard #step2').show();
      $('#stepwizard #li2').addClass('active');
      $('#stepwizard #li3').removeClass('active');
      $('#li2').show();
      if (this.tipoFormulario == this.MinH) {
        $('#formH').show();
        $('#formG').hide();
        $('#confirmH').show();
        $('#confirmG').hide();
        $('#finalizarH').show();
        $('#finalizarG').hide();
        $('#PagarMinH').show();
        $('#PagarMinG').hide();
      } else {
        $('#formG').show();
        $('#formH').hide();
        $('#confirmG').show();
        $('#confirmH').hide();
        $('#PagarMinG').show();
        $('#PagarMinH').hide();
      }
      $('#stepwizard #step3').hide();
    }
    if (paso == 3) {
      $('#stepwizard #step2').hide();
      $('#stepwizard #step3').show();
      $('#stepwizard #li3').addClass('active');
      $('#stepwizard #li4').removeClass('active');
      $('#stepwizard #step4').hide();
      $('#li3').show();
    }
    if (paso == 4) {
      $('#stepwizard #step3').hide();
      $('#stepwizard #step4').show();
      $('#stepwizard #li4').addClass('active');
      $('#li4').show();
    }

  }

  public volverPaso(paso: number) {

    if (paso == 1) {
      $('#li1').show();
      $('#stepwizard #step1').show();
      $('#stepwizard #step2').hide();
      $('#stepwizard #li2').removeClass('active');
    }
    if (paso == 2) {
      $('#stepwizard #step1').hide();
      $('#stepwizard #step2').show();
      $('#stepwizard #li2').addClass('active');
      $('#li2').show();
    }
    if (paso == 3) {
      $('#stepwizard #step2').hide();
      $('#stepwizard #step3').show();
      $('#stepwizard #li3').addClass('active');
      $('#li3').show();
    }
    if (paso == 4) {
      $('#stepwizard #step3').hide();
      $('#stepwizard #step4').show();
      $('#stepwizard #li4').addClass('active');
      $('#li4').show();
    }

  }

  public validacionNulo(valor, elementHTML) {
    if (valor.length === 0 ) {
      elementHTML.innerHTML = 'Dato Obligatorio';
      elementHTML.style.border = '1px solid #9e0505';
      return true;
    } else {
      elementHTML.innerHTML = '';
      elementHTML.style.border = '1px solid #218838';
      return false;
    }
  }

  public validarNuloMenorA2caracteres(valor, elementHTML) {
    if (valor.length < 2 || valor.length === 0) {
      elementHTML.innerHTML = 'Dato Obligatorio. Debe ingresar al menos 2 carácteres';
      elementHTML.style.border = '1px solid #9e0505';
      return true;
    } else {
      elementHTML.innerHTML = '';
      elementHTML.style.border = '1px solid #218838';
      return false;
    }
  }

  private validarNuloMenorA6Caracteres(valor, elementHTML) {
    if (valor.length < 6 || valor.length === 0) {
      elementHTML.innerHTML = 'Dato Obligatorio. Debe ingresar al menos 6 carácteres' ;
      elementHTML.style.border = '1px solid #9e0505';
      return true;
    } else {
      elementHTML.innerHTML = '';
      elementHTML.style.border = '1px solid #218838';
      return false;
    }
  }

  private validarNuloMenorA10Caracteres(valor, elementHTML) {
    if (valor.length < 10 || valor.length === 0) {
      elementHTML.innerHTML = 'Dato Obligatorio. Debe ingresar al menos 10 carácteres' ;
      elementHTML.style.border = '1px solid #9e0505';
      return true;
    } else {
      elementHTML.innerHTML = '';
      elementHTML.style.border = '1px solid #218838';
      return false;
    }
  }


  public validarUbicacion(valor, elementHTML) {
    if (valor.length <= 10 || valor.length === 0) {
      elementHTML.innerHTML = 'Dato Obligatorio. Debe ingresar al menos 10 caracteres <br>' +
                                '*Agregar datos relacionados a la ubicación del inmueble: <br>' +
                                  '<strong>Dirección, N° Matricula, Datos Catastrales.</strong> ';
      elementHTML.style.border = '1px solid #9e0505';
      return true;
    } else {
      elementHTML.innerHTML = '';
      elementHTML.style.border = '1px solid #218838';
      return false;
    }
  }



  public guardar_nombre(nomb: string) {
    const elementoHelpHTML = document.getElementById('helpNombre');
    if (this.validarNuloMenorA2caracteres(nomb, elementoHelpHTML)) {
      this.nombre = nomb;
    }
  }
  public guardar_apellido(apel: string) {
    const elementoHelpHTML = document.getElementById('helpApellido');
    if ( this.validarNuloMenorA2caracteres(apel, elementoHelpHTML) ) {
      this.apellido = apel;
    }
  }

  public guardar_fechanac(fnac: string) {
    const elementoHelpHTML = document.getElementById('helpFechaNac');
    if (this.validacionNulo(fnac, elementoHelpHTML)) {
      this.fechanac = fnac;
    }
  }

  public guardar_estadocivil(ecivi: string) {
    const elementoHelpHTML = document.getElementById('helpEstadoCivil');
    if (this.validacionNulo(ecivi, elementoHelpHTML)) {
      this.estCivil = ecivi;
    }
  }

  public guardar_tdoc(tdoc: string) {
    const elementoHelpHTML = document.getElementById('helpTipoDoc');
    if (this.validacionNulo(tdoc, elementoHelpHTML)) {
      this.tdocumento = tdoc;
    }
  }
  public guardar_ndoc(ndoc: string) {
    const elementoHelpHTML = document.getElementById('helpNumDoc');
    if (this.validarNuloMenorA6Caracteres(ndoc, elementoHelpHTML)) {
      this.numDocu = ndoc;
    }
  }

  public guardar_nacion(nacion: string) {
    const elementoHelpHTML = document.getElementById('helpNacion');
    if (this.validarNuloMenorA2caracteres(nacion, elementoHelpHTML)) {
      this.nacionalidad = nacion;
    }
  }
  public guardar_con_ape(conApe: string) {
    const elementoHelpHTML = document.getElementById('helpConApe');
    elementoHelpHTML.innerHTML = '';
    elementoHelpHTML.style.border = '1px solid #218838';
    this.ConyuApellido = conApe;
  }
  public guardar_con_nomb(conNomb: string) {
    const elementoHelpHTML = document.getElementById('helpConNom');
    elementoHelpHTML.innerHTML = '';
    elementoHelpHTML.style.border = '1px solid #218838';
    this.ConyuNombre = conNomb;
  }

  public guardar_tipotramite(tipoTram: string, form: string) {
    this.tipoTramite = tipoTram;
    this.tipoFormulario = form;

    if (this.tipoTramite != '') {
      $('#stepwizard #btn-siguiente-1').show();
    } else {
      $('#stepwizard #btn-siguiente-1').hide();
    }
  }

  public guardar_apellidoG(apel: string) {
      const elementoHelpHTML = document.getElementById('helpApellidoG');
      if ( this.validarNuloMenorA2caracteres(apel, elementoHelpHTML) ) {
        this.apellido = apel;
      }
  }

  public guardar_nombreG(nomb: string) {
    const elementoHelpHTML = document.getElementById('helpNombreG');
    if (this.validarNuloMenorA2caracteres(nomb, elementoHelpHTML)) {
      this.nombre = nomb;
    }
  }

  public guardar_estadocivilG(estadoCiv: string) {
    const elementoHelpHTML = document.getElementById('helpEstadoCivG');
    if (this.validacionNulo(estadoCiv, elementoHelpHTML)) {
      this.estCivil = estadoCiv;
    }
  }

  public guardar_ndocG(ndoc: string) {
    const elementoHelpHTML = document.getElementById('helpNumDocG');
    if (this.validarNuloMenorA6Caracteres(ndoc, elementoHelpHTML)) {
      this.numDocu = ndoc;
    }
  }

  public guardar_domicilio(domicilio: string) {
    const elementoHelpHTML = document.getElementById('helpDomicilio');
    if (this.validarNuloMenorA10Caracteres(domicilio, elementoHelpHTML)) {
      this.domicilio = domicilio;
    }
  }

  public guardar_objetoPedido(objetoPedido: string) {
    const elementoHelpHTML = document.getElementById('helpObjPedido');
    if (this.validacionNulo(objetoPedido, elementoHelpHTML)) {
      this.objetoPedido = objetoPedido;
    }
  }

  public guardar_ubicacionInmueble(ubicacionInmueble: string) {
    const elementoHelpHTML = document.getElementById('helpUbicacion');
    if (this.validarUbicacion(ubicacionInmueble, elementoHelpHTML)) {
      this.ubicacionInmueble = ubicacionInmueble;
    }
  }

  // Toastr
  public msgError() {
    this.toastr.error('¡Completar los campos obligatorios!', 'Error', {
      timeOut: 3500,
      progressBar: false,
      positionClass: 'toast-top-right',
    });
  }

  // sweetalert2
  public alertSuccess() {
    Swal.fire({
      icon: 'success',
      title: 'Felicidades',
      text: 'Se genero el tramite correctamente'
    });
  }

  // tslint:disable-next-line:max-line-length
  public validateFormMinH(nombre: string, apellido: string, fechanac: any, estadocivil: string, tdocumento: string, ndocumento: string, nacionalidad: string) {
    // tslint:disable-next-line:max-line-length
    if (nombre === '' || apellido === '' || fechanac === '' || estadocivil === '' || tdocumento === '' || ndocumento === '' || nacionalidad === '') {
      this.msgError();
      return this.irPaso(2);
    }

  // @ts-ignore
    if (nombre <= 2 || apellido <= 2 || ndocumento <= 4 || nacionalidad <= 3) {
    this.msgError();
    return this.irPaso(2);
    }
  }



  // tslint:disable-next-line:max-line-length
  public validateFormMinG(nombreG: string, apellidoG: string, estadocivilG: string, ndocumentoG: string, domicilio: string, objetoPedido: string, ubicacionInm: string) {
    // tslint:disable-next-line:max-line-length
    if (nombreG === '' || apellidoG === '' || estadocivilG === '' || ndocumentoG === '' || domicilio === '' || objetoPedido === '' || ubicacionInm === '') {
      this.msgError();
      return this.irPaso(2);

      // @ts-ignore
      if (nombreG <= 2 || apellidoG <= 2 || ndocumentoG <= 5 || domicilio <= 5 || ubicacionInm <= 10) {
        this.msgError();
        return this.irPaso(2);
      }
    }


  }

  public createFormH(apellido: string, nombre: string, estadocivil: string, tdocumento: string, ndocumento: string, nacionalidad: string, fechanac: any, ConyuApellido: string, ConyuNombre: string, tipoTramite: string, producto: string) {

    if (!ConyuApellido) {
      ConyuApellido = '';
    }

    if (!ConyuNombre) {
      ConyuNombre = '';
    }

    this.minutaH = {
      codigo: this.maxcodigo,
      apellido,
      nombre,
      estCivil: estadocivil,
      tipoDoc: tdocumento,
      numDoc: ndocumento,
      nacionalidad,
      fechNac: fechanac,
      apeConyu: ConyuApellido,
      nomConyu: ConyuNombre,
      domicilio: '',
      objetoPedido: '',
      ubicacionInmueble: '',
      tipoTram: tipoTramite,
      producto,
      area: this.areaTramite,
      comprobantePago: '',
      usuario: this.usuario
    };
    // console.log(this.minutaH);
    // this.postDataTramMinH(this.minutaH);

    localStorage.setItem('Minuta', JSON.stringify(this.minutaH));
    // this.PagarMinutaH = localStorage.getItem('Minuta');
    // console.log('Pago minuta H',this.PagarMinutaH);
  }

  public createFormG(apellido: string, nombre: string, estadocivil: string, ndocumento: string, domicilio: string, objetoPedido: string, ubicacionInmueble: string, tipoTramite: string, producto: string) {
    this.minutaG = {
      codigo: this.maxcodigo,
      apellido,
      nombre,
      estCivil: estadocivil,
      tipoDoc: '',
      numDoc: ndocumento,
      nacionalidad: '',
      fechNac: '',
      apeConyu: '',
      nomConyu: '',
      domicilio,
      objetoPedido,
      ubicacionInmueble,
      tipoTram: tipoTramite,
      producto,
      area: this.areaTramite,
      comprobantePago: '',
      usuario: this.usuario
    };
    // console.log(this.minutaG);
    localStorage.setItem('Minuta', JSON.stringify(this.minutaG));
    // this.postDataTramMinH(this.minutaG);
  }

  public postDataTramMinH(create) {
    console.log('Data-form', create);
    this.dataTramite.postDataTram(create)
      .subscribe((res: any) => {
        console.log('Res-Api', res);
        this.IdTramite = res.data._id;
        this.insertHistorial(this.IdTramite);
        this.alertSuccess();
        this.router.navigate(['/dashboard/mis-tramites']);
      });
  }

  public maxCodi() {
    this.dataTramite.getAllMaxCodi().subscribe((data: any) => {
      this.maxcodigo = data.tramite[0].codigo + 1;
    });
  }

  public getDataTipoTram(id: string) {
    this.tipoTramiteService.getTipoTramiteById(id)
      .subscribe((res: any) => {
        this.importe = res.data.costo;
        this.formTipoTram = res.data.formulario;
        localStorage.setItem('Importe', this.importe);
        localStorage.setItem('Formulario', this.formTipoTram);
      });
  }

  public insertHistorial(id: string) {
    this.historialTramite = {
      estTramite: 'Iniciado',
      area: this.areaTramite,
      usuario: this.usuario,
      tramite: id
    };
    console.log(this.historialTramite);
    this.historialService.postDataHistorial(this.historialTramite).subscribe(res => console.log(res));
  }

  public apiMercadoPago() {
    const preference = {
      back_urls:
        {
          failure: 'https://total-tooling-272001.web.app/dashboard/nuevo-tramite',
          pending: 'https://total-tooling-272001.web.app/dashboard/nuevo-tramite',
          success: 'https://total-tooling-272001.web.app/dashboard/nuevo-tramite'
        },
      auto_return: 'approved',
      items: [
        {
          title: this.formTipoTram,
          unit_price: this.importe,
          quantity: 1,
        }
      ]
    };
    this.mercadopago.postDataCheckout(preference)
      .subscribe((res: any) => {
        this.global = res.data.body.id;
        this.dataOper = res.data.body;
        console.log(this.dataOper);
        window.location.href = 'https://www.mercadopago.com.ar/checkout/v1/redirect?pref_id=' + this.global;
        // window.open('https://www.mercadopago.com.ar/checkout/v1/redirect?pref_id=' + this.global);
        localStorage.setItem('Fecha_Pago', this.dataOper.date_created);
      });
  }

  public postComprobantePago() {
    this.comprobantePago = {
      fecha: this.fechaPago,
      usuario: this.usuario,
      importe: this.lsImporte,
      tramite: this.lsFormulario,
      idOperacion: this.order_id,
      idColeccion: this.collection_id,
      estado:  this.estadoOrden
    };
    console.log('Comprobante', this.comprobantePago);
    this.mercadopago.postDataComprobante(this.comprobantePago)
      .subscribe((res: any) => {
        console.log(res);
        this.lsMinuta = localStorage.getItem('Minuta');
        this.lsMinuta2 = JSON.parse(this.lsMinuta);
        console.log('lsMinuta2', this.lsMinuta2);
        this.Minuta = {
          codigo: this.lsMinuta2.codigo,
          apellido: this.lsMinuta2.apellido,
          nombre: this.lsMinuta2.nombre,
          estCivil: this.lsMinuta2.estCivil,
          tipoDoc: this.lsMinuta2.tipoDoc,
          numDoc: this.lsMinuta2.numDoc,
          nacionalidad: this.lsMinuta2.nacionalidad,
          fechNac: this.lsMinuta2.fechNac,
          apeConyu: this.lsMinuta2.apeConyu,
          nomConyu: this.lsMinuta2.nomConyu,
          domicilio: this.lsMinuta2.domicilio,
          objetoPedido: this.lsMinuta2.objetoPedido,
          ubicacionInmueble: this.lsMinuta2.ubicacionInmueble,
          tipoTram: this.lsMinuta2.tipoTram,
          producto: this.lsMinuta2.producto,
          area: this.lsMinuta2.area,
          comprobantePago: res.payments._id,
          usuario: this.usuario
        };
        console.log('MinutaCargada', this.Minuta);
        this.postDataTramMinH(this.Minuta);
      });
  }

  public getParamsUrl() {
    this.urlData = this.router.parseUrl(this.router.url);

    if (this.urlData.queryParams.collection_id) {
      this.collection_id = this.urlData.queryParams.collection_id;
      this.order_id = this.urlData.queryParams.merchant_order_id;
      this.estadoOrden = this.urlData.queryParams.collection_status;

      this.redireccion = true;
      $('#stepwizard-Section').hide();

      this.lsImporte = localStorage.getItem('Importe');
      this.lsFormulario = localStorage.getItem('Formulario');
      this.fechaPago = localStorage.getItem('Fecha_Pago');

      this.postComprobantePago();
    } else {
      console.log('No existe');
      $('#stepwizard-Section').show();
    }
  }

  public remove() {
    localStorage.removeItem('FormularioPedido');
  }
}
