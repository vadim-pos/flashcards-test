import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-root',
    template: `
        <div class="app-container">
            <app-decks></app-decks>
            
            <main class="main">
                <router-outlet></router-outlet>
            </main>
        </div>
    `
})
export class AppComponent implements OnInit {

    constructor() {}
    
    ngOnInit() {
        
    }
}
