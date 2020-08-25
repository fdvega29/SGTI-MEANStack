import { Injectable } from '@angular/core';
import { Historial } from '../models/historialTram.module';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HistorialService {

  public selectedHistorial: Historial = {
    _id: null,
    estTramite: '',
    area: '',
    usuario: '',
    tramite: ''
  };

  historial: Historial[];
  AUTH_SERVER: string = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {
    this.selectedHistorial = new Historial();
   }

    /*Metodos HTTP*/
  public getAllHistorialById(id: string) {
    const url_api = this.AUTH_SERVER + `/historialTramite/all/${id}`;
    return this.http.get(url_api);
  };
    
  public getAllHistorial() {
    const url_api = this.AUTH_SERVER + '/historialTramite/all';
    return this.http.get(url_api);
  };

  public postDataHistorial(hist: Historial) {
    const url_api = this.AUTH_SERVER + '/historialTramite/add';
    return this.http.post(url_api, hist);
  };
    
}
