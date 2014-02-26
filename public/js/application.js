var Game = function(player1,player2) {
  this.player1 = player1;
  this.player2 = player2;
  this.startTime;
  this.endTime;
  this.raceTime;
  this.winner;
  this.trackLength = this.player1.track.cells.length;

  this.onKeyUp = function(event){
    if(this.player1.counter === 0 && this.player2.counter === 0){
      this.start();
    }
    if(event === 81){
      this.player1.advance(this.player1.counter);
      this.render();
      if(this.player1.counter === this.trackLength){
        this.finish(this.player1);
      }
    }
    if(event === 80){
      this.player2.advance();
      this.render();
      if(this.player2.counter === this.trackLength){
        this.finish(this.player2);
      }
    }
  }
// Refactor
  this.render = function(){
    $(this.player1.track.cells[this.player1.counter - 1]).removeClass("active");
    $(this.player1.track.cells[this.player1.counter]).addClass("active");
    $(this.player2.track.cells[this.player2.counter - 1]).removeClass("active");
    $(this.player2.track.cells[this.player2.counter]).addClass("active");
  }
  this.start = function(){
    var date = new Date();
    this.startTime = date.getTime();
  }
  this.finish = function(winner){
    var date = new Date();
    this.endTime = date.getTime();
    this.raceTime = (this.endTime - this.startTime)/1000;
    this.winner = winner;
    $(document).off('keyup');
    console.log("Yay. The winner is " + winner.name);
  }
};

var Player = function(name, track){
  this.name = name;
  this.track = document.getElementById(track);
  this.counter = 0;

  this.advance = function(){
    return this.counter++;
  }
};

$(document).ready(function() {
  var player1 = new Player("Jeff","player1_strip");
  var player2 = new Player("Joe","player2_strip");
  var game = new Game(player1, player2);
  window.game = game;
  $(document).on('keyup', function(event) {
    game.onKeyUp(event.which);
  });
});
