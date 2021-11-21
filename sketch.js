var score=0
var trex ,trex_running; 
var PLAY =1
var END =0
var gameState = PLAY

 function preload(){
   
  trex_collided = loadAnimation("trex_collided.png"  )
   trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
   groundImage = loadImage("ground2.png")
   cloudimg = loadImage("cloud.png")
   obstacleimg1 = loadImage("obstacle1.png")
   obstacleimg2 = loadImage("obstacle2.png")
   obstacleimg3 = loadImage("obstacle3.png")
   obstacleimg4 = loadImage("obstacle4.png")
   obstacleimg5 = loadImage("obstacle5.png")
   obstacleimg6 = loadImage("obstacle6.png")
   gameOver_ing = loadImage("gameOver.png")
   restart_ing = loadImage("restart.png")
   dieSound =loadSound("die.mp3")
   checkpointSound =loadSound("checkpoint.mp3")
   jumpSound =loadSound("jump.mp3")
}

function setup(){
 createCanvas(600,200)
  
  //create a trex sprite
  
  trex = createSprite(50,160,20,50)
  trex.addAnimation("running", trex_running);
  trex.addAnimation("colliding",trex_collided)
  trex.scale=0.5;

  ground = createSprite(200,180,400,20);
   ground.addImage("ground",groundImage);
   invisibleGround = createSprite(200,190,400,10);
   invisibleGround.visible = false;

   var raNum = Math.round(random(10,50))
   console.log(raNum)

   cloud_group = new Group();
   obstacle_group =new Group();

   trex.setCollider("rectangle",0,0,400,trex.height)  

 trex.debug=true

 restart = createSprite(300,140)
 gameover= createSprite(300,100)
 restart.addImage(restart_ing)
 gameover.addImage(gameOver_ing)
 restart.scale = 0.5
 gameover.scale = 0.5
}


function draw(){

  background(180)
  ground.velocityX=-(6+3*score/100)  
  //console.log(trex.y)
  
  if( gameState === PLAY){
    restart.visible=false
    gameover.visible=false
    if (ground.x<0){
      ground.x = ground.width/2;
    }

    if(score>0 && score %100===0){
      checkpointSound.play()
    }
    if(keyDown("SPACE")&(trex.y>=150)){
      trex.velocityY=-13      
      jumpSound.play ()
    }
    trex.velocityY=trex.velocityY+0.8; 

    spawnClouds()
    spawnObstacles()
    score= score+Math.round(frameCount/120)

    if(trex.isTouching (obstacle_group)){
      trex.velocityY=-12
     // gameState = END
     // dieSound.play()
    }

  }
  else if (gameState === END){
    restart.visible=true
    gameover.visible=true
ground.velocityX=0
cloud_group.setVelocityXEach(0)
obstacle_group.setVelocityXEach(0) 
cloud_group.setLifetimeEach(-1)
obstacle_group.setLifetimeEach(-1)
trex.velocityY=0
trex.changeAnimation("colliding",trex_collided)

  }




  
    

 
trex.collide(invisibleGround);

text("Score : "+score,300,50)
         
  drawSprites();

}

function  spawnClouds()
{
  if(frameCount %60===0){

  
 cloud = createSprite(600,100,40,10)
 cloud.velocityX=-3
 cloud.y=Math.round(random(10,60))
 cloud.addImage(cloudimg)
 cloud.scale=0.5

 cloud.lifetime=200  
 console.log(trex.depth)
 cloud.depth = trex.depth;
 trex.depth = trex.depth + 1;
 cloud_group.add(cloud)
}
}
 
