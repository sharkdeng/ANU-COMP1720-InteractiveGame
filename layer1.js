// common in all layers
var layer1_fish
var layer1_inFishFlag = false;
var layer1_rubbish = []
var layer1_rubbishNo = window.innerWidth*2/100
var layer1_rubbishGroup

var layer1_boat = {}


var layer1_net = {}

var Layer1 = function() {

}

Layer1.prototype.preload = function() {
    // fish
    layer1_fish =  new MySprite(windowWidth/2, windowHeight/2, "assets/fish_1.png")
    layer1_fish.preload()

    // boat
    layer1_boat.img = loadImage("assets/boat.png")
    layer1_boat.x = window.innerWidth/4
    layer1_boat.y = window.innerHeight/1.8

    // rubbish
    for (var i=0; i<layer1_rubbishNo; i++){
        var index = i%6+1 // 6 rubbish kind
        var rubbish = {}
        rubbish.img = loadImage("assets/rubbish"+index+".png")
        rubbish.x = random(window.innerWidth/3, window.innerWidth/3+window.innerWidth/1.55)
        rubbish.y = random(window.innerHeight/1.5, window.innerHeight/1.5+window.innerHeight/5)
        layer1_rubbish.push(rubbish)
    }

    // net
    layer1_net.img = loadImage("assets/net.png")


}

Layer1.prototype.setup = function() {
    layer1_rubbishGroup = new Group()
    // rubbish sprite
    for (var i=0; i<layer1_rubbish.length; i++){
        layer1_rubbish[i].sprite = createSprite(layer1_rubbish[i].x, layer1_rubbish[i].y)
        layer1_rubbish[i].sprite.addImage(layer1_rubbish[i].img)
        layer1_rubbishGroup.add(layer1_rubbish[i].sprite) // add to collider group
    }

    // net sprite
    layer1_net.sprite = createSprite(width/10, height/1.6)
    layer1_net.sprite.addImage(layer1_net.img)
    layer1_net.sprite.mouseActive = true // open mouse interaction
}

/**
 * show content
 * event trigger would be put in sketch.js
 */
Layer1.prototype.draw = function() {
    
    // ribbish (colliders)
    for (var i=0; i<layer1_rubbish.length; i++){
        drawSprite(layer1_rubbish[i].sprite)
    }
    
    // boat
    push()
        imageMode(CENTER, CENTER)
        image(layer1_boat.img, layer1_boat.x, layer1_boat.y)
    pop()

    // fish
    layer1_fish.draw()
    if (layer1_inFishFlag) {
        drawPromptLayer1()
    } 

    // net (collider)
    layer1_net.sprite.overlap(layer1_rubbishGroup, destroyRubbish)

    // dragged the net
    if (layer1_net.sprite.mouseIsOver && mouseIsPressed) {
        layer1_net.sprite.position.x = mouseX
        layer1_net.sprite.position.y = mouseY
    }
    drawSprite(layer1_net.sprite)
    


}

Layer1.prototype.onMouseClicked = function() {
    
    
}

Layer1.prototype.onMousePressed = function() {
    
    
}


Layer1.prototype.onMouseMoved = function() {

    layer1_fish.onMouseMoved(function() {
        layer1_inFishFlag = true
    }, function() {
        layer1_inFishFlag = false
    })
}


Layer1.prototype.onMouseDragged = function() {
    
}


Layer1.prototype.onMouseReleased = function() {
    
}

Layer1.prototype.onKeyPressed = function() {
    
}




/**
 * @author: Limin Deng
 */
function drawPromptLayer1() {
    push()
        // frame
        stroke("purple")
        strokeWeight(5)
        fill("white")
        rect(width/2, height/2.5, width/7, height/8, 10)

        // text
        noStroke()
        fill("red")
        textAlign(CENTER, CENTER)
        textSize(20)
        if (layer1_rubbishNo > 0) {
            text("I'm stuck in rubbish.\nHelp me!", width/1.75, height/2.15)
        } else {
            text("Thank you!\nYou saved me!", width/1.75, height/2.15)
        }
        
    pop()
}


/**
 * callback function for net collide rubbish
 * param names can be ignored
 * @param {*} host 
 * @param {*} guest 
 */
function destroyRubbish(host, guest) {
    guest.remove()
    layer1_rubbishNo -= 1
    if (layer1_rubbishNo < 0) {
        layer1_rubbishNo = 0
    }
}