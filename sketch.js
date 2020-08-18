//Create variables here
var dog, database, stock;

function preload(){
  //load images here
  dogWait_img = loadImage("Dog.png");
  dogHappy_img = loadImage("happydog.png");
}

function setup() {
  createCanvas(500, 500);

  dog = createSprite(width/2, height/2, 30, 30);
  dog.addImage(dogWait_img);
  dog.scale = 0.2;
  
  database = firebase.database();  
}


function draw() {
  background(46, 139, 87);

  textAlign(CENTER);
  textSize(30);
  text ("Stock left to feed : "+stock, width/2, 40);

  if(keyWentDown(UP_ARROW)){
    updateStock(stock);
    dog.addImage(dogHappy_img);
  }
  readStock();

  drawSprites();
  //add styles here
}

function updateStock(stock){
  if(stock <= 0){
    stock = 0;
  }
  else if(stock > 0){
    stock = stock - 1;
  }

  database.ref('/').update({Food: stock})
}

function readStock(){
  var stockRef = database.ref('Food');
  stockRef.on("value", function (data){
    stock = data.val();
  })
}