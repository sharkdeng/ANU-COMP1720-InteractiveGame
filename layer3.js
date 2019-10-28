// common in all layers
var layer3_fish
var layer3_inFishFlag = false
var layer3_rubbish = []
var layer3_rubbishNo = 36

var layer3_food


var Layer3 = function() {

}

Layer3.prototype.preload = function() {
    layer3_fish =  new MySprite(windowWidth/5, windowHeight/2.3, "assets/fish_3.png")
    layer3_fish.preload()

    // rubbish
    for (var j=0; j<4; j++){ // layers
        for (var i=0; i<12-j*2; i++) { // each layer
            var index = i%6+1
            var rubbish = {}
            rubbish.img = loadImage("assets/rubbish"+index+".png")
            rubbish.x = windowWidth - windowWidth/20*i // bias + block width
            rubbish.y = windowHeight/1.3 - windowHeight/6*j // parameters are adjusted by effect
            // sprite group
            layer3_rubbish.push(rubbish)
        }
    }

    layer3_food = loadImage("assets/fish_food.png")
   

}

Layer3.prototype.setup = function() {

    // rubbish sprite
    for (var i=0; i<layer3_rubbish.length; i++){
        layer3_rubbish[i].sprite = createSprite(layer3_rubbish[i].x, layer3_rubbish[i].y)
        layer3_rubbish[i].sprite.addImage(layer3_rubbish[i].img)
        layer3_rubbish[i].sprite.onMouseOver = removeAndShowFood;
    }
    
}

/**
 * show content
 * event trigger would be put in sketch.js
 */
Layer3.prototype.draw = function() {
    layer3_fish.draw()

    if(layer3_inFishFlag) {
        drawPromptLayer3()
    }

    // ribbish (colliders)
    for (var i=0; i<layer3_rubbish.length; i++){
        drawSprite(layer3_rubbish[i].sprite)
    }

    // show food
    if (layer3_rubbishNo <= 0) {
        drawFood()
    }


    
}

Layer3.prototype.onMouseClicked = function() {
    
}

Layer3.prototype.onMousePressed = function() {
    
}


Layer3.prototype.onMouseMoved = function() {

    layer3_fish.onMouseMoved(function() {
        layer3_inFishFlag = true
    }, function() {
        layer3_inFishFlag = false
    })
    
}


Layer3.prototype.onMouseDragged = function() {
    
}


Layer3.prototype.onMouseReleased = function() {
    
}

Layer3.prototype.onKeyPressed = function() {
    
}








/**
 * @author: Limin Deng
 */
function drawPromptLayer3() {
    push()
        // frame
        stroke("yellow")
        strokeWeight(5)
        fill("white")
        rect(width/4, height/4, width/6, height/8, 10)

        // text
        noStroke()
        fill("red")
        textAlign(CENTER, CENTER)
        textSize(20)
        if (layer3_rubbishNo > 0) {
            text("I am hungry...", width/3, height/3.3)
        } else {
            text("Wow! Yummy food again!", width/3, height/3.2)
        }
        
    pop()
}



/**
 * @author: Limin Deng
 */
function removeAndShowFood(){
    if (layerNo==3) { // to avoid be affected by other layers
        this.remove()
        layer3_rubbishNo -= 1
        if (layer3_rubbishNo < 0) {
            layer3_rubbishNo = 0
        }
    }
    
}


/**
 * @author: Limin Deng
 */
function drawFood(){
    image(layer3_food, width/1.5, height/2)
}