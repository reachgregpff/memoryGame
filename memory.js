var game = {
  player1: true,
  previousCardIndex: null,
  p1Score: 0,
  p2Score: 0,
  flipTimer: null,
  currentAvatarImage: "img/av00.png",
  allCards : ["1.png", "2.png", "3.png", "4.png", "5.png", "6.png", "7.png", "8.png", "9.png", "10.png", "11.png", "12.png", "13.png", "14.png", "15.png"],
  randomCardArray : [],
  getRandomCardArray: function(){
    game.randomCardArray = (_.shuffle(game.allCards)).slice(0, 6);  //0 including and 6 excluding
    game.randomCardArray = _.shuffle(game.randomCardArray.concat(game.randomCardArray));  //create duplicates, then shuffle again
    console.log(game.randomCardArray);
  },
  flipCard : function(flipIndex, image){
    $card = $('.randomCards .randomCardImg').eq(flipIndex);
    if(image === "flipagain"){
      $card.attr("src", game.currentAvatarImage);
      console.log("called by setInterval")
    }else{
      $card.attr("src", ("img/" + game.randomCardArray[flipIndex]));
    }
  },
  flipCardTwice : function(flipIndex){
    game.flipCard(flipIndex);
    flipTimer = window.setInterval(function(){game.flipCard(flipIndex, "flipagain"); window.clearInterval(flipTimer);}, 1000);
  }

}

//global variables here
var cardsDiscovered = [false, false, false, false, false, false, false, false, false, false, false, false];

function checkIfClickedCorrectly(){

  var currentCardIndex = $(this).attr('data-index');  //find index of card that was clicked
  console.log("Current Index is " + currentCardIndex + " & current card clicked is " + game.randomCardArray[currentCardIndex]);
  if(game.previousCardIndex !=  -1){
    console.log("Previous Index is " + game.previousCardIndex + " & previous card clicked is " + game.randomCardArray[game.previousCardIndex]);
  }

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
    console.log("YAY!! you clicked " + game.randomCardArray[game.previousCardIndex] + " and " + game.randomCardArray[currentCardIndex]);
    game.flipCard(currentCardIndex);
    game.flipCard(game.previousCardIndex);  //flip both
    
    cardsDiscovered[currentCardIndex] = true;   //set these as discovered
    cardsDiscovered[game.previousCardIndex] = true;

    game.previousCardIndex = -1;   // reset the previous card
  }else{
    game.previousCardIndex = currentCardIndex;
    game.flipCardTwice(currentCardIndex);  // Flip and then revert back to avatar
  }
  //##########################################################end of main logic
  
}

function refreshCardDisplay(){
  //change the face of every random card
  //$('.randomCards .randomCardImg').each(function(){  // USING JQUERY each just this once, use underscore next time
  for(var i=0; i<cardsDiscovered.length; i++) {
  //_.each($('.randomCards .randomCardImg'), index, function(){
    if(cardsDiscovered[i]===false){
      $('.randomCards .randomCardImg').eq(i).attr("src", game.currentAvatarImage);
    }
  }
}

function changeAvatar(){

  game.currentAvatarImage = $(this).attr('src');
  //Change Player's profile image
  if(player1) {
    $('#playerImage1').attr("src", game.currentAvatarImage);
  }else{
    $('#playerImage2').attr("src", game.currentAvatarImage);
  }
  refreshCardDisplay();
}

function reset(){
  //_.each(cardsDiscovered, function(elem){elem=false;});   //this underscore method is not working, why?
  for(var i=0; i<cardsDiscovered.length; i++){
    cardsDiscovered[i] = false;
  }
  game.previousCardIndex = -1;
  refreshCardDisplay();
}

function startGameForPlayer1(){
  player1 = true;
  reset();
  game.getRandomCardArray();
}

function startGameForPlayer2(){
  player1 = false;
  reset();
  game.getRandomCardArray();
}


//add event handlers
$('.avatar').on('click', 'img', changeAvatar);
$('#startButton1').on('click', startGameForPlayer1);
$('#startButton2').on('click', startGameForPlayer2);
$('.randomCards .randomCardImg').on('click', checkIfClickedCorrectly);
