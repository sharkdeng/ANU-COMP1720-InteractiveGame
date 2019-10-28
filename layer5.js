// common in all layers
var layer5_fish
var layer5_inFishFlag = false
var layer5_rubbish = []
var layer5_rubbishNo = 6

var iron

var Layer5 = function() {

}

Layer5.prototype.preload = function() {
    layer5_fish =  new MySprite(windowWidth/5, windowHeight/2, "assets/fish_5.png")
    layer5_fish.preload()

    // rubbish parameters
    for (var i=0; i<layer5_rubbishNo; i++) { 
        var index = i%6+1
        var rubbish = {}
        var x = windowWidth/3 + windowWidth/10*i
        var y =  windowHeight/3 + windowHeight/10*i
        rubbish = new MySprite(x, y, "assets/rubbish"+index+".png")
        rubbish.preload()
        rubbish.disappear = false
        layer5_rubbish.push(rubbish)
    }

}

Layer5.prototype.setup = function() {

    iron = new Iron()
}

/**
 * show content
 * event trigger would be put in sketch.js
 */
Layer5.prototype.draw = function() {
    layer5_fish.draw()


    // ribbish (colliders)
    let vol = mic.getLevel(); // [0, 1]
    let h = map(vol, 0, 1, 0, height*amplifier);
    for (var i=0; i<layer5_rubbish.length; i++){
        if (!layer5_rubbish[i].disappear) {
            layer5_rubbish[i].draw()
            layer5_rubbish[i].y = windowHeight/3 + windowHeight/10*i - h //
        }
        iron.overlap(layer5_rubbish[i]) // collide detection
    }

    if(layer5_inFishFlag) {
        drawPromptLayer5()
    }


    // iron
    iron.draw()
    
}

Layer5.prototype.onMouseClicked = function() {
    iron.onMouseClicked()
}

Layer5.prototype.onMousePressed = function() {
    
}


Layer5.prototype.onMouseMoved = function() {

    layer5_fish.onMouseMoved(function() {
        layer5_inFishFlag = true
    }, function() {
        layer5_inFishFlag = false
    })
    
}


Layer5.prototype.onMouseDragged = function() {
    
}


Layer5.prototype.onMouseReleased = function() {
    
}

Layer5.prototype.onKeyPressed = function() {
    
}




/**
 * @author: Limin Deng
 */
function drawPromptLayer5() {
    push()
        // frame
        stroke("yellow")
        strokeWeight(5)
        fill("white")
        rect(width/9, height/2.8, width/6, height/8, 10)

        // text
        noStroke()
        fill("red")
        textAlign(CENTER, CENTER)
        textSize(20)
        if (layer5_rubbishNo > 0) {
            text("Rubbish will hurt my friends\nI need to do something...", width/5.3, height/2.35)
        } else {
            text("Relieved!", width/5.3, height/2.35)
        }  
    pop()
}







/**
 * @author: Limin Deng
 */
var Iron = function() {
    this.clicked = false
    this.x = width/15 
    this.y = height/5
    this.width = width/10
    this.height = height/25
    this.sprite
}


Iron.prototype.draw = function() {
    push()
        rectMode(CENTER)
        fill(0)
        if (this.clicked) {
            this.x = mouseX 
            rect(this.x, this.y, this.width, this.height, 5)
        } else {
            this.x = width/15 + sin(frameCount*0.01)*width/20 // swim
            rect(this.x, this.y, this.width, this.height, 5)
        }
        
    pop()
}

Iron.prototype.onMouseClicked = function() {
    // in correct layer
    if (layerNo == 5 ) {
        // within the bound
        if (mouseX >= this.x &&
            mouseX <= this.x + this.width &&
            mouseY >= this.y &&
            mouseY <= this.y + this.height){
                this.clicked = !this.clicked
        }
    }
    
}

Iron.prototype.overlap = function(other, callback) {

    // 2D detection
    // Reference: https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection
    if (this.x < other.x + other.width &&
        this.x + this.width > other.x &&
        this.y < other.y + other.height &&
        this.y + this.height > other.y) {
            other.disappear = true

            // remove the item
            layer5_rubbish = layer5_rubbish.filter(function(value, index, arr){
                return value != other
            });

            layer5_rubbishNo = layer5_rubbish.length
     }




    if (callback != null) { callback() }

}