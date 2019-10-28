/**
 * @concrete
 */
function Btn_UpDown(disabledPath) {
    MySprite.apply(this, arguments);

    // initialization
    this.disabledPath = disabledPath
}

// inherit all attributes
Btn_UpDown.prototype = Object.create(MySprite.prototype);
Btn_UpDown.prototype.constructor = Btn_UpDown;

Btn_UpDown.prototype.draw = function() {
    MySprite.apply(this, arguments);

}