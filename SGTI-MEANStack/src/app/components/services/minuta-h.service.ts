import { Injectable } from '@angular/core';
import { minutaH } from '../models/minutaH.module';
import { tap, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MinutaHService {

  selectedTram: minutaH;
  tramites: minutaH[];
  AUTH_SERVER: string = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {
    this.selectedTram = new minutaH();
  }

  /*Metodos HTTP*/

  public getAllTramites() {
    const url_api = this.AUTH_SERVER + '/forms/dataMinutaH/all';
    return this.http.get(url_api);
  };

  public getAllTramitesById(id: string) {
    const url_api = this.AUTH_SERVER + `/forms/dataMinutaH/all/${id}`;
    return this.http.get(url_api);
  };

  public getDataById(id: string){
    const url_api = this.AUTH_SERVER + `/forms/dataMinutaH/${id}`;
    return this.http.get(url_api);
  };

  public postDataTram(minH: minutaH) {
    const url_api = this.AUTH_SERVER + '/forms/dataMinutaH/add';
    return this.http.post(url_api, minH);
  };

  public setTramite() {

  };

  public getDataTramite() {

  };

  public editDataTram() {

  };

  public deleteDataTram() {

  };
}
