var scene3_btn_prev

var scene3_btn_up
var scene3_btn_down
var scene3_btn_info 
var scene3_infoFlag = false;
var scene3_btn_canvas


var btn_refresh

// bg
var scene3_ocean

// dead fish
var scene4_deadFish

// layers
var layerNo = 1
var layer1;
var layer2;
var layer3;
var layer4;
var layer5;
var layer6;
var layer7;
var layer8;

// to seperate fish in layers and in task bar
var layer_fishes = []


var Scene3 = function() {

}

Scene3.prototype.preload = function() {
    scene3_btn_prev = new MySprite(0, 0, "assets/btn_normal.png", "assets/btn_hover.png", "assets/btn_clicked.png")
    scene3_btn_prev.preload();
    scene3_btn_prev.locate(windowWidth/20, windowHeight/2+200)

    scene3_ocean = loadImage("assets/ocean.png");
    scene3_ocean.sound = loadSound("assets/s_ocean.wav")

    scene4_deadFish = loadImage("assets/fish_d.png")

    scene3_btn_up = new MySprite(0, 0, "assets/up_normal.png", "assets/up_hover.png", "assets/up_clicked.png", "assets/up_disabled.png")
    scene3_btn_up.preload();
    scene3_btn_up.locate(windowWidth/20, windowHeight/20)

    scene3_btn_down = new MySprite(0, 0, "assets/down_normal.png", "assets/down_hover.png", "assets/down_clicked.png", "assets/down_disabled.png")
    scene3_btn_down.preload();
    scene3_btn_down.locate(windowWidth/9, windowHeight/20)
  
    scene3_btn_info = new MySprite(0, 0, "assets/info_normal.png", "assets/info_hover.png", "assets/info_clicked.png", "assets/info_disabled.png")
    scene3_btn_info.preload();
    scene3_btn_info.locate(windowWidth/6, windowHeight/20)

    scene3_btn_canvas = new MySprite(0, 0, "assets/canvas_normal.png", "assets/canvas_hover.png", "assets/canvas_clicked.png", "assets/canvas_disabled.png")
    scene3_btn_canvas.preload();
    scene3_btn_canvas.locate(windowWidth/4.5, windowHeight/20)
    scene3_btn_canvas.disableFlag = true // set initial value


    
    layer1 = new Layer1();
    layer1.preload()
    layer2 = new Layer2();
    layer2.preload()
    layer3 = new Layer3();
    layer3.preload()
    layer4 = new Layer4();
    layer4.preload()
    layer5 = new Layer5();
    layer5.preload()
    layer6 = new Layer6();
    layer6.preload()
    layer7 = new Layer7();
    layer7.preload()
    layer8 = new Layer8();
    layer8.preload()


    // images for task bar
    for (var i=0; i<8; i++) {
        layer_fishes.push(loadImage("assets/fish_"+(i+1)+".png"))
    }

}

Scene3.prototype.setup = function() {
    layer1.setup()
    layer2.setup()
    layer3.setup()
    layer4.setup()
    layer5.setup()
    layer6.setup()
    layer7.setup()
    layer8.setup()
}


Scene3.prototype.draw = function() {
    // bg
    drawOceanBg()

    timeIndicator(1919)
    scene3_btn_prev.draw()
    btnText(windowWidth/16, windowHeight/1.17, "To 2019")

    
    drawFishCount()

    // buttons
    // up
    if (layerNo == 1){
        scene3_btn_up.disableFlag = true
    } else{
        scene3_btn_up.disableFlag = false
    }
    scene3_btn_up.draw()

    // down
    if (layerNo == 8){
        scene3_btn_down.disableFlag = true
    } else{
        scene3_btn_down.disableFlag = false
    }
    scene3_btn_down.draw()

    // all tasks are completed
    // then for listening out
    // to draw down your feeling
    if (layer1_rubbishNo <= 0 &&
        layer2_rubbishNo <= 0 &&
        layer3_rubbishNo <= 0 &&
        layer4_rubbishNo <= 0 &&
        layer5_rubbishNo <= 0 &&
        layer6_rubbishNo <= 0 &&
        layer7_rubbishNo <= 0 &&
        layer8_rubbishNo <= 0
    ) {
        scene3_btn_canvas.disableFlag = false
    } else {
        scene3_btn_canvas.disableFlag = true
    }
    scene3_btn_canvas.draw()
    

    
    drawTaskIndicator()

    

    // layers 
    if (layerNo == 1) {
        layer1.draw()

    } else if (layerNo == 2) {
        layer2.draw()

    } else if (layerNo == 3) {
        layer3.draw()

    } else if (layerNo == 4) {
        layer4.draw()

    } else if (layerNo == 5) {
        layer5.draw()

    } else if (layerNo == 6) {
        layer6.draw()

    } else if (layerNo == 7) {
        layer7.draw()

    } else if (layerNo == 8) {
        layer8.draw()

    } 


     // info
     scene3_btn_info.draw()
     if (scene3_infoFlag){
         drawInfoScene()
     } 
}


Scene3.prototype.onMouseClicked = function() {
    scene3_btn_prev.onMouseClicked(function() {
        clear()
        sceneNo = 2
        toggleScene3BgMusic() // stop current
        toggleScene2BgMusic() // start previous
    })

    scene3_btn_up.onMouseClicked(function() {
        layerNo -= 1
        if (layerNo < 1) {
            layerNo = 1
        }
    })
    scene3_btn_down.onMouseClicked(function() {
        layerNo += 1
        if (layerNo > 8) {
            layerNo = 8
        }
    })
    scene3_btn_info.onMouseClicked(function(){
        scene3_infoFlag = !scene3_infoFlag
    })

    // to canvas scene
    scene3_btn_canvas.onMouseClicked(function() {
        clear() // clear current content

        // to canvas
        sceneNo = 4 
        setupColorParams()
    })

    
     if (layerNo == 1) {
      layer1.onMouseClicked()
    } else if (layerNo == 2) {
      layer2.onMouseClicked()
    } else if (layerNo == 3) {
      layer3.onMouseClicked()
    } else if (layerNo == 4) {
      layer4.onMouseClicked()
    } else if (layerNo == 5) {
      layer5.onMouseClicked()
    } else if (layerNo == 6) {
      layer6.onMouseClicked()
    } else if (layerNo == 7) {
      layer7.onMouseClicked()
    } else if (layerNo == 8) {
      layer8.onMouseClicked()
    }
    
}

Scene3.prototype.onMousePressed = function() {
    scene3_btn_prev.onMousePressed()

    scene3_btn_up.onMousePressed()
    scene3_btn_down.onMousePressed()
    scene3_btn_info.onMousePressed()
    scene3_btn_canvas.onMousePressed()
    

    // if (layerNo == 1) {
    //     layer1.onMousePressed()
    // } else if (layerNo == 2) {
    //     layer2.onMousePressed()
    // } else if (layerNo == 3) {
    //     layer3.onMousePressed()
    // } else if (layerNo == 4) {
    //     layer4.onMousePressed()
    // } else if (layerNo == 5) {
    //     layer5.onMousePressed()
    // } else if (layerNo == 6) {
    //     layer6.onMousePressed()
    // } else if (layerNo == 7) {
    //     layer7.onMousePressed()
    // } else if (layerNo == 8) {
    //     layer8.onMousePressed()
    // }

}

Scene3.prototype.onMouseReleased = function() {

}

Scene3.prototype.onMouseMoved = function() {
    scene3_btn_prev.onMouseMoved()

    scene3_btn_up.onMouseMoved()
    scene3_btn_down.onMouseMoved()
    scene3_btn_info.onMouseMoved()
    scene3_btn_canvas.onMouseMoved()
    

    if (layerNo == 1) {
      layer1.onMouseMoved()
    } else if (layerNo == 2) {
      layer2.onMouseMoved()
    } else if (layerNo == 3) {
      layer3.onMouseMoved()
    } else if (layerNo == 4) {
      layer4.onMouseMoved()
    } else if (layerNo == 5) {
      layer5.onMouseMoved()
    } else if (layerNo == 6) {
      layer6.onMouseMoved()
    } else if (layerNo == 7) {
      layer7.onMouseMoved()
    } else if (layerNo == 8) {
      layer8.onMouseMoved()
    }

}

Scene3.prototype.onKeyPressed = function() {

    if (layerNo == 1) {
        layer1.onKeyPressed()
      } else if (layerNo == 2) {
        layer2.onKeyPressed()
      } else if (layerNo == 3) {
        layer3.onKeyPressed()
      } else if (layerNo == 4) {
        layer4.onKeyPressed()
      } else if (layerNo == 5) {
        layer5.onKeyPressed()
      } else if (layerNo == 6) {
        layer6.onKeyPressed()
      } else if (layerNo == 7) {
        layer7.onKeyPressed()
      } else if (layerNo == 8) {
        layer8.onKeyPressed()
      }

}


/**
 * @author: Limin Deng
 */
function toggleScene3BgMusic(){
    if (!scene3_ocean.sound.isPlaying()) {
        scene3_ocean.sound.loop()
    } else {
        scene3_ocean.sound.stop()
    }
}


/**
 * @author: Limin Deng
 */
function drawOceanBg() {
    push()
      scene3_ocean.resize(width, 8*height);
      image(scene3_ocean, 0, -(layerNo-1)*height);
    pop()
}


/**
 * @author: Limin Deng
 */
function drawInfoScene() {
    push()
      fill(255)
      stroke(255, 204, 0);
      strokeWeight(6);
      rect(windowWidth/5, windowHeight/5, windowWidth/1.7, windowHeight/1.7, 20)
    pop()
}




/**
 * @author: Limin Deng
 */
function drawTaskIndicator() {
    push()
        // 8 fish
        for (var i=0; i<8; i++) {
            // frame
            stroke("gray")
            strokeWeight(5)
            fill(255, 100)
            rect(width/2.2+height/12*i, height/20, height/12, height/12, 5)

            // layer1
            if (eval(`layer${i+1}_rubbishNo`) <= 0) { // get value of templet variable name
                image(layer_fishes[i], width/2.2+height/12*i, height/20, height/12, height/12)
                // layer_fishes[i].resize(height/12, height/12)  //BUG FIXED, it will flash that image shrink process
            } else {
                image(scene4_deadFish, width/2.2+height/12*i, height/20)
                scene4_deadFish.resize(height/12, height/12)         
            }
        }

        // task text
        push()
            noStroke()
            fill("black")
            textSize(30)
            textAlign(CENTER, CENTER)
            text("Task "+`${layerNo}`, width/2.5, height/11)
        pop()
    pop()
}