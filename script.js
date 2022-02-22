'use strict';
const image = document.querySelector(".dice");

const p1CurrentElement = document.getElementById("current--0");
const p2CurrentElement  = document.getElementById("current--1");
const current = document.querySelectorAll(".current");

const p1Total = document.getElementById("score--0");
const p2Total = document.getElementById("score--1");
const score = document.querySelectorAll("score");

const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');

const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const diceEl = document.querySelector('.dice');

const body = document.querySelector(".body");
const themes = document.querySelector(".themes");
const main = document.querySelector(".main");
const themeTab = document.querySelector(".theme-tab");

let currentScore, playing;

var p1 = 0;
var p2 = 0;

var p1TotalScore = 0;
var p2TotalScore = 0;

var scores = [0, 0];

var activePlayer = 0;

// Starting conditions
const init = function () {
  scores = [0, 0];
  //   WE USE AN ARRAY AND NOT A VARIABLE BCZ THAT WAY WE CAN HOLD BOTH SCORE VALUES
  // IN A SINGLE ARRAY
  currentScore = 0;
  activePlayer = 0; // is base set to 0 bcz we want player 1 to start first
  playing = true;

  p1Total.textContent = 0;
  p2Total.textContent = 0;
  p1CurrentElement.textContent = 0;
  p2CurrentElement.textContent = 0;

  diceEl.classList.add('hidden');
  player0.classList.remove('player--winner');
  player1.classList.remove('player--winner');
  player0.classList.add('player--active');
  player1.classList.remove('player--active');
  document.getElementById("name--0").textContent= "PLAYER 1";
  document.getElementById("name--1").textContent= "PLAYER 2";

};
init();

var dice = Math.trunc(Math.random()*6)+1;
/*
The Math.trunc() function returns the integer part of a number by removing
 any fractional digits.
 Ex:
 console.log(Math.trunc(13.37));
// expected output: 13

console.log(Math.trunc(42.84));
// expected output: 42

console.log(Math.trunc(0.123));
// expected output: 0
*/


var nextPlayer = function(){
  currentScore=0;
  image.src=`dice-${dice}.png`;
  document.getElementById(`current--${activePlayer}`).textContent = currentScore;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0.classList.toggle("player--active");
  player1.classList.toggle("player--active");
  // the .toggle("class name") works like this: if the element has the class
  // you specified, it will remove that class and if that element doesn't have that class
  // it will add it
}


//---MAKE THE ROLL BTN WORK---
btnRoll.addEventListener("click", function(){
  // Add the dice image when the game is on
  if(playing){
    diceEl.classList.remove('hidden');
  } else {
    diceEl.classList.add('hidden');
  }
  dice = Math.trunc(Math.random()*6)+1;



  if(dice != 1 && playing){
    //Add the dice to the current score
      currentScore += dice;
      image.src=`dice-${dice}.png`;
      document.getElementById(`current--${activePlayer}`).textContent = currentScore;
  }
  else {
    // Switch to next player
      nextPlayer();
}
});



//---MAKE THE HOLD BTN WORK---

btnHold.addEventListener("click", function(){
  //  WE FIRST CHECK IF THE GAME IS ON OR NOT BY CHECKING IF THE VALUE OF PLAYING
  // IS true OR false
  if(playing){

  // 1. Add current score to active Players score
  scores[activePlayer] += currentScore;
  document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];

  // 2. Check if score is  >=100
    if(scores[activePlayer] >= 100){
        // 3. End the Game
        document.querySelector(`.player--${activePlayer}`).classList.add("player--winner");
        document.getElementById(`name--${activePlayer}`).textContent = "WINNER PLAYER 1";
        playing = false;
    } else {
      //Else switch to the next Player
      nextPlayer();
    }

  }
});



//---MAKE NEW GAME BTN WORK---

btnNew.addEventListener("click", function(){init()});


// ---- THEMES ----

document.querySelector(".purple").addEventListener("click", function(){
body.classList.add("purple-background-theme");
console.log(current.length);
p1Total.classList.add("purple-text");
p2Total.classList.add("purple-text");

for(let i = 0; i <current.length; i++){
current[i].classList.add("purple-theme");
console.log("AAAAAAAAAAAAA");
}
});

document.querySelector(".clasic").addEventListener("click", function(){
body.classList.remove("purple-background-theme");
p1Total.classList.remove("purple-text");
p2Total.classList.remove("purple-text");

for(let i = 0; i <current.length; i++){
current[i].classList.remove("purple-theme");
}
});

document.addEventListener("keydown", function(event){
  console.log(event.key); //this will log the key that was pressed
  if(event.key == "Tab"){
    /*
    const body = document.querySelector(".body");
    const themes = document.querySelector(".themes");
    const main = document.querySelector(".main");
    const themeTab = document.querySelector(".theme-tab");
    */
    themes.classList.toggle("hidden");
    main.classList.toggle("hidden");
    themeTab.classList.toggle("hidden");

  }
});
