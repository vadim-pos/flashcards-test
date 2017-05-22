import { Component, OnInit } from '@angular/core';
/**
 * IntroComponent
 * Contains app introduction information. Showing on the root ('/') route. 
 */
@Component({
    selector: 'app-intro',
    template: `
        <p class="intro-item main"><span class="highlight">Flashcards Repetitor</span> is based on <mark>spaced repetition</mark> learning technique and <mark>Leitner system</mark>.</p>
        <p class="intro-item create">Create new decks and cards.
        <p class="intro-item toggle">Show and hide your decks by using this icon on top.
        <p class="intro-item flip">Each flashcard bearing information on both sides. Write your question on a card and an answer overleaf.
        <p class="intro-item edit">You can edit information on your card any time.</p>
        <p class="intro-item study">Flashcards can bear vocabulary, historical dates, formulas or any subject matter that can be learned via a question-and-answer format.
    `,
    styleUrls: ['intro.component.scss']
})
export class IntroComponent implements OnInit {

    constructor() { }

    ngOnInit() {
    }

}
