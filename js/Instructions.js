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
    this.storyText = null;

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
    this.instructText = this.game.add.text(50, 50, "", instructStyle);
    this.instructText.setText("WASD to move, mouse to aim and shoot, and number keys to use skills.\nSkills:\n" +
                             "1. Erupting Embers -- Shoot fire in all directions.\n" +
                             "2. Lightning Lancer -- Shoot a bolt of lightning that can pierce multiple specters \nor deal massive damage to a single enemy\n" +
                             "3. Blizzard Breeze -- Shoot a stream of icy wind to deal gradual damage to enemies\n" +
                             "4. Tornado -- Summon a burst of wind centered on the mouse pointer,\n dealing damage in a radius around the mouse to enemies\n" +
                             "5. Heal -- it heals health");
    
    this.storyText = this.game.add.text(50, 350, "", instructStyle);
    this.storyText.setText("After waking up one morning, you realize that you have no idea where you are.\nAfter a ground-rattling shake, you remember that you're a wizard,\nyou're at home, and you're under attack. You feel like there's something\nyou're forgetting, but dealing with the monsters comes first.");
    
    // set up button sprite
    this.enter = this.game.add.sprite(650, 530, 'enter');
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

