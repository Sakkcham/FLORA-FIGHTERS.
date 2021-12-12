var bkimg;
var player;
var playerimg;
var bk;
var enemy_1;
var bullets,bulletsGroup;
var positionsE=[];
var positionsB=[];
var enemyGroup;
var score=0;
var gameState="play";
function preload(){
  bkimg=loadImage("background.jpg");
  playerimg=loadImage("enemy.png");
  enemy_1=loadImage("plane.png");
  bullets=loadImage("Bullets.png")
}
function setup(){
  createCanvas(windowWidth, windowHeight);
  bk=createSprite(width/2,height/2,width,height);
  bk.shapeColor="black"; 
  bk.addImage(bkimg);
  bk.scale=4.5;
  bk.velocityY=-5;
  player=createSprite(width/2,height-100,20,30);
  console.log(width);
  player.addImage(playerimg);
  player.scale=0.8;
  enemyGroup= new Group();
  createEnemy();
  bulletsGroup=new Group();
 
}
function createEnemy(){
  positionsE=[250,450,650,850,1050];
  for(var i=0; i<positionsE.length; i++){
    var enemy=createSprite(positionsE[i], -70);
    enemy.addImage(enemy_1);
    enemy.scale=0.8;
    var rx=Math.round(random(-4,4));
    var ry=Math.round(random(1,4));
    enemy.velocityX=rx;
    enemy.velocityY=ry;
    enemyGroup.add(enemy);
  }
}
function createBullets(){
  positionsB=[[player.x+70,height-155],[player.x+60,height-165],[player.x+50, height-165],[player.x-50, height-155],[player.x-60,height-165],[player.x-70,height-175]];
  for(var i=0; i<positionsB.length;i++){
    var bullet=createSprite(positionsB[i][0],positionsB[i][1]);
    bullet.addImage(bullets);
    bullet.scale=0.1;
    bullet.velocityY=-15;
    bulletsGroup.add(bullet);
  }
}
function keyPressed(){
  if(keyCode===32){
    createBullets();
  }
}
function draw(){
  if(gameState==="play"){
    background(0);
    for(var i=0; i<enemyGroup.length; i++){
      console.log("forLoop"+i);
      if(enemyGroup[i].y>player.y){ 
        enemyGroup[i].y=-70;
      }
      if(enemyGroup[i].isTouching(player)){
        player.destroy();
        enemyGroup.destroyEach();
        bulletsGroup.destroyEach();
        bk.destroy();
        gameState="end";
  
      }
    }
    console.log(height);
    if(keyIsDown(LEFT_ARROW)){
      player.x=player.x-10;
    }
   
    if(keyIsDown(RIGHT_ARROW)){
      player.x=player.x+10;
    }
    if(bk.y<200){
      bk.y=height/2;
    }
     bulletsGroup.bounceOff(enemyGroup,bulletHit);
    drawSprites();
  }
 else if(gameState==="end"){
  
 textSize(25);
 fill("cyan");
  text("GAME OVER",width/2,height/2);
 }
  textSize(25);
  fill("white");
  text("score: "+score,50,50);
}

function bulletHit(bullet,enemy){
  bulletsGroup.destroyEach();
  enemy.destroy();
  score=score+10;
}