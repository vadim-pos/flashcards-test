import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';

import { FirebaseService } from './firebase.service';
import { FlashcardsService } from './flashcards.service';

@Injectable()
export class AuthGuardService implements CanActivate {

    constructor(private firebaseService:FirebaseService, private router:Router, private flashcardsService:FlashcardsService) { }

    canActivate(route:ActivatedRouteSnapshot, state:RouterStateSnapshot):Observable<boolean>|boolean {
        console.log('AUTH_GUARD: checking auth ...');

        switch (this.firebaseService.userAuthStatus) {
            case 'authenticated': // if user already authenticated - open route
                console.log('AUTH_GUARD: authenticated');
                return true;
            case 'not authenticated': // if user is not authenticated - redirect to auth route
                console.log('AUTH_GUARD: not authenticated')
                this.router.navigate(['/auth']);
                return false;
            case 'not defined': // if auth check is not have been completed - wait untill firebase checks it
                return this.firebaseService.authStateChanged.map(userIsAuthenticated => {
                    if (userIsAuthenticated) {
                        console.log('AUTH_GUARD: authenticated - async');




                        // console.log(this.flashcardsService.loadFLashcards());
                        this.flashcardsService.loadFlashcards().then(() => {
                            console.log('AUTH_GUARD: data loaded!')
                            console.log(state);
                            // this.router.navigate(['']);
                            this.router.navigate([state.url]);
                            return true;
                        });
                        



                        // return true;
                    } else {
                        console.log('AUTH_GUARD: not authenticated - async');
                        this.router.navigate(['/auth']);
                        return false;
                    }
                });
        }
    }
}
