const gameArea = document.getElementById('game-area');
const scoreBoard = document.getElementById('scoreboard');
const audioDuck = document.getElementById('audio-duck');
const audioPing = document.getElementById('audio-ping');
const audioTada = document.getElementById('audio-tada');
const gameMessage = document.querySelector('.game-message');
const buttons = document.querySelectorAll('.button');
const modal = document.querySelector('.modal');
const startScreen = document.querySelector('.start-game');
const winScreen = document.querySelector('.win-game');
const minutesDivs = document.querySelectorAll('.minutes');
const secondsDivs = document.querySelectorAll('.seconds');
const clock = document.querySelector('.clock');


// variables ------------

let owls = [];
let randomOwl;
let clickAreas = [];
let lastSelection;
let score;
let seconds;
let minutes;
let gameTimer;

//------------------------


function initialize() {
    startScreenListener();

    createLayout();

    owlClickListener();
}
initialize();



// start and end message screen listeners 
function startScreenListener() {
    startScreen.style.display = 'block';

    for (let button of buttons) {
        button.addEventListener('click', startGame)
    }
}


//reset scoreboard, styles, timer, start owls moving
function startGame() {
    modal.style.display = 'none'
    startScreen.style.display = 'none';
    winScreen.style.display = 'none';

    score = 0;
    scoreBoard.innerHTML = score;
    clock.style.display = 'none';

    seconds = 0;
    for (let secondsDiv of secondsDivs) {
        secondsDiv.innerHTML = seconds;
    }
    minutes = 0;
    for (let minutesDiv of minutesDivs) {
        minutesDiv.innerHTML = minutes;
    }
    gameTimer = setInterval(myTimer, 1000);

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
            clearInterval(gameTimer);
            modal.style.display = 'block';
            winScreen.style.display = 'block';
            return;
        }

    }, randomTime);
}


//scoreboard & message update ---------------
function owlClickListener() {
    for (let clickArea of clickAreas) {
        clickArea.addEventListener('click', updateScore);
    }
}

function updateScore() {
    score++;
    scoreBoard.innerHTML = score;

    audioDuck.play();

    if (score % 10 == 0 && score < 40) {
        audioPing.play();
    } else if (score == 40) {
        setTimeout(() => {
            audioTada.play();
        }, 500);
    }

    updateMessage();

    owls[randomOwl].classList.remove('move-owl');
    audioDuck.currentTime = 0;

}

function updateMessage() {
    if (score === 10) {
        // hide the game timer
        clock.style.display = 'none';

        gameMessage.innerHTML = 'Intermediate Mode';
        gameMessage.classList.add('fade-message');
        removeMessage();

    } else if (score === 20) {
        // hide the game timer
        clock.style.display = 'none';

        gameMessage.innerHTML = 'Advanced Mode';
        gameMessage.classList.add('fade-message');
        removeMessage();

    } else if (score === 30) {
        // hide the game timer
        clock.style.display = 'none';

        gameMessage.innerHTML = 'BEAST Mode!!';
        gameMessage.classList.add('fade-message');
        removeMessage();
    }
}

function removeMessage() {
    setTimeout(() => {
        gameMessage.innerHTML = '';
        gameMessage.classList.remove('fade-message');

        // show the game timer
        clock.style.display = 'block';

    }, 3000);
}



// game timer ---------------------------------
function myTimer() {
    seconds++;
    for (let secondsDiv of secondsDivs) {
        secondsDiv.innerHTML = seconds;

        if (seconds < 10) {
            secondsDiv.innerHTML = `0${seconds}`;
        }
    }

    for (let minutesDiv of minutesDivs) {
        minutesDiv.innerHTML = minutes;

        if (minutes < 10) {
            minutesDiv.innerHTML = `0${minutes}`;
        }
    }

    if (seconds >= 60) {
        seconds = 0;

        minutes++;
    }
}