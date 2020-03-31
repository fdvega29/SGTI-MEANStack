import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsersModule } from '../model/user/user.module';
import { JwtResponseI } from '../model/jwt-response-i';
import { tap } from 'rxjs/operators';
import {Observable, BehaviorSubject} from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class UserServiceService {

  AUTH_SERVER: string = 'http://localhost:3000/api';
  authSubject = new BehaviorSubject(false);
  selectedUser: UsersModule;
  user: UsersModule[];
  private token: string;

  constructor(private http: HttpClient, private router: Router) {
      this.selectedUser = new UsersModule();
   }

   signup(user: UsersModule): Observable<JwtResponseI>{
   return this.http.post<JwtResponseI>(`${this.AUTH_SERVER}/signup`,
      user).pipe(tap(
        (res: JwtResponseI) => {
            if (res){
              this.saveToken(
                res.dataUser.email,
                res.dataUser.token, 
                res.dataUser.expiresIn);
            }
        })
      );
   }

   signin(user: UsersModule, recuerdame: boolean = false): Observable<JwtResponseI>{
     if(recuerdame){
        localStorage.setItem("EMAIL", user.email);
     }else{
       localStorage.removeItem("EMAIL");
     }
    return this.http.post<JwtResponseI>(`${this.AUTH_SERVER}/signin`,
     user).pipe(tap(
       (res: JwtResponseI) => {
         if (res) {
           this.saveToken(
             res.dataUser.email,
             res.dataUser.token, 
             res.dataUser.expiresIn);
         }
       }
       
     ));
   }

   logout(){
     localStorage.removeItem("TOKEN");
     localStorage.removeItem("EXPIRES_IN");
     this.router.navigate(['/home']);
  };

    getToken(){
      this.token = localStorage.getItem("TOKEN");
    };

   private saveToken(email: string, token: string, expiresIn: string): void{
     localStorage.setItem("EMAIL", email)
     localStorage.setItem("TOKEN", token);
     localStorage.setItem("EXPIRES_IN", expiresIn);
     this.token = token;
   };

  isLoggedIn() {
      if (!localStorage.getItem('TOKEN')) {
        return false;
      }
      return true;
  }
}



