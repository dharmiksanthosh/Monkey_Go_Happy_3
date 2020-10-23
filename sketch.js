var monkey,score,background1,obgroup,bangroup,iground,state,monkeyscale,scox;
score = 0;
state = 0;
monkeyscale = 1;
var lives = 2;
var lives_pic1,lives_pic2;

function preload(){

 monkey_running = loadAnimation(
    "monkey_animation/Monkey_01.png",
    "monkey_animation/Monkey_02.png",
    "monkey_animation/Monkey_03.png",
    "monkey_animation/Monkey_04.png",
    "monkey_animation/Monkey_05.png",
    "monkey_animation/Monkey_06.png",
    "monkey_animation/Monkey_07.png",
    "monkey_animation/Monkey_08.png",
    "monkey_animation/Monkey_09.png",
    "monkey_animation/Monkey_10.png");
  stone_img = loadImage("stone.png");
  bannana_img = loadImage("banana.png");
  background_img = loadImage("jungle.jpg");
  lives_img = loadImage("heart0.png");
  monk_still = loadImage("monkey_animation/Monkey_10.png");
}

function setup() {
  createCanvas(600, 300);
  
  background1 = createSprite(350,150,600,300);
  background1.addImage("jungle",background_img);
  background1.scale = 0.4;
  
  iground = createSprite(300,260,1200,5);
  iground.visible = false;
  
  monkey = createSprite(75,220,20,40);
  monkey.addAnimation("monkey-run",monkey_running);
  monkey.scale = 0.10
  monkey.setCollider("rectangle",0,0,400,500);
  
  lives_pic1 = createSprite(monkey.x+200,50,20,20);
  lives_pic2 = createSprite(monkey.x+235,50,20,20);
  lives_pic1.addImage("liveimg",lives_img);
  lives_pic1.scale = 0.02;
  lives_pic2.addImage("liveimg2",lives_img);
  lives_pic2.scale = 0.02;
  
  obgroup = new Group();
  bangroup = new Group();
}

function draw() {
  background(220);
  //

  monkey.collide(iground);

 if ((keyDown("space")||mouseIsPressed)&&monkey.y>210){
     
     monkey.velocityY = -17.5;
  }
  monkey.velocityY = monkey.velocityY+0.7;
  monkey.velocityX = 4
  camera.x = monkey.x;

  scox = monkey.x+100;
  lives_pic1.velocityX = monkey.velocityX;
  lives_pic2.velocityX = monkey.velocityX;


  switch(score){
  
    case 10: monkey.scale=0.12;
       break;
    case 15: monkey.scale=0.14;
       break;
    case 20: monkey.scale=0.16;
       break;
    case 25: monkey.scale=0.18;
       break;
    default: break;
  }
  if (monkey.x>650) {
    
    monkey.x = 250;
    lives_pic1.x = monkey.x+200;
    lives_pic2.x = monkey.x+235;

    if (bangroup[0]!=undefined) {
    
      console.log(bangroup[0].x);
      bangroup[0].x = bangroup[0].x-400;
    }
    if (obgroup[0]!=undefined) {
    
      obgroup[0].x = obgroup[0].x-400;
    }
  }

  stones();
  banana();
  
  if (bangroup.isTouching(monkey)){
  
    bangroup.destroyEach();
    score = score+1;
  }
  if (obgroup.isTouching(monkey)&&lives===2){
      
    obgroup.destroyEach();
    monkey.scale = 0.10;
   if (score>=10){ 
    score = 0;
   }
   if (score>10){
       
    score = score-10;
  } 
    lives = lives-1;
    lives_pic1.visible = false;
}
  if (obgroup.isTouching(monkey)&&lives===1){
      
    lives = lives-1;
    lives_pic2.visible = false;
    state = 3;
}
  if (state===3){
  
    over();
  }
  if (monkey.y<230) {
    
    monkey.addImage("stop",monk_still);
    monkey.changeImage("stop");
  }
  if (monkey.y>230&&state!=3) {
    
    monkey.changeAnimation("monkey-run")
  }
  
  drawSprites();
  
  textSize(17.5);
  fill("white");
  text("Score : "+score,scox,50);
  
 if (state===3){ 
   
  text("Press R to restart",monkey.x-50,250);
  textSize(25);
  text("Game Over",monkey.x-50,150);
}
}
function banana(){
  
if (frameCount %300===0){
    
    var bannana = createSprite(monkey.x+500, random(125,160), 40, 20);
    bannana.addImage("Banana",bannana_img);
    bannana.scale = 0.05;
    bannana.velocityX = -1;
    bannana.lifetime = 1000;
    bannana.rotation = -50;
    bangroup.add(bannana);
  }
}
function stones(){
  
 if (frameCount %500===0) {
 
  stone = createSprite(monkey.x+510,230,30,50);
  stone.addImage("stone_image",stone_img);
  stone.scale = 0.125;
  stone.setCollider("circle",0,0,150);
  stone.lifetime = 1000;
  obgroup.add(stone);
 }
}
function over(){

 monkey.setVelocity(0,0);
 obgroup.setVelocityEach(0,0);
 bangroup.setVelocityEach(0,0);
 monkey.addImage("stop",monk_still);
 monkey.changeImage("stop");
 obgroup.setLifetimeEach(-1);
 bangroup.setLifetimeEach(-1);
  
  if (keyDown("r")||mouseIsPressed){
      
    reset();  
  }
}
function reset(){
  
  state=0;
  obgroup.destroyEach();
  bangroup.destroyEach();
  monkey.velocityX = -3
  monkey.changeAnimation("monkey-run");
  score = 0;
  lives = 2;
  monkey.scale=0.10
  lives_pic1.visible = true;
  lives_pic2.visible = true;
}