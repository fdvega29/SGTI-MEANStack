import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { usersModule } from '../models/user.module';
import { isNullOrUndefined } from 'util';
import { sessionUser } from '../models/session.module';



@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  selectedUser: usersModule;
  usuarios: usersModule[];
  AUTH_SERVER: string = 'http://localhost:3000/api';


  constructor(private http: HttpClient) {
    this.selectedUser = new usersModule();
  }

  /*Metodos HTTP*/

  getAllUser(){
    const url_api = this.AUTH_SERVER + '/user/all';
    return this.http.get(url_api);
  };

  /*getUserById(id: string){
    const url_api = this.AUTH_SERVER + `/user/${id}`;
    return this.http.get(url_api);
  }*/

  public setUser(user): void {
    const user_string = JSON.stringify(user);
    localStorage.setItem("currentUser", user_string);
  }

  public getCurrentUser(): sessionUser {
    const userData = localStorage.getItem("currentUser");
    if (!isNullOrUndefined(userData)) {
      const usuario: sessionUser = JSON.parse(userData);
      return usuario;
    } else {
      return null;
    }
  }

  public getUser(id: string){
    const url_api = this.AUTH_SERVER + `/user/${id}`;
    return this.http.get(url_api)
  }

  public editUserById(user: usersModule){
    const url_api = this.AUTH_SERVER + `/user/update/${user._id}`;
    return this.http.put(url_api, user);
  }

  public deleteUserById(id: string){
    const url_api = this.AUTH_SERVER + `/user/delete/${id}`;
    return this.http.delete(url_api)
  }

}
