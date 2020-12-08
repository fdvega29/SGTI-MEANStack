import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SincronizacionPagos } from '../models/sincronizacionPago';

@Injectable({
  providedIn: 'root'
})
export class SincronizacionPagosService {

  //AUTH_SERVER: string = 'http://localhost:3000/api';
  AUTH_SERVER: string = 'https://app-sgti-v01.herokuapp.com/api';

  constructor(private http: HttpClient) { }

  public getAllProcesos(){
    const url_api = this.AUTH_SERVER + '/sincronizacionPago/all/procesos';
    return this.http.get(url_api); 
  }

  public getAuditariaPagos(){
    const url_api = this.AUTH_SERVER + '/sincronizacionPago/auditoria/pagos';
    return this.http.get(url_api);
  }

  public postDataProceso(proceso: SincronizacionPagos){
    const url_api = this.AUTH_SERVER + '/sincronizacionPago/add';
    return this.http.post(url_api, proceso);
  }

}
