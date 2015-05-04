/**
 * Created by Brannon on 4/2/2015.
 */

BasicGame.Menu = function(game) {

    // local vars
    this.background = null;
    this.enter = null;
    this.gameTime = -1;
    this.enterClicked = false;
    this.buttonSound = null;
    this.titletext = null;
    this.titlesprite = null;
    this.question = null;

    // local funcs
    this.clickEnter = function() {

        if(this.enterClicked == false) {
            this.enterClicked = true;
            this.gameTime = this.game.time.now + 1000;
            this.buttonSound.play();
        }
    }

};

BasicGame.Menu.prototype = {
    create: create,
    update: update
};

function create() {
    console.log("%cStarting game state Menu", "color:white; background:green");


    // load background
    this.game.stage.backgroundColor = '#409090';
    
    // title
    var titleStyle = {font: "40px Arial", fill: "#0000ff", align: "left"};
    this.titletext = this.game.add.text(400, 200, "Wizard Amnesiac", titleStyle);
    this.titletext.anchor.setTo(0.5, 0.5);
    
    //image of the wizard
    this.titlesprite = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'wizard');
    this.titlesprite.anchor.setTo(0.5, 0.5);
    this.question = this.game.add.text( this.game.world.centerX, this.game.world.centerY - 50, "?", {font: "20px Arial", fill: "#ffffff", align: "left"});
    this.question.anchor.setTo(0.5, 0.5);

    // set up button sound
    this.buttonSound = this.game.add.audio('ding');

    // set up button sprite
    this.enter = this.game.add.sprite(400, 500, 'enter');
    this.enter.scale.setTo(.5,.5);
    this.enter.anchor.setTo(.5,.5);
    this.enter.inputEnabled = true;
    this.enter.events.onInputDown.add(this.clickEnter, this);
}

function update() {
    if(this.gameTime > 0 && this.game.time.now >= this.gameTime) {
        this.state.start('Instructions');
    }
}

