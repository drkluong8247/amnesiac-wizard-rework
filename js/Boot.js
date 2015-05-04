/**
 * Created by Brannon on 4/2/2015.
 *
 * Boot state
 *
 * modified by Derek on 4/7/15
 */

var BasicGame = {};     // holds all game states
var playMusic = true;   // global toggle to control music across states(do I need this?)

// global variables
BasicGame.Boot = function(game) {
};

// functions in the state
BasicGame.Boot.prototype = {
    preload: preload,
    create: create
};

// preload only what is needed for the loading screen
function preload() {
    this.game.load.image('icon', 'assets/images/SpikyFan.png');
}

function create() {
    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.scale.maxWidth = 800;
    this.scale.maxHeight = 600;
    this.scale.forceLandscape = false;

    this.game.state.start("Preloader");
}
