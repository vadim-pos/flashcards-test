import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class FirebaseService {
    private dbRef:firebase.database.Reference; // ref to firebase DB
    private userId:string;

    userAuthStatus:string = 'not defined'; // current auth status, changed by firebse's onAuthStateChanged() handler

    authStateChanged:Subject<boolean> = new Subject<boolean>();

    constructor() {
        const config = {
            apiKey: "AIzaSyCq4qVj6NMEyUSqdy00Jet8xZkd6V4wxRg",
            authDomain: "ng-flashcards-ee871.firebaseapp.com",
            databaseURL: "https://ng-flashcards-ee871.firebaseio.com",
        };
        firebase.initializeApp(config);

        this.dbRef = firebase.database().ref();

        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                console.log('user is signed in', user);
                this.userId = user.uid;
                this.userAuthStatus = 'authenticated';
                this.authStateChanged.next(true);
            } else {
                console.log('No user is signed in');
                this.userAuthStatus = 'not authenticated';
                this.authStateChanged.next(false);
            }
        });
    }

    signUpUser(email:string, password:string):firebase.Promise<any> {
        // firebase.auth().createUserWithEmailAndPassword(email, password)
        //     .then(res => console.log(res))
        //     .catch(err => console.log(err));
        return firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(user => this.userId = user.uid);
    }

    signInUser(email:string, password:string):firebase.Promise<any> {
        // firebase.auth().signInWithEmailAndPassword(email, password)
        //     .then(res => console.log(res))
        //     .catch(err => console.log(err));
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

    // private getToken() {
    //     return firebase.auth().currentUser.getIdToken(true) // pass true for refresh token
    //         .then(token => console.log(token))
    //         .catch(err => console.log(err));
    // }
    
}
