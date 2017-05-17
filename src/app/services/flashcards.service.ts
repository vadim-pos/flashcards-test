import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { Deck } from '../models/deck';
import { Card } from '../models/card';

@Injectable()
export class FlashcardsService {
    decks:Deck[] = [];
    decksUpdated:Subject<void> = new Subject<void>();

    constructor() {
        this.decks = JSON.parse(localStorage.getItem('flashcards')) || [
            {
                name: 'First Deck',
                id: 11111,
                cards: [
                    {front: 'Deck1 Card1 Front', back: 'Deck1 Card1 Back', id: 1 },
                    {front: 'Deck1 Card2 Front', back: 'Deck1 Card2 Back', id: 2 }
                ]
            },
            {
                name: 'Second Deck',
                id: 22222,
                cards: [
                    {front: 'Deck2 Card1 Front', back: 'Deck2 Card1 Back', id: 3 },
                    {front: 'Deck2 Card2 Front', back: 'Deck2 Card2 Back', id: 4 }
                ]
            }
        ];
    }

    saveFlashcards() {
        localStorage.setItem('flashcards', JSON.stringify(this.decks));
    }

    getDecks():Deck[] {
        return this.decks.slice();
    }

    /* helper method */
    getDeckById(deckId:number):Deck {
        return this.decks.filter(deck => deck.id === deckId)[0];
    }

    getDeckCards(deckId:number) {
        return this.getDeckById(deckId).cards;
    }

    getDeckCard(deckId:number, cardId:number) {
        /* return card copy (using object spread) */
        return {...this.getDeckById(deckId).cards.filter(card => card.id === cardId)[0]};
    }

    getUnstudiedDeckCards(deckId:number) {
        const dayInMs = 24 * 60 * 60 * 1000; // day length in ms
        const now = new Date().setHours(0, 0, 0, 0); // current date in ms

        return this.getDeckCards(deckId).filter(card => {
            return card.studiedDate
                ? (now - card.studiedDate) / dayInMs >= card.studyExpirationDays
                : true;
        });

    }

    addDeck(deckName:string) {
        this.decks.push({
            id: +new Date(),
            name: deckName,
            cards: []
        });

        this.decksUpdated.next();
        this.saveFlashcards();
    }

    updateDeckName(deckId:number, deckName:string) {
        this.getDeckById(deckId).name = deckName;
        this.decksUpdated.next();
        this.saveFlashcards();
    }

    addCard(deckId:number, newCard:Card) {
        this.getDeckById(deckId).cards.push(newCard);
        this.saveFlashcards();
    }

    updateCard(deckId:number, updatedCard:Card) {
        let deck = this.decks.find(deck => deck.id === deckId); // get deck refference
        deck.cards = deck.cards.map(card => card.id === updatedCard.id ? updatedCard : card);
        this.saveFlashcards();
    }

    deleteCard(deckId:number, cardId:number) {
        const deck = this.getDeckById(deckId);
        deck.cards = deck.cards.filter(card => card.id !== cardId);
        this.saveFlashcards();
    }
}
