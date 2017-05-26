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
                    <input #signUpEmail="ngModel" ngModel email required id="sign-up-email" class="form-input" name="email" type="email"/>
                    <label [class.active]="!!signUpEmail.value" class="input-field-label email" for="sign-up-email">email</label>
                    <small [class.active]="signUpEmail.invalid && signUpEmail.touched" class="input-error">valid email is required</small>
                </div>
                <div class="form-group">
                    <input #signUpPwd="ngModel" ngModel required minlength="6" id="sign-up-pwd" class="form-input" name="password" type="password"/>
                    <label [class.active]="!!signUpPwd.value" class="input-field-label password" for="sign-up-pwd">password</label>
                    <small [class.active]="signUpPwd.invalid && signUpPwd.touched" class="input-error">6 characters password is required</small>
                </div>
                <button [disabled]="SignUpFrom.invalid" class="form-submit-btn" type="submit">Sign Up</button>
            </form>
        </div>
        
        <div class="auth-form sign-in">
            <p class="form-title">Sign In</p>
            <form #SignInForm="ngForm" (ngSubmit)="onSignIn(SignInForm)">
                <div class="form-group">
                    <input #signInEmail="ngModel" ngModel email required id="sign-in-email" class="form-input" name="email" type="email"/>
                    <label [class.active]="!!signInEmail.value" class="input-field-label email" for="sign-in-email">email</label>
                    <small [class.active]="signInEmail.invalid && signInEmail.touched" class="input-error">valid email is required</small>
                </div>
                <div class="form-group">
                    <input #signInPwd="ngModel" ngModel required minlength="6" id="sign-in-pwd" class="form-input" name="password" type="password"/>
                    <label [class.active]="!!signInPwd.value" class="input-field-label password" for="sign-in-pwd">password</label>
                    <small [class.active]="signInPwd.invalid && signInPwd.touched" class="input-error">6 characters password is required</small>
                </div>
                <button [disabled]="SignInForm.invalid" class="form-submit-btn" type="submit">Sign In</button>
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
