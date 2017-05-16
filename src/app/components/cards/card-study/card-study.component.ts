import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { FlashcardsService } from '../../../services/flashcards.service';
import { Card } from '../../../models/card';

@Component({
    selector: 'app-card-study',
    template: `
        <div *ngIf="card" class="card">
            <div [class.flipped]="cardFlipped" class="card__flip-container">

                <div class="card__front">
                    <p class="card__front-text">{{card.front}}</p>
                    <button (click)="cardFlipped = true" class="card-flip-btn">Flip Card</button>
                </div>

                <div class="card__back">
                    <p class="card__back-text">{{card.back}}</p>
                    <div class="card-rate">
                        <p class="card-rate-desc">Rate your result</p>

                        <div class="card-rate-btns">
                            <button (click)="onStudyDone(1)" class="card-rate-btn bad" title="bad">
                                sentiment_very_dissatisfied
                            </button>
                            <button (click)="onStudyDone(2)" class="card-rate-btn poor" title="poorly">
                                sentiment_dissatisfied
                            </button>
                            <button (click)="onStudyDone(3)" class="card-rate-btn ok" title="okay">
                                sentiment_neutral
                            </button>
                            <button (click)="onStudyDone(4)" class="card-rate-btn good" title="good">
                                sentiment_satisfied
                            </button>
                            <button (click)="onStudyDone(5)" class="card-rate-btn great" title="great">
                                sentiment_very_satisfied
                            </button>
                        </div>

                    </div>
                </div>

            </div>
        </div>
        
        <div *ngIf="!card">
            <h1>You have no cards to study in this deck right now. Good job!</h1>
            <a [routerLink]="['/deck', deckId]">Ok</a>
        </div>        
    `,
    styleUrls: ['card-study.component.scss']
})
export class CardStudyComponent implements OnInit {
    deckId:number;
    cardId:number;
    card:Card;
    unstudiedCards:Card[];
    singleCardMode:boolean; // true when studying a single card, false - when studying a whole deck
    cardFlipped:boolean = false;

    constructor(
        private router:Router,
        private route:ActivatedRoute, 
        private flashcardsService:FlashcardsService
    ) {}

    ngOnInit() {
        this.route.params.subscribe((params: Params) => {
            /*  if studying a single card */

            this.singleCardMode = true;

            if (params['cardId']) {
                this.deckId = +params['deckId'];
                this.cardId = +params['cardId'];
                this.card = this.flashcardsService.getDeckCard(this.deckId, this.cardId);

            /* if studying a whole deck */

            } else {
                this.singleCardMode = false;
                this.deckId = +params['deckId'];
                /* get first unstudied cards */
                this.unstudiedCards = this.flashcardsService.getUnstudiedDeckCards(this.deckId);
                this.card = this.unstudiedCards[0];
            }
        });
    }

    onStudyDone(studyRank) {
        this.card.studiedDate = new Date().setHours(0, 0, 0, 0);
        this.card.studyExpirationDays = studyRank;
        this.flashcardsService.updateCard(this.deckId, this.card);

        if (this.singleCardMode) {
            this.router.navigate(['../../'], {relativeTo: this.route}); // navigate back
        } else {
            this.unstudiedCards.shift(); // remove studied card

            if (this.unstudiedCards.length) { // if there are unstudied cards - get new one
                this.card = this.unstudiedCards[0];
                this.cardFlipped = false;
            } else { // show 'no cards left' message
                this.card = null;
            }
        }
    }

}
