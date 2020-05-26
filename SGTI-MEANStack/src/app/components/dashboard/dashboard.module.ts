import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';



//Components
import { DashboardComponent } from './dashboard.component';
import { PrincipalComponent } from './principal/principal.component';

  //Perfil de Usuario
  import { PerfilComponent } from './PerfildeUsuario/perfil/perfil.component';
  import { CambiarPasswordComponent } from './PerfildeUsuario/cambiar-password/cambiar-password.component';
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
import { AuthGuard} from '../../components/core/guards/guards';
import { AutenticacionService } from '../services/autenticacion.service';

//Rutas
import { Dashboard_ROUTES } from './dashboard.routes';
import { CommonModule } from '@angular/common';
import { UpdateProfileComponent } from './PerfildeUsuario/update-profile/update-profile.component';

@NgModule({
	declarations: [
		DashboardComponent,
		PerfilComponent,
		CambiarPasswordComponent,
		NuevoTramiteComponent,
		GuiaTramiteComponent,
		MisTramitesComponent,
		InformacionComponent,
		PreguntasComponent,
		PrincipalComponent,
		UpdateProfileComponent,
	],
	exports: [
		PerfilComponent,
		CambiarPasswordComponent,
	],
	imports:[
		SharedModule,
		Dashboard_ROUTES,
		CommonModule,
		FormsModule,
		HttpClientModule
	],
	providers: [AutenticacionService, AuthGuard]
})

export class DashboardModule { }
