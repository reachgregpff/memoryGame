var game = {
  player1: true,
  previousCardIndex: null,
  p1Score: 0,
  p2Score: 0,
  p1Moves: 0,
  p2Moves: 0,
  CARD_FLIPTIME: 500,
  GAME_TIMER: 2*60*1000, // 2 minutes
  flipTimer: null,
  currentAvatarImage: "img/av00.png",
  allCards : ["1.png", "2.png", "3.png", "4.png", "5.png", "6.png", "7.png", "8.png", "9.png", "10.png", "11.png", "12.png", "13.png", "14.png", "15.png"],
  randomCardArray : [],
  cheatObjects : [{card: "", id: 0}, {card: "", id: 1}, {card: "", id: 2}, {card: "", id: 3},
                  {card: "", id: 4}, {card: "", id: 5}, {card: "", id: 6}, {card: "", id: 7},
                  {card: "", id: 8}, {card: "", id: 9}, {card: "", id: 10}, {card: "", id: 11}],
  cheatImages : ["w0.png", "w1.png", "w2.png", "w3.png", "w4.png", "w5.png", "w6.png", "w7.png", "w8.png", "w9.png", "w10.png", "w11.png"],
  getRandomCardArray: function(){
    game.randomCardArray = (_.shuffle(game.allCards)).slice(0, 6);  //0 including and 6 excluding
    game.randomCardArray = _.shuffle(game.randomCardArray.concat(game.randomCardArray));  //create duplicates, then shuffle again
    console.log("NEW GAME");
    console.log(game.randomCardArray.slice(0,4));
    console.log(game.randomCardArray.slice(4,8));
    console.log(game.randomCardArray.slice(8));

    game.populateCheat();

  },
  populateCheat: function(){  //for cheaters
    _.each(game.randomCardArray, function(elem, index){game.cheatObjects[index].card = elem; console.log("cheat: "+ game.cheatObjects[index].card)});
    game.cheatObjects = _.sortBy(game.cheatObjects, 'card');
    _.each(game.cheatObjects, function(elem){ console.log("Card: " + elem.card + " Id: "+ elem.id)});

  },
  flipCard : function(flipIndex, image){
    $card = $('.randomCards .randomCardImg').eq(flipIndex);
    if(image === "flipagain"){
      $card.attr("src", game.currentAvatarImage);
    }else{
      $card.attr("src", ("img/" + game.randomCardArray[flipIndex]));
    }
  },
  flipCardTwice : function(flipIndex){
    game.flipCard(flipIndex);
    game.flipTimer = window.setInterval(function(){game.flipCard(flipIndex, "flipagain"); window.clearInterval(game.flipTimer);}, game.CARD_FLIPTIME);
  },
  incrementMoves(){
    if(game.player1 == true){
      game.p1Moves++;
    }else{
      game.p2Moves++;
    }
  }
}

//global variables here
var cardsDiscovered = [false, false, false, false, false, false, false, false, false, false, false, false];
var pairCount = 0;
var gameStarted = false;
var cheatCount=0;
$('#startButton2').fadeTo("slow", 0.1);  //fade button2 at start of game

function checkIfGameOver(){
  if(pairCount===6){        //Game completed
    $('#congrats').attr("src", "img/congratulations.gif");  //this is not working
    $('#congrats').fadeTo("slow", 1);
    gameStarted = false;
    
    if(game.player1 === true) {      // PLAYER 1 PLAYED
      
      $('#player1Moves').html("Game over in " + game.p1Moves + " moves!");
      console.log("GAME OVER in " + game.p1Moves + "moves");
      $('#startButton2').fadeTo("slow", 1);
      $('#startButton1').fadeTo("slow", 0.1);
    }
    else{                           // PLAYER 2 PLAYED
      
      $('#player2Moves').html("Game over in " + game.p2Moves + " moves!");
      console.log("GAME OVER in " + game.p2Moves + "moves");
      $('#startButton1').fadeTo("slow", 1);
      $('#startButton2').fadeTo("slow", 0.1);

      if(game.p2Moves < game.p1Moves){                //PLAYER 2 WON   
        //player 2 wins
        game.p2Score++;
        $('#winner2').attr("src", "img/winner.png");
        $('#winner2').fadeTo("fast", 1);
      }else if(game.p2Moves > game.p1Moves){         // PLAYER 1 WON
        //player 1 wins
        game.p1Score++;
        $('#winner1').attr("src", "img/winner.png");
        $('#winner1').fadeTo("fast", 1);
      }else { // Do nothing if tie, except display tie images   // IT WAS A TIE / Both WIN!
        $('#winner1').attr("src", "img/winner.png");
        $('#winner2').attr("src", "img/winner.png");
        console.log("TIE!");
      }
      console.log("player1 score " + game.p1Score + "player2 score " + game.p2Score);
      $('#score1').html("SCORE :" + game.p1Score );     // UPDATE SCORES and RESET MOVES for both
      $('#score2').html("SCORE :" + game.p2Score );
      game.p1Moves = 0;
      game.p2Moves = 0;
    }
  }
}

function checkIfClickedCorrectly(){

  var currentCardIndex = $(this).attr('data-index');  //find index of card that was clicked
  /*console.log("Current Index is " + currentCardIndex + " & current card clicked is " + game.randomCardArray[currentCardIndex]);
  if(game.previousCardIndex !=  -1){
    console.log("Previous Index is " + game.previousCardIndex + " & previous card clicked is " + game.randomCardArray[game.previousCardIndex]);
  }*/

  if(gameStarted === false){
    return;   // Start button not clicked yet
  }

  //for cheaters
  setCheatImage();

  game.incrementMoves(); // increment the moves count

  if(game.previousCardIndex === -1){  // Check if this is the first click
    game.previousCardIndex = currentCardIndex;    // This is the first click so return back
    game.flipCardTwice(currentCardIndex);  // Flip and then revert back to avatar
    return;
  }

  if(currentCardIndex === game.previousCardIndex) {  //Check if the second card is the same as the first card
    game.flipCardTwice(currentCardIndex);           // Flip and then revert back to avatar
    return;    //Same card clicked again so return back
  }

  //#####################this is the main logic of the game where you compare the current and previous cards
  if(game.randomCardArray[currentCardIndex] === game.randomCardArray[game.previousCardIndex]){  //if card1 equals card2
    //console.log("YAY!! you clicked " + game.randomCardArray[game.previousCardIndex] + " and " + game.randomCardArray[currentCardIndex]);
    game.flipCard(currentCardIndex);
    game.flipCard(game.previousCardIndex);  //flip both
    
    cardsDiscovered[currentCardIndex] = true;   //set these as discovered
    cardsDiscovered[game.previousCardIndex] = true;
    pairCount++;

    checkIfGameOver();

    game.previousCardIndex = -1;   // re-set the previous card
  }else{
    game.previousCardIndex = currentCardIndex;
    game.flipCardTwice(currentCardIndex);  // Flip and then revert back to avatar
  } //##########################################################end of main logic
}

function refreshCardDisplay(){
  //change the face of every random card
  for(var i=0; i<cardsDiscovered.length; i++) {
    if(cardsDiscovered[i]===false){
      $('.randomCards .randomCardImg').eq(i).attr("src", game.currentAvatarImage);
    }
  }
}

function changeAvatar(){  //Change Player's profile image

  game.currentAvatarImage = $(this).attr('src');

  if(game.player1===true) {
    $('#playerImage1').attr("src", game.currentAvatarImage);
  }else{
    $('#playerImage2').attr("src", game.currentAvatarImage);
  }
  refreshCardDisplay();
}

function initialise(){
  for(var i=0; i<cardsDiscovered.length; i++){
    cardsDiscovered[i] = false;
  }
  game.previousCardIndex = -1;
  refreshCardDisplay();
  pairCount = 0;
  $('#congrats').fadeTo("slow", 0.00000001);
  $('#winner1').fadeTo("slow", 0.00000001);
  $('#winner2').fadeTo("slow", 0.00000001);
  $('#gameTimer').html("[ 02:00 ]");

}

//For cheaters
function setCheatImage(){
  if(cheatCount < 12) {
    $('#ignore').attr('src', ("img/" + game.cheatImages[game.cheatObjects[cheatCount].id]));
    cheatCount++;
  }else if(cheatCount === 12){
    $('#ignore').attr('src', "img/whitebox.png");
    cheatCount = 0;
  }
}


function startGameForPlayer1(){
  game.player1 = true;
  gameStarted = true;
  $('#player1Moves').html("MOVES :");
  $('#player2Moves').html("MOVES :");
  initialise();
  $('#startButton2').fadeTo("slow", 0.1);
  game.getRandomCardArray();
  
}

function startGameForPlayer2(){
  game.player1 = false;
  gameStarted = true;
  initialise();
  $('#startButton1').fadeTo("slow", 0.1);
  game.getRandomCardArray();
}

//add event handlers
$('.avatar').on('click', 'img', changeAvatar);
$('#startButton1').on('click', startGameForPlayer1);
$('#startButton2').on('click', startGameForPlayer2);
$('.randomCards .randomCardImg').on('click', checkIfClickedCorrectly);
$('#ignore').on('click', setCheatImage);

