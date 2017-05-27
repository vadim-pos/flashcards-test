import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './components/app.component';
import { DecksComponent } from './components/decks/decks.component';
import { CardsComponent } from './components/cards/cards.component';
import { CardEditComponent } from './components/cards/card-edit/card-edit.component';
import { CardStudyComponent } from './components/cards/card-study/card-study.component';
import { IntroComponent } from './components/intro/intro.component';
import { DecksListComponent } from './components/decks/decks-list/decks-list.component';
import { DecksAddComponent } from './components/decks/decks-add/decks-add.component';
import { AuthComponent } from './components/auth/auth.component';

import { FlashcardsService } from './services/flashcards.service';
import { FirebaseService } from './services/firebase.service';
import { AuthGuardService } from './services/auth-guard.service';


import { routes } from './routes';

@NgModule({
  declarations: [
    AppComponent,
    DecksComponent,
    CardsComponent,
    CardEditComponent,
    CardStudyComponent,
    IntroComponent,
    DecksListComponent,
    DecksAddComponent,
    AuthComponent
],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    FlashcardsService,
    FirebaseService,
    AuthGuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
