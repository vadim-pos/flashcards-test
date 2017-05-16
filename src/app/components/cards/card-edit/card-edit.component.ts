import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { FlashcardsService } from '../../../services/flashcards.service';
import { Card } from '../../../models/card';

@Component({
    selector: 'app-card-edit',
    template: `
        <form #form="ngForm" (ngSubmit)="onSubmit()" class="card-form">
            <div class="card-form-group">
                <textarea [(ngModel)]="card.front" class="card-text" name="front" cols="30" rows="8" required></textarea>
                <label *ngIf="!editingMode" class="card-label">Front side</label>
            </div>
            <div class="card-form-group">
                <textarea [(ngModel)]="card.back" class="card-text" name="back" cols="30" rows="8" required></textarea>
                <label *ngIf="!editingMode" class="card-label">Back side</label>
            </div>
            <div class="card-form-group">
                <button class="card-form-btn cancel" (click)="onCancel()" type="button">Cancel</button>
                <button class="card-form-btn save" [disabled]="!form.valid" type="submit">Save</button>
                <button class="card-form-btn delete" *ngIf="editingMode" (click)="onDelete()" type="button">Delete</button>
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
            this.router.navigate(['../../'], {relativeTo: this.route}); // back to deck/:deckId route
        } else {
            /* add new card */
            this.flashcardsService.addCard(this.deckId, this.card);
            this.router.navigate(['../'], {relativeTo: this.route}); // back to deck/:deckId route
        }
    }

    onCancel() {
        this.editingMode 
            ? this.router.navigate(['../../'], {relativeTo: this.route})
            : this.router.navigate(['../'], {relativeTo: this.route});
    }

    onDelete() {
        this.flashcardsService.deleteCard(this.deckId, this.cardId);
        this.router.navigate(['../../'], {relativeTo: this.route}); // back to deck/:deckId route
    }

}
