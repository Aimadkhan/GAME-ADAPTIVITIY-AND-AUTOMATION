function spawnObstacles()
{
  if(frameCount %120===0){ 
obstacle = createSprite(600,165,10,40)
obstacle.velocityX=-(6+score/100)
var randomNum = Math.round(random(1,6))
switch(randomNum) {
  case 1: obstacle.addImage(obstacleimg1);
          break;
  case 2: obstacle.addImage(obstacleimg2);
          break;
  case 3: obstacle.addImage(obstacleimg3);
          break;
  case 4: obstacle.addImage(obstacleimg4);
          break;
  case 5: obstacle.addImage(obstacleimg5);
          break;
  case 6: obstacle.addImage(obstacleimg6);
          break;
  default: break;
}

//assign scale and lifetime to the obstacle           
obstacle.scale = 0.5;
obstacle.lifetime = 300;

obstacle_group.add(obstacle)
  }
}