import { Injectable } from '@angular/core';
import {minutaG} from "../models/minutaG.module";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class MinutaGService {

  selectedTram: minutaG;
  tramites: minutaG[];
  AUTH_SERVER: string = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {
    this.selectedTram = new minutaG();
  }

  //Metodos HTTP

  public getAllTramitesG() {
    const url_api = this.AUTH_SERVER + '/forms/dataMinutaG/all';
    return this.http.get(url_api);
  };

  public postDataTramG(minG: minutaG) {
    const url_api = this.AUTH_SERVER + '/forms/dataMinutaG/add';
    return this.http.post(url_api, minG);
  };


}
