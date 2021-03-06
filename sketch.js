var coingroup,mushroomgroup
var gameState = "play"
function preload(){
  bg = loadImage("png/BG/BG.png")
  cuttreeimage = loadImage("png/Object/Tree_1.png")
  tree2image = loadImage("png/Object/Tree_2.png")
  tree3image = loadImage("png/Object/Tree_3.png")
  playerimage = loadAnimation("png/player/Run4.png","png/player/Run5.png","png/player/Run6.png")
  groundimage = loadImage("png/Tiles/2.png")
  mushroom1 = loadImage("png/Object/Mushroom_1.png")
  mushroom2 = loadImage ("png/Object/Mushroom_2.png")
  goldimage = loadAnimation ("png/Gold/Gold_23.png","png/Gold/Gold_24.png","png/Gold/Gold_25.png")
  bronzeimage = loadAnimation ("png/Bronze/Bronze_22.png","png/Bronze/Bronze_23.png","png/Bronze/Bronze_24.png")
  silverimage = loadAnimation ("png/Silver/Silver_22.png","png/Silver/Silver_23.png","png/Silver/Silver_24.png")
  
}
function setup() {
  
  createCanvas(displayWidth,displayHeight-105);
  player = createSprite(400, 750, 200, 200);
  player.addAnimation("player",playerimage)
  player.scale=0.4
  player.debug=true
  player.setCollider("rectangle",0,0,300,300)
  ground = createSprite(displayWidth/2-87,displayHeight/2+400,displayWidth,100)
  ground.addImage("groundimage",groundimage)
  ground.velocityX= -15
  ground.scale=1.5
  ground.debug=false
  invisground = createSprite(displayWidth/2-87,displayHeight/2+250,displayWidth,20)
  invisground.visible=false;
  
  cuttree = createSprite (1800,825,50,50)
  cuttree.addImage("cuttreeimage",cuttreeimage)
  tree2 = createSprite(800,700,50,50)
  tree2.addImage("tree2image",tree2image)
  tree3 = createSprite(1300,710,50,50)
  tree3.addImage("tree3image",tree3image)
  tree4 = createSprite(150,700,50,50)
  tree4.addImage("tree2image",tree2image)
  coingroup = new Group()
  mushroomgroup = new Group()


   
 
  


  
  
}

function draw() {
  background(bg);
  if (gameState === "play"){  
  if(ground.x<displayWidth/2-340){
    ground.x=ground.width/2
  }  
  if (keyDown("space")){
    player.velocityY=-15
  }
  if (keyDown("right_arrow")){
    player.x = player.x+17
  }
  if (keyDown("left_arrow")){
    player.x = player.x-17
  }
  player.velocityY=player.velocityY+1
  player.collide(invisground)
  player.depth=player.depth+1
  spawnMushroom();
  spawnGoldcoins();
  if (player.isTouching(mushroomgroup)){
    gameState = "end"
    console.log("playerTouchingmushroom")

  }
}
else if(gameState === "end" ) {
  player.velocityY = 0
  ground.velocityX = 0
  coingroup.setVelocityYEach(0)
  mushroomgroup.setVelocityYEach(0)

}
  drawSprites();
  
}

function spawnMushroom(){
  if (frameCount%100===0){
    var rand = Math.round(random(1,2))
  console.log(rand)
  var mushroom = createSprite(2000,825,300,300)
  mushroom.debug=true;
  if (rand === 1){
  mushroom.addImage("mushroom1",mushroom1)
  }
  else {
    mushroom.addImage("mushroom2",mushroom2)

  }
  mushroom.scale = random(1,2)
  mushroom.velocityX = -20
  mushroomgroup.add(mushroom)
}


}
function spawnGoldcoins(){
 if (frameCount%50===0){
    var rand = Math.round(random(1,3))
    var coin = createSprite(random(1,2000),0,20,20)
    if (rand===1){
      coin.addAnimation("goldimage",goldimage)
    
    }
    else if (rand === 2){
      coin.addAnimation("silverimage",silverimage) 
      
    }
    else if (rand === 3){
      coin.addAnimation("bronzeimage",bronzeimage)
    }
    coin.scale= 0.1
    coin.velocityY = 10
    coin.depth=ground.depth
    ground.depth=ground.depth+1
    coingroup.add(coin)

 }
} 