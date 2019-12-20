const gameArea = document.getElementById('game-area');
const scoreBoard = document.getElementById('scoreboard');

// variables ------------
let picContain;
let owl;
let owls = [];
let bush;
let clickArea;
let clickAreas = [];
let lastSelection;
let score = 0;
//------------------------

function initialize() {
    createLayout();

    moveOwls();

    clickListener();
}
initialize();


// layout creation
function createLayout() {
    for (let i = 0; i < 6; i++) {
        picContain = document.createElement('div');
        gameArea.appendChild(picContain);
        picContain.classList.add('pic-contain');

        owl = document.createElement('div');
        picContain.appendChild(owl);
        owl.classList.add('owl-box');

        // put owls in array
        owls.push(owl);

        bush = document.createElement('div');
        picContain.appendChild(bush);
        bush.classList.add('bush-box');

        clickArea = document.createElement('div');
        picContain.append(clickArea);
        clickArea.classList.add('invisible-box');

        // put click areas in array
        clickAreas.push(clickArea);
    }

    //reset score to zero
    scoreBoard.innerHTML = score;

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

    //set the last selected index to the current one
    lastSelection = arr[randomArrIndex];

    return randomArrIndex;
}



//move the owls
function moveOwls() {
    let randomTime = randomInteger(900, 1200);
    let randomOwl = randomIndex(owls);

    //add owl animation
    owls[randomOwl].classList.add('move-owl');

    //remove owl animation and repeat 
    setTimeout(() => {
        owls[randomOwl].classList.remove('move-owl');

        moveOwls();

        clickListener();

    }, randomTime);
}


//score board update ---------------

function clickListener() {
    for (let clickArea of clickAreas) {
        clickArea.addEventListener('click', updateScore);
    }
}

function updateScore() {
    score++;
    scoreBoard.innerHTML = score;

    // only allow one click per owl each time
    for (let clickArea of clickAreas) {
        clickArea.removeEventListener('click', updateScore);
    }

}





// if clicked owl sound plays
// if score is 10, owls speed up