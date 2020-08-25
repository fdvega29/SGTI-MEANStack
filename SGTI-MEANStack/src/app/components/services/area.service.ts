import { Injectable } from '@angular/core';
import { Area } from '../models/area.module';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AreaService {

  public selectedArea: Area = {
    _id: null,
    nombre: '',
    encargado: ''
  };
  areas: Area[];
  AUTH_SERVER: string = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { 
    this.selectedArea = new Area();
  }

  /*Metodos HTTP*/

  public getAllAreas() {
    const url_api = this.AUTH_SERVER + '/areas/all';
    return this.http.get(url_api);
  };

  public postDataArea(area: Area) {
    const url_api = this.AUTH_SERVER + '/areas/add';
    return this.http.post(url_api, area);
  };

  public editDataArea(area: Area) {
    const url_api = this.AUTH_SERVER + `/areas/edit/${area._id}`;
    return this.http.put(url_api, area);
  }

  public deleteArea(id: string) {
    const url_api = this.AUTH_SERVER + `/areas/delete/${id}`;
    return this.http.delete(url_api)
  }

}
