import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menuUsuario: any = {
    elementos: [
          /*{
            titulo: 'Perfil de Usuario',
            icono: 'fa fa-user-circle-o',
            submenu: [
              {titulo: 'Perfil', url: '/dashboard/perfil'},
            ]
          },*/
          {
            titulo: 'Trámites',
            icono: 'fa fa-file-text-o',
            submenu: [
              { titulo: 'Nuevo trámite', url:'/dashboard/nuevo-tramite'},
              { titulo: 'Guia de Uso', url:'/dashboard/guia-tramite'},
              { titulo: 'Mis trámites', url:'/dashboard/mis-tramites'},
            ]
          },
          {
            titulo: 'Acerca de',
            icono: 'fa fa-info-circle',
            submenu: [
              { titulo: 'Información del Sistema', url:'/dashboard/informacion'},
              { titulo: 'Preguntas frecuentes', url:'/dashboard/preguntas'}
            ]
          }
        ]
      }
;

  menuAdmin: any = {
    elementos: [
      /*{
        titulo: 'Perfil del Administrador',
        icono: 'fa fa-user-circle-o',
        url: '/dashboard/perfil'
      },*/
      {
        titulo: 'Gestión de trámites',
        icono: 'fa fa-file-text-o',
        url:'/dashboard/gestion-tramites'
      },
      {
        titulo: 'Instructivo de sistema',
        icono: 'fa fa-info-circle',
        url:'/dashboard/guia-administrador'
      }

    ]
  }
  ;



  constructor() {
  }
}
