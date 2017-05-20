import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-root',
    template: `
        <app-decks [class.active]="showDecks"></app-decks>
        <main class="main">
            <header class="app-header">
                <button (click)="showDecks = !showDecks" [class.active]="showDecks" class="decks-trigger" [title]="showDecks ? 'hide decks' : 'show decks'"></button>
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
    showDecks:boolean = true;

    constructor() {}
    
    ngOnInit() {
        
    }
}
