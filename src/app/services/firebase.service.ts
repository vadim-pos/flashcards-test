import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class FirebaseService {
    private dbRef:firebase.database.Reference; // ref to firebase DB
    private userId:string;
    
    userAuthStatus:string = 'not defined'; // current auth status, changed by firebse's onAuthStateChanged() handler
    authStateChanged:Subject<boolean> = new Subject<boolean>();

    constructor(private router:Router) {

        const config = {
            apiKey: "AIzaSyCq4qVj6NMEyUSqdy00Jet8xZkd6V4wxRg",
            authDomain: "ng-flashcards-ee871.firebaseapp.com",
            databaseURL: "https://ng-flashcards-ee871.firebaseio.com",
            projectId: "ng-flashcards-ee871"
        };

        firebase.initializeApp(config);

        this.dbRef = firebase.database().ref();

        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.userId = user.uid;
                this.userAuthStatus = 'authenticated';
                this.authStateChanged.next(true);
            } else {
                this.userAuthStatus = 'not authenticated';
                this.authStateChanged.next(false);
                this.router.navigate(['/auth']);
            }
        });
    }

    signUpUser(email:string, password:string):firebase.Promise<any> {
        return firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(user => this.userId = user.uid);
    }

    signInUser(email:string, password:string):firebase.Promise<any> {
        return firebase.auth().signInWithEmailAndPassword(email, password)
            .then(user => this.userId = user.uid);
    }

    saveFlashcards(data:any) {
        this.dbRef.child(`users/${this.userId}`).set({ decks: data })
            .then(res => console.log(res))
            .catch(err => console.log(err));
    }

    loadFlashcards():firebase.Promise<any> {
        return this.dbRef.child(`users/${this.userId}`).once('value'); // returns promise with data snapshot
    } 
}
