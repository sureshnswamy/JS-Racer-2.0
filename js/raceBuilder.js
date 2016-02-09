
// Canvas Variables

  var canvas = $('#canvas');
  var context = canvas.get(0).getContext('2d');
  var start_time = new Date().getTime();
 var background = new Image();
 background.src = "images/Track2.png";

  

// set timer for the game

  function getTimer () {
  return (new Date().getTime() - start_time); //milliseconds
  };

// Keyboard Variables
  var leftKey = 37;
  var upKey = 38;
  var rightKey = 39;
  var downKey = 40;



// Resize canvas to full screen

  function resizeCanvas(){
  canvas.attr('width', $(window).get(0).innerWidth);
  canvas.attr('height', $(window).get(0).innerHeight);
  };

  resizeCanvas();

// Canvas set to proper scaled width
// that should work well with every resolution

  $(window).resize(resizeCanvas);
  var canvasWidth = canvas.width();
  var canvasHeight = canvas.height();
  // console.log(canvasHeight, canvasWidth);

//canvas boundary
  var leftbndry = 0;
  var topbndry = 0;
  var rightbndry = canvasWidth;
  var bottombndry = canvasHeight;

   
// Create background image for game

    function initStageObjects(){
        car = new Car(src='images/orange_car.png',100,100);
            //canvas.width()/2,canvas.height()/2);
    };

// Keyboard event listeners

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

// Start & Stop button controlls
  var playAnimation = true;

  var startButton = $('#startGame');
  var stopButton = $('#stopGame');
  startButton.hide();   
  var resetButton = $('#init');
 
  time =getTimer();
 
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
  var time = getTimer();
  console.log(time/1000 +"seconds");
  });

  resetButton.click(function() {
    initialise();
  });

// Car object and properties
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
    this.handeling = 15;
    this.grip = 15;
    this.minGrip = 5;
    this.speed = 0;
    this.drift = 0;

    this.left = false;
    this.up = false;
    this.right = false;
    this.down = false;
    }

 // Create any objects needed for animation        
  function initStageObjects(){
    car = new Car(src='images/orange_car.png',100,100);
     //canvas.width()/2,canvas.height()/2);
  };

 function initialise(){
  initStageObjects();
  drawStageObjects();
  updateStage();
  };

// load the car image on to the canvas
  function drawStageObjects(){
  context.save();   
  context.translate(car.x,car.y);  //move car to x,y 
  context.rotate((car.angle + car.drift) * Math.PI/180);    
  context.drawImage(car.image, -25 , (-47 + (Math.abs(car.drift / 3))));    
  context.restore();
  };

 function updateStageObjects(){
       
// Car acceleration to top speed

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

// Faster the car is going, the worse it handles

  if(car.handeling > car.minGrip){
      car.handeling = car.grip - car.speed;
  }
  else{
      car.handeling = car.minGrip + 1;
  }

// General car handling when turning    
  if(car.left){
      car.angle = car.angle - (car.handeling * car.speed/car.topSpeed);
    
  } else if(car.right){
      car.angle = car.angle + (car.handeling * car.speed/car.topSpeed);    

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

        
  
};