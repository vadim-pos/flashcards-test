import { Component } from '@angular/core';

@Component({
    selector: 'app-decks',
    template: `
        <app-decks-add></app-decks-add>
        <app-decks-list></app-decks-list>
    `,
    styleUrls: ['decks.component.scss']
})
export class DecksComponent {
    
}
