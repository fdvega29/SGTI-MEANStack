import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsuarioService } from 'src/app/components/services/usuario.service';
import { sessionUser } from 'src/app/components/models/session.module';

//sweetalert2
import Swal from 'sweetalert2'

//Toastr
import { ToastrService } from 'ngx-toastr';
import { MinutaHService } from 'src/app/components/services/minuta-h.service';
import { Router } from '@angular/router';


declare var $;

@Component({
  selector: 'app-nuevo-tramite',
  templateUrl: './nuevo-tramite.component.html',
  styleUrls: ['./nuevo-tramite.component.css']
})
export class NuevoTramiteComponent implements OnInit {
  nombre:string;
  apellido:string;
  fechanac:any;
  estadocivil:string;
  tdocumento:string;
  ndocumento:string;
  nacionalidad:string;
  ConyuApellido:string;
  ConyuNombre:string;
  tipoTramite:string = '';
  tipoFormulario:string = '';

  persona: any = {};

  formulario:number = 1;

  usuario: sessionUser;

  currenDate = new Date();

  constructor(private userService: UsuarioService, private serviceMinH: MinutaHService ,private toastr: ToastrService, private router: Router) {
    this.usuario = userService.getCurrentUser();
   }

  ngOnInit() {
      //Smart-Wizard
      $('#stepwizard').smartWizard({
        theme: 'dots',
        //transitionEffect: 'slide',
        transitionSpeed: '400',
        selected: 0,
        lang: { next: 'Siguiente', previous: 'Anterior'},
        toolbarSettings: {
          showNextButton: false, 
          showPreviousButton: false
        }
      });

      $('#stepwizard #btn-siguiente-1').hide();
  }

  public irPaso(paso:number){

    if(paso==1){
      $('#stepwizard #step1').show();
      $('#stepwizard #step2').hide();
      $('#stepwizard #li2').removeClass('active');
    }
    if(paso==2){
      $('#stepwizard #step1').hide();
      $('#stepwizard #step2').show();
      $('#stepwizard #li2').addClass('active');
      $('#stepwizard #li3').removeClass('active');

      $('#stepwizard #step3').hide();
    }
    if(paso==3){
      $('#stepwizard #step2').hide();
      $('#stepwizard #step3').show();
      $('#stepwizard #li3').addClass('active');
      $('#stepwizard #li4').removeClass('active');
      
      $('#stepwizard #step4').hide();
    }
    if(paso==4){
      $('#stepwizard #step3').hide();
      $('#stepwizard #step4').show();
      $('#stepwizard #li4').addClass('active');
    }

  }

  public volverPaso(paso:number){

    if(paso==1){
      $('#stepwizard #step1').show();
      $('#stepwizard #step2').hide();
      $('#stepwizard #li2').removeClass('active');
    }
    if(paso==2){
      $('#stepwizard #step1').hide();
      $('#stepwizard #step2').show();
      $('#stepwizard #li2').addClass('active');
    }
    if(paso==3){
      $('#stepwizard #step2').hide();
      $('#stepwizard #step3').show();
      $('#stepwizard #li3').addClass('active');
    }
    if(paso==4){
      $('#stepwizard #step3').hide();
      $('#stepwizard #step4').show();
      $('#stepwizard #li4').addClass('active');
    }

  }

  public guardar_nombre(nomb:string){
    this.nombre = nomb;
  }
  public guardar_apellido(apel:string){
    this.apellido = apel;
  }
  public guardar_fechanac(fnac:string){
    this.fechanac = fnac;
  }
  public guardar_estadocivil(ecivi:string){
    this.estadocivil = ecivi;
  }  
  public guardar_tdoc(tdoc:string){
    this.tdocumento = tdoc;
  }
  public guardar_ndoc(ndoc:string){
    this.ndocumento = ndoc;
  }  
  public guardar_nacion(nacion:string){
    this.nacionalidad = nacion;
  }
  public guardar_con_ape(conApe:string){
    this.ConyuApellido = conApe;
  }
  public guardar_con_nomb(conNomb:string){
    this.ConyuNombre = conNomb;
  }

  public guardar_tipotramite(tipoTram:string, form: string){
    this.tipoTramite = tipoTram;
    this.tipoFormulario = form;

    if(this.tipoTramite!=''){
      $('#stepwizard #btn-siguiente-1').show();
    } else{
      $('#stepwizard #btn-siguiente-1').hide();
    }
  }

  //Toastr
  public msgError(){
    this.toastr.error('¡Debe completar todos los campos!', '',{
      timeOut: 2000,
      progressBar: true,
      progressAnimation: 'increasing'
    })
  };

  //sweetalert2
  public alertSuccess(){
    Swal.fire({
      icon: 'success',
      title: 'Felicidades',
      text: 'Se genero el tramite correctamente'
    })
  };

  public validateFormMinH(nombre:string, apellido:string, fechanac:any, estadocivil:string, tdocumento:string, ndocumento:string, nacionalidad:string){
    if(nombre == '' || apellido == '' || fechanac == '' || estadocivil == '' || tdocumento  == '' || ndocumento == '' || nacionalidad == ''){
      this.msgError();
      return this.irPaso(2);
    }
  }

  public createFormGroupUser(apellido:string, nombre:string, estadocivil:string, tdocumento:string, ndocumento:string, nacionalidad:string, fechanac:any, ConyuApellido:string, ConyuNombre: string, tipoTramite: string, producto: string){
    
    if(!ConyuApellido){
      ConyuApellido = '';
    }

    if(!ConyuNombre){
      ConyuNombre = '';
    }

      this.persona = {
        apellido: apellido,
        nombre: nombre,
        estadoCivil: estadocivil,
        tipoDoc: tdocumento,
        numDoc: ndocumento,
        nacionalidad: nacionalidad,
        fechNac: fechanac,
        apeConyu: ConyuApellido,
        nomConyu: ConyuNombre,
        tipoTram: tipoTramite,
        producto: producto
      };
      this.postDataTramMinH(this.persona);
  };
  
  public postDataTramMinH(createFormGroupUser){
    console.log("Data-form", createFormGroupUser);
    this.serviceMinH.postDataTram(createFormGroupUser)
                                  .subscribe(data => {
                                  console.log("Res-Api", data);
                                  this.alertSuccess();
                                  this.router.navigate(['/dashboard/mis-tramites']);
                                });
  }; 
}
