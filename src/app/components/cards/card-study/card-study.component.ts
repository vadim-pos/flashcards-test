import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { FlashcardsService } from '../../../services/flashcards.service';
import { Card } from '../../../models/card';

@Component({
    selector: 'app-card-study',
    template: `
        <div *ngIf="card" class="card">
            <p *ngIf="!singleCardMode" class="study-desc">
                Studying {{deckName}}. <span class="cards-count">{{unstudiedCards.length + ' card' + (unstudiedCards.length > 1 ? 's' : '')}} left</span>
            </p>
            
            <div [class.flipped]="cardFlipped" class="flip-container">
                <div class="card-front">
                    <button (click)="navigateBack()" class="close-btn"></button>
                    <p class="card-text">{{card.front}}</p>
                    <button (click)="cardFlipped = true" class="card-flip-btn">Flip Card</button>
                </div>

                <div class="card-back">
                    <button (click)="navigateBack()" class="close-btn"></button>
                    <p class="card-text">{{card.back}}</p>

                    <div class="rate">
                        <p class="rate-desc">Rate your result</p>

                        <div class="rate-btns">
                            <button (click)="onStudyDone(1)" class="rate-btn bad" title="bad">
                                sentiment_very_dissatisfied
                            </button>
                            <button (click)="onStudyDone(2)" class="rate-btn poor" title="poorly">
                                sentiment_dissatisfied
                            </button>
                            <button (click)="onStudyDone(3)" class="rate-btn ok" title="okay">
                                sentiment_neutral
                            </button>
                            <button (click)="onStudyDone(4)" class="rate-btn good" title="good">
                                sentiment_satisfied
                            </button>
                            <button (click)="onStudyDone(5)" class="rate-btn great" title="great">
                                sentiment_very_satisfied
                            </button>
                        </div>

                    </div>
                </div>

            </div>
        </div>
        
        <div *ngIf="!card" class="study-done">
            <p class="study-done-message">You have no cards to study in this deck right now. <br/> <strong>Good job!</strong></p>
            <a [routerLink]="['/deck', deckId]" class="study-done-link">Ok</a>
        </div>        
    `,
    styleUrls: ['card-study.component.scss']
})
export class CardStudyComponent implements OnInit {
    deckId:number;
    deckName:string;
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

            if (params['cardId']) {
                this.singleCardMode = true;
                this.deckId = +params['deckId'];
                this.cardId = +params['cardId'];
                this.card = this.flashcardsService.getDeckCard(this.deckId, this.cardId);

            /* if studying a whole deck */

            } else {
                this.singleCardMode = false;
                this.deckId = +params['deckId'];
                this.deckName = this.flashcardsService.getDeckById(this.deckId).name;
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
            setTimeout(() => this.navigateBack(), 200); // add a little delay before navigating back
        } else {
            this.unstudiedCards.shift(); // remove studied card

            if (this.unstudiedCards.length) { // if there are unstudied cards - get new one
                this.cardFlipped = false;
                setTimeout(() => this.card = this.unstudiedCards[0], 300); // wait untill card flipps back
            } else { // show 'no cards left' message
                this.card = null;
            }
        }
    }

    navigateBack() {
        this.router.navigate(['deck', this.deckId]);
    }

}
