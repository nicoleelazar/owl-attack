const gameArea = document.getElementById('game-area');
let picContain;
let owl;
let bush;



for (let i = 0; i < 6; i++) {
    picContain = document.createElement('div');
    gameArea.appendChild(picContain);
    picContain.classList.add('pic-contain');

    owl = document.createElement('div');
    picContain.appendChild(owl);
    owl.classList.add('owl-box');

    bush = document.createElement('div');
    picContain.appendChild(bush);
    bush.classList.add('bush-box');
}