var game;

//view
// Game Object Prototype.
var Game = function() {
  
};

var Players = function(){

};

Game.prototype.render = function() {
	// Updates DOM to reflect current game state
	// Does not modify game state at all.
};



$(document).ready(function() {

// Treehouse Team tutorial variable set up and hoisting.
  var counter_p1 = 0;
  var counter_p2 = 0;
  var p1 = document.getElementById("player1_strip");
  var p2 = document.getElementById("player2_strip");
  var winner = document.getElementById("winner");
  var startTime;
  var endTime;
  var raceTime;
  var winner;
 
// AJAX function from JQuery API Docs.
  function ajax_results(params) {
    $.ajax({
      url: "/end_game",
      type: "POST",
      data: params
    })
    .done(function (data) {
// Navigates the window to a new view by using the data from the AJAX.
      window.location = "/end_game";
    })
  };

// Function to keep up with player increments and game time to determine a winner.
  function endGame(player){
    counter_p1++;
    counter_p2++;

// W3 Schools info for Date Time objects.
    var date = new Date();
    endTime = date.getTime();
    gameTime = (endTime - startTime)/1000;
    $(winner).text("Player " + player + " wins in " + raceTime + " seconds.");
    winner = player;
    var results = {game_time: gameTime, winner: winner};

// Calls the ajax results for the winner of the game.    
    ajax_results(results);
  };

// Refactored Game logic from JavaScript 1 Racer App.
// Player keys are P's & Q's
  $(document).on('keyup', function(event) {
    if(counter_p1 == 0 && counter_p2 == 0 && (event.keyCode === 81 || event.keyCode === 80)){
      var date = new Date();
      startTime = date.getTime();
    };
    if(counter_p1 < p1.cells.length && counter_p2 < p2.cells.length){
      if(event.keyCode === 81) {

// Incrementing player 1 across the table by removing and adding the active class.
        $(p1.cells[counter_p1]).removeClass("active");
        $(p1.cells[counter_p1 + 1]).addClass("active");
        counter_p1++;
      };
      if(event.keyCode === 80) {

// Incrementing player 2 across the table by removing and adding the active class.
        $(p2.cells[counter_p2]).removeClass("active");
        $(p2.cells[counter_p2 + 1]).addClass("active");
        counter_p2++;
      };
    };

// If either player is at the end of the table by cell length. Game Over.
    if (counter_p1 == p1.cells.length){
      endGame("1");
    };

    if (counter_p2 == p2.cells.length){
      endGame("2");
    };
  });
});