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

  public getAllPagos(){
    const url_api = this.AUTH_SERVER + '/mercadoPago/pagos/all';
    return this.http.get(url_api);
  };

  public getByIdPago(id: string){
    const url_api = this.AUTH_SERVER + `/mercadoPago/pagos/${id}`;
    return this.http.get(url_api);
  };

  public getByIdPagoMercadoPago(id: string){
    const url_api = `https://api.mercadopago.com/v1/payments/search?access_token=APP_USR-1433329887629306-090100-fab47c14d6a19fd4aa9ab2a5ef0fec7d-290597670&operation_type=regular_payment&id=${id}`;
    return this.http.get(url_api);
  }

  public postDataCheckout(preference: any) {
    const url_api = this.AUTH_SERVER + '/mercadoPago/checkout';
    return this.http.post(url_api, preference);
  };

  public postDataComprobante(comprobante: comprobantePago){
    const url_api = this.AUTH_SERVER + '/mercadoPago/payments';
    return this.http.post(url_api, comprobante); 
  };

  public editComprobante(comprobante: comprobantePago){
    const url_api = this.AUTH_SERVER + `/mercadoPago/update/estado/${comprobante._id}`;
    return this.http.put(url_api, comprobante);
  }
}
