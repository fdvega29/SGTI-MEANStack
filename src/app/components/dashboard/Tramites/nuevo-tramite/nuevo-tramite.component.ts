import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/components/services/usuario.service';
import { TramitesService } from 'src/app/components/services/tramites.service';

//sweetalert2
import Swal from 'sweetalert2'

//Toastr
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

  nombre: string;
  apellido: string;
  fechanac: any;
  estCivil: string;
  tdocumento: string;
  numDocu: string;
  nacionalidad: string;
  ConyuApellido: string;
  ConyuNombre: string;
  tipoTramite: string = '';
  tipoFormulario: string = '';

  historialTramite: any;

  formulario: number = 1;

  usuario: any;

  currenDate = new Date();

  minutaH: any = {};
  minutaG: any = {};
  MinH: any = '5f4abf33aeae370004723e34';
  MinG: any = '5f4abf44aeae370004723e35';

  domicilio: string;
  objetoPedido: string;
  ubicacionInmueble: string;
  IdTramite: any;
  areaTramite: any = '5f4ab851aeae370004723e31';
  maxcodigo: number = 0;
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


  ngOnInit() {
    //Smart-Wizard
    $('#stepwizard').smartWizard({
      theme: 'dots',
      //transitionEffect: 'slide',
      transitionSpeed: '400',
      selected: 0,
      lang: { next: 'Siguiente', previous: 'Anterior' },
      toolbarSettings: {
        showNextButton: false,
        showPreviousButton: false
      }
    });

    $('#stepwizard #btn-siguiente-1').hide();

    let localForm = localStorage.getItem('FormularioPedido');

    //Mostrar botón siguiente
    if (this.tipoFormulario != '') {
      $('#stepwizard #btn-siguiente-1').show();
    }

    //Utilizar formulario pedido desde componente Informacion

    if (localForm == this.MinH) {
      this.guardar_tipotramite('Búsqueda de titulares dominiales', localForm);

      $('#card-h').prop("checked", true);
      $('#formH').show();
      $('#formG').hide();
      $('#confirmH').show();
      $('#confirmG').hide();
      $('#finalizarH').show();
      $('#finalizarG').hide();
    } else if (localForm == this.MinG) {

      this.guardar_tipotramite('Búsqueda de estado jurídico de inmueble', localForm);

      $('#card-g').prop("checked", true);
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
    }
    if (paso == 2) {
      $('#stepwizard #step1').hide();
      $('#stepwizard #step2').show();
      $('#stepwizard #li2').addClass('active');
      $('#stepwizard #li3').removeClass('active');
      if (this.tipoFormulario == this.MinH) {
        $('#formH').show();
        $('#formG').hide();
        $('#confirmH').show();
        $('#confirmG').hide();
        $('#finalizarH').show();
        $('#finalizarG').hide();
      } else {
        $('#formG').show();
        $('#formH').hide();
        $('#confirmG').show();
        $('#confirmH').hide();
        $('#finalizarG').show();
        $('#finalizarH').hide();
      }
      $('#stepwizard #step3').hide();
    }
    if (paso == 3) {
      $('#stepwizard #step2').hide();
      $('#stepwizard #step3').show();
      $('#stepwizard #li3').addClass('active');
      $('#stepwizard #li4').removeClass('active');

      $('#stepwizard #step4').hide();
    }
    if (paso == 4) {
      $('#stepwizard #step3').hide();
      $('#stepwizard #step4').show();
      $('#stepwizard #li4').addClass('active');
    }

  }

  public volverPaso(paso: number) {

    if (paso == 1) {
      $('#stepwizard #step1').show();
      $('#stepwizard #step2').hide();
      $('#stepwizard #li2').removeClass('active');
    }
    if (paso == 2) {
      $('#stepwizard #step1').hide();
      $('#stepwizard #step2').show();
      $('#stepwizard #li2').addClass('active');
    }
    if (paso == 3) {
      $('#stepwizard #step2').hide();
      $('#stepwizard #step3').show();
      $('#stepwizard #li3').addClass('active');
    }
    if (paso == 4) {
      $('#stepwizard #step3').hide();
      $('#stepwizard #step4').show();
      $('#stepwizard #li4').addClass('active');
    }

  }

  public guardar_nombre(nomb: string) {
    this.nombre = nomb;
  }
  public guardar_apellido(apel: string) {
    this.apellido = apel;
  }
  public guardar_fechanac(fnac: string) {
    this.fechanac = fnac;
  }
  public guardar_estadocivil(ecivi: string) {
    this.estCivil = ecivi;
  }
  public guardar_tdoc(tdoc: string) {
    this.tdocumento = tdoc;
  }
  public guardar_ndoc(ndoc: string) {
    this.numDocu = ndoc;
  }
  public guardar_nacion(nacion: string) {
    this.nacionalidad = nacion;
  }
  public guardar_con_ape(conApe: string) {
    this.ConyuApellido = conApe;
  }
  public guardar_con_nomb(conNomb: string) {
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


  guardar_domicilio(domicilio: string) {
    this.domicilio = domicilio;
  }


  guardar_objetoPedido(objetoPedido: string) {
    this.objetoPedido = objetoPedido;
  }

  guardar_ubicacionInmueble(ubicacionInmueble: string) {
    this.ubicacionInmueble = ubicacionInmueble;
  }

  //Toastr
  public msgError() {
    this.toastr.error('¡Completar campos!', '', {
      timeOut: 2000,
      progressBar: true,
      progressAnimation: 'increasing'
    })
  };

  //sweetalert2
  public alertSuccess() {
    Swal.fire({
      icon: 'success',
      title: 'Felicidades',
      text: 'Se genero el tramite correctamente'
    })
  };

  public validateFormMinH(nombre: string, apellido: string, fechanac: any, estadocivil: string, tdocumento: string, ndocumento: string, nacionalidad: string) {
    if (nombre == '' || apellido == '' || fechanac == '' || estadocivil == '' || tdocumento == '' || ndocumento == '' || nacionalidad == '') {
      this.msgError();
      return this.irPaso(2);
    }
  }


  validateFormMinG(nombreG: string, apellidoG: string, estadocivilG: string, ndocumentoG: string, domicilio: string, objetoPedido: string, ubicacionInm: string) {
    if (nombreG == '' || apellidoG == '' || estadocivilG == '' || ndocumentoG == '' || domicilio == '' || objetoPedido == '' || ubicacionInm == '') {
      this.msgError();
      return this.irPaso(2);
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
      apellido: apellido,
      nombre: nombre,
      estCivil: estadocivil,
      tipoDoc: tdocumento,
      numDoc: ndocumento,
      nacionalidad: nacionalidad,
      fechNac: fechanac,
      apeConyu: ConyuApellido,
      nomConyu: ConyuNombre,
      domicilio: '',
      objetoPedido: '',
      ubicacionInmueble: '',
      tipoTram: tipoTramite,
      producto: producto,
      area: this.areaTramite,
      usuario: this.usuario
    };
    //console.log(this.minutaH);
    this.postDataTramMinH(this.minutaH);
  };

  public createFormG(apellido: string, nombre: string, estadocivil: string, ndocumento: string, domicilio: string, objetoPedido: string, ubicacionInmueble: string, tipoTramite: string, producto: string) {
    this.minutaG = {
      codigo: this.maxcodigo,
      apellido: apellido,
      nombre: nombre,
      estCivil: estadocivil,
      tipoDoc: '',
      numDoc: ndocumento,
      nacionalidad: '',
      fechNac: '',
      apeConyu: '',
      nomConyu: '',
      domicilio: domicilio,
      objetoPedido: objetoPedido,
      ubicacionInmueble: ubicacionInmueble,
      tipoTram: tipoTramite,
      producto: producto,
      area: this.areaTramite,
      usuario: this.usuario
    };
    //console.log(this.minutaG);
    this.postDataTramMinH(this.minutaG);
  };

  public postDataTramMinH(create) {
    console.log("Data-form", create);
    this.dataTramite.postDataTram(create)
      .subscribe((res: any) => {
        console.log("Res-Api", res);
        this.IdTramite = res.data._id;
        this.insertHistorial(this.IdTramite);
        this.alertSuccess();
        this.router.navigate(['/dashboard/mis-tramites']);
      });
  };

  public maxCodi() {
    this.dataTramite.getAllMaxCodi().subscribe((data: any) => {
      this.maxcodigo = data.tramite[0].codigo + 1;
    });
  }

  public getDataTipoTram(id: string) {
    this.tipoTramiteService.getTipoTramiteById(id)
      .subscribe((res: any) => {
        console.log(res.data);
        this.importe = res.data.costo;
        this.formTipoTram = res.data.formulario;
      })
  }

  public insertHistorial(id: string) {
    this.historialTramite = {
      estTramite: 'Iniciado',
      area: this.areaTramite,
      usuario: this.usuario,
      tramite: id
    }
    console.log(this.historialTramite);
    this.historialService.postDataHistorial(this.historialTramite).subscribe(res => console.log(res));
  }

  public apiMercadoPago() {
    let preference = {
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
          unit_price: 5,
          quantity: 1,
        }
      ]
    };
    this.mercadopago.postDataCheckout(preference)
      .subscribe((res: any) => {
        console.log(res);
        this.global = res.data.body.id;
        this.dataOper = res.data.body;
        //window.location.href='https://www.mercadopago.com.ar/checkout/v1/redirect?pref_id='+this.global;
        window.open('https://www.mercadopago.com.ar/checkout/v1/redirect?pref_id=' + this.global);
        //this.postComprobantePago();
      });
  }

  public postComprobantePago() {
    this.comprobantePago = {
      fecha: this.dataOper.date_created,
      usuario: this.usuario,
      importe: this.dataOper.items[0].unit_price,
      tramite: this.dataOper.items[0].title,
      idOperacion: this.global,
      estado: 'Iniciado'
    };
    console.log(this.comprobantePago);
    this.mercadopago.postDataComprobante(this.comprobantePago)
      .subscribe((res: any) => {
        console.log(res);
      })
  }

  public getParamsUrl(){
    this.urlData = this.router.parseUrl(this.router.url);

    this.collection_id = this.urlData.queryParams['collection_id'];
    this.order_id = this.urlData.queryParams['merchant_order_id'];
    this.estadoOrden = this.urlData.queryParams['collection_status']

    console.log(this.urlData);
    console.log(this.collection_id);
    console.log(this.order_id);
    console.log(this.estadoOrden);
    if(this.urlData.queryParams['collection_id']){
      console.log('Si existe el collection_id')
      this.postComprobantePago();
      
    }else{
      console.log('No existe')
    }
  }

  public remove() {
    localStorage.removeItem('FormularioPedido');
  }
}
