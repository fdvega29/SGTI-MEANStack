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
      {
        titulo: 'Areas',
        icono: 'fa fa-building-o',
        url: '/dashboard/areas'
      },
      {
        titulo: 'Tipo tramite',
        icono: 'fa fa-wpforms',
        url: '/dashboard/tipo-tramite'
      },
      {
        titulo: 'Gestión de trámites',
        icono: 'fa fa-cogs',
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
