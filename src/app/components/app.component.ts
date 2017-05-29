import { Component, OnInit } from '@angular/core';

import { FirebaseService } from '../services/firebase.service';
import { FlashcardsService } from '../services/flashcards.service';

@Component({
    selector: 'app-root',
    template: `
        <app-decks [class.active]="showDecks"></app-decks>
        <main class="main">
            <header class="app-header">
                <button *ngIf="userIsAuthenticated && decksIsLoaded" (click)="showDecks = !showDecks" [class.active]="showDecks" class="decks-trigger" [title]="showDecks ? 'hide decks' : 'show decks'"></button>
                <h1 class="app-title">
                    <a [routerLink]="['']" data-hover="Flashcards repetitor" class="app-title-link">Flashcards repetitor</a>
                </h1>
            </header>
            <router-outlet></router-outlet>
        </main>
    `,
    styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
    showDecks:boolean = false;
    decksIsLoaded:boolean = false;
    userIsAuthenticated:boolean = false;

    constructor(private firebaseService:FirebaseService, private flashcardsService:FlashcardsService) {}
    
    ngOnInit() {
        this.firebaseService.authStateChanged.subscribe(userIsAuthenticated => {
            this.userIsAuthenticated = userIsAuthenticated;
            if (this.userIsAuthenticated && this.decksIsLoaded) {
                this.showDecks = true;
            } else {
                this.showDecks = false;
            }
        });

        this.flashcardsService.decksInitiallyLoaded.subscribe(() => {
            this.decksIsLoaded = true;
            if (this.userIsAuthenticated) { this.showDecks = true; }
        });
    }
}
