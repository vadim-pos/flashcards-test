import { IntroComponent } from './components/intro/intro.component';
import { CardsComponent } from './components/cards/cards.component';
import { CardEditComponent } from './components/cards/card-edit/card-edit.component';
import { CardStudyComponent } from './components/cards/card-study/card-study.component';
import { AuthComponent } from './components/auth/auth.component';
import { AuthGuardService } from './services/auth-guard.service';

export const routes = [
    { path: '', component: IntroComponent, pathMatch: 'full', canActivate: [AuthGuardService] },
    { path: 'deck/:deckId', component: CardsComponent, canActivate: [AuthGuardService] },
    { path: 'deck/:deckId/add', component: CardEditComponent, canActivate: [AuthGuardService] },
    { path: 'deck/:deckId/edit/:cardId', component: CardEditComponent, canActivate: [AuthGuardService] },
    { path: 'deck/:deckId/study', component: CardStudyComponent, canActivate: [AuthGuardService] },
    { path: 'deck/:deckId/study/:cardId', component: CardStudyComponent, canActivate: [AuthGuardService] },
    { path: 'auth', component: AuthComponent }
];