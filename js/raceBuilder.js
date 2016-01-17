
/*

This file contains all of the code running in the background that makes raceBuilder.js
*/


$(document).ready(function() {
// choose the track length


var player1Move = 0;

var player2Move = 0;

var rowLength = prompt('Please choose your track length between 10 - 50');
console.log(rowLength);

if (rowLength<10) {
    var rowLength = 10;
    alert("You have choosen a number out of range so the track length set to 10. Press OK to start play")
  } else if (rowLength >50) {
     var rowLength = 10;
      alert("You have choosen a number out of range so the track length set to 10. Press OK to start play")
  };


var gameStart = function () {
$("td").removeClass("active");
$("#player1 td:first").addClass("active");

$("#player2 td:first").addClass("active");

 player1Move = 0;
 player2Move = 0;

};

for (var i=0; i< rowLength; i++) {
        $(".row").append('<td>');
        };

gameStart();

//keypress event 

$(document).on('keyup',function(keyPress) {

    if (keyPress.keyCode === 80){ 

        if (player1Move < rowLength -1) {
        updatePlayerPosition("player1");
        player1Move++;
        }  else  {
            raceWinner("Player1");
        };

    } else if (keyPress.keyCode === 81) { 

        if (player2Move < rowLength -1) {
        updatePlayerPosition("player2");
        player2Move++;
        }  else  {
            raceWinner("Player2");
        };
    
   };
 });
 //update active td
    var updatePlayerPosition = function (player) {
    var activeTD = $("#" + player + " td.active");
    var moveTD = activeTD.next();

    activeTD.removeClass("active");
    moveTD.addClass("active");
  };

  
  var raceWinner = function (winner) {
    window.alert (winner + " wins the race YaY! Press OK to play again.")
    gameStart();

  };

});

