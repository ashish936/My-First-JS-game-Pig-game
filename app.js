/********************** 
GAME RULES

-The game has two
************************/

var scores, roundScore, activePlayer,gamePlaying;

 init();

/**********************
 * Event Handling
 * Rolling the dice
 */

// we select elements/somthing with queryselector/getElementByID method and then do something with that
//                                                     event type, function to perform here eventlistner will call that function
document.querySelector(".btn-roll").addEventListener("click", function () {
    if(gamePlaying){

        //1. random no
  var dice = Math.floor(Math.random() * 6) + 1;
  //2. display the  result
  //first we have to make it visible again so we have to display the block
  var diceDOM = document.querySelector(".dice");
  diceDOM.style.display = "block";
  diceDOM.src = "dice-" + dice + ".png";

  //3. update the round score if the rolled number was not a 1/
  if (dice !== 1) {
    //add score
    roundScore += dice;
    document.getElementById("current-" + activePlayer).textContent = roundScore;
  } else {
    //next player
    nextPlayer();
  }

    }
  
});

document.querySelector(".btn-hold").addEventListener("click", function () {
  if(gamePlaying){

    //Add current score to global score
  scores[activePlayer] += roundScore;

  //update the UI
  document.getElementById("score-" + activePlayer).textContent =
    scores[activePlayer];

  //check if player won the game
  if (scores[activePlayer] >= 20) {
    document.getElementById("name-" + activePlayer).textContent = "Winner!";
    //not a good way to use css in js we simply use the class
    document.querySelector(".dice").style.display = "none";
    document.querySelector(".player-" + activePlayer + "-panel").classList.add("winner");
    document.querySelector(".player-" + activePlayer + "-panel").classList.remove("active");
    gamePlaying=false;//ie it will stop the game
  } else {
    nextPlayer();
  }

  }
});

//For resetting all the values this time using another way of calling a function
document.querySelector(".btn-new").addEventListener("click", init);


function nextPlayer() {
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
  roundScore = 0;

  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";

  // adding and removing classes ie changing the active to another player
  //                                       .classList.add/remove('active')
  document.querySelector(".player-0-panel").classList.toggle("active");
  document.querySelector(".player-1-panel").classList.toggle("active");
  /**
   * document.querySelector('.player-'+activePlayer+'-panel').classList.toggle('active');
   * Doing this will not remove the active from the current class and both will show active
   */

  //I also want to hide the dice when a player gets 1
  document.querySelector(".dice").style.display = "none";
}

function init() {

scores = [0, 0];
roundScore = 0;
activePlayer = 0;

gamePlaying = true;

  document.querySelector(".dice").style.display = "none";

  //making the scores value to zero we can use query selector method but here we are using another method that is
  //getelement id method which only take id and is fast
  document.getElementById("score-0").textContent = "0";
  document.getElementById("current-0").textContent = "0";
  document.getElementById("score-1").textContent = "0";
  document.getElementById("current-1").textContent = "0";

  document.getElementById('name-0').textContent = 'Player 1';
  document.getElementById('name-1').textContent = 'Player 2';

  document.querySelector(".player-0-panel").classList.remove("winner");
  document.querySelector(".player-1-panel").classList.remove("winner");
  document.querySelector(".player-0-panel").classList.remove("active");
  document.querySelector(".player-1-panel").classList.remove("active");
  //firsts remove the active class from the first one then add it back 
  document.querySelector(".player-1-panel").classList.add("active");

}
