const gameArea = document.getElementById('game-area');
const scoreBoard = document.getElementById('scoreboard');
const audioDuck = document.getElementById('audio-duck');
const audioPing = document.getElementById('audio-ping');
const gameMessage = document.querySelector('.game-message');
const buttons = document.querySelectorAll('.button');
const modal = document.querySelector('.modal');
const startScreen = document.querySelector('.start-game');
const winScreen = document.querySelector('.win-game');


// variables ------------

let owls = [];
let randomOwl;


let clickAreas = [];
let lastSelection;
let score;
//------------------------

function initialize() {
    startScreenListener();

    createLayout();

    owlClickListener();
}
initialize();

function startScreenListener() {
    startScreen.style.display = 'block';

    for (let button of buttons) {
        button.addEventListener('click', startGame)
    }
}

function startGame() {
    modal.style.display = 'none'
    startScreen.style.display = 'none';
    winScreen.style.display = 'none';

    //reset
    score = 38;
    scoreBoard.innerHTML = score;
    gameMessage.innerHTML = 'Beginner Mode';
    gameMessage.classList.add('fade-message');
    removeMessage();

    moveOwls();
}


// layout creation
function createLayout() {
    let picContain;
    let owl;
    let bush;
    let clickArea;

    for (let i = 0; i < 6; i++) {
        picContain = document.createElement('div');
        gameArea.appendChild(picContain);
        picContain.classList.add('pic-contain');

        owl = document.createElement('div');
        picContain.appendChild(owl);
        owl.classList.add('owl-box');

        owls.push(owl);

        bush = document.createElement('div');
        picContain.appendChild(bush);
        bush.classList.add('bush-box');

        clickArea = document.createElement('div');
        picContain.append(clickArea);
        clickArea.classList.add('invisible-box');

        clickAreas.push(clickArea);
    }

}


//random integer selection
function randomInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}


//random array index selection
function randomIndex(arr) {
    let randomArrIndex = Math.floor(Math.random() * arr.length);

    //test - if the last selected index is the same as the current one, run function again
    if (arr[randomArrIndex] === lastSelection) {
        return randomIndex(arr);
    }

    lastSelection = arr[randomArrIndex];

    return randomArrIndex;
}


//game loop
function moveOwls() {
    let randomTime = randomInteger(900, 1200);
    randomOwl = randomIndex(owls);

    owls[randomOwl].classList.add('move-owl');

    //speed up owls
    if (score >= 10 && score < 20) {
        randomTime = randomInteger(800, 1100);
    } else if (score >= 20 && score < 30) {
        randomTime = randomInteger(600, 1000);
    } else if (score >= 30) {
        randomTime = randomInteger(500, 900);
    }

    setTimeout(() => {
        owls[randomOwl].classList.remove('move-owl');

        //end game at 40 points
        if (score < 40) {
            moveOwls();
        } else {
            modal.style.display = 'block';
            winScreen.style.display = 'block';
            return;

        }

    }, randomTime);
}


//score board update ---------------

function owlClickListener() {
    for (let clickArea of clickAreas) {
        clickArea.addEventListener('click', updateScore);
    }
}

function updateScore() {
    score++;
    scoreBoard.innerHTML = score;

    audioDuck.play();

    if (score % 10 == 0) {
        audioPing.play();
    }

    updateMessage();

    owls[randomOwl].classList.remove('move-owl');
}

function updateMessage() {
    if (score === 10) {
        gameMessage.innerHTML = 'Intermediate Mode';
        gameMessage.classList.add('fade-message');
        removeMessage();
    } else if (score === 20) {
        gameMessage.innerHTML = 'Advanced Mode';
        gameMessage.classList.add('fade-message');
        removeMessage();
    } else if (score === 30) {
        gameMessage.innerHTML = 'BEAST Mode!!';
        gameMessage.classList.add('fade-message');
        removeMessage();
    }
}

function removeMessage() {
    setTimeout(() => {
        gameMessage.innerHTML = '';
        gameMessage.classList.remove('fade-message');
    }, 3000);
}




// create upward timer