import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsersModule } from '../usersModel/users/users.module';

@Injectable({
  providedIn: 'root'
})

export class UserServiceService {

  selectedUser: UsersModule;
  user: UsersModule[];
  readonly URL_API = ('http://localhost:3000/api/users');

  constructor(private http: HttpClient) {
      this.selectedUser = new UsersModule(); 
   }

   //Metodos HTTP

   getUsers(){
     return this.http.get(this.URL_API);
   }

   postUser(User: UsersModule){
     return this.http.post(this.URL_API, User);
   }

   putUser(User: UsersModule){
     return this.http.put(this.URL_API + `/${User._id}`, User);
   }

   deleteUser(User: UsersModule){
    return this.http.delete(this.URL_API + `/${User._id}`);
  }
}
