import { RouterModule, Routes } from '@angular/router';

//Components
import { DashboardComponent } from './dashboard.component';
import {PrincipalComponent } from "./principal/principal.component";

  //Perfil de Usuario
  import { PerfilComponent } from './PerfildeUsuario/perfil/perfil.component';
  //Tramites
  import {GuiaTramiteComponent} from "./Tramites/guia-tramite/guia-tramite.component";
  import {MisTramitesComponent} from "./Tramites/mis-tramites/mis-tramites.component";
  import {NuevoTramiteComponent} from "./Tramites/nuevo-tramite/nuevo-tramite.component";
  import { EditTramitesComponent } from './Tramites/edit-tramites/edit-tramites.component';

  //AcercaDe
  import {InformacionComponent} from "./AcercaDe/informacion/informacion.component";
  import {PreguntasComponent} from "./AcercaDe/preguntas/preguntas.component";


//Servicies
import { AuthGuard} from '../../components/core/guards/guards';
import { UpdateProfileComponent } from './PerfildeUsuario/update-profile/update-profile.component';
import {PrincipalAdminComponent} from "./principal-admin/principal-admin.component";
import {GestionTramitesComponent} from "./Tramites/gestion-tramites/gestion-tramites.component";
import {GuiaAdministradorComponent} from "./AcercaDe/guia-administrador/guia-administrador.component";



const dashboardRoutes: Routes = [
	{
		path: 'dashboard',
		component: DashboardComponent,
		children: [
		  //Perfil de Usuario
			{ path: 'perfil', component: PerfilComponent, data: {seccion: 'Perfil de Usuario',titulo: 'Perfil', icono: 'fa fa-user-circle-o'},canActivate: [AuthGuard]},
      { path: 'update/profile/:id', component: UpdateProfileComponent, data: {seccion: 'Perfil de Usuario',titulo: 'Editar perfil usuario', icono: 'fa fa-user-circle-o'},canActivate: [AuthGuard]},
      //Tramites
      { path: 'nuevo-tramite', component: NuevoTramiteComponent, data: {seccion: 'Trámites', titulo: 'Nuevo trámite', icono: 'fa fa-file-text-o'},canActivate: [AuthGuard]},
      { path: 'guia-tramite', component: GuiaTramiteComponent, data: {seccion: 'Trámites', titulo: 'Guía de uso', icono: 'fa fa-list-alt'},canActivate: [AuthGuard]},
      { path: 'mis-tramites', component: MisTramitesComponent, data: {seccion: 'Trámites', titulo: 'Mis trámites', icono: 'fa fa-list-alt'},canActivate: [AuthGuard]},
      //AcercaDe
      { path: 'informacion', component: InformacionComponent, data: {seccion: 'Acerca de', titulo: 'Información', icono: 'fa fa-info-circle'},canActivate: [AuthGuard]},
      { path: 'preguntas', component: PreguntasComponent, data: {seccion: 'Acerca de',titulo: 'Preguntas Frecuentes', icono: 'fa fa-question-circle'},canActivate: [AuthGuard]},

      { path: 'principal', component: PrincipalComponent, data: {seccion: 'Inicio', titulo: 'Principal', icono: 'fa fa-tachometer'},canActivate: [AuthGuard]},

      //ADMIN
      { path: 'guia-administrador', component: GuiaAdministradorComponent, data: {seccion: 'Instructivo de Sistema', titulo: 'Guía de uso'},canActivate: [AuthGuard]},
      //gestionar tramites
      { path: 'gestion-tramites', component: GestionTramitesComponent, data: {seccion: 'Trámites', titulo: 'Gestión de trámites'},canActivate: [AuthGuard]},
      //Principal
      { path: 'principal-admin', component: PrincipalAdminComponent, data: {seccion: 'Inicio', titulo: 'Principal'},canActivate: [AuthGuard]}

        ,{ path: 'dashboard', component:PrincipalComponent, pathMatch: 'full',canActivate: [AuthGuard]}
		]
	}
];

export const Dashboard_ROUTES = RouterModule.forChild( dashboardRoutes);
