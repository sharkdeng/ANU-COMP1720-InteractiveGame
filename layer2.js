// common in all layers
var layer2_fish
var layer2_inFishFlag = false
var layer2_rubbish = []
var layer2_rubbishNo = 12

// make the rubbish move in circle
// Reference: https://editor.p5js.org/kjhollen/sketches/ryZBahkKx
var layer2_radius = window.innerWidth/6
var layer2_centerX = 0 
var layer2_centerY = 0
var layer2_speed = 0.05
var layer2_angle = 0


// cannon and layer2_projectile
// Reference: https://editor.p5js.org/pondjames007/sketches/rJ7pDblPz
let layer2_projectile
let layer2_projectiles = [];
let layer2_cannonAngle
let layer2_origin 


var Layer2 = function() {

}

Layer2.prototype.preload = function() {
    // fish
    layer2_fish =  new MySprite(windowWidth/2, windowHeight/2, "assets/fish_2.png")
    layer2_fish.preload()

    layer2_centerX = windowWidth/2
    layer2_centerY = windowHeight/2

    // rubbish
    for (var i=0; i<layer2_rubbishNo; i++) {
        var index = i%6+1
        var rubbish = {}
        // x
        var xx = sin(Math.PI*2*i/layer2_rubbishNo)*layer2_radius 
        myRubbishX = xx + layer2_centerX

        // y
        if (i < layer2_rubbishNo/4 || i >= layer2_rubbishNo*3/4) {
            var yy = Math.sqrt(Math.pow(layer2_radius, 2) - Math.pow(xx, 2))
        } else if (i >= layer2_rubbishNo/4 && i < layer2_rubbishNo*3/4) {
            var yy = -Math.sqrt(Math.pow(layer2_radius, 2) - Math.pow(xx, 2))
        }
        myRubbishY = yy + layer2_centerY


        rubbish = new MySprite(myRubbishX, myRubbishY, "assets/rubbish"+index+".png")
        rubbish.preload() 
        rubbish.disappear = false

        layer2_rubbish.push(rubbish)
    }

}

Layer2.prototype.setup = function() {
    setupCannon()
}

/**
 * show content
 * event trigger would be put in sketch.js
 */
Layer2.prototype.draw = function() {
    layer2_fish.draw()

    if(layer2_inFishFlag) {
        drawPromptLayer2()
    }

    // ribbish (colliders)
    for (var i=0; i<layer2_rubbish.length; i++){
        if (!layer2_rubbish[i].disappear) {
            layer2_rubbish[i].draw()
            layer2_rubbish[i].x = layer2_centerX + layer2_radius*cos(Math.PI*2*i/layer2_rubbishNo+layer2_angle)
            layer2_rubbish[i].y = layer2_centerY + layer2_radius*sin(Math.PI*2*i/layer2_rubbishNo+layer2_angle)
        }
        
    }
    layer2_angle += layer2_speed



    drawProjectiles()
    drawCannon()
    

    
}

Layer2.prototype.onMouseClicked = function() {
    
}

Layer2.prototype.onMousePressed = function() {
    
}


Layer2.prototype.onMouseMoved = function() {

    layer2_fish.onMouseMoved(function() {
        layer2_inFishFlag = true
    }, function() {
        layer2_inFishFlag = false
    })
    
}


Layer2.prototype.onMouseDragged = function() {
    
}


Layer2.prototype.onMouseReleased = function() {
    
}


Layer2.prototype.onKeyPressed = function() {

    /**
     * Reference: https://editor.p5js.org/pondjames007/sketches/rJ7pDblPz
     */
    if(key == ' '){
        // 1 - vector
        let fire = p5.Vector.fromAngle(layer2_cannonAngle); // direction
        fire.setMag(12); // vector length

        // a new layer2_projectile
        layer2_projectile = new Projectile(layer2_origin.x, layer2_origin.y-10)
        // move
        layer2_projectile.applyForce(fire);
        // add to the array
        layer2_projectiles.push(layer2_projectile);
    }


}





/**
 * @author: Limin Deng
 */
function drawPromptLayer2() {
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
        if (layer2_rubbishNo > 0) {
            text("I want to see the sunlight\nBut too much rubbish...", width/1.82, height/2.35)
        } else {
            text("Wish satisfied!", width/1.85, height/2.35)
        }
        
    pop()
}




/**
 * Reference: https://editor.p5js.org/pondjames007/sketches/rJ7pDblPz
 */
function setupCannon() {
    // set these variables
  layer2_cannonAngle = -PI/4;
  layer2_origin = createVector(width/30, height/2.8+height/20);

}

/**
 * Reference: https://editor.p5js.org/pondjames007/sketches/rJ7pDblPz
 */
function drawProjectiles() {
    //draw Projectiles
    for(let i in layer2_projectiles){
        let dist = p5.Vector.sub(layer2_origin, layer2_projectiles[i].pos);

        // vector length
        if(dist.magSq() > 50*50){
            layer2_projectiles[i].fire = true;
            layer2_projectiles[i].applyGravity();
        }
        layer2_projectiles[i].update();
        layer2_projectiles[i].draw();
        layer2_projectiles[i].overlap(layer2_rubbish)

        // move from the arrray
        if(layer2_projectiles[i].pos.y > height+200){
            layer2_projectiles.splice(i, 1);
        }
    }

}


/**
 * Reference: https://editor.p5js.org/pondjames007/sketches/rJ7pDblPz
 */
function drawCannon() {
    //draw Cannon
    push()
        stroke(0);
        fill(0);
        // base
        rect(0, height/3, width/80, height/7)
        // support
        fill("gray")
        triangle(width/80, height/2.8, 
                width/30, height/2.8+height/20, 
                width/80, height/2.8+height/10)
        // head
        fill(0)
        translate(layer2_origin.x, layer2_origin.y);
        rotate(layer2_cannonAngle);
        rect(0, 0, 80, -20);
    pop()

    if(keyIsDown(UP_ARROW)){
        layer2_cannonAngle -= 0.1;
    }
    else if(keyIsDown(DOWN_ARROW)){
        layer2_cannonAngle += 0.1;
    }
    layer2_cannonAngle = constrain(layer2_cannonAngle, -PI, 0);

}




/**
 * Reference: https://editor.p5js.org/pondjames007/sketches/rJ7pDblPz
 */
class Projectile{
    constructor(x, y){
        this.pos = createVector(x, y);
        this.vel = createVector();
        this.acc = createVector();
        this.radius = 10

        // for overlap
        this.x = this.pos.x
        this.y = this.pos.y
        this.width = this.radius*2
        this.height = this.radius*2
    }

    draw(){
        push()
            stroke(0);
            fill("red");
            translate(this.pos.x, this.pos.y);
            ellipse(0, 0, this.radius*2);
        pop()
    }

    update(){
        // velocity is affected by the acceleration
        this.vel.add(this.acc);
        // position is affected by the velocity
        this.pos.add(this.vel);
        // reset acceleration to 0
        this.acc.mult(0);

        // update 
        this.x = this.pos.x 
        this.y = this.pos.y
    }

    applyGravity(){
        this.acc.add(0, 0.2);
    }

    applyForce(force){
        this.acc.add(force.div(this.mass));
    }

    overlap(otherGroup){
        // because it is a group
        for (var i=0; i<otherGroup.length; i++){
            var other = otherGroup[i]

            if (this.x < other.x + other.width &&
                this.x + this.width > other.x &&
                this.y < other.y + other.height &&
                this.y + this.height > other.y) {
                    other.disappear = true
        
                    // remove the item
                    layer2_rubbish = layer2_rubbish.filter(function(value, index, arr){
                        return value != other
                    });
        
                    layer2_rubbishNo = layer2_rubbish.length
             }
        }
    }
}

