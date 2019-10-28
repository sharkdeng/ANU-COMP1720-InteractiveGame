var scene2_btn_prev
var scene2_btn_next

var scene2_bgMusic

// ear
var scene2_ear
var scene2_earFlag = false

// ppt
var scene2_btn_right
var scene2_btn_left
var scene2_pptNo = -1
var scene2_ppt1
var scene2_ppt2
var scene2_ppt3

// people images
var scene2_lecturer
var scene2_audience1
var scene2_audience2
var scene2_audience3
var scene2_audience4
var scene2_audience5
var scene2_audience6
var scene2_audience7
var scene2_audience8

// people audios
var scene2_lecturerSpeak
var scene2_audience1Speak
var scene2_audience2Speak
var scene2_audience3Speak
var scene2_audience4Speak
var scene2_audience5Speak
var scene2_audience6Speak
var scene2_audience7Speak
var scene2_audience8Speak


var Scene2 = function() {

}

Scene2.prototype.preload = function() {
    scene2_btn_next = new MySprite(0, 0, "assets/btn_normal.png", "assets/btn_hover.png", "assets/btn_clicked.png")
    scene2_btn_next.preload();
    scene2_btn_next.locate(windowWidth/1.2, windowHeight/2+200)

    scene2_btn_prev = new MySprite(0, 0, "assets/btn_normal.png", "assets/btn_hover.png", "assets/btn_clicked.png")
    scene2_btn_prev.preload();
    scene2_btn_prev.locate(windowWidth/20, windowHeight/2+200)

    scene2_btn_right = new MySprite(0, 0, "assets/right_normal.png", "assets/right_hover.png", "assets/right_clicked.png", "assets/right_disabled.png")
    scene2_btn_right.preload();
    scene2_btn_right.locate(windowWidth/1.6, windowHeight/4)

    scene2_btn_left = new MySprite(0, 0, "assets/left_normal.png", "assets/left_hover.png", "assets/left_clicked.png", "assets/left_disabled.png")
    scene2_btn_left.preload();
    scene2_btn_left.locate(windowWidth/7, windowHeight/4)

    scene2_ear = loadImage("assets/ear.png")

    scene2_lecturer = new MySprite(0, 0, "assets/lecturer.png")
    scene2_lecturer.preload()
    scene2_lecturer.locate(windowWidth/1.5, windowHeight/5)

    scene2_audience1 = new MySprite(0, 0, "assets/audience1.png")
    scene2_audience1.preload()
    scene2_audience1.locate(0, windowHeight/3)

    scene2_audience2 = new MySprite(0, 0, "assets/audience2.png")
    scene2_audience2.preload()
    scene2_audience2.locate(windowWidth/7, windowHeight/1.8)

    scene2_audience3 = new MySprite(0, 0, "assets/audience3.png")
    scene2_audience3.preload()
    scene2_audience3.locate(windowWidth/3.3, windowHeight/2)

    scene2_audience4 = new MySprite(0, 0, "assets/audience4.png")
    scene2_audience4.preload()
    scene2_audience4.locate(windowWidth/2.5, windowHeight/2.3)

    scene2_audience5 = new MySprite(0, 0, "assets/audience5.png")
    scene2_audience5.preload()
    scene2_audience5.locate(windowWidth/1.95, windowHeight/2)

    scene2_audience6 = new MySprite(0, 0, "assets/audience6.png")
    scene2_audience6.preload()
    scene2_audience6.locate(windowWidth/1.6, windowHeight/1.8)

    scene2_audience7 = new MySprite(0, 0, "assets/audience7.png")
    scene2_audience7.preload()
    scene2_audience7.locate(windowWidth/1.36, windowHeight/1.8)

    scene2_audience8 = new MySprite(0, 0, "assets/audience8.png")
    scene2_audience8.preload()
    scene2_audience8.locate(windowWidth/1.1, windowHeight/2)

    scene2_ppt1 = loadImage("assets/pollute1.jpg")
    scene2_ppt2 = loadImage("assets/pollute2.jpg")
    scene2_ppt3 = loadImage("assets/pollute3.jpg")

    scene2_bgMusic = loadSound("assets/lecture.mp3")
    scene2_bgMusic.setVolume(0.1)

    

}


Scene2.prototype.setup = function() {
    scene2_lecturerSpeak = new p5.Speech();
    scene2_audience1Speak = new p5.Speech();
    scene2_audience2Speak = new p5.Speech();
    scene2_audience3Speak = new p5.Speech();
    scene2_audience4Speak = new p5.Speech();
    scene2_audience5Speak = new p5.Speech();
    scene2_audience6Speak = new p5.Speech();
    scene2_audience7Speak = new p5.Speech();
    scene2_audience8Speak = new p5.Speech();
}

Scene2.prototype.draw = function() {

    // bg
    push()
        setGradient(color(80, 115, 215), color(197, 210, 234))
        rect(0, 0, width, height)
        // image(scene2_bg, 0, 0, width, height)
    pop()

    timeIndicator(2019)
    scene2_btn_next.draw()
    btnText(windowWidth/1.18, windowHeight/1.17, "To 1919")
    scene2_btn_prev.draw()
    btnText(windowWidth/16, windowHeight/1.17, "To 2119")


    // board
    board()
    if (scene2_pptNo == 2) {
        scene2_btn_right.disableFlag = true
    } else {
        scene2_btn_right.disableFlag = false
    }
    scene2_btn_right.draw()
    if (scene2_pptNo == -1) {
        scene2_btn_left.disableFlag = true
    } else {
        scene2_btn_left.disableFlag = false
    }
    scene2_btn_left.draw()

    scene2_lecturer.draw()
    scene2_audience1.draw()
    scene2_audience2.draw()
    scene2_audience3.draw()
    scene2_audience4.draw()
    scene2_audience5.draw()
    scene2_audience6.draw()
    scene2_audience7.draw()
    scene2_audience8.draw()

    drawFishCount(100)

    // ear
    push()
        imageMode(CENTER, CENTER)
        if (scene2_earFlag) {
            image(scene2_ear, mouseX, mouseY)
        } else {
            image(scene2_ear, windowWidth/20, windowHeight/10)
        }
    pop()
}


Scene2.prototype.onMouseClicked = function() {
    scene2_btn_next.onMouseClicked(function(){
        // clear current content
        clear()
        sceneNo = 3
        toggleScene2BgMusic() // stop current
        toggleScene3BgMusic() // start next
    })
    scene2_btn_prev.onMouseClicked(function() {
        clear()
        sceneNo = 1
        setupInput() // put back scene inputs
        // toggle current bg music
        toggleScene2BgMusic() // stop current
        // toggleScene1BgMusic() // start prev
    })


    scene2_btn_right.onMouseClicked(function() {
        scene2_pptNo += 1

        if (scene2_pptNo > 2) {
            scene2_pptNo = 2
        } 
    })

    scene2_btn_left.onMouseClicked(function() {
        scene2_pptNo -= 1
        
        // boundary
        if (scene2_pptNo < -1) {
            scene2_pptNo = -1
        }
    })
}

Scene2.prototype.onMousePressed = function() {
    scene2_btn_next.onMousePressed()
    scene2_btn_prev.onMousePressed()
    scene2_btn_right.onMousePressed()
    scene2_btn_left.onMousePressed()

}

Scene2.prototype.onMouseMoved = function() {
    scene2_btn_next.onMouseMoved()
    scene2_btn_prev.onMouseMoved()
    scene2_btn_right.onMouseMoved()
    scene2_btn_left.onMouseMoved()

    // people start to talk
    if (scene2_earFlag) {
        scene2_lecturer.onMouseMoved(function(){
            scene2_audience1Speak.stop()
            scene2_audience2Speak.stop()
            scene2_audience3Speak.stop()
            scene2_audience4Speak.stop()
            scene2_audience5Speak.stop()
            scene2_audience6Speak.stop()
            scene2_audience7Speak.stop()
            scene2_audience8Speak.stop()
            if (scene3_btn_canvas.disableFlag) {
                scene2_lecturerSpeak.speak("Hey, Students, Welcome to today's lecture")
            } else {
                scene2_lecturerSpeak.speak("Congratulations! You've done a great job!")
            }
            
        })
        scene2_audience1.onMouseMoved(function(){
            scene2_lecturerSpeak.stop()
            scene2_audience2Speak.stop()
            scene2_audience3Speak.stop()
            scene2_audience4Speak.stop()
            scene2_audience5Speak.stop()
            scene2_audience6Speak.stop()
            scene2_audience7Speak.stop()
            scene2_audience8Speak.stop()
            if (scene3_btn_canvas.disableFlag) {
                scene2_audience1Speak.speak("One reason is many fish are trapped by rubbish")
            } else {
                scene2_audience1Speak.speak("You saved thoses fish!What a brave man!")
            }
            
        })
        scene2_audience2.onMouseMoved(function(){
            scene2_lecturerSpeak.stop()
            scene2_audience1Speak.stop()
            scene2_audience3Speak.stop()
            scene2_audience4Speak.stop()
            scene2_audience5Speak.stop()
            scene2_audience6Speak.stop()
            scene2_audience7Speak.stop()
            scene2_audience8Speak.stop()
            if (scene3_btn_canvas.disableFlag) {
                scene2_audience2Speak.speak("Rubbish obstruct fish's sunlight.Sad!")
            } else {
                scene2_audience2Speak.speak("Well done!")
            }
            
        })
        scene2_audience3.onMouseMoved(function(){
            scene2_lecturerSpeak.stop()
            scene2_audience1Speak.stop()
            scene2_audience2Speak.stop()
            scene2_audience4Speak.stop()
            scene2_audience5Speak.stop()
            scene2_audience6Speak.stop()
            scene2_audience7Speak.stop()
            scene2_audience8Speak.stop()
            if (scene3_btn_canvas.disableFlag) {
                scene2_audience3Speak.speak("Rubbish make fish get food more difficult")
            } else {
                scene2_audience3Speak.speak("Without rubbish, ocean ecosystem is fine")
            }
            
        })
        scene2_audience4.onMouseMoved(function(){
            scene2_lecturerSpeak.stop()
            scene2_audience1Speak.stop()
            scene2_audience2Speak.stop()
            scene2_audience3Speak.stop()
            scene2_audience5Speak.stop()
            scene2_audience6Speak.stop()
            scene2_audience7Speak.stop()
            scene2_audience8Speak.stop()
            if (scene3_btn_canvas.disableFlag) {
                scene2_audience4Speak.speak("Rubbish make fish more anxious")
            } else {
                scene2_audience4Speak.speak("Rubbish free!Yeah!")
            }
            
        })
        scene2_audience5.onMouseMoved(function(){
            scene2_lecturerSpeak.stop()
            scene2_audience1Speak.stop()
            scene2_audience2Speak.stop()
            scene2_audience3Speak.stop()
            scene2_audience4Speak.stop()
            scene2_audience6Speak.stop()
            scene2_audience7Speak.stop()
            scene2_audience8Speak.stop()
            if (scene3_btn_canvas.disableFlag) {
                scene2_audience5Speak.speak("So many fish are hurt by rubbish")
            } else {
                scene2_audience5Speak.speak("You are fantastic!")
            }
        })
        scene2_audience6.onMouseMoved(function(){
            scene2_lecturerSpeak.stop()
            scene2_audience1Speak.stop()
            scene2_audience2Speak.stop()
            scene2_audience3Speak.stop()
            scene2_audience4Speak.stop()
            scene2_audience5Speak.stop()
            scene2_audience7Speak.stop()
            scene2_audience8Speak.stop()
            if (scene3_btn_canvas.disableFlag) {
                scene2_audience6Speak.speak("Fish may accidently eat rubbish, another reason for fish extinction")
            } else {
                scene2_audience6Speak.speak("This lecture is helpful")
            }
        })
        scene2_audience7.onMouseMoved(function(){
            scene2_lecturerSpeak.stop()
            scene2_audience1Speak.stop()
            scene2_audience2Speak.stop()
            scene2_audience3Speak.stop()
            scene2_audience4Speak.stop()
            scene2_audience5Speak.stop()
            scene2_audience6Speak.stop()
            scene2_audience8Speak.stop()
            if (scene3_btn_canvas.disableFlag) {
                scene2_audience7Speak.speak("Large amount of rubbish pollute the ocean water")
            } else {
                scene2_audience7Speak.speak("Clean environment helps fish thrive")
            }
        })
        scene2_audience8.onMouseMoved(function(){
            scene2_lecturerSpeak.stop()
            scene2_audience1Speak.stop()
            scene2_audience2Speak.stop()
            scene2_audience3Speak.stop()
            scene2_audience4Speak.stop()
            scene2_audience5Speak.stop()
            scene2_audience6Speak.stop()
            scene2_audience7Speak.stop()
            if (scene3_btn_canvas.disableFlag) {
                scene2_audience7Speak.speak("Rubbish obstruct fish's way home")
            } else {
                scene2_audience7Speak.speak("You are the best!My friend")
            }
        })
    }
    
}

Scene2.prototype.onMouseReleased = function() {

}

Scene2.prototype.onKeyPressed = function() {
    if (key == ' ') {
        scene2_earFlag = !scene2_earFlag
    } 
    if (keyCode == ENTER) {
        toggleScene2BgMusic()
    }

}



/**
 * @author: Limin Deng
 */
function toggleScene2BgMusic() {
    if (!scene2_bgMusic.isPlaying()) {
        scene2_bgMusic.loop()
    } else {
        scene2_bgMusic.stop()
    }
}


/**
 * Refence: https://editor.p5js.org/REAS/sketches/S1TNUPzim
 * @param {*} c1 
 * @param {*} c2 
 */
function setGradient(c1, c2) {
    // noprotect
    noFill();
    for (var y = 0; y < height; y++) {
      var inter = map(y, 0, height, 0, 1);
      var c = lerpColor(c1, c2, inter);
      stroke(c);
      line(0, y, width, y);
    }
  }



/**
 * @author: Limin Deng
 */
function board() {
    push()
        // shadow
        noStroke()
        fill(color(210, 224, 244, 200))
        rect(width/5, height/15, width/2.1, height/2)

        // tv
        fill("gray")
        stroke(color(21, 72, 178))
        strokeWeight(10)
        rect(width/6, height/19, width/2.1, height/2.1)

        // content
        if (scene2_pptNo == -1) {
            push() 
                noStroke()
                fill("white")
                textAlign(CENTER, CENTER)
                textSize(30)
                text("Fish Extinction Caused By Ocean Pollution\nLecturer: Tom\n2019/11/20",  width/2.5, height/4)
            pop()

        } else if (scene2_pptNo == 0) {
            image(scene2_ppt1, width/6, height/19, width/2.1, height/2.1)

        } else if (scene2_pptNo == 1) {
            image(scene2_ppt2, width/6, height/19, width/2.1, height/2.1)
            
        } else if (scene2_pptNo == 2) {
            image(scene2_ppt3, width/6, height/19, width/2.1, height/2.1)
            
        }
    pop()
}

