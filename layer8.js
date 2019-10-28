// common in all layers
var layer8_fish
var layer8_inFishFlag = false
var layer8_rubbish = []
var layer8_rubbishNo = window.innerWidth/100

var layer8_light
var layer8_lightFlag = false;

var Layer8 = function() {

}

Layer8.prototype.preload = function() {
    layer8_fish =  new MySprite(windowWidth/2, windowHeight/2, "assets/fish_8.png")
    layer8_fish.preload()


    for (var i=0; i<layer8_rubbishNo; i++){
        var index = i%6+1 // 6 rubbish kind
        layer8_rubbish.push(loadImage("assets/rubbish"+index+".png"))
    }


}

Layer8.prototype.setup = function() {
    layer8_light = new Light() 
}

/**
 * show content
 * event trigger would be put in sketch.js
 */
Layer8.prototype.draw = function() {

    // fish
    layer8_fish.draw()

    drawRubbishLayer8()

    // mouse hover on light
    // or clean all rubbsh 
    if (!layer8_lightFlag && layer8_rubbishNo > 0) {
        drawDark()
    }

    layer8_light.draw()



    
}


Layer8.prototype.onMouseClicked = function() {
    
}

Layer8.prototype.onMousePressed = function() {
}


Layer8.prototype.onMouseMoved = function() {
    layer8_light.onMouseMoved()
    
}


Layer8.prototype.onMouseDragged = function() {
    
}


Layer8.prototype.onMouseReleased = function() {
    
}

Layer8.prototype.onKeyPressed = function() {
    // destroy rubbish
    if (layer8_rubbishNo > 0) {
        var index = random(layer8_rubbishNo)
        layer8_rubbish.splice(index, 1);
        layer8_rubbishNo -= 1
    }
}



/**
 * @author: Limin Deng
 */
function drawDark(){
    push()
        fill(0)
        rect(0, 0, width, height)
    pop()
}


/**
 * @author: Limin Deng
 */
function drawRubbishLayer8() {
    push()
        for(var i=0; i<layer8_rubbish.length; i++) {
            image(layer8_rubbish[i], i*layer8_rubbish[0].width, height/4)
        }
    pop()

}


/**
 * @author: Limin Deng
 * @param {*} x 
 * @param {*} y 
 */
var Light = function(x ,y) {
    this.x = x || width/1.95
    this.y = y || height/1.85
    this.radius = 0
}

Light.prototype.draw = function() {
    push()
        noStroke()
        fill("yellow")
        this.radius = sin(frameCount*0.05)*10+height/30
        circle(this.x, this.y, this.radius)
    pop()
}

Light.prototype.onMouseMoved = function() {
    // whe mouse hover on the light
    if (dist(mouseX, mouseY, this.x, this.y) < this.radius) {
        layer8_lightFlag = true
    } else {
        layer8_lightFlag = false
    }
    
}
