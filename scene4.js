var scene4_btn_save // save sketch
var scene4_btn_fb   // share
var scene4_btn_clear // clear the canvas
var scene4_btn_home // go back to scene4

// painting parameters
var scene4_draw_thick = 10
var scene4_draw_color = 0

var scene4_thick
var scene4_rSlider
var scene4_gSlider
var scene4_bSlider

/**
 * Listening out
 * Draw some words and share to social media
 * @author: Limin Deng
 */
var Scene4 = function() {

}

Scene4.prototype.preload = function() {
    scene4_btn_home = new MySprite(0, 0, "assets/home_normal.png", "assets/home_hover.png", "assets/home_clicked.png")
    scene4_btn_home.preload();
    scene4_btn_home.locate(windowWidth/20, windowHeight/30)

    scene4_btn_save = new MySprite(0, 0, "assets/save_normal.png", "assets/save_hover.png", "assets/save_clicked.png")
    scene4_btn_save.preload();
    scene4_btn_save.locate(windowWidth/9, windowHeight/30)

    scene4_btn_fb = new MySprite(0, 0, "assets/fb_normal.png", "assets/fb_hover.png", "assets/fb_clicked.png")
    scene4_btn_fb.preload();
    scene4_btn_fb.locate(windowWidth/6, windowHeight/30)

    scene4_btn_clear = new MySprite(0, 0, "assets/canvas_clear_normal.png", "assets/canvas_clear_hover.png", "assets/canvas_clear_clicked.png")
    scene4_btn_clear.preload();
    scene4_btn_clear.locate(windowWidth/4.5, windowHeight/30)
    


}

Scene4.prototype.setup = function() {
}

/**
 * show content
 * event trigger would be put in sketch.js
 */
Scene4.prototype.draw = function() {
    drawBg()

    scene4_btn_save.draw()
    scene4_btn_fb.draw()
    scene4_btn_clear.draw()
    scene4_btn_home.draw()

    drawColorParams()
    // drawAd()
    drawPrompt()

}


Scene4.prototype.onMouseClicked = function() {
    scene4_btn_save.onMouseClicked(function() {

    })
    // share to social network
    scene4_btn_fb.onMouseClicked(function() {

    })
    scene4_btn_clear.onMouseClicked(function() {
        clear()
    })
    scene4_btn_home.onMouseClicked(function() {
        clear()

        sceneNo = 3
        scene4_thick.remove()
        scene4_rSlider.remove()
        scene4_gSlider.remove()
        scene4_bSlider.remove()

    })
    
    
}

Scene4.prototype.onMousePressed = function() {
    scene4_btn_save.onMousePressed()
    scene4_btn_fb.onMousePressed()
    scene4_btn_clear.onMousePressed()
    scene4_btn_home.onMousePressed()

    
}


Scene4.prototype.onMouseMoved = function() {
    scene4_btn_save.onMouseMoved()
    scene4_btn_fb.onMouseMoved()
    scene4_btn_clear.onMouseMoved()
    scene4_btn_home.onMouseMoved()
    
}


Scene4.prototype.onMouseDragged = function() {
    push()
        stroke(scene4_rSlider.value(), scene4_gSlider.value(), scene4_bSlider.value())
        strokeWeight(scene4_thick.value())
        line(mouseX, mouseY, pmouseX, pmouseY)
    pop()
}


Scene4.prototype.onMouseReleased = function() {
    
}

Scene4.prototype.onKeyPressed = function() {
    
}



/**
 * @author: Limin Deng
 */
function drawBg() {
    push()
        noFill()
        stroke("orange")
        strokeWeight(height/4)
        line(0, 0, width, 0)
        line(0, 0, 0, height)
        line(width, 0, width, height)
        strokeWeight(height/8)
        line(0, height, width, height)
    pop()
}







/**
 * @author: Limin Deng
 */
function setupColorParams() {
    scene4_thick = createSlider(2, 10, 2); 
    scene4_thick.position(width/2, height/20);
    scene4_rSlider = createSlider(0, 255, 100); 
    scene4_rSlider.position(scene4_thick.x + scene4_thick.width + height/20, height/20);
    scene4_gSlider = createSlider(0, 255, 0);
    scene4_gSlider.position(scene4_rSlider.x + scene4_rSlider.width + height/20, height/20);
    scene4_bSlider = createSlider(0, 255, 255);
    scene4_bSlider.position(scene4_gSlider.x + scene4_gSlider.width + height/20, height/20);
}

/**
 * Limin Deng
 */
function drawColorParams(){
    push()
    const r = scene4_rSlider.value();
    const g = scene4_gSlider.value();
    const b = scene4_bSlider.value();
    textAlign(CENTER, CENTER)
    text('thickness: '+ `${scene4_thick.value()}`, scene4_thick.x+scene4_thick.width/2, height/10);
    text('red', scene4_rSlider.x+scene4_rSlider.width/2, height/10);
    text('green', scene4_gSlider.x+scene4_gSlider.width/2, height/10);
    text('blue', scene4_bSlider.x+scene4_bSlider.width/2, height/10);
    pop()

    push()
        noStroke()
        fill(r, g, b)
        rect(scene4_bSlider.x + scene4_bSlider.width + height/20, height/30, height/20, height/20)
    pop()
}


/**
 * @author: Limin Deng
 */
function drawAd() {
    push()
        textAlign(CENTER, CENTER)
        text("Tutehub: Online AI Education Platform\nhttp://www.boygirl88.com", width/10, height/1.03)
    pop()
}

function drawPrompt() {

}