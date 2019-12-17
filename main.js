const gameArea = document.getElementById('game-area');
let picContain;
let owl;
let bush;
let owls = [];
let lastSelection;


// Initialize function
function initialize() {
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
    }

    MoveOwls();

}
initialize();


//function for random integer selection
function randomInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}


//function for random array index selection
function randomIndex(arr) {
    let randomArrIndex = Math.floor(Math.random() * arr.length);

    //test - if the last selected index is the same as the current one, run function again
    if (arr[randomArrIndex] === lastSelection) {
        console.log('same');
        return randomIndex(arr);
    }

    //set the last selected index to the current one
    lastSelection = arr[randomArrIndex];

    return randomArrIndex;
}


//function to move the owls
function MoveOwls() {
    let randomTime = randomInteger(900, 1200);
    let randomOwl = randomIndex(owls);
    console.log(randomTime, randomOwl)

    //add owl animation
    owls[randomOwl].classList.add('move-owl');

    //remove owl animation
    setTimeout(() => {
        owls[randomOwl].classList.remove('move-owl');
        // MoveOwls();
    }, randomTime);
}









// if its clicked, increase score board point by 1 
// if clicked owl sound plays