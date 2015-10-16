# memoryGame
Memory Concentration Game of flipping Cards

# MEMORY Game by Greg Fernandes

# About the memory game app

  - What it does
    The game allows 2 players to compete endless rounds, a score is updated everytime player 1 and player 2 complete 1 round each. The timer runs for 1 ninute and the board is disabled for that player for that round if it times out. The game allows a player to choose an avatar.

    P.S:- This game also has a secret invisible 'white' cheat button (with a faint left border) on the right top corner of the game. To use 'cheat', click start, then click the inivisible button, and it will show you your next move with a tiny red dot showing a click-position. Make sure you follow the dots correctly for all your moves.  

# The app design and implementation
  - The main game properties are stored as an object. The cards to be displayed are generated via a shuffle-crop-duplicate-shuffle logic from a pool of cards. The main logic is in function 'checkIfClickedCorrectly()'. The game results are displaed in 'checkIfGameSuccessful()'. function 'initialise()' is used to initiase a new game and can be used in the future to restore via persistence. There are functions for 'cheat', 'timer' and 'avatar' functionalities.

# Known Bugs
  - Even though the Start button appears disabled for the other player, you can still click on it. But it is good enough for now as it appears disabled

# Future improvements
  - Allow the game to be persisted so that it can be re-loaded if the webbrowser is restarted. Do this with local storage or firebase
  - Be able to change the number of cards displayed
  - Be able to change the timer
  - Be able to input a Player Name
  - 

## Technologies used

  - HTML5 and CSS3 for the front-end
  - Javascript with JQuery and underscore.js
  - Chrome and Sublime editor for development

## GITHUB Link

  https://github.com/reachgregpff/memoryGame.git

  10 commits from day 1 until end of day 2.

## Hosted version of my game
 
   http://reachgregpff.github.io/memoryGame/

   
