import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { FlashcardsService } from '../../../services/flashcards.service';
import { Card } from '../../../models/card';

@Component({
    selector: 'app-card-edit',
    template: `
        <form #form="ngForm" (ngSubmit)="onSubmit()" class="card-form">
            <div class="form-group">
                <textarea [(ngModel)]="card.front" class="text-field" id="front" name="front" cols="30" rows="8" required></textarea>
                <label *ngIf="!editingMode" class="text-field-label" for="front">Front side</label>
            </div>
            <div class="form-group">
                <textarea [(ngModel)]="card.back" class="text-field" id="back" name="back" cols="30" rows="8" required></textarea>
                <label *ngIf="!editingMode" class="text-field-label" for="back">Back side</label>
            </div>
            <div class="form-group">
                <button class="form-btn cancel" (click)="navigateBack()" type="button">Cancel</button>
                <button class="form-btn save" [disabled]="!form.valid" type="submit">Save</button>
                <button class="form-btn delete" *ngIf="editingMode" (click)="onDelete()" type="button">Delete</button>
            </div>
        </form>
    `,
    styleUrls: ['./card-edit.component.scss']
})
export class CardEditComponent implements OnInit {
    deckId:number;
    cardId:number;
    card:Card;
    editingMode:boolean = false;

    constructor(
        private router:Router,
        private route:ActivatedRoute, 
        private flashcardsService:FlashcardsService
    ) {}

    ngOnInit() {
        this.route.params.subscribe((params: Params) => {
            /*  if this is editing card route - get card by it's ID */

            if (params['cardId']) {
                this.editingMode = true;
                this.deckId = +params['deckId'];
                this.cardId = +params['cardId'];
                this.card = this.flashcardsService.getDeckCard(this.deckId, this.cardId);

            /* if this is a route for creating new card - create new empty card */

            } else {
                this.deckId = +params['deckId'];
                this.card = {
                    id: +new Date(),
                    front: '',
                    back: ''
                };
            }
        });
    }

    onSubmit() {
        if (this.editingMode) {
            /* update existing card */
            this.flashcardsService.updateCard(this.deckId, this.card);
            this.navigateBack();
        } else {
            /* add new card */
            this.flashcardsService.addCard(this.deckId, this.card);
            this.navigateBack();
        }
    }

    onDelete() {
        this.flashcardsService.deleteCard(this.deckId, this.cardId);
        this.navigateBack();
    }

    navigateBack() {
        this.router.navigate(['deck', this.deckId]); // back to deck/:deckId route
    }

}
