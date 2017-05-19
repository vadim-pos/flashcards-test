import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './components/app.component';
import { DecksComponent } from './components/decks/decks.component';
import { CardEditComponent } from './components/cards/card-edit/card-edit.component';
import { CardStudyComponent } from './components/cards/card-study/card-study.component';
import { IntroComponent } from './components/intro/intro.component';
import { DecksListComponent } from './components/decks/decks-list/decks-list.component';
import { DecksAddComponent } from './components/decks/decks-add/decks-add.component';

import { FlashcardsService } from './services/flashcards.service';
import { CardsComponent } from './components/cards/cards.component';

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
    DecksAddComponent
],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    FlashcardsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
