
// Canvas Variables
    var canvas = $('#canvas');
    var context = canvas.get(0).getContext('2d');
   
    var start_time = new Date().getTime();
    
    var background = new Image();
    background.src = "images/track2.png";

  

    // set timer for the game
    function getTimer () {
    return (new Date().getTime() - start_time); //milliseconds
    }

    // Keyboard Variables
    var leftKey = 37;
    var upKey = 38;
    var rightKey = 39;
    var downKey = 40;
    
   
