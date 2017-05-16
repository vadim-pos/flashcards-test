import { IntroComponent } from './components/intro/intro.component';
import { CardsComponent } from './components/cards/cards.component';
import { CardEditComponent } from './components/cards/card-edit/card-edit.component';
import { CardStudyComponent } from './components/cards/card-study/card-study.component';

export const routes = [
    { path: '', component: IntroComponent, pathMatch: 'full' },
    { path: 'deck/:deckId', component: CardsComponent },
    { path: 'deck/:deckId/add', component: CardEditComponent },
    { path: 'deck/:deckId/edit/:cardId', component: CardEditComponent },
    { path: 'deck/:deckId/study', component: CardStudyComponent },
    { path: 'deck/:deckId/study/:cardId', component: CardStudyComponent }
];