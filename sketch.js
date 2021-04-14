var balloon,balloonImage1,balloonImage2;
var database;
var height;
var balloonHeightref;
var pos;

function preload(){
   bg =loadImage("images/city.png");
   balloonImage1=loadAnimation("images/balloon1.png","images/balloon2.png","images/balloon3.png");
  
}


function setup() {
  createCanvas(1500,700);
  database = firebase.database();
  balloon=createSprite(250,550,150,150);
  balloon.addAnimation("hotAirBalloon",balloonImage1);
  balloon.scale=0.5;

  
  balloonHeightref = database.ref("Balloon/Position");
  balloonHeightref.on("value",readHeight,showErr);
 
}

function draw() {
  background(bg);  
  drawSprites();

  if(keyDown(UP_ARROW)){
    balloon.y=balloon.y-10;
    balloon.scale=balloon.scale +0.01;
    updateHeight(0,-10);
  }else if(keyDown(DOWN_ARROW)){
    balloon.y=balloon.y+10;
    balloon.scale=balloon.scale -0.007;
    updateHeight(0,10);
  }else if(keyDown(LEFT_ARROW)){
    balloon.x=balloon.x-10;
    updateHeight(-10,0);
  }else if(keyDown(RIGHT_ARROW)){
    balloon.x=balloon.x+10;
    updateHeight(10,0);
  }
  fill("pink");
  stroke("blue");
  textSize(25);
  text("**Use arrow keys to move Hot Air Balloon!",40,40);

}

function updateHeight(x,y){
  database.ref("Balloon/Position").set({
    x: pos.x + x,
    y: pos.y + y

  })
}

function readHeight(data){
 pos=data.val();
 balloon.x= pos.x;
 balloon.y= pos.y;

}

function showErr(){
  console.log("Error in writing to the database");
}