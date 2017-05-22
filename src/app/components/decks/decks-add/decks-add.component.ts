import { Component } from '@angular/core';

import { FlashcardsService } from '../../../services/flashcards.service';

/**
 * DecksAddComponent
 * Contains switchable form for creting new deck of cards
 */
@Component({
    selector: 'app-decks-add',
    template: `
        <div class="form-toggle-wrap">
            <button (click)="showAddForm = !showAddForm" [class.close]="showAddForm" class="form-toggle-btn" title="create deck"></button>
            <span class="form-toggle-hint" [class.active]="showAddForm">Create new deck</span>
        </div>

        <form #form="ngForm" (ngSubmit)="onSubmit(form)" [class.active]="showAddForm" class="add-form">
            <div class="add-name-wrap">
                <input ngModel type="text" name="deckName" autocomplete="off" class="add-name-input" required placeholder="Deck name ..." />
            </div>
            <button type="submit" [disabled]="form.invalid" class="add-name-btn">done</button>
        </form>
    `,
    styleUrls: ['./decks-add.component.scss']
})
export class DecksAddComponent {
    showAddForm:boolean = false;
    
    constructor(private flashcardsService:FlashcardsService) { }

    onSubmit(form) {
        this.flashcardsService.addDeck(form.value.deckName);
        this.showAddForm = false;
    }

}
