import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { tokenNotExpired } from 'angular2-jwt';
import { ActualizacionusuarioService } from '../servicios/actualizacionusuario.service';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router, public ActualizacionusuarioService: ActualizacionusuarioService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (tokenNotExpired('token')) {
            return true;
        }
        localStorage.clear();
        this.ActualizacionusuarioService.actualizarObservable();
        alert('Su sesion a expirado.');
        // not logged in so redirect to login page with the return url
        this.router.navigate(['login']);
        return false;
    }
}