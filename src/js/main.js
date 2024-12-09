import {Player} from './Player';
import {settings as s} from './settings';

const players = [new Player('js'), new Player('love')];
const resultElements = [document.querySelector(s.resultJsQuery), document.querySelector(s.resultLoveQuery)];
const resultTextContents = resultElements.map((resultElement) => {
    return resultElement.textContent;
});
const ulAppElement = document.getElementById(s.ulId);
const timerElement = document.querySelector(s.timerElementQuery);
let currentUser = 0;
let timeLeft = s.maxTime;
let intervalId = null;
let gameOver = false;
function addZero(number) {
    return number <= 9 ? '0' + number : number + '';
}
function displayTimeLeft() {
    const minutes = addZero(Math.trunc(timeLeft / 60));
    const seconds = addZero(timeLeft % 60);
    timerElement.textContent = `${minutes} : ${seconds}`;
}
function play(liElement) {
    if (!gameOver) {
        console.log(liElement);
        if (intervalId === null) {
            intervalId = setInterval(() => {
                updateTime();
                displayTimeLeft();
            }, 1000);
        }
        if (s.liElementClassBase === liElement.className) {
            liElement.classList.add(s.liElementClassBase + '--' + players[currentUser].name);
        }
        players[currentUser].score++;
        displayScore();
        currentUser = currentUser === 0 ? 1 : 0;
        ulAppElement.className = s.ulAppClass + ' ' + players[currentUser].name;
    }
}
function generateItem() {
    const liElement = document.createElement('li');
    liElement.className = s.liElementClassBase;
    liElement.addEventListener('click', (evt) => {
        play(evt.currentTarget);
    });
    ulAppElement.insertAdjacentElement('beforeend', liElement);
}
function displayScore () {
    console.log(resultTextContents);
    resultElements[currentUser].textContent = resultTextContents[currentUser]+players[currentUser].score;
}
function updateTime() {
    timeLeft--;
    displayTimeLeft();
    if (timeLeft === 0) {
        clearInterval(intervalId);
        displayGameOverForm();
    }
}
function displayGameOverForm() {
    gameOver = true;
    const lostFormElement = document.querySelector('.play-again-template--lost').content;
    document.body.appendChild(lostFormElement);
}
ulAppElement.className = s.ulAppClass + ' ' + players[currentUser].name;
displayTimeLeft();

for (let i = 0; i < s.maxTiles; i++) {
    generateItem();
}

document.documentElement.classList.add(s.jsEnabledClass);