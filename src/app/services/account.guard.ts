import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import { AccountService } from './account.service';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private authService: AccountService,
                private router: Router) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : Observable<boolean> | boolean {
        if (this.authService.isAuthenticated()) {
            alert("true")
            return true;
        } else {
            alert("false")
            this.authService.logout();
            this.router.navigate(['/login'], {
                queryParams: {
                    loginAgain: true
                }
            });
            return false;
        }
    }

}