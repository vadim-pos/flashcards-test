import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-root',
    template: `
        <div class="container">
        <header class="app-header">Flashcards repetitor</header>
            <app-decks></app-decks>
            <main class="main">
                <router-outlet></router-outlet>
            </main>

        </div>
    `,
    styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {

    constructor() {}
    
    ngOnInit() {
        
    }
}
