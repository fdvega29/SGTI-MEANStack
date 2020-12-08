import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';



//Components
import { DashboardComponent } from './dashboard.component';
import { PrincipalComponent } from './principal/principal.component';
import { PrincipalAdminComponent } from './principal-admin/principal-admin.component';

  //Perfil de Usuario
  import { PerfilComponent } from './PerfildeUsuario/perfil/perfil.component';
  //Mis Tramites
  import { NuevoTramiteComponent } from './Tramites/nuevo-tramite/nuevo-tramite.component';
  import { GuiaTramiteComponent } from './Tramites/guia-tramite/guia-tramite.component';
  import { MisTramitesComponent } from './Tramites/mis-tramites/mis-tramites.component';
  //Acerca de
  import { InformacionComponent } from './AcercaDe/informacion/informacion.component';
  import { PreguntasComponent } from './AcercaDe/preguntas/preguntas.component';

//Modulos
import { SharedModule } from '../shared/shared.module';
import { PipesModule } from '../pipes/pipes/pipes.module';

//Servicios
import { AuthGuard} from '../../components/core/guards/guards';
import { AutenticacionService } from '../services/autenticacion.service';

//Rutas
import { Dashboard_ROUTES } from './dashboard.routes';
import { CommonModule } from '@angular/common';
import { UpdateProfileComponent } from './PerfildeUsuario/update-profile/update-profile.component';
import { GestionTramitesComponent } from './Tramites/gestion-tramites/gestion-tramites.component';
import { GuiaAdministradorComponent } from './AcercaDe/guia-administrador/guia-administrador.component';
import { EditTramitesComponent } from './Tramites/edit-tramites/edit-tramites.component';
import { AreasComponent } from './ABM-Area/areas/areas.component';
import { TipoTramiteComponent } from './ABM-Tipo-Tramite/tipo-tramite/tipo-tramite.component';
import { HistorialComponent } from './historial/historial.component';
import { NuevoAreaComponent } from './ABM-Area/nuevo-area/nuevo-area.component';
import { NuevoTipoTramiteComponent } from './ABM-Tipo-Tramite/nuevo-tipo-tramite/nuevo-tipo-tramite.component';
import { AuditoriaPagosComponent } from './auditoria-pagos/auditoria-pagos.component';


@NgModule({
	declarations: [
		DashboardComponent,
		PerfilComponent,
		NuevoTramiteComponent,
		GuiaTramiteComponent,
		MisTramitesComponent,
		InformacionComponent,
		PreguntasComponent,
		PrincipalComponent,
		UpdateProfileComponent,
		PrincipalAdminComponent,
		GestionTramitesComponent,
		GuiaAdministradorComponent,
		EditTramitesComponent,
		AreasComponent,
		TipoTramiteComponent,
		HistorialComponent,
		NuevoAreaComponent,
		NuevoTipoTramiteComponent,
		AuditoriaPagosComponent
	],
	exports: [
		PerfilComponent,
	],
    imports: [
        SharedModule,
        Dashboard_ROUTES,
        CommonModule,
        FormsModule,
        HttpClientModule,
        PipesModule,
        ReactiveFormsModule
    ],
	providers: [AutenticacionService, AuthGuard]
})

export class DashboardModule { }
