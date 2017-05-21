import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { Deck } from '../models/deck';
import { Card } from '../models/card';

@Injectable()
export class FlashcardsService {
    decks:Deck[] = [];
    decksUpdated:Subject<void> = new Subject<void>();

    constructor() {
        this.decks = JSON.parse(localStorage.getItem('flashcards')) || exampleDecks;
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

    getDeckCards(deckId:number):Card[] {
        return this.getDeckById(deckId).cards;
    }

    getDeckCard(deckId:number, cardId:number):Card {
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

    deleteDeck(deckId:number) {
        this.decks = this.decks.filter(deck => deck.id !== deckId);
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

/* decks examples, setting as default */
const exampleDecks:Deck[] = [
    {
        name: 'Chinease',
        id: 1052414683911,
        cards: [
            {front: 'Good afternoon', back: '下午好 - Xiàwǔ hǎo', id: 136032 },
            {front: 'Good evening', back: '晚上好 - Wǎnshàng hǎo', id: 102992 },
            {front: 'Hello', back: '你好 - Nǐ hǎo', id: 111192 },
        ]
    },
    {
        name: 'Belarusian History',
        id: 124567890123,
        cards: [
            {front: 'Foundation of Mogilev', back: '1267 - the first mention in the annals. Foundation of Mogilev Castle.', id: 100012 },
            {front: 'Mogilev defense in WWII dates', back: '17 days. From July 4 to July 21 (1941).', id: 122212 },
            {front: 'Mogilev Liberation day in WWII', back: 'June 28 1944', id: 1909012 },
        ]
    }
];