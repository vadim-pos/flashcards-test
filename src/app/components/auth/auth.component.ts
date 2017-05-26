import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import { FirebaseService } from '../../services/firebase.service';
import { FlashcardsService } from '../../services/flashcards.service';


@Component({
    selector: 'app-auth',
    template: `
        <div class="auth-form sign-up">
            <p class="form-title">Sign Up</p>
            <form #SignUpFrom="ngForm" (ngSubmit)="onSignUp(SignUpFrom)">
                <div class="form-group">
                    <input #signUpEmail ngModel email required id="sign-up-email" class="form-input" name="email" type="email"/>
                    <label [class.active]="!!signUpEmail.value" class="input-field-label email" for="sign-up-email">email</label>
                    <small [class.active]="signUpEmail.invalid" class="input-error">valid email is required</small>
                </div>
                <div class="form-group">
                    <input #signUpPwd ngModel required minlength="6" id="sign-up-pwd" class="form-input" name="password" type="password"/>
                    <label [class.active]="!!signUpPwd.value" class="input-field-label password" for="sign-up-pwd">password</label>
                    <small class="input-error">6 characters password is required</small>
                </div>
                <button class="form-submit-btn" type="submit">Sign Up</button>
            </form>
        </div>
        
        <div class="auth-form sign-in">
            <p class="form-title">Sign In</p>
            <form #SignInFrom="ngForm" (ngSubmit)="onSignIn(SignInFrom)">
                <input ngModel name="email" type="email" placeholder="email" />
                <input ngModel name="password" type="password" placeholder="password" />
                <button type="submit">Sign In</button>
            </form>
        </div>
    `,
    styleUrls: ['auth.component.scss']
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
