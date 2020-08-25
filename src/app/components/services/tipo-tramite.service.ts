import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TipoTramite } from '../models/tipoTramite.module';

@Injectable({
  providedIn: 'root'
})
export class TipoTramiteService {

  public selectedTipoTramite: TipoTramite = {
    _id: null,
    formulario: '',
    descripcion: '',
    costo: 0
  }
  tipoTramites: TipoTramite[];
  AUTH_SERVER: string = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { 
    this.selectedTipoTramite = new TipoTramite();
  }

  /*Metodos HTTP*/

  public getAllTipoTramites() {
    const url_api = this.AUTH_SERVER + '/tipoTramites/all';
    return this.http.get(url_api);
  };

  public postDataTipoTramites(tipoTram: TipoTramite) {
    const url_api = this.AUTH_SERVER + '/tipoTramites/add';
    return this.http.post(url_api, tipoTram);
  };

  public editDataTipoTramites(tipoTram: TipoTramite) {
    const url_api = this.AUTH_SERVER + `/tipoTramites/edit/${tipoTram._id}`;
    return this.http.put(url_api, tipoTram);
  }

  public deleteTipoTramites(id: string) {
    const url_api = this.AUTH_SERVER + `/tipoTramites/delete/${id}`;
    return this.http.delete(url_api)
  }

}
