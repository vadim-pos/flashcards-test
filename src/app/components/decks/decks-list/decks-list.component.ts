import { Component, OnInit, Renderer2 } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { FlashcardsService } from '../../../services/flashcards.service';
import { Deck } from '../../../models/deck';

@Component({
    selector: 'app-decks-list',
    template: `
        <ul class="decks-list">
            <li *ngFor="let deck of decks" routerLinkActive="active" class="decks-item">
                <button (click)="showEditForm(editForm)" class="item-edit-trigger" title="edit deck">edit</button>

                <a (click)="hideEditForm()" [routerLink]="['/deck', deck.id]" routerLinkActive="active" class="decks-item-link">{{deck.name}}</a>

                <form #editForm (ngSubmit)="nameField.value === deck.name ? hideEditForm() : updateDeckName(deck.id, nameField.value)" class="edit-form">
                    <input #nameField (keyup.escape)="hideEditForm()" [value]="deck.name" required type="text" class="edit-text"/>
                    <button class="edit-submit" type="submit">done</button>
                    <button class="edit-remove" type="button">delete</button>
                </form>
            </li>
        </ul>
    `,
    styleUrls: ['./decks-list.component.scss']
})
export class DecksListComponent implements OnInit {
    decks:Deck[];
    deckCreatedSubscription:Subscription;
    activeFormElement:HTMLElement;

    constructor(private flashcardsService:FlashcardsService, private renderer:Renderer2) { }

    ngOnInit() {
        this.decks = this.flashcardsService.getDecks();

        /* subscribe for new deck creation event */
        this.deckCreatedSubscription = this.flashcardsService.decksUpdated.subscribe(() => {
            this.decks = this.flashcardsService.getDecks();
        });
    }

    showEditForm(form:HTMLElement) {
        this.activeFormElement = form;
        this.renderer.addClass(form, 'active');
        this.activeFormElement[0].focus(); // set focus on name input field
    }

    hideEditForm() {
        if (this.activeFormElement) { this.renderer.removeClass(this.activeFormElement, 'active'); }
    }

    updateDeckName(deckId:number, deckName:string) {
        if (!deckName.length) { this.hideEditForm(); }
        this.flashcardsService.updateDeckName(deckId, deckName);
        this.hideEditForm();
    }

    ngOnDestroy() {
        this.deckCreatedSubscription.unsubscribe();
    }
}
