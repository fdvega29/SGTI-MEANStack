import { RouterModule, Routes } from '@angular/router';

//Components
import { DashboardComponent } from './dashboard.component';
import {PrincipalComponent } from "./principal/principal.component";

  //Perfil de Usuario
  import { PerfilComponent } from './PerfildeUsuario/perfil/perfil.component';
  import { CambiarPasswordComponent } from './PerfildeUsuario/cambiar-password/cambiar-password.component';
  //Tramites
  import {GuiaTramiteComponent} from "./Tramites/guia-tramite/guia-tramite.component";
  import {MisTramitesComponent} from "./Tramites/mis-tramites/mis-tramites.component";
  import {NuevoTramiteComponent} from "./Tramites/nuevo-tramite/nuevo-tramite.component";
  //AcercaDe
  import {InformacionComponent} from "./AcercaDe/informacion/informacion.component";
  import {PreguntasComponent} from "./AcercaDe/preguntas/preguntas.component";


//Servicies
import { AuthGuard} from '../../components/core/guards/guards';
import { UpdateProfileComponent } from './PerfildeUsuario/update-profile/update-profile.component';

const dashboardRoutes: Routes = [
	{
		path: 'dashboard',
		component: DashboardComponent,
		children: [
		  //Perfil de Usuario
			{ path: 'perfil', component: PerfilComponent, data: {seccion: 'Perfil de Usuario',titulo: 'Perfil'}},
      { path: 'cambiar-password', component: CambiarPasswordComponent, data: {seccion: 'Perfil de Usuario',titulo: 'Cambiar contraseña'}},
      { path: 'update/profile/:id', component: UpdateProfileComponent, data: {seccion: 'Perfil de Usuario',titulo: 'Editar perfil usuario'}},
      //Tramites
      { path: 'nuevo-tramite', component: NuevoTramiteComponent, data: {seccion: 'Trámites', titulo: 'Nuevo trámite'}},
      { path: 'guia-tramite', component: GuiaTramiteComponent, data: {seccion: 'Trámites', titulo: 'Guía de uso'}},
      { path: 'mis-tramites', component: MisTramitesComponent, data: {seccion: 'Trámites', titulo: 'Mis trámites'}},
      //AcercaDe
      { path: 'informacion', component: InformacionComponent, data: {seccion: 'Acerca de', titulo: 'Información'}},
      { path: 'preguntas', component: PreguntasComponent, data: {seccion: 'Acerca de',titulo: 'Preguntas Frecuentes'}},

      //Principal
      { path: 'principal', component: PrincipalComponent, data: {seccion: 'Inicio', titulo: 'Principal'}
      ,canActivate: [AuthGuard]
      }

  //      ,{ path: 'dashboard', component:PrincipalComponent, pathMatch: 'full'}
		]
	}
];

export const Dashboard_ROUTES = RouterModule.forChild( dashboardRoutes);
