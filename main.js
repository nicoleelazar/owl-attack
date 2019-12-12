console.log('working');

const gameArea = document.getElementById('game-area');
let owl;

for (let i = 0; i < 9; i++) {
    owl = document.createElement('div');
    gameArea.appendChild(owl);
    owl.classList.add('owl-box');

}