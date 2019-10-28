// common in all layers
var layer6_fish
var layer6_inFishFlag = false
var layer6_rubbish = []
var layer6_rubbishNo = 3
var layer6_inFishFlag = false


var layer6_medicine = {}
var layer6_medicineFlag = false // enable the medicine to move with mouse



var Layer6 = function() {

}

Layer6.prototype.preload = function() {
    layer6_fish =  new MySprite(windowWidth/3, windowHeight/3, "assets/fish_6.png")
    layer6_fish.preload()

    // rubbish
    for (var i=0; i<layer6_rubbishNo; i++) { 
        var index = i%6+1
        var rubbish = {}
        rubbish.img = loadImage("assets/rubbish"+index+".png")
        rubbish.x = windowWidth/3+windowWidth/20*(i+1)
        rubbish.y = windowHeight/2.5
        // sprite group
        layer6_rubbish.push(rubbish)
    }

    layer6_medicine.img = loadImage("assets/plus.png")
}

Layer6.prototype.setup = function() {

    // rubbish sprite
    layer6_rubbishGroup = new Group()
    for (var i=0; i<layer6_rubbish.length; i++){
        layer6_rubbish[i].sprite = createSprite(layer6_rubbish[i].x, layer6_rubbish[i].y)
        layer6_rubbish[i].sprite.addImage(layer6_rubbish[i].img)
        layer6_rubbishGroup.add(layer6_rubbish[i].sprite) // add to collider group
    }

    // medicine
    layer6_medicine.sprite = createSprite(windowWidth/1.5, height/2)
    layer6_medicine.sprite.addImage(layer6_medicine.img)
    
}

/**
 * show content
 * event trigger would be put in sketch.js
 */
Layer6.prototype.draw = function() {
    layer6_fish.draw()

    // ribbish (colliders)
    for (var i=0; i<layer6_rubbish.length; i++){
        drawSprite(layer6_rubbish[i].sprite)
        layer6_medicine.sprite.displace(layer6_rubbish[i].sprite)

        // the rubbish is moved out of boundry
        if (layer6_rubbish[i].sprite.position.x < 0 ||
            layer6_rubbish[i].sprite.position.x > width ||
            layer6_rubbish[i].sprite.position.y < 0 ||
            layer6_rubbish[i].sprite.position.y > height) {

            // remove the item
            layer6_rubbish = layer6_rubbish.filter(function(value, index, arr){
                return value != layer6_rubbish[i]
            });

            layer6_rubbishNo = layer6_rubbish.length

        }
        
    }

    // prompt
    if (layer6_inFishFlag) {
        drawPromptLayer6()
    } 

    // medicine
    drawSprite(layer6_medicine.sprite)
    if (layer6_medicineFlag) {
        layer6_medicine.sprite.position.x = mouseX 
        layer6_medicine.sprite.position.y = mouseY 
    } else {
        layer6_medicine.sprite.position.x = width/1.5, height/2
        layer6_medicine.sprite.position.y = height/2 
    }

    

}

Layer6.prototype.onMouseClicked = function() {
    
}

Layer6.prototype.onMousePressed = function() {
    
}


Layer6.prototype.onMouseMoved = function() {
    layer6_fish.onMouseMoved(function() {
        layer6_inFishFlag = true
    }, function() {
        layer6_inFishFlag = false
    })
    
}


Layer6.prototype.onMouseDragged = function() {
    
}


Layer6.prototype.onMouseReleased = function() {
    
}

Layer6.prototype.onKeyPressed = function() {
    if (key == ' '){
        layer6_medicineFlag = !layer6_medicineFlag
    }
    
}





/**
 * @author: Limin Deng
 */
function drawPromptLayer6() {
    push()
        // frame
        stroke("brown")
        strokeWeight(5)
        fill("white")
        rect(width/3.9, height/2.8, width/7, height/8, 10)

        // text
        noStroke()
        fill("red")
        textAlign(CENTER, CENTER)
        textSize(20)
        if (layer6_rubbishNo > 0) {
            text("I ate rubbish.\nI feel sick.", width/3, height/2.35)
        } else {
            text("Feel better now!", width/3, height/2.35)
        }
        
    pop()
}



function drawMedicine() {

}