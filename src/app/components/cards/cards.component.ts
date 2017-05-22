import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { FlashcardsService } from '../../services/flashcards.service';
import { Card } from '../../models/card';

/**
 * CardsComponent
 * Renders cards of selected deck. Contains controls bar.
 */
@Component({
    selector: 'app-cards-list',
    template: `
        <div class="controls">
            <a [routerLink]="['add']" class="add-card-btn" title="create card"></a>
            <a *ngIf="cards.length" [routerLink]="['study']" class="study-deck-btn">Study Deck</a>
            <span *ngIf="cards.length" class="cards-count">
                {{cards.length + ' card' + (cards.length > 1 ? 's' : '')}}
            </span>
            <span class="deck-name">{{deckName}}</span>
        </div>

        <div *ngIf="!cards.length" class="no-cards">
            <p class="no-cards-message">You have no cards in this deck.</p>
            <p class="no-cards-message">Click <span class="add-icon"></span> to create one!</p>
        </div>

        <ul class="cards-list">
            <li class="cards-item" *ngFor="let card of cards">
                <p class="cards-item-desc">{{card.front}}</p>
                <a [routerLink]="['edit', card.id]" class="cards-item-edit">Edit</a>
                <a [routerLink]="['study', card.id]" class="cards-item-study">Study</a>
            </li>
        </ul>
    `,
    styleUrls: ['cards.component.scss']
})
export class CardsComponent implements OnInit {
    deckId:number = null;
    deckName:string;
    cards:Card[];

    constructor(private route:ActivatedRoute, private flashcardsService:FlashcardsService, private router:Router) { }

    ngOnInit() {
        this.route.params.subscribe((params: Params) => {
            if (params['deckId']) {
                this.deckId = +params['deckId'];
                const deck = this.flashcardsService.getDeckById(this.deckId);
                this.deckName = deck.name;
                this.cards = deck.cards;
            } else {
                this.cards = [];
            }
        });
    }
}