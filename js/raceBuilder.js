// JS adds car & track image and control game

$(document).ready(function(){

// ---Canvas Variables ---//

  var canvas = $('#canvas');
  var context = canvas.get(0).getContext('2d');
  var background = new Image();
  background.src = "images/Track2.png";

// ----set timer for the game------//
  start_time =new Date().getTime();
  function getTimer () {
  return (new Date().getTime() - start_time); //milliseconds
  };

// ---Keyboard control Variables-----//
  var leftKey = 37;
  var upKey = 38;
  var rightKey = 39;
  var downKey = 40;

//--- Resize canvas to full screen---//

  function resizeCanvas(){
  canvas.attr('width', $(window).get(0).innerWidth);
  canvas.attr('height', $(window).get(0).innerHeight);
  };

  resizeCanvas();

//--- Canvas set to proper scaled width ---//
// that should work well with every resolution

  $(window).resize(resizeCanvas);
  var canvasWidth = canvas.width();
  var canvasHeight = canvas.height();
  // console.log(canvasHeight, canvasWidth);

//----canvas boundary--//
  var leftbndry = 0;
  var topbndry = 0;
  var rightbndry = canvasWidth;
  var bottombndry = canvasHeight;

// ---Keyboard event listeners---//

  $(window).keydown(function(e){
      var keyCode = e.keyCode;
  
      if(keyCode == leftKey){
          car.left = true;
      } else if(keyCode == upKey){
          car.forward = true;
      } else if(keyCode == rightKey){
          car.right = true;
      } else if (keyCode == downKey){
          car.backward = true;
      }
  });

  $(window).keyup(function(e){
    var keyCode = e.keyCode;
    
    if(keyCode == leftKey){
        car.left = false;
    } else if(keyCode == upKey){
        car.forward = false;
    } else if(keyCode == rightKey){
        car.right = false;
    } else if (keyCode == downKey){
        car.backward = false;
    }
  });

// ---Start & Stop button controlls---//
  var playAnimation = true;
  var startButton = $('#startGame');
  var stopButton = $('#stopGame');
  startButton.hide();   
  var resetButton = $('#init');
 
  startButton.click(function(){
  $(this).hide();
  stopButton.show();
  playAnimation = true;
  updateStage();
  });

  stopButton.click(function(){
  $(this).hide();
  startButton.show();
  playAnimation = false;
    });

  resetButton.click(function() {
  start_time =new Date().getTime(); 
    initialise();
    
  });

 function initialise(){
  initStageObjects();
  drawStageObjects();
  updateStage();
  };

//---- Car object and properties---//
  function Car(src, x, y){        
    this.image = new Image();
    this.image.src = src;
    
    this.x = x;
    this.y = y;
    this.vx = 0;
    this.vy = 0;
    this.angle = 90;

    this.topSpeed = 15;
    this.acceleration = 0.1;
    this.reverse = 0.1;
    this.brakes = 0.3;
    this.friction = 0.05;
    this.handling = 15;
    this.grip = 15;
    this.minGrip = 5;
    this.speed = 0;
    this.drift = 0;

    this.left = false;
    this.up = false;
    this.right = false;
    this.down = false;
    }

 //--- Create any objects needed for animation ---//
  function initStageObjects(){
    car = new Car(src='images/orange_car.png',100,100);
     //canvas.width()/2,canvas.height()/2);
  };

 // ---load the car image on to the canvas---//
  function drawStageObjects(){
  context.save();   
  context.translate(car.x,car.y);  //move car to x,y 
  context.rotate((car.angle + car.drift) * Math.PI/180);    
  context.drawImage(car.image, -25 , (-47 + (Math.abs(car.drift / 3))));    
  context.restore();
  };

//Clear canvas before drawing 
    
  function clearCanvas(){
    context.clearRect(0, 0, canvasWidth, canvasHeight);  
    context.beginPath();
  };

  function updateStageObjects(){
       
    //----Car acceleration to top speed---//

    if(car.forward){
        if(car.speed < car.topSpeed){
            car.speed = car.speed + car.acceleration;
        }            
    }        
    else if(car.backward){
            if(car.speed < 1){
            car.speed = car.speed - car.reverse;    
            }
            else if(car.speed > 1){
            car.speed = car.speed - car.brakes;
            }
    };

    //--- Faster the car is going, the worse it handles---//

    if(car.handling > car.minGrip){
        car.handling = car.grip - car.speed;
    }
    else{
        car.handling = car.minGrip + 1;
    }

    // General car handling when turning    
   
    if(car.left){
        car.angle = car.angle - (car.handling * car.speed/car.topSpeed);
      
    } else if(car.right){
        car.angle = car.angle + (car.handling * car.speed/car.topSpeed);    
    };

    // Constant application of friction / air resistance
    if(car.speed > 0){
    car.speed = car.speed - car.friction;
    } else if(car.speed < 0) {
           car.speed = car.speed + car.friction;
          };

    //check canvas boutndary

    if (car.x <leftbndry  || car.x > rightbndry ){
        car.vx *= -1;
    } else  {
             car.vx = Math.sin(car.angle * Math.PI / 180) * car.speed;   
             };

    if (car.y < topbndry || car.y > bottombndry) {
       car.vy *= -1;
    } else {
            car.vy = -Math.cos(car.angle * Math.PI / 180) * car.speed;
          };

// display game stats  info  visually
  time = getTimer();
  document.getElementById("stats").innerHTML= "Elapsed Time = "+time/1000 +" msec"+'<br/>'+"Car Speed =" + car.speed;
                                        
     //    $('#stats').html(leftbndry,topbndry,rightbndry, bottombndry, car.x, car.y);
        

    // Update car velocity (speed + direction)
  //  console.log(leftbndry,topbndry,  rightbndry, bottombndry, car.x, car.y)
        
    // Set new velocity into x and y cords
   car.y = car.y + car.vy;
   car.x = car.x + car.vx;
  };
// Main animation loop
 
  function updateStage(){
    clearCanvas();
    updateStageObjects();
    drawStageObjects();        
  
      if(playAnimation){
        setTimeout(updateStage, 24);
      };
    };
      
// Initialise the animation loop
    initialise();
  
});