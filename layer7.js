// common in all layers
var layer7_fish
var layer7_inFishFlag = false
var layer7_rubbish = []
var layer7_rubbishNo = 30


var layer7_fan = {}



var Layer7 = function() {

}

Layer7.prototype.preload = function() {
    layer7_fish =  new MySprite(windowWidth/2, windowHeight/2, "assets/fish_7.png")
    layer7_fish.preload()

    // rubbish
    for (var i=0; i<layer7_rubbishNo; i++) { 
        var index = i%6+1
        var rubbish = {}
        rubbish.img = loadImage("assets/rubbish"+index+".png")
        rubbish.x = random(windowWidth/4, windowWidth)
        rubbish.y = random(windowHeight/5, windowHeight/1.2)
        // sprite group
        layer7_rubbish.push(rubbish)
    }

    layer7_fan.img = loadImage("assets/fan.png")
}

Layer7.prototype.setup = function() {

    // rubbish sprite
    layer7_rubbishGroup = new Group()
    for (var i=0; i<layer7_rubbish.length; i++){
        layer7_rubbish[i].sprite = createSprite(layer7_rubbish[i].x, layer7_rubbish[i].y)
        layer7_rubbish[i].sprite.addImage(layer7_rubbish[i].img)
        layer7_rubbishGroup.add(layer7_rubbish[i].sprite) // add to collider group
    }
    

    // fan 
    layer7_fan.sprite = createSprite(width/10, height/3)
    layer7_fan.sprite.addImage(layer7_fan.img)
    layer7_fan.sprite.mouseActive = true
}

/**
 * show content
 * event trigger would be put in sketch.js
 */
Layer7.prototype.draw = function() {
    
    // ribbish (colliders)
    for (var i=0; i<layer7_rubbish.length; i++){
        drawSprite(layer7_rubbish[i].sprite)
    }
    
    // fan
    drawSprite(layer7_fan.sprite)
    if (layer7_fan.sprite.mouseIsOver && mouseIsPressed) {
        layer7_fan.sprite.rotation += 8;
        layer7_rubbish.splice(0, 1); //make rubbish become smaller every time

        layer7_rubbishNo = layer7_rubbish.length
    }

    layer7_fish.draw()

    if(layer7_inFishFlag) {
        drawPromptLayer7()
    }
}

Layer7.prototype.onMouseClicked = function() {
    
}

Layer7.prototype.onMousePressed = function() {
    
}


Layer7.prototype.onMouseMoved = function() {

    layer7_fish.onMouseMoved(function() {
        layer7_inFishFlag = true
    }, function() {
        layer7_inFishFlag = false
    })
    
}


Layer7.prototype.onMouseDragged = function() {
    
}


Layer7.prototype.onMouseReleased = function() {
    
}

Layer7.prototype.onKeyPressed = function() {
    
}




/**
 * @author: Limin Deng
 */
function drawPromptLayer7() {
    push()
        // frame
        stroke("yellow")
        strokeWeight(5)
        fill("white")
        rect(width/2.15, height/2.8, width/6, height/8, 10)

        // text
        noStroke()
        fill("red")
        textAlign(CENTER, CENTER)
        textSize(20)
        if (layer7_rubbishNo > 0) {
            text("The water is too dirty...", width/1.82, height/2.35)
        } else {
            text("Fresh and happy!", width/1.85, height/2.35)
        }
        
    pop()
}

