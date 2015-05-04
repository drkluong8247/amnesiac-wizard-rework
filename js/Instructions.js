/**
 * Created by Brannon on 4/2/2015.
 */

BasicGame.Instructions = function(game) {

    // local vars
    this.enter = null;
    this.gameTime = -1;
    this.enterClicked = false;
    this.buttonSound = null;
    this.instructText = null;

    // local funcs
    this.clickEnter = function() {

        if(this.enterClicked == false) {
            this.enterClicked = true;
            this.gameTime = this.game.time.now + 1000;
            this.buttonSound.play();
        }
    }

};

BasicGame.Instructions.prototype = {
    create: create,
    update: update
};

function create() {
    console.log("%cStarting game state Instructions", "color:white; background:green");

    // set up button sound
    this.buttonSound = this.game.add.audio('ding');
    
    var instructStyle = {font: "20px Arial", fill: "#ffffff", align: "left"};
    this.instructText = this.game.add.text(400, 100, "", instructStyle);
    this.instructText.setText("Player 1: WASD to move, mouse to aim and shoot, and F to use skills.\nSkills:\n" +
                             "Erupting Embers -- Shoot fire in all directions.\n" +
                             "Lightning Lancer -- Shoot a piercing bolt of lightning\n" +
                             "Blizzard Breeze -- Shoot a steady stream of icy wind\n" +
                             "Heal -- it heals health");
    this.instructText.anchor.setTo(0.5, 0.5);
    
    // set up button sprite
    this.enter = this.game.add.sprite(600, 500, 'enter');
    this.enter.scale.setTo(.5,.5);
    this.enter.anchor.setTo(.5,.5);
    this.enter.inputEnabled = true;
    this.enter.events.onInputDown.add(this.clickEnter, this);
}

function update() {
    if(this.gameTime > 0 && this.game.time.now >= this.gameTime) {
        this.state.start('Game');
    }
}

