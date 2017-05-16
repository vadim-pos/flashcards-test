import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { FlashcardsService } from '../../../services/flashcards.service';
import { Deck } from '../../../models/deck';

@Component({
    selector: 'app-decks-list',
    template: `
        <ul class="decks-list">
            <li *ngFor="let deck of decks" routerLinkActive="active" class="decks-item">
                <button class="item-edit-trigger" title="edit deck">edit</button>

                <a [routerLink]="['/deck', deck.id]" routerLinkActive="active" class="decks-item-link">{{deck.name}}</a>

                <form class="edit-form">
                    <input [value]="deck.name" required type="text" class="edit-text"/>
                    <button class="edit-submit" type="submit">done</button>
                    <button class="edit-remove">delete</button>
                </form>
            </li>
        </ul>
    `,
    styleUrls: ['./decks-list.component.scss']
})
export class DecksListComponent implements OnInit {
    decks:Deck[];
    deckCreatedSubscription:Subscription;
    

    constructor(private flashcardsService:FlashcardsService) { }

    ngOnInit() {
        this.decks = this.flashcardsService.getDecks();

        /* subscribe for new deck creation event */
        this.deckCreatedSubscription = this.flashcardsService.deckCreated.subscribe(() => {
            this.decks = this.flashcardsService.getDecks();
        });
    }

    ngOnDestroy() {
        this.deckCreatedSubscription.unsubscribe();
    }
}
