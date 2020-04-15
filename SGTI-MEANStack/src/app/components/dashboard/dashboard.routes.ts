import { RouterModule, Routes } from '@angular/router';

//Components
import { DashboardComponent } from './dashboard.component';
import {PrincipalComponent } from "./principal/principal.component";

  //Perfil de Usuario
  import { PerfilComponent } from './PerfildeUsuario/perfil/perfil.component';
  import { CambiarPasswordComponent } from './PerfildeUsuario/cambiar-password/cambiar-password.component';
  import { EditarPerfilComponent } from './PerfildeUsuario/editar-perfil/editar-perfil.component';
  //Tramites
  import {GuiaTramiteComponent} from "./Tramites/guia-tramite/guia-tramite.component";
  import {MisTramitesComponent} from "./Tramites/mis-tramites/mis-tramites.component";
  import {NuevoTramiteComponent} from "./Tramites/nuevo-tramite/nuevo-tramite.component";
  //AcercaDe
  import {InformacionComponent} from "./AcercaDe/informacion/informacion.component";
  import {PreguntasComponent} from "./AcercaDe/preguntas/preguntas.component";


//Servicies
import { AuthGuard} from '../../components/core/guards/guards';

const dashboardRoutes: Routes = [
	{
		path: 'dashboard',
		component: DashboardComponent,
		children: [
		  //Perfil de Usuario
			{ path: 'ver-perfil', component: PerfilComponent},
			{ path: 'editar-perfil', component: EditarPerfilComponent},
			{ path: 'cambiar-password', component: CambiarPasswordComponent},
      //Tramites
      { path: 'nuevo-tramite', component: NuevoTramiteComponent},
      { path: 'guia-tramite', component: GuiaTramiteComponent},
      { path: 'mis-tramites', component: MisTramitesComponent},
      //AcercaDe
      { path: 'informacion', component: InformacionComponent},
      { path: 'preguntas', component: PreguntasComponent},

      //Principal
      { path: 'principal', component: PrincipalComponent
      //,canActivate: [AuthGuard]
      }

  //      ,{ path: 'dashboard', component:PrincipalComponent, pathMatch: 'full'}
		]
	}
];

export const Dashboard_ROUTES = RouterModule.forChild( dashboardRoutes);
