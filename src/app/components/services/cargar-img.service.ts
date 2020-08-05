import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CargarImgService {

  AUTH_SERVER: string = 'http://localhost:3000/api';

  constructor() { }

  public subirArchivo( archivo: File, id: string ) {

    return new Promise( (resolve, reject ) => {

      let formData = new FormData();
      let xhr = new XMLHttpRequest();

      formData.append( 'img', archivo, archivo.name );

      xhr.onreadystatechange = function() {

        if ( xhr.readyState === 4 ) {

          if ( xhr.status === 200 ) {
            console.log( 'Imagen subida', JSON.parse( xhr.response ) );
            resolve( JSON.parse( xhr.response ) );
          } else {
            console.log( 'Fallo la subida' );
            reject( xhr.response );
          }

        }
      };

      let url = this.AUTH_SERVER + `/upload/usuario/img/${id}`;

      xhr.open('PUT', url, true );
      xhr.send( formData );

    });

  }

}
