// draw variables 
var scene1_margin1 = 50;
var scene1_margin2 = 10;
var scene1_bottom = 450;

// let bubble move
var scene1_bubbleY=400;
// vocalno
var scene1_x, scene1_y;

// move to next scene
var scene1_btn_next;

// talk to fish 
var scene1_fishWord = [
    "Hey! Nice to meet you. My name is Jane",
    "This is my home, a fish tank",
    "I am the only fish left in the world", 
    "Because others have been swollen by rubbish",
    "I miss them...",
    "If someone can travel back to save them",
    "Can you do this for me?",
    "Thank you!"
]
var scene1_speech
var scene1_wordControl = -1;
var btn_talk;
var scene1_volumn = 0.5;
var btn_ok
var scene1_input
var scene1_content
var scene1_say = false;


/**
 * @constructor
 * @author: Limin Deng
 */
var Scene1 = function() {
}

Scene1.prototype.preload = function () {
    // scene1_btn_next to next scene
    scene1_btn_next = new MySprite(0, 0, "assets/btn_normal.png", "assets/btn_hover.png", "assets/btn_clicked.png")
    scene1_btn_next.preload();
    scene1_btn_next.locate(windowWidth/1.2, windowHeight/2+200)
    
    // to trigger fish sound
    btn_talk = new MySprite(0, 0, "assets/talk_normal.png", "assets/talk_hover.png", "assets/talk_clicked.png", "assets/talk_disabled.png")
    btn_talk.preload()
    btn_talk.locate(windowWidth/20, windowHeight/20)

    // to send the audience voice or text
    btn_ok = new MySprite(0, 0, "assets/ok_normal.png", "assets/ok_hover.png", "assets/ok_clicked.png")
    btn_ok.preload()
    btn_ok.locate(windowWidth/1.4, windowHeight/1.25)

    
}


/**
 * framework 1
 */
Scene1.prototype.setup = function () {
    scene1_speech = new p5.Speech(); 
    setupInput()
}


/**
 * framework 2
 */
Scene1.prototype.draw = function () {
    tank()

    // Reference: https://editor.p5js.org/projects/rJnIaBnn
    bubble(scene1_x+100, scene1_bubbleY+40);
    bubble(scene1_x+120, scene1_bubbleY+80);
    bubble(scene1_x+140, scene1_bubbleY);
    if (scene1_bubbleY > scene1_margin1){ 
        scene1_bubbleY = scene1_bubbleY-1;  // move upward
    }
    if (scene1_bubbleY <= scene1_margin1){ // boundary
        scene1_bubbleY = 300;
    }
    
    vocalno()

    scene1_btn_next.draw()
    btnText(windowWidth/1.18, windowHeight/1.17, "To 2019")

    btn_talk.draw()
    btn_ok.draw()
    
    fishLeft(width/2, height/2)
    textFrame()
    timeIndicator(2119)

   
    // draw fish count
    if (scene3_btn_canvas.disableFlag) {   
        drawFishCount(1)
    } else {
        drawFishCount(9)
    }
    
    

}


/**
 * framework 3
 * All interactions
 */
Scene1.prototype.onMouseMoved = function() {
    scene1_btn_next.onMouseMoved()
    btn_talk.onMouseMoved()
    btn_ok.onMouseMoved()
}

Scene1.prototype.onMousePressed = function() {
    scene1_btn_next.onMousePressed()
    btn_talk.onMousePressed()
    btn_ok.onMousePressed()
}

/**
 * control 
 */
Scene1.prototype.onMouseClicked = function() {
    
    // to next scene
    scene1_btn_next.onMouseClicked(function() {
        clear()
        scene1_input.remove() // remove the dom
        scene1_content.remove() // remove the dom

        sceneNo = 2;
        toggleScene2BgMusic() // prepare next scene's bg music
    })

    // let fish talk
    btn_talk.onMouseClicked(function() {
        if (scene3_btn_canvas.disableFlag) {
            scene1_wordControl += 1;
            if (scene1_wordControl > -1 && scene1_wordControl < scene1_fishWord.length) {
                scene1_speech.speak(scene1_fishWord[scene1_wordControl]);
            } 
            if (scene1_wordControl == scene1_fishWord.length-1){
                btn_talk.disableFlag = true
            }
     
    
           
        } else {
            scene1_speech.speak("Thank you! My friends are back. I am not lonely anymore.But this is just the beginning, more challenges are awaiting. See you next episode. My dear friend.");
            btn_talk.disableFlag = true
        }
        
    })

    // to send your words
    btn_ok.onMouseClicked(function() {
        const content = scene1_input.value();
        scene1_content.html('hello ' + content + '! Click the question button to hear what the fish says');
        scene1_input.value('');
    })

}

Scene1.prototype.onKeyPressed = function() {
    console.log("scene1 keypressed do nothing")
}



function setupInput() {
    scene1_input = createInput();
    scene1_input.position(width/18, height/1.18);
    scene1_content = createElement('h2', "What's your name?");
    scene1_content.position(width/18, height/1.33);
}


function timeIndicator(year) {
    push()
        // bg
        noStroke()
        fill("orange")
        rect(width/1.2, height/20, width/6.1, height/13, 10)
        
        // text
        textSize(45)
        fill("white")
        text(year+" Year", width/1.18, height/9)

    pop()
}


/**
 * @author: Limin Deng
 * @param {@} x 
 * @param {*} y 
 * @param {*} content 
 */
function btnText(x, y, content) {
    push()
        fill(255)
        textSize(30)
        textStyle(BOLD)
        textFont('Helvetica');
        // text("To 2019", windowWidth/1.18, windowHeight/1.17)
        text(content, x, y)
    pop()
}



/**
 * @author: Limin Deng
 */
function tank() {
    push()
        fill("white")
        rect(scene1_margin1/2, 0, width-scene1_margin1, height)
        fill("gray")
        rect(scene1_margin1/4, 0, width-scene1_margin1/2, scene1_margin1)
        rect(scene1_margin1/4, height-scene1_margin1, width-scene1_margin1/2, scene1_margin1)
        fill("green")
        rect(0, 0, width, 30)
        noStroke()

        // inner window
        fill(225, 248, 230)
        rect(scene1_margin1/2+scene1_margin2, scene1_margin1+scene1_margin2, width-scene1_margin1-scene1_margin2*2, height-scene1_margin1*2 - scene1_margin2*2)
        
        // bottom 
        fill(201, 191, 155)
        rect(scene1_margin1/2+scene1_margin2, scene1_margin1+scene1_margin2+scene1_bottom, width-scene1_margin1-scene1_margin2*2, height-scene1_margin1*2 - scene1_margin2*2-scene1_bottom)

        // hightlight
        fill(252,252,252);
        rect(width/1.2, 170, 20, 50, 5);  
        rect(width/1.15, 170, 20, 80, 5);
    pop()
}


/**
 * @author: Limin Deng
 */
function vocalno(){
    // volcano
    fill(82,74,24);
    scene1_x = scene1_margin1
    scene1_y = scene1_margin1+scene1_margin2+scene1_bottom
    quad(scene1_x+80, scene1_y-100, 
        scene1_x+160, scene1_y-100, 
        scene1_x+240, scene1_y, 
        scene1_x, scene1_y);  
}

/**
 * @author: Limin Deng
 * @param {*} scene1_x 
 * @param {*} scene1_y 
 */
/////BUBBLES/////
function bubble(scene1_x,scene1_y){
    push()
        noStroke()
        fill(99, 32, 224, 80); 
        ellipse(scene1_x, scene1_y, 30);
    pop()
  }



/**
 * the dialog frame to talk to fish
 * @author: Limin Deng
 */
function textFrame() {
    push();
        // 1 - textFrame
        stroke("white")
        strokeWeight(3)
        fill(244, 194, 194);
        rect(scene1_margin1/2+scene1_margin2*2, scene1_margin1+scene1_margin2*2+scene1_bottom, 
            width/1.5, height/7, 
            20)

        // 2 - volumn
        // bg
        noStroke()
        fill("yellow")
        rect(width/1.3, height/1.3, 
            30, 90, 5)

        push()
        // indicator
        fill("red")
        noStroke()
        translate(width/1.3, height/1.3+90)
        scene1_volumn = map(mic.getLevel(), 0, 1, 0, amplifier)
        scale(1, -scene1_volumn)
        rect(0, 0, 
            30, 90, 5)
        pop()

        // frame
        stroke("brown")
        strokeWeight(5)
        noFill()
        rect(width/1.3, height/1.3, 
            30, 90, 5)
    pop();
}



/**
 * 
 * @param {*} x 
 * @param {*} y 
 */
function fishLeft(x, y){
    push()
        fill(8,59,12);
        ellipse(x+29,y,20,25);
        fill(35,150,44);
        ellipse(x,y,50,30);
        fill("white");
        ellipse(x-10,y-5,10);
        fill("grey");
        ellipse(x-13,y-5,4);
        fill(62,66,63,90);
        ellipse(x+10,y+85,60,10);
    pop()
  }




  var fishCard = function(x, y) {
      this.x = x 
      this.y = y
  }

  fishCard.prototype.draw = function() {
      push()
        rect(0, 0, 100, 100)
      pop()
  }

  fishCard.prototype.onMouseMoved = function() {

  }