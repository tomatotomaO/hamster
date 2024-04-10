let ham1,ham2,ham3;
let imgSeed1,imgSeed2,imgSeed3;
let leftHand,rightHand;
let imgBackground;
let x1,y1,x2,y2,x3,y3;
let numOfSeed=0;
const seedX= new Array(12).fill(0);
const seedY= new Array(12).fill(0);
let totalScore=0;
let numRotate=0;
const seedR=new Array(12).fill(0);
let heart;
let heart_img;
let speedSet;
let speed_img;
const kindOfseed= new Array(12).fill(0);
const enemyX=new Array(4).fill(2000);
const enemyY=new Array(4).fill(1000);
const enemyTargetSeed=new Array(2).fill(0);
let IsTarget=new Array(12).fill(true);//seed배열에서 0이상은 true, 이하는 false로 저장 
let numOfeaten=0;//적이 먹은 해바라기씨 수 
let clickStart=false;//게임시작 여부 결정
let nowplaing=0;//메인화면,설명,게임시작,게임오버 분류
let backImage;
let bush_img;
let howto_img;
let hamE;
let heartXY=new Array(2);
let speedXY=new Array(2);
let frameCountSpeed;
let colision=-1;
const enemymove2=[[700,500],[1000,1000],[1300,400]];
const enemymove3=[[1300,900],[1800,500],[1750,1100]];
let nowMovePoint=new Array(4).fill(0);
let howtoTrue=false;

function preload(){
ham1=loadImage("ham1.png");//200X200
ham2=loadImage("ham1.1.png");
ham3=loadImage("ham1.2.png");
imgSeed1=loadImage("seed1.png");//100X100
imgSeed2=loadImage("seed2.png");
imgSeed3=loadImage("seed3.png");
heart_img=loadImage('heartIMG.png');
speed_img=loadImage('speedIMG.png');
leftHand=loadImage("hand1.png");//450X1080
rightHand=loadImage("hand2.png");
tree=loadImage("treeIMG.png");//329x869
backImage=loadImage('backIMG.png');
bush_img=loadImage('bushIMG.png'); 
hamE=loadImage('hamE.png');
howto_img=loadImage('howto.png');

}


function setup(){
    createCanvas(1980, 1280);
   image(backImage,0,0);
}
function draw(){
  mainScreen();
  if(clickStart===true){
    gamePlay();
  }

  if(howtoTrue===true)
  howTo();
  else{
    if(nowplaing<=1){
      image(backImage,0,0);
      mainScreen();
    }
   
  }
 

  if(heart<=0||totalScore>=10){
    clickStart=false;
    nowplaing=3;
    //마지막 화면 get해서 띄워놓기 
    draw_home();
    endGame();
  }
}



class ITEMS{
  constructor(kind){
    this.kind=kind;
  }

  whatKind(){
   if(this.kind==="seed")
   this.item_seed();
   if(this.kind==='heart')
   this.item_heart();
   if(this.kind==='speed')
   this.item_speed();
  }


  //각각 실행조건 
item_seed(){
  this.eat_seed();
  this.count_seed();
  this.seed_atHome();

}
  
item_heart(){
  this.eat_heart();
if(heart<3 && this.count_heart()===true){
  this.set_heart();
}
}

item_speed(){
this.eat_speed();
if(this.count_speed()===true){
  this.set_speed();
}}

set_seed(){
for(let i=0;i<12;i++){
  let arr=this.randomXY();
  seedX[i]=arr[0];
  seedY[i]=arr[1];
  seedR[i]=QUARTER_PI * random(8);
}
}
set_heart(){
  let arr=this.randomXY();
  heartXY[0]=arr[0];
  heartXY[1]=arr[1];
}
set_speed(){
  let arr=this.randomXY();
  speedXY[0]=arr[0];
  speedXY[1]=arr[1];
}

seed_atHome(){
  if(nowplaing===2){
    if(x1<200&&y1<1000){
      totalScore+=numOfSeed;
      
      for(let i=0;i<12;i++){
        if(seedX[i]===-100){
        let arr=this.randomXY();
        seedX[i]=arr[0];
        seedY[i]=arr[1];
        IsTarget[i]=true;
        }
       }
        }

  }

}

eat_seed(){
  for(let i=0;i<12;i++){
      if(this.eat_item(seedX[i],seedY[i])===true){
        seedX[i]=-100;
        seedY[i]=-100;
        IsTarget[i]=false;
      }
      }
}

eat_heart(){
  if(this.eat_item(heartXY[0],heartXY[1])===true){
    heartXY[0]=-100;
    heartXY[1]=-100;
    heart++;
  }
}

eat_speed(){
  if(this.eat_item(speedXY[0],speedXY[1])===true){
    speedXY[0]=-100;
    speedXY[1]=-100;
    frameCountSpeed=frameCount;
    moveSpeed();
  }
}
eat_item(itemX,itemY){
  let x=x1+100;
  let y=y1+100;
  let term=50;
  let eat=false;
    if(itemX-term<=x&&itemX+term>=x){
      if(itemY-term<=y&&itemY+term>=y){
        eat=true;
      }}
      return eat;

}

count_seed(){
  numOfSeed=0;
  for(let i=0;i<12;i++){
  if(this.count_item(seedX[i]))
  numOfSeed++;
  if(numOfSeed>=5)
  numOfSeed=5;
  }
}

count_heart(){
  return this.count_item(heartXY[0]);
}
count_speed(){
  return this.count_item(speedXY[0]);
}

count_item(x){
  if(x===-100)
  return true;
}
randomXY(){
  let arr=new Array(2);
  arr[0]=int(random(700, width-100));
  arr[1]=int(random(300,height-100));
  return arr;
}
}
//아이템도 class에 넣어서 object범위는 안뽑히게하거나 범위 한정짓기
const seedC=new ITEMS('seed');
const heartC=new ITEMS('heart');
const speedC=new ITEMS('speed');

//draw

//씨앗 세팅 
function draw_seed(){
  for(let i=0;i<12;i++){
    push();
    translate(seedX[i]+50, seedY[i]+50);
  rotate(seedR[i]);
    if(i<4)
    image(imgSeed1,-50,-50);
    else if(i<8)
    image(imgSeed2,-50,-50);
    else if(i<12)
    image(imgSeed3,-50,-50);
    pop();
  }

}
//내가 먹은 씨앗=-100
//적이 먹은 씨앗=-200
function draw_item(){
seedC.whatKind();
heartC.whatKind();
speedC.whatKind();

draw_seed();
image(heart_img,heartXY[0]-50,heartXY[1]-50);
image(speed_img,speedXY[0]-50,speedXY[1]-50);
}




function moveSpeed(){
  let result=false;
if(frameCount-frameCountSpeed<60*2){
result=true;
}
return result;
}


//먹은 seed 개수 따라 player 이미지 지정 
function hamPouch_image() {
  push();
  translate(x1+100, y1+100);
  rotate(QUARTER_PI * numRotate);
  switch (numOfSeed) {
    case 0:
      image(ham1, -100, -100);
      break;
    case 1:
    case 2:
    case 3:
    case 4:
      image(ham2, -100, -100);
      break;
    case 5:
      image(ham3, -100, -100);
      break;
  }
  pop();
}

function range_XY(){
  let result=true;
  if(x1<100)
  x1=100;
  if(x1>width-100)
  x1=width-100;
  if(y1<200)
  y1=200;
  if(y1>height-100)
  y1=height-100;
  // rect(280,650,400,500);
  if(x1>0&&x1<580&&y1<1000&&y1>550){
    result=false;
  }

  if(x1>width-550&&x1<width&&y1<300&&y1>0)
  result=false;

  if(x1>width-900&&x1<width-400&&y1<height&&y1>height-300)
  result=false;


  return result;
}


function moveHam(){
  let movesize = 10;
  if(moveSpeed()===true)
  movesize*=1.5;
  if (keyIsDown(65)) {
    x1 -= movesize;
    if(range_XY()===false)
    x1 += movesize;
    numRotate=4;
  }
  if (keyIsDown(68)) {
    x1 += movesize;
    if(range_XY()===false)
    x1 -= movesize;
    numRotate=0;
  }
  if (keyIsDown(87)) {
    y1 -= movesize;
    if(range_XY()===false)
    y1 += movesize;
    numRotate=6;
  }
  if (keyIsDown(83)) {
    y1 += movesize;
    if(range_XY()===false)
    y1 -= movesize;
    numRotate=2;
  }

  if(keyIsDown(68)===true&&keyIsDown(83)===true)
numRotate=1;
if(keyIsDown(83)===true&&keyIsDown(65)===true)
numRotate=3;
if(keyIsDown(65)===true&&keyIsDown(87)===true)
numRotate=5;
if(keyIsDown(87)===true&&keyIsDown(68)===true)
numRotate=7;
}



function draw_home(){
  seedC.seed_atHome();
  fill(35,164,78);
  rect(0,0,width,200);


fill(0);
image(imgSeed1,100,50);
textSize(60);
text('x  '+str(totalScore), 230,120);
draw_heart();
}

function mainScreen(){
  noStroke();
  fill(255);
 rect(700,700,580,200,50,50);
 rect(700,950,580,200,50,50);
 fill(0);
 textSize(100);
 text('start',900,835);
 text('howto',865,835+250);
}//게임시작화면
function howTo(){
  image(howto_img,400,230);
}//도움말

function set_gamestart(){
  image(backImage,0,0);
    seedC.set_seed();
    heartC.set_heart();
    speedC.set_speed();
    set_enemy();
    x1=200;
    y1=400;
    x2=700;
    y2=500;
    x3=1400;
    y3=200;
    heart=3;
    totalScore=0;
    nowMovePoint=[false,false,0,0];
    for(let i=0;i<2;i++){
      heartXY[i]=-100;
      speedXY[i]=-100;
    }
    
}

function circle_turn(i){
  let sX,sY;
  let x=enemyX[i];
  let y=enemyY[i];
  let index=nowMovePoint[i];
  if(i===2){
    sX=enemymove2[index][0];
    sY=enemymove2[index][1];
  }
 if(i===3){
  sX=enemymove3[index][0];
  sY=enemymove3[index][1];
 }
  if(y===sY&&x===sX){
   nowMovePoint[i-2]=true;
   circle_true(i);
  }
}

function circle_true(i){
  if(nowMovePoint[i]===0)
  nowMovePoint[i]=1;
  else if(nowMovePoint[i]===1)
 nowMovePoint[i]=2;
 else if(nowMovePoint[i]===2)
 nowMovePoint[i]=0;

 nowMovePoint[i-2]=false;

}
function gamePlay(){
    image(backImage,0,0);
    draw_item();
    hamPouch_image();
    moveHam();
    enemy_hamster();
    image(bush_img,0,0);
    image(tree,0,0);
    draw_home();
   

  
      if(playerColision()===true){
       bouncePlayer();
        colision++;
      }
      else
      colision=-1;
     
if(colision===0)
heart--;



    
}//게임플레이




function playerColision(){
  let result=false;
  let i=0;
  do{

    if (checkCollision(x1 + 100, y1 + 100, enemyX[i] + 100, enemyY[i] + 100))
    result=true;
    i++;
  }while(i<4&&result===false);

  return result;
  
}

function endGame(){
  stroke(255);
  strokeWeight(10);
  fill(255);
 rect(700,700,580,200,50,50);
 rect(700,950,580,200,50,50);
 fill(0);
 textSize(100);
 text('retry',885,835);
 text('main',885,835+250);

 textSize(300);
 if(heart<=0)
 text('GAME OVER',200,500);
 else{
  text('GAME CLEAR',150,500);
  noStroke();
  textSize(80);
  text("score:"+str(totalScore),880,630);
 }

}//게임오버화면 > 다시하기, 메인화면




class RangeSet{
    constructor(x,y){
      this.x = x;
      this.y = y;
    }
    
    resetXY(x,y){
      this.x = x;
      this.y = y;
    }
  
  
    outline_range(){
      let result=true;
      
      if(this.x<100)
     result=false;
      if(this.x>width-100)
      result=false;
      if(this.y<200)
  result=false;
      if(this.y>height-100)
result=false;

      return result;
    }

  
  obstacle(){
    let result=true;
  // rect(280,650,400,500);
  if(x1>0&&x1<580&&y1<1000&&y1>550)
    result=false;
  
  if(x1>width-550&&x1<width&&y1<300&&y1>0)
  result=false;

  if(x1>width-900&&x1<width-400&&y1<height&&y1>height-300)
  result=false;

  return result;
  }
  
  playerRange(){
    return this.getRange(x1,y1);
  }
  
  getRange(valueX,valueY){
    let result=true;
    if(this.x>valueX-100&&this.x<valueX+100&&this.valueY+100&&this.y>valueY-100){
    result=false;
  }
  return result;
  }
  
  enemyRange(i){
    let result=true;
  switch(i){
    case 0:
      result=this.getRange(enemyX[0],enemyY[0]);
      break;
      case 1:
        result=this.getRange(enemyX[1],enemyY[1]);
      break;
        case 2:
          result=this.getRange(enemyX[2],enemyY[2]);
      break;
          case 3:
            result=this.getRange(enemyX[3],enemyY[3]);
      break;
  }
  return result;
  }
  
  
  }
    let p=new RangeSet(x1,y1);
    let e0=new RangeSet(enemyX[0],enemyY[0]);
    let e1=new RangeSet(enemyX[1],enemyY[1]);
    let e2=new RangeSet(enemyX[2],enemyY[2]);
    let e3=new RangeSet(enemyX[3],enemyY[3]);

  function checkCollision(x, y, enemyX, enemyY) {
    let distance = dist(x, y, enemyX, enemyY);
    return distance < 100; // Adjust the value based on your needs
  }

function bouncePlayer(){
  let movesize=150;
  if (playerColision()===true){
  switch(numRotate){
case 0:
  x1-=movesize;
  break;
case 1:
  x1-=movesize;
  y1-=movesize;
  break;
case 2:
  y1-=movesize;
    break;

case 3:
  y1-=movesize;
  x1+=movesize;
  break;
case 4:
  x1+=movesize;
  break;

case 5:
  x1+=movesize;
  y1+=movesize;
  break;
case 6:
  y1+=movesize;
  break;
case 7:
  y1+=movesize;
  x1-=movesize;




  }
  }
 
}

function draw_heart(){
 
  if(heart>0){
    for(let i=0;i<heart;i++){
      //하트 이미지 그리기
      image(heart_img,1300+i*150,50);
    }
  }}

  //enemy 관련 함수
function set_enemy(){
  nowMovePoint=[false,false,2,2];
  for(let i =0; i<2;i++){
    enemyX[i]=int(random(700, width));
  enemyY[i]=int(random(300,height));
  }
   for(let i =0; i<2;i++){
  findNearSeed(i);
  }
enemyX[2]=enemymove2[nowMovePoint[2]][0];
enemyY[2]=enemymove2[nowMovePoint[2]][1];
enemyX[3]=enemymove3[nowMovePoint[3]][0];
enemyY[3]=enemymove3[nowMovePoint[3]][1];

}

function enemy_circle(){
  let rotate;
  if(nowMovePoint[0]===false){
    rotate=circle_goal(2);
    enemy_image(enemyX[2],enemyY[2],rotate,2);
    circle_turn(2);
  }
 
if(nowMovePoint[1]===false){
  rotate=circle_goal(3);
  enemy_image(enemyX[3],enemyY[3],rotate,3);
  circle_turn(3);
}
}




function circle_goal(i){
  let move=1;
  let rotate=0;
  let sX,sY;
  let x=enemyX[i];
  let y=enemyY[i];
  if(i===2){
    sX=enemymove2[nowMovePoint[2]][0];
    sY=enemymove2[nowMovePoint[2]][1];
  }
 if(i===3){
  sX=enemymove3[nowMovePoint[3]][0];
  sY=enemymove3[nowMovePoint[3]][1];
 }
  
 
  if(x>sX&&y>sY){
  enemyX[i]-=move;
  enemyY[i]-=move;
  rotate=5;
  if(x<=sX&&y<=sY){
    enemyX[i]=sX;
  enemyY[i]=sY;
  }
  }//좌측상단 이동
  else if(x<sX&&y>sY){
    enemyX[i]+=move;
  enemyY[i]-=move;
  rotate=7;
  if(x>=sX&&y<=sY){
    enemyX[i]=sX;
  enemyY[i]=sY;
  }
  }//우측상단
  else if(x>sX&&y<sY){
    enemyX[i]-=move;
  enemyY[i]+=move;
  rotate=3;
  if(x<=sX&&y>=sY){
    enemyX[i]=sX;
  enemyY[i]=sY;
  }
  }//좌측하단
  else if(x<sX&&y<sY){
    enemyX[i]+=move;
  enemyY[i]+=move;
  rotate=1;
  if(x>=sX&&y>=sY){
    enemyX[i]=sX;
  enemyY[i]=sY;
  }
  }//우측하단
  else if(x===sX){
    if(y>sY){
      enemyY[i]-=move;
      rotate=6;
      if(enemyY[i]<=sY){
      enemyY[i]=sY;
      }
    }
    else{
      enemyY[i]+=move;
      rotate=2;
      if(enemyY[i]>=sY){
      enemyY[i]=sY;
      }
    }
  }
  else if(y===sY){
    if(x>sX){
      enemyX[i]-=move;
      rotate=4;
      if(enemyX[i]<=sX){
        enemyX[i]=sX;
      }
    }
    else{
      enemyX[i]+=move;
      rotate=0;
      if(enemyX[i]>=sX){
        enemyX[i]=sX;
    }
  }}

return rotate;
}

function findNearSeed(index){

  let seed=[];
  let enemy=[];
  let target;//seed와 가까운 enemy 찾을때 enemy1,2,3,4차례대로 대입하는 변수 
  let ab=0;
  let min;
  for(let i=0;i<12;i++){
    seed[i]=seedX[i]+seedY[i];
  }
  for(let i=0;i<enemyTargetSeed.length;i++){
    enemy[i]=enemyX[i]+enemyY[i];
  }
let n=IsTarget.indexOf(true);
  min=abs(enemy[n]-seed[n]);
  enemyTargetSeed[index]=n;

  target=enemy[index];

 for(let i=0;i<12;i++){
    if(IsTarget[i]===true){
      if(index===1){
        if(enemyTargetSeed[0]===i)
        break;
      }
    ab=abs(target-seed[i]);
    if(ab<min){
      min=ab;
      enemyTargetSeed[index]=i;
    }
 }}
 if(seedX[enemyTargetSeed[0]]<0)
 enemyTargetSeed[0]=IsTarget.indexOf(true);
 if(seedX[enemyTargetSeed[1]]<0)
 enemyTargetSeed[1]=IsTarget.lastIndexOf(true);

  }



function enemy_goal(i,target){
  let move=1;
  let rotate=0;
  let sX=seedX[target];
  let sY=seedY[target];
  let x=enemyX[i];
  let y=enemyY[i];
  if(x>sX&&y>sY){
  enemyX[i]-=move;
  enemyY[i]-=move;
  rotate=5;
  }//좌측상단 이동
  else if(x<sX&&y>sY){
    enemyX[i]+=move;
  enemyY[i]-=move;
  rotate=7;
  }//우측상단
  else if(x>sX&&y<sY){
    enemyX[i]-=move;
  enemyY[i]+=move;
  rotate=3;
  }//좌측하단
  else if(x<sX&&y<sY){
    enemyX[i]+=move;
  enemyY[i]+=move;
  rotate=1;
  }//우측하단
  else if(x===sX){
    if(y>sY){
      enemyY[i]-=move;
      rotate=6;
    }
    else{
      enemyY[i]+=move;
      rotate=2;
    }
  }
  else if(y===sY){
    if(x>sX){
      enemyX[i]-=move;
      rotate=4;
    }
    else{
      enemyX[i]+=move;
      rotate=0;
    }
  }
  if(y===sY&&x===sX){
   enemyEat(i);
  }
enemy_image(enemyX[i],enemyY[i],rotate,i);
}

function enemyEat(i){
  seedX[enemyTargetSeed[i]]=-200;
  seedY[enemyTargetSeed[i]]=-200;
  enemyTargetSeed[i]=false;
  IsTarget[i]=false;
  numOfeaten++;
  findNearSeed(i);
}
//enemy 메인함수 
function enemy_hamster(){
for(let i=0;i<2;i++){
 enemy_goal(i,enemyTargetSeed[i]);
}
enemy_circle();

if(numOfeaten>6){
  reSet_eatenSeed();  
  numOfeaten=0;
}
}



function moveBack_enemy(rotate){

}

function enemy_image(x,y,Rotate,i) {
  let c=255-i*25;
  push();
  translate(x+100, y+100);
  rotate(QUARTER_PI * Rotate);
      tint(c,c,c);
      image(hamE, -100, -100);
  pop();
}

function reSet_eatenSeed(){
  for(let i=0;i<12;i++){
    if(seedX[i]===-200){
      IsTarget[i]=true;
      seedX[i]=int(random(700, width-100));
    seedY[i]=int(random(300,height-100));
    }}
   for(let i =0; i<4;i++){
  findNearSeed(i);
  }
  
}




//마우스클릭관련 함수 
function mouseClicked(){
  switch(nowplaing){
    case 0:
      case 1:
        cilckMain();
        break;
    case 2:
      break;
    case 3:
      cilckGAMEOVER();
      break;
  }
}
function cilckMain(){
  let x=700,y=700,sizew=580,sizeh=200;
 
  // rect(700,700,580,200,50,50);
  // rect(700,950,580,200,50,50);

  if(mouseX>x&&mouseX<x+sizew&&mouseY>y&&mouseY<y+sizeh){
    clickStart=true;
    set_gamestart();
    nowplaing=2;
  }

  if(mouseX>x&&mouseX<x+sizew&&mouseY>y+250&&mouseY<y+sizeh+250){
    if(howtoTrue===false){
      howtoTrue=true;
    }
    else{
      howtoTrue=false;
    }
  }
}

function cilckGAMEOVER(){
  let x=700,y=700,sizew=580,sizeh=200;
 
  // rect(700,700,580,200,50,50);
  // rect(700,950,580,200,50,50);
  

  if(mouseX>x&&mouseX<x+sizew&&mouseY>y&&mouseY<y+sizeh){
    clickStart=true;
    set_gamestart();
    nowplaing=2;
  }

  if(mouseX>x&&mouseX<x+sizew&&mouseY>y+250&&mouseY<y+sizeh+250){
    nowplaing=0;
    set_gamestart();
    mainScreen();
  }
}



//메인함수에 istarget 음수이면 false 검사하는 계속 초기화되는 배열 생성 
//seedtarget 중복값 가지면 플레이어한테 다가가는것도 ㄱㅊ할듯