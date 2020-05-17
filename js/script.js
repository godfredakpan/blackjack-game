

// Black Jack Game Dictionaries
let blackjackGame = {

    'you': {'scoreSpan': '#your-black-jack-result', 'div': '#your-box', 'score':0},

    'dealer': {'scoreSpan': '#dealer-black-jack-result', 'div': '#dealer-box', 'score':0},

    'cards': ['2','3','4','5','6','7','8','9','10','K','J','Q','A'],

    'cardsMap': {'2': 2, '3': 3, '4': 4, '5': 5, '6': 6,
                 '7': 7, '8': 8, '9': 9,'10': 10,'K': 10,
                 'J': 10, 'Q': 10, 'A': [1,11],},
    'wins': 0,

    'losses': 0,

    'draws': 0,

    'isStands': false,

    'turnsOver': false,
};

// Player
const YOU = blackjackGame['you']
// Computer
const DEALER = blackjackGame['dealer']
// Hit Sound 
const hitSound = new Audio('./sounds/swish.m4a');
// Sound to play when you win
const winSound = new Audio('./sounds/cash.mp3');
// Sound to play when you lose
const lostSound = new Audio('./sounds/aww.mp3');

// Black jack hit button event listener
document.querySelector('#black-jack-hit-button').addEventListener('click', blackjackHit);
// Black jack deal button event listener
document.querySelector('#black-jack-deal-button').addEventListener('click', blackjackDeal);
// Black jack deal button event listener
document.querySelector('#black-jack-stand-button').addEventListener('click', dealerLogic);


// Black function for Hit Event //
function blackjackHit(){

    // this function runs only if its a human turn
    if (blackjackGame['isStands'] === false)

    {
        // This calls random cards
        let card = randomCards();
        // This displays cards on the board
        showCard(card, YOU);
        // This update scores 
        updateScore(card, YOU);
        // This update scores 
        showScore(YOU);

    }
}



function showCard(card, active_player){

    if(active_player['score'] <= 21){

    let cardImage = document.createElement('img');

    cardImage.src = `./img/cards/${card}.png`;

    cardImage.style = "background-color:white; margin:5px; border-radius:5px";

    document.querySelector(active_player['div']).appendChild(cardImage);

    hitSound.play();
}
}

function randomCards(){

    let randomCards = Math.floor(Math.random() * 13)

    return blackjackGame['cards'][randomCards]


}


function blackjackDeal(){

    if (blackjackGame['turnsOver'] === true)
    {
        blackjackGame['isStands'] = false;

        let yourImages = document.querySelector('#your-box').querySelectorAll('img');

        let dealerImages = document.querySelector('#dealer-box').querySelectorAll('img');

        document.querySelector(YOU['scoreSpan']).textContent = 0;

        document.querySelector(DEALER['scoreSpan']).textContent = 0;

        document.querySelector(YOU['scoreSpan']).style.color = 'white';

        document.querySelector(DEALER['scoreSpan']).style.color = 'white';

        

        for (i = 0; i < yourImages.length; i++){

            yourImages[i].remove();

        }

        for (i = 0; i < dealerImages.length; i++){


            dealerImages[i].remove();

        }

        YOU['score'] = 0;

        DEALER['score'] = 0;

        document.querySelector('#black-jack-result').textContent = 'Lets Play!';

        document.querySelector('#black-jack-result').style.color = 'white';

        blackjackGame['turnsOver'] = true;

    }
    
}

function updateScore(card, activePlayer){

    if(card === 'A'){

        if(activePlayer['score'] + blackjackGame['cardsMap'][card][1] <= 21){

            activePlayer['score'] += blackjackGame['cardsMap'][card][1];

        }else{
            activePlayer['score'] += blackjackGame['cardsMap'][card][0];

        }

    }else {

    activePlayer['score'] += blackjackGame['cardsMap'][card];

    }


}

function showScore(active_player){

    if(active_player['score'] > 21){

        document.querySelector(active_player['scoreSpan']).textContent = 'Burst!';

        document.querySelector(active_player['scoreSpan']).style.color = 'red';

    }else{

    document.querySelector(active_player['scoreSpan']).textContent = active_player['score'];

    // score.innerHTML = YOU['score']
}
    
}

function sleep(ms){

    return new Promise(resolve => setTimeout(resolve, ms));

}

// Async is called here to let our code work at the same time, without waiting for above line //
async function dealerLogic(){

    blackjackGame['isStands'] = true;

    while (DEALER['score'] < 16 && blackjackGame['isStands'] === true)
    {

        let card = randomCards();

        showCard(card, DEALER);

        updateScore(card, DEALER);

        showScore(DEALER);

        await sleep(1000);
    }
        blackjackGame['turnsOver'] = true;

        let winner = computeWinner();

        showResult(winner);


    
}

function computeWinner(){

    let winner;

    if (YOU['score'] <= 21 ){

        if (YOU['score'] > DEALER['score'] || (DEALER['score'] > 21)){

            blackjackGame['wins']++;

            winner = YOU;

        }else if( YOU['score'] < DEALER['score']){

            blackjackGame['losses']++;

            winner = DEALER;

        }else if( YOU['score'] === DEALER['score']){

            blackjackGame['draws']++;

            winner = 'No one!'


        }
    }else if (YOU['score'] > 21 && DEALER['score'] <= 21){

        blackjackGame['losses']++;


        winner = DEALER;

    }else if (YOU['score'] > 21 && DEALER['score'] > 21){

        blackjackGame['draws']++;

        winner = 'No one!'


    }

        return winner;
}

function showResult(winner){
    let message, messageColor;

    if (blackjackGame['turnsOver'] === true)
    {

        if (winner === YOU){

            document.querySelector('#wins').textContent = blackjackGame['wins'];


            message = 'You won!';

            messageColor = 'green';

            winSound.play(); 

        }else if (winner === DEALER){

            document.querySelector('#losses').textContent = blackjackGame['losses'];

            message = 'You Lost!';

            messageColor = 'red';

            lostSound.play(); 
        }
        else{
            document.querySelector('#draws').textContent = blackjackGame['draws'];
            
            message = 'you drew!';

            messageColor = 'yellow';
        }
        document.querySelector('#black-jack-result').textContent = message;

        document.querySelector('#black-jack-result').style.color = messageColor;

    }
}
