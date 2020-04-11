import { NgModule } from '@angular/core';

//Components
import { DashboardComponent } from './dashboard.component';
import { PrincipalComponent } from './principal/principal.component';

  //Perfil de Usuario
  import { PerfilComponent } from './PerfildeUsuario/perfil/perfil.component';
  import { CambiarPasswordComponent } from './PerfildeUsuario/cambiar-password/cambiar-password.component';
  import { EditarPerfilComponent } from './PerfildeUsuario/editar-perfil/editar-perfil.component';
  //Mis Tramites
  import { NuevoTramiteComponent } from './Tramites/nuevo-tramite/nuevo-tramite.component';
  import { GuiaTramiteComponent } from './Tramites/guia-tramite/guia-tramite.component';
  import { MisTramitesComponent } from './Tramites/mis-tramites/mis-tramites.component';
  //Acerca de
  import { InformacionComponent } from './AcercaDe/informacion/informacion.component';
  import { PreguntasComponent } from './AcercaDe/preguntas/preguntas.component';

//Modulos
import { SharedModule } from '../shared/shared.module';

//Servicios
import { UserServiceService } from '../user/service/user.service';
import { AuthGuard} from '../../components/core/guards/guards';
//Rutas
import { Dashboard_ROUTES } from './dashboard.routes';



@NgModule({
	declarations: [
		DashboardComponent,
		PerfilComponent,
		CambiarPasswordComponent,
		EditarPerfilComponent,
		NuevoTramiteComponent,
		GuiaTramiteComponent,
		MisTramitesComponent,
		InformacionComponent,
		PreguntasComponent,
		PrincipalComponent
	],
	exports: [
		PerfilComponent,
		CambiarPasswordComponent,
		EditarPerfilComponent
	],
	imports:[
		SharedModule,
		Dashboard_ROUTES
	],
	providers: [UserServiceService, AuthGuard]
})

export class DashboardModule { }
