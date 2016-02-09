
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
    


  // Resize canvas to full screen
    function resizeCanvas(){
        canvas.attr('width', $(window).get(0).innerWidth);
        canvas.attr('height', $(window).get(0).innerHeight);
       
   
 // Create background image for game
    function initStageObjects(){
        car = new Car(src='images/orange_car.png',100,100);
            //canvas.width()/2,canvas.height()/2);
    }