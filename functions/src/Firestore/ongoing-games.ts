import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as speedyWords from '../Games/speedy-words'


// export const generateGame = functions.https.onCall(async (data,context)=>{

export const onCreate = functions.firestore.document('ongoing-games/{gameID}').onCreate(async (snapshot, context)=>{
    // Check what game is created
    let gameData = snapshot.data();
    const gameID = snapshot.id;
    const gameLibraryRef = admin.firestore().doc(`game-library/${gameData?.libraryGameID}`);
    const gameLibrarySnap = await gameLibraryRef.get();
    const gameLibraryData = gameLibrarySnap.data();
    const gamePrefixURL= gameLibraryData?.prefixURL;
    // Generate new game accordingly
    let payload: any
    switch(gamePrefixURL) {
        case 'catan': {
            payload = null;
            break;
        }
        case 'forbidden-island': {
            payload = null;
            break;
        }
        case 'speedy-words': {
            payload = speedyWords.generateGame(gameData?.gameParameters);
            break;
        }
        default: {
            payload = null;
            break;
        }
    }
    console.log(payload);
    // Update ongoing game
    const gameRef = admin.firestore().doc(`ongoing-games/${gameID}`);
    const response = gameRef.update({
        gameSpecific: payload,
    });
    console.log(response);
});