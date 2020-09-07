import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { comprobantePago } from '../models/comprobantePago.module';

@Injectable({
  providedIn: 'root'
})
export class MercadoPagoService {

  
  //AUTH_SERVER: string = 'http://localhost:3000/api';
  AUTH_SERVER: string = 'https://app-sgti-v01.herokuapp.com/api';

  constructor(private http: HttpClient) { }

  public postDataCheckout(preference: any) {
    const url_api = this.AUTH_SERVER + '/mercadoPago/checkout';
    return this.http.post(url_api, preference);
  };

  public postDataComprobante(comprobante: comprobantePago){
    const url_api = this.AUTH_SERVER + '/mercadoPago/payments';
    return this.http.post(url_api, comprobante); 
  };
}
