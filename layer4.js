

// common in all layers
var layer4_fish
var layer4_inFishFlag = false
var layer4_rubbish = []
var layer4_rubbishNo = 30

var layer4_bin = {}

// nose detect
let capture
let poseNet
let noseX = 0
let noseY = 0
var layer4_openCamera = true


var Layer4 = function() {

}


/**
 * in preload, windowWidth & windowHeight(p5) are avaiable
 * in outside variable, window.innerWidth is avaiable(javascript built in)
 */
Layer4.prototype.preload = function() {
    layer4_fish =  new MySprite(windowWidth/1.5, windowHeight/1.5, "assets/fish_4.png")
    layer4_fish.preload()

     // rubbish
    for (var i=0; i<layer4_rubbishNo; i++) { 
        var index = i%6+1
        var rubbish = {}
        rubbish.img = loadImage("assets/rubbish"+index+".png")
        rubbish.x = random(windowWidth/10, windowWidth-300)
        rubbish.y = random(windowHeight/5, windowHeight/1.2)
        // sprite group
        layer4_rubbish.push(rubbish)
    }

    layer4_bin.img = loadImage("assets/bin.png")
}

Layer4.prototype.setup = function() {

    // rubbish sprite
    layer4_rubbishGroup = new Group()
    for (var i=0; i<layer4_rubbish.length; i++){
        layer4_rubbish[i].sprite = createSprite(layer4_rubbish[i].x, layer4_rubbish[i].y)
        layer4_rubbish[i].sprite.addImage(layer4_rubbish[i].img)
        layer4_rubbishGroup.add(layer4_rubbish[i].sprite) // add to collider group
    }
    
    // bin
    layer4_bin.sprite = createSprite(noseX, noseY)
    layer4_bin.sprite.addImage(layer4_bin.img)
    setupPoseNet()
}

/**
 * show content
 * event trigger would be put in sketch.js
 */
Layer4.prototype.draw = function() {
    
    // ribbish (colliders)
    for (var i=0; i<layer4_rubbish.length; i++){
        drawSprite(layer4_rubbish[i].sprite)
    }

    layer4_fish.draw()

    if(layer4_inFishFlag) {
        drawPromptLayer4()
    }

    // bin
    drawSprite(layer4_bin.sprite)
    layer4_bin.sprite.position.x = width-map(noseX, 0, 300, 0, width)
    layer4_bin.sprite.position.y = map(noseY, 0, 300, 0, height)
    layer4_bin.sprite.overlap(layer4_rubbishGroup, collectRubbish)

    // show camera
    if (layer4_openCamera) {
        image(capture, width-300, height/5)
    }
    
    
}

Layer4.prototype.onMouseClicked = function() {
    
}

Layer4.prototype.onMousePressed = function() {
    
}


Layer4.prototype.onMouseMoved = function() {
    layer4_fish.onMouseMoved(function() {
        layer4_inFishFlag = true
    }, function() {
        layer4_inFishFlag = false
    })
    
}


Layer4.prototype.onMouseDragged = function() {
    
}


Layer4.prototype.onMouseReleased = function() {
    
}

Layer4.prototype.onKeyPressed = function() {

    if (key == " ") {
        layer4_openCamera = !layer4_openCamera
    }
    
    
}




/**
 * @author: Limin Deng
 */
function drawPromptLayer4() {
    push()
        // frame
        stroke("yellow")
        strokeWeight(5)
        fill("white")
        rect(width/1.5, height/2, width/6, height/8, 10)

        // text
        noStroke()
        fill("red")
        textAlign(CENTER, CENTER)
        textSize(20)
        if (layer4_rubbishNo > 0) {
            text("I am afraid.\nWhere are my friends?", width/1.34, height/1.8)
        } else {
            text("They are there!", width/1.35, height/1.8)
        }
        
    pop()
}





// When the model is loaded
function modelReady() {
    console.log("Model Loaded!");
}

/**
 * Available parts are:
0   nose
1	leftEye
2	rightEye
3	leftEar
4	rightEar
5	leftShoulder
6	rightShoulder
7	leftElbow
8	rightElbow
9	leftWrist
10	rightWrist
11	leftHip
12	rightHip
13	leftKnee
14	rightKnee
15	leftAnkle
16	rightAnkle
=== 
*/ 
function gotPoses(results) {
    // do something with the results
    if (results.length > 0) {
        noseX = results[0].pose['nose'].x
        noseY = results[0].pose['nose'].y
    }
}




  
/**
 * 
 */
function setupPoseNet() {
    capture = createCapture(VIDEO);
    capture.size(300, 300)
    
    poseNet = ml5.poseNet(capture, modelReady);
    poseNet.on('pose', gotPoses)

    capture.hide(); // this needs to be put behind poseNet or the capture will be closed
}



/**
 * @author: Limin Deng
 * @param {} player 
 * @param {*} coin 
 */
function collectRubbish(player, coin) {
    coin.remove()
    layer4_rubbishNo -= 1
    if (layer4_rubbishNo < 0){
        layer4_rubbishNo = 0
    }
}