import { Component } from '@angular/core';

@Component({
    selector: 'app-decks',
    template: `
        <aside class="decks">
            <app-decks-add></app-decks-add>
            <app-decks-list></app-decks-list>
        </aside>
    `,
    styleUrls: ['decks.component.scss']
})
export class DecksComponent {
    
}
