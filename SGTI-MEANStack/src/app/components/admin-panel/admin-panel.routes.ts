import { RouterModule, Routes } from '@angular/router';


//Components
import { AdminPanelComponent } from './admin-panel.component';

//Perfil de Usuario
  import { PerfilComponent } from '../dashboard/PerfildeUsuario/perfil/perfil.component';


const adminPanelRoutes: Routes = [
	{
		path: 'adminPanel',
		component: AdminPanelComponent,
		children: [
		  //Perfil de Usuario
			{ path: 'ver-perfil', component: PerfilComponent}
		]
	}
];

export const AdminPanel_ROUTES = RouterModule.forChild (adminPanelRoutes);
