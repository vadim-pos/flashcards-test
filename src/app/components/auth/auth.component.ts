import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';

import { FirebaseService } from '../../services/firebase.service';
import { FlashcardsService } from '../../services/flashcards.service';


@Component({
    selector: 'app-auth',
    template: `
        <div [ngClass]="{active: authMode === 'sign in', inactive: authMode !== 'sign in'}" class="auth-form">
            <div class="form-header">
                <p class="form-header-text"><strong>Sign In</strong></p>
                <p class="form-header-text">
                    Have no account? <a (click)="authMode='sign up'" class="form-toggle-link">Sign up!</a>
                </p>
            </div>

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
                <button [disabled]="SignInForm.invalid" [class.loading]="formIsSubmiting" class="form-submit-btn" type="submit">Sign In</button>
            </form>

        </div>
        
        <div [ngClass]="{active: authMode === 'sign up', inactive: authMode !== 'sign up'}" class="auth-form">
            <div class="form-header">
                <p class="form-header-text"><strong>Sign Up</strong></p>
                <p class="form-header-text">
                    Already a user? <a (click)="authMode='sign in'" class="form-toggle-link">Sign in!</a>
                </p>
            </div>

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
                    <button (click)="signUpError=null" class="auth-error-close"></button>
                </div>
                <button [disabled]="signUpForm.invalid" [class.loading]="formIsSubmiting" class="form-submit-btn" type="submit">Sign Up</button>
            </form>
        </div>
    `,
    styleUrls: ['auth.component.scss']
})
export class AuthComponent implements OnInit {
    signUpForm:FormGroup;
    signUpError:string; // error message returned from firebase
    signInError:string; // error message returned from firebase
    authMode = 'sign up'; // determines which form should be displayed - sign in or sign up
    formIsSubmiting:boolean = false;

    constructor(private firebaseService:FirebaseService, private flashcardsService:FlashcardsService, private router:Router) {}

    ngOnInit() {
        this.signUpForm = new FormGroup({
            'email': new FormControl('', [Validators.required, Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]), // email regex taken from http://emailregex.com/
            'password': new FormControl('', [Validators.required, Validators.minLength(6)]),
            'password-repeat': new FormControl('', [Validators.required, this.passwordsMatch])
        });
    }

    onSignUp() {
        if (this.formIsSubmiting) { return; } // prevent if form is already submitting

        const { email, password } = this.signUpForm.value;

        this.formIsSubmiting = true;
        this.firebaseService.signUpUser(email, password)
            .then(() => this.flashcardsService.loadFlashcards())
            .then(() => this.router.navigate(['']))
            .catch(err => {
                this.signUpError = err.message;
                this.formIsSubmiting = false;
            });
    }

    onSignIn(signInForm:NgForm) {
        if (this.formIsSubmiting) { return; } // prevent if form is already submitting

        const { email, password } = signInForm.value;

        this.formIsSubmiting = true;
        this.firebaseService.signInUser(email, password)
            .then(() => this.flashcardsService.loadFlashcards())
            .then(() => this.router.navigate(['']))
            .catch(err => {
                this.signInError = err.message;
                this.formIsSubmiting = false;
            });
    }

    /* custom Validator function for passwords checking */
    passwordsMatch(control:FormControl): {[validationKey: string]: boolean} {
        return control.value !== control.root.value['password'] ? { passwordsNotMatch: true } : null;
    }
}