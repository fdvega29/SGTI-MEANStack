import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { usersModule } from '../models/user.module';
import { tap, map } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { sessionUser } from '../models/session.module';

@Injectable({
  providedIn: 'root'
})
export class AutenticacionService {

  AUTH_SERVER: string = 'http://localhost:3000/api';
  authSubject = new BehaviorSubject(false);
  selectedUser: usersModule;
  usuarios: usersModule[];

  token: string;

  constructor(private http: HttpClient, private router: Router) { 
    this.selectedUser = new usersModule();
  }
  /*===================================
    Registro de usuario
  ====================================*/
  public signup(user: usersModule): Observable<sessionUser> {
    return this.http.post<sessionUser>(`${this.AUTH_SERVER}/signup`,
      user).pipe(tap(
        (res: sessionUser) => {
          if (res) {
            this.saveStorage(
              res.dataUser.token,
              res.dataUser.expiresIn
            );
          }
          console.log(res);
        })
      );
  }
  /*===================================
    Login de usuario normal
  ====================================*/
  public signin(user: usersModule): Observable<sessionUser> {
    return this.http.post<sessionUser>(`${this.AUTH_SERVER}/signin`,
      user).pipe(tap(
        (res: sessionUser) => {
          if (res) {
            this.saveStorage(
              res.dataUser.token,
              res.dataUser.expiresIn
            );
          }
          console.log(res);
        }
      ));
  }
  /*===================================
    Login Google
  ====================================*/
  public signinGoogle(token: string) {
    const url = this.AUTH_SERVER + '/signin/google';
    return this.http.post<sessionUser>(url, { token })
      .pipe(map((res: sessionUser) => {
        this.saveStorage(
          res.dataUser.token,
          res.dataUser.expiresIn
        );
        console.log(res);
        return res
      }));
  };
  /*===================================
    Logout app
  ====================================*/
  public logout() {
    localStorage.removeItem("TOKEN");
    localStorage.removeItem("EXPIRES_IN");
    localStorage.removeItem("currentUser");
    window.location.href = '#/home'
  };

  getToken() {
    this.token = localStorage.getItem("TOKEN");
  };

  private saveStorage(token: string, expiresIn: string): void {
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
