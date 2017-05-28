import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';

import { FirebaseService } from '../../services/firebase.service';
import { FlashcardsService } from '../../services/flashcards.service';


@Component({
    selector: 'app-auth',
    template: `
        
        <div [class.active]="authMode === 'sign in'" [class.inactive]="authMode !== 'sign in'" class="auth-form sign-in">
            <p class="form-title">Sign In</p>
            <form #SignInForm="ngForm" (ngSubmit)="onSignIn(SignInForm)">
                <div class="form-group">
                    <input #signInEmail="ngModel" ngModel email required id="sign-in-email" class="form-input" name="email" type="email"/>
                    <label [class.active]="!!signInEmail.value" class="input-field-label email" for="sign-in-email"></label>
                    <small [class.active]="signInEmail.invalid && signInEmail.touched" class="input-error">valid email is required</small>
                </div>
                <div class="form-group">
                    <input #signInPwd="ngModel" ngModel required minlength="6" id="sign-in-pwd" class="form-input" name="password" type="password"/>
                    <label [class.active]="!!signInPwd.value" class="input-field-label password" for="sign-in-pwd"></label>
                    <small [class.active]="signInPwd.invalid && signInPwd.touched" class="input-error">6 characters password is required</small>
                </div>
                <div *ngIf="signInError" class="auth-error">
                    <p class="auth-error-message">{{signInError}}</p>
                    <button (click)="signInError=null" class="auth-error-close"></button>
                </div>
                <button [disabled]="SignInForm.invalid" class="form-submit-btn" type="submit">Sign In</button>
            </form>
            <p>Have no account? <a (click)="authMode='sign up'">Sign up!</a></p>
        </div>
        
        <div [class.active]="authMode === 'sign up'" [class.inactive]="authMode !== 'sign up'" class="auth-form sign-up">
            <p class="form-title">Sign Up</p>
            <form [formGroup]="signUpForm" (ngSubmit)="onSignUp()">
                <div class="form-group">
                    <input #signUpEmail formControlName="email" id="sign-up-email" class="form-input" type="email"/>
                    <label [class.active]="!!signUpForm.get('email').value" class="input-field-label email" for="sign-up-email"></label>
                    <small [class.active]="signUpForm.get('email').invalid && signUpForm.get('email').touched" class="input-error">valid email is required</small>
                </div>
                <div class="form-group">
                    <input formControlName="password" id="sign-up-pwd" class="form-input" type="password"/>
                    <label [class.active]="signUpForm.get('password').value" class="input-field-label password" for="sign-up-pwd"></label>
                    <small [class.active]="signUpForm.get('password').invalid && signUpForm.get('password').touched" class="input-error">6 characters password is required</small>
                </div>
                <div class="form-group">
                    <input formControlName="password-repeat" id="sign-up-pwd-repeat" class="form-input" type="password"/>
                    <label [class.active]="signUpForm.get('password-repeat').value" class="input-field-label password-repeat" for="sign-up-pwd-repeat"></label>
                    <small [class.active]="signUpForm.get('password-repeat').invalid && signUpForm.get('password-repeat').touched" class="input-error">passwords do not match</small>
                </div>
                <div *ngIf="signUpError" class="auth-error">
                    <p class="auth-error-message">{{signUpError}}</p>
                    <button class="auth-error-close"></button>
                </div>
                <button [disabled]="signUpForm.invalid" class="form-submit-btn" type="submit">Sign Up</button>
            </form>
            <p>Already a user? <a (click)="authMode='sign in'">Sign in!</a></p>
        </div>
    `,
    styleUrls: ['auth.component.scss']
})
export class AuthComponent implements OnInit {
    signUpForm:FormGroup;
    signUpError:string; // error message returned from firebase
    signInError:string; // error message returned from firebase
    authMode = 'sign up'; // determines which form should be displayed - sign in or sign up

    constructor(private firebaseService:FirebaseService, private flashcardsService:FlashcardsService, private router:Router) {}

    ngOnInit() {
        this.signUpForm = new FormGroup({
            'email': new FormControl('', [Validators.required, Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]), // email regex taken from http://emailregex.com/
            'password': new FormControl('', [Validators.required, Validators.minLength(6)]),
            'password-repeat': new FormControl('', [Validators.required, this.passwordsMatch])
        });
    }

    onSignUp() {
        const { email, password } = this.signUpForm.value;
        this.firebaseService.signUpUser(email, password)
            .then(() => this.flashcardsService.loadFlashcards())
            .then(() => this.router.navigate(['']))
            .catch(err => this.signUpError = err.message);
    }

    onSignIn(signInForm:NgForm) {
        const { email, password } = signInForm.value;
        this.firebaseService.signInUser(email, password)
            .then(() => this.flashcardsService.loadFlashcards())
            .then(() => this.router.navigate(['']))
            .catch(err => this.signInError = err.message);
    }

    /* custom Validator function for passwords checking */
    passwordsMatch(control:FormControl): {[validationKey: string]: boolean} {
        // return this.signUpForm.get('password').value !== control.value ? { passwordsNotMatch: true } : null;
        return control.value !== control.root.value['password'] ? { passwordsNotMatch: true } : null;
    }
}


// <div class="auth-form sign-up">
//     <p class="form-title">Sign Up</p>
//     <form #SignUpFrom="ngForm" (ngSubmit)="onSignUp(SignUpFrom)">
//         <div class="form-group">
//             <input #signUpEmail="ngModel" ngModel email required id="sign-up-email" class="form-input" name="email" type="email"/>
//             <label [class.active]="!!signUpEmail.value" class="input-field-label email" for="sign-up-email">email</label>
//             <small [class.active]="signUpEmail.invalid && signUpEmail.touched" class="input-error">valid email is required</small>
//         </div>
//         <div class="form-group">
//             <input #signUpPwd="ngModel" ngModel required minlength="6" id="sign-up-pwd" class="form-input" name="password" type="password"/>
//             <label [class.active]="!!signUpPwd.value" class="input-field-label password" for="sign-up-pwd">password</label>
//             <small [class.active]="signUpPwd.invalid && signUpPwd.touched" class="input-error">6 characters password is required</small>
//         </div>
//         <button [disabled]="SignUpFrom.invalid" class="form-submit-btn" type="submit">Sign Up</button>
//     </form>
// </div>