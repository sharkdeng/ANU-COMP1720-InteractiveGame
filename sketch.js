


// 1 start page
// 2 catch fish 
var sceneNo = 1;

// scenes
var scene1;
var scene2;
var scene3;
var scene4;


// drawFishCount()
var params = {
  dumpLocationX: 200,
  dumpLocationY: 300,
  rubbishNo: 20,
  fishCount: 6*8*8,
  boatLifespan: 400
}
var fishKind = 6;

// audio
let mic
var amplifier = 30



/**
 * the function will only execute once
 * @author: Limin Deng
 */
function preload() {
  // load any assets (images, sounds etc.) here

  scene1 = new Scene1();
  scene1.preload()
  scene2 = new Scene2();
  scene2.preload()
  scene3 = new Scene3();
  scene3.preload()
  scene4 = new Scene4();
  scene4.preload()

}




/**
 * the function will only execute once globally
 * @author: Limin Deng
 */
function setup() {

  // background
  createCanvas(windowWidth, windowHeight);

  scene1.setup()
  scene2.setup()
  scene3.setup()
  scene4.setup()
  
  setupAudio()

}



/**
 * global loop
 * @author: Limin Deng
 */
function draw() {
  // put drawing code here

  if (sceneNo == 1) {
    scene1.draw()

  } else if (sceneNo == 2) {
    scene2.draw()

  } else if (sceneNo == 3) {
    scene3.draw()

  } else if (sceneNo == 4) {
    scene4.draw()
  }

}





/**
 * global framework
 */
function mouseClicked(){ 

  if (sceneNo == 1) {
    scene1.onMouseClicked()

  } else if (sceneNo == 2) {
    scene2.onMouseClicked()

  } else if (sceneNo == 3) {
    scene3.onMouseClicked()

  } else if (sceneNo == 4) {
    scene4.onMouseClicked()
  }
  
} 
 
 

/**
 * global 
 */
function mousePressed(){ 
  if (sceneNo == 1) {
    scene1.onMousePressed()

  } else if (sceneNo == 2) {
    scene2.onMousePressed()

  } else if (sceneNo == 3) {
    scene3.onMousePressed()

  } else if (sceneNo == 4) {
    scene4.onMousePressed()
  }
 
} 


 
/**
 * global
 */
function mouseReleased(){ 

} 


/**
 * global 
 */
function mouseMoved() {
  if (sceneNo == 1) {
    scene1.onMouseMoved()

  } else if (sceneNo == 2) {
    scene2.onMouseMoved()

  } else if (sceneNo == 3) {
    scene3.onMouseMoved()

  } else if (sceneNo == 4) {
    scene4.onMouseMoved()
  }
  
}






/**
 * global framework
 * @author: Limin Deng
 */
function mouseDragged() {
  if (sceneNo == 4) {
    scene4.onMouseDragged()
  }
}


/**
 * global framework
 * @author: Limin Deng
 */
function keyPressed() {
  if (sceneNo == 1) {
    scene1.onKeyPressed()

  } else if (sceneNo == 2) {
    scene2.onKeyPressed()

  } else if (sceneNo == 3) {
    scene3.onKeyPressed()

  } else if (sceneNo == 4) {
    scene4.onMouseMoved()
  }

  if (key == '1'){
    saveCanvas("thumbnail.png")
  }
}



/**
 * draw the indicator of fish count
 * @author: Limin Deng
 */
function drawFishCount(fishNumber) {
  push()
    fill(255)
    textSize(20)
    if (fishNumber != null) {
      text("Fish Count " + fishNumber, width/2+120, height-25)
    } else {
      text("Fish Count "+`${params.fishCount}`, width/2+120, height-25)
    }
    
  pop()
  // bg
  push()
    noStroke()
    fill(color(255))
    rect(width/2-200, height-50, 300, 30, 50)
  pop()

 
  // indicator
  push()
    translate(width/2-200, height-50)
    if (fishNumber != null) {
      scale(map(fishNumber, 0, fishKind*8*8, 0, 1), 1)
    } else {
      scale(map(params.fishCount, 0, fishKind*8*8, 0, 1), 1)
    }
    
    fill(color(0, 255, 0))
    noStroke()
    rect(0, 0, 300, 30, 50) // the location would be zero
  pop()

   // frame
   push()
   noFill()
   strokeWeight(10)
   stroke(color(255, 0, 0))
   rect(width/2-200, height-50, 300, 30, 50)
 pop()
}



/**
 * scene1 and scene3-layer5 needs audio
 * Reference: https://editor.p5js.org/p5/sketches/Sound:_Live_Input
 */
function setupAudio(){

  // Create an Audio input
  mic = new p5.AudioIn();
  // start the Audio Input.
  // By default, it does not .connect() (to the computer speakers)
  mic.start(); 
}


