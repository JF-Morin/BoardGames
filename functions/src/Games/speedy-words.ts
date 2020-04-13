
export const generateGame:any = (gameParameters: any) => {
    console.log(gameParameters);
    const gameTotalCard = gameParameters ? gameParameters.deckSize : 60;
    let cardDeck = [];
    // Card structure
    const colors = ['orange','green','blue'];
    const categories = ['animal','city','country','famous-person','profession','object','plant-tree','food','name-boy-girl','tv-series-film'];
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    // Generate card deck
    for(let card = 0; card < gameTotalCard; card++){
        let newCard = {
            'front': {
                'category': '',
                'color': '' 
            },
            'back': {
                'letters': [] as any, // {'letter':'', 'color':''}
            },
            'flip': false,
        }
        newCard.front.category = categories[Math.round(Math.random()*9)];
        newCard.front.color = colors[Math.round(Math.random()*2)];
        // Shuffle functions and shuffled array/string
        function stringShuffle (s:string) {
            let a = s.split(""),
                n = a.length;
            for(let i = n - 1; i > 0; i--) {
                let j = Math.floor(Math.random() * (i + 1));
                let tmp = a[i];
                a[i] = a[j];
                a[j] = tmp;
            }
            return a.join("");
        }
        function arrayShuffle (a:any[]) {
            let m = a.length, t, i;
            while (m > 0) 
            {
                i = Math.floor(Math.random() * m--);
                t = a[m];
                a[m] = a[i];
                a[i] = t;
            }
            return a;
        }
        const suffledLetters = stringShuffle(letters);
        const suffledColors = arrayShuffle(colors);

        newCard.back.letters.push(
            {'letter':suffledLetters[0], 'color':suffledColors[0]},
            {'letter':suffledLetters[1], 'color':suffledColors[1]},
            {'letter':suffledLetters[2], 'color':suffledColors[2]}
        );
        cardDeck.push(newCard);
    }
    const payload = {
        'cardDeck': cardDeck
    }
    return payload;
};



// export const flipCard = functions.https.onCall((data,context)=>{
//     const game = data['ongoing-game'];
//     const cardToFlipID = data['cardToFlipID'];
//     let cardDeck = game.gameSpecific.cardDeck
//     cardDeck[cardToFlipID].flip = true;
//     const gameRef = admin.firestore().doc(`ongoing-games/${game.id}`);
//     gameRef.update({
//         gameSpecific: {'cardDeck':cardDeck},
//     });
// });