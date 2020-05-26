import { RouterModule, Routes } from '@angular/router';


//Components 
import { AdminPanelComponent } from './admin-panel.component';

//Perfil de Usuario
  import { PerfilComponent } from '../dashboard/PerfildeUsuario/perfil/perfil.component';
  import { CambiarPasswordComponent } from '../dashboard/PerfildeUsuario/cambiar-password/cambiar-password.component';


const adminPanelRoutes: Routes = [
	{
		path: 'adminPanel',
		component: AdminPanelComponent,
		children: [
		  //Perfil de Usuario
			{ path: 'ver-perfil', component: PerfilComponent},
			{ path: 'cambiar-password', component: CambiarPasswordComponent}
		]
	}
];

export const AdminPanel_ROUTES = RouterModule.forChild (adminPanelRoutes);