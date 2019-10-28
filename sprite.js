/**
 * @abstract
 * @constructor
 * @author: Limin Deng
 * @param {} x 
 * @param {*} y 
 * @param {*} normalPath 
 * @param {*} hoverPath 
 * @param {*} clickedPath 
 * @param {*} disabledPath: image path for diabled sprite
 */
function MySprite(x, y, normalPath, hoverPath, clickedPath, disabledPath) {
    // make it abstract
    // if (this.constructor === MySprite) {
    //     throw new Error("Can't instantiate abstract class!")
    // }

    // initialization
    this.x = x || 0;
    this.y = y || 0;
    this.width
    this.height
    this.normalPath = normalPath;
    this.hoverPath = hoverPath;
    this.clickedPath = clickedPath;
    this.disabledPath = disabledPath;
    this.disableFlag = false;
}

MySprite.prototype.preload = function() {

    this.normal = loadImage(this.normalPath);

    if (this.hoverPath != null) {
    this.hover = loadImage(this.hoverPath);
    } 
    
    if (this.clickedPath != null) {
    this.click = loadImage(this.clickedPath);
    } 

    if (this.disabledPath != null) {
        this.disable = loadImage(this.disabledPath);
    } 
    
    this.img = this.normal;

            
}

MySprite.prototype.move = function(callback) {
    if (callback != null) { callback()}
}

MySprite.prototype.draw = function(callback) {
    // imageMode(CENTER, CENTER)
    
    if (this.disableFlag && this.disable != null) {
        image(this.disable, this.x, this.y)

        // set the value
        this.width = this.disable.width
        this.height = this.disable.height
    } else {
        image(this.img, this.x, this.y);

        // set the value
        this.width = this.img.width
        this.height = this.img.height
    }

    

    if (callback != null) { callback(); }
}


MySprite.prototype.locate = function(x, y){
    this.x = x;
    this.y = y;
}
	
MySprite.prototype.resize = function(w, h){
    this.width = w;
    this.height = h;
    this.img.resize(this.width, this.height);
}
    
MySprite.prototype.onMouseMoved = function(inCallback, outCallback) {
    if (this.disableFlag) return;

    // interaction when mouse is hover 
    // check if the mouse is inside the bounding box and tickle if so
    if (mouseX >= this.x &&
        mouseX <= this.x + this.img.width &&
        mouseY >= this.y &&
        mouseY <= this.y + this.img.height ) {

        if (this.hover != null) { this.img = this.hover }

        if (inCallback != null) { inCallback() }
        
    } else {
        this.img = this.normal;

        if (outCallback != null) { outCallback() }
    }

}


    
MySprite.prototype.onMouseClicked = function(callback) { 
    // if image is diabled, then do nothing
    if (this.disableFlag) return;

    if (mouseX >= this.x &&
        mouseX <= this.x + this.img.width &&
        mouseY >= this.y &&
        mouseY <= this.y + this.img.height ) {

        if (callback != null) { callback(); }
    } 
}

MySprite.prototype.onMousePressed = function(pressedCallback, notPressedCallback) {
    if (this.disableFlag) return;

    if (mouseX >= this.x &&
        mouseX <= this.x + this.img.width &&
        mouseY >= this.y &&
        mouseY <= this.y + this.img.height ) {

        // change image
        if (this.click != null) { this.img = this.click }

        if (pressedCallback != null) { pressedCallback() }
        
    } else {
        this.img = this.normal;

        if (notPressedCallback != null) { notPressedCallback() }
    }
    
}

MySprite.prototype.onMouseReleased = function(callback) {
    if (this.disableFlag) return;

    if (callbak != null) { callback() }

}

MySprite.prototype.onMouseDragged = function(callback) {
    if (this.disableFlag) return;

    if (callbak != null) { callback() }
}
  

    




