import * as ongoingGame from './Firestore/ongoing-games'
import * as admin from 'firebase-admin';
admin.initializeApp();

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

export const generateGame = ongoingGame.onCreate;
// export const flipCard = speedyWords.flipCard;


// export const onCreate = functions.firestore
// .document('/ongoing-games/{id}')
// .onCreate((change, context) => {
//     console.log(change);
//     console.log(context);
// })

