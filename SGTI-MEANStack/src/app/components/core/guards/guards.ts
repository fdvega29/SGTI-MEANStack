import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserServiceService} from '../../user/service/user.service';


@Injectable({

  providedIn: 'root'

})

// Creamos nuestra clase e implementamos CanActive
export class AuthGuard implements CanActivate {

  constructor(public authService: UserServiceService, public router: Router) {}

  canActivate() {

    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['user/signin']);
      return false;
    }
    return true;

  }

}
