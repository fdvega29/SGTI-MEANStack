import { Injectable } from '@angular/core';
import { dataTramites } from '../models/tramites.module';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TramitesService {

  selectedTram: dataTramites;
  tramites: dataTramites[];
  //AUTH_SERVER: string = 'http://localhost:3000/api';
  AUTH_SERVER: string = 'https://app-sgti-v01.herokuapp.com/api';


  constructor(private http: HttpClient) { 
    this.selectedTram = new dataTramites();
  }

  /*Metodos HTTP*/

  public getAllTramites() {
    const url_api = this.AUTH_SERVER + '/forms/dataTramites/all';
    return this.http.get(url_api);
  };

  public getAllTramitesById(id: string) {
    const url_api = this.AUTH_SERVER + `/forms/dataTramites/all/${id}`;
    return this.http.get(url_api);
  };

  public getDataById(id: string){
    const url_api = this.AUTH_SERVER + `/forms/dataTramites/${id}`;
    return this.http.get(url_api);
  };

  public getAllMaxCodi(){
    const url_api = this.AUTH_SERVER + `/forms/dataTramites/all/maxcodi`;
    return this.http.get(url_api);
  };

  public postDataTram(minH: dataTramites) {
    const url_api = this.AUTH_SERVER + '/forms/dataTramites/add';
    return this.http.post(url_api, minH);
  };

  public editDataTram(tramite: dataTramites) {
    const url_api = this.AUTH_SERVER + `/forms/dataTramites/edit/${tramite._id}`;
    return this.http.put(url_api, tramite);
  }

  public deleteDataTram() {

  };
}
