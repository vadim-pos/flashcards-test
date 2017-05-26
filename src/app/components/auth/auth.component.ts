import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import { FirebaseService } from '../../services/firebase.service';
import { FlashcardsService } from '../../services/flashcards.service';


@Component({
    selector: 'app-auth',
    template: `
        <p>Sign Up</p>
        <form #SignUpFrom="ngForm" (ngSubmit)="onSignUp(SignUpFrom)">
            <input ngModel name="email" type="email" placeholder="email" />
            <input ngModel name="password" type="password" placeholder="password" />
            <button type="submit">Sign Up</button>
        </form>

        <p>Sign In</p>
        <form #SignInFrom="ngForm" (ngSubmit)="onSignIn(SignInFrom)">
            <input ngModel name="email" type="email" placeholder="email" />
            <input ngModel name="password" type="password" placeholder="password" />
            <button type="submit">Sign In</button>
        </form>
    `
})
export class AuthComponent {

    constructor(private firebaseService:FirebaseService, private flashcardsService:FlashcardsService, private router:Router) {}

    onSignUp(singUpForm:NgForm) {
        const { email, password } = singUpForm.value;
        this.firebaseService.signUpUser(email, password)
            .then(() => this.flashcardsService.loadFlashcards())
            .then(() => this.router.navigate(['']))
            .catch(err => console.log(err));
    }

    onSignIn(singInForm:NgForm) {
        const { email, password } = singInForm.value;
        this.firebaseService.signInUser(email, password)
            .then(() => this.flashcardsService.loadFlashcards())
            .then(() => this.router.navigate(['']))
            .catch(err => console.log(err));
    }
}
