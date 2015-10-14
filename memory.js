var game = {
  player1: true,
  previousCardIndex: null,
  p1Score: 0,
  p2Score: 0,
  allCards : ["1.png", "2.png", "3.png", "4.png", "5.png", "6.png", "7.png", "8.png", "9.png", "10.png", "11.png", "12.png", "13.png", "14.png", "15.png"],
  randomCardArray : [],
  getRandomCardArray: function(){
    game.randomCardArray = (_.shuffle(game.allCards)).slice(0, 6);  //0 including and 6 excluding
    game.randomCardArray = _.shuffle(game.randomCardArray.concat(game.randomCardArray));  //create duplicates, then shuffle again
    console.log(game.randomCardArray);
  }

}

//HTML elements are set here

function checkIfClickedCorrectly(){

  var currentCardIndex = $(this).attr('data-index');  //find index of card that was clicked
  console.log("Current Index is " + currentCardIndex + " & current card clicked is " + game.randomCardArray[currentCardIndex]);
  if(game.previousCardIndex !=  -1){
    console.log("Previous Index is " + game.previousCardIndex + " & previous card clicked is " + game.randomCardArray[game.previousCardIndex]);
  }

  if(game.previousCard === -1){  // Check if this is the first click
    game.previousCard = currentCardIndex;    // This is the first click so return back
    return;
  }

  if(currentCardIndex === game.previousCardIndex) {  //Check if the second card is the same as the first card
    return;    //Same card clicked again so return back
  }

  //this is the main logic of the game where you compare the current and previous cards
  if(game.randomCardArray[currentCardIndex] === game.randomCardArray[game.previousCardIndex]){  //if card1 equals card2
    console.log("YAY!! you clicked " + game.randomCardArray[game.previousCardIndex] + " and " + game.randomCardArray[currentCardIndex]);
    game.previousCardIndex = -1;   // reset the previous card
  }else{
    game.previousCardIndex = currentCardIndex;
  }
  
}

function changeAvatar(){

  var currentAvatarImage = $(this).attr('src');
  //Change Player's profile image
  if(player1) {
    $('#playerImage1').attr("src", currentAvatarImage);
  }else{
    $('#playerImage2').attr("src", currentAvatarImage);
  }

  //change the face of every random card
  $('.randomCards .randomCardImg').each(function(){  // USING JQUERY each just this once, use underscore next time
      $(this).attr("src", currentAvatarImage);
  });
}


function startGameForPlayer1(){
  player1 = true;
  game.previousCardIndex = -1;
  game.getRandomCardArray();
}

function startGameForPlayer2(){
  player1 = false;
  game.previousCardIndex = -1;
  game.getRandomCardArray();
}


//add event handlers
$('.avatar').on('click', 'img', changeAvatar);
$('#startButton1').on('click', startGameForPlayer1);
$('#startButton2').on('click', startGameForPlayer2);
$('.randomCards .randomCardImg').on('click', checkIfClickedCorrectly);
