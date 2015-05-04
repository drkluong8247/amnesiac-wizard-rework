/**
 * Created by Brannon on 4/2/2015.
 */

BasicGame.Preloader = function(game) {
    this.background = null;
    this.preloadBar = null;

    this.ready = false;
};

BasicGame.Preloader.prototype = {
    preload: preload,
    create: create,
    update: update
};

function preload() {
    console.log("%cStarting game state Preloader", "color:white; background:green");
    this.preloadBar = this.add.sprite(this.world.centerX, this.world.centerY, "icon");
    this.preloadBar.anchor.setTo(0.5, 0.5);

    this.load.setPreloadSprite(this.preloadBar);
    

//======================= load all in game assets ============================================
    // Loads images
    this.game.load.image( 'world', 'assets/images/ForestBackground.png' );
    this.game.load.image( 'wizard', 'assets/images/Mage.png');
    this.game.load.image( 'monster', 'assets/images/Specter.png');
    this.game.load.image( 'magic', 'assets/images/Boltshot.png');
    this.game.load.image( 'enter', 'assets/images/Button.png');
    this.game.load.image( 'sword', 'assets/images/Sword.png');
    this.game.load.image( 'not', 'assets/images/Not.png');
    this.game.load.image( 'fire', 'assets/images/Firebolt.png'); 
    this.game.load.image( 'lightning', 'assets/images/Lightning.png');
    this.game.load.image( 'ice', 'assets/images/Snow.png'); 
    
    //for pseudo-animaton purposes
    this.game.load.image( 'wizardflash', 'assets/images/MageFlash.png');
    this.game.load.image( 'monsterflash', 'assets/images/SpecterFlash.png');
    
    // loads sound
    this.game.load.audio( 'castSound', 'assets/audio/magicshot.mp3');
    this.game.load.audio( 'boomSound', 'assets/audio/explode.wav');
    this.game.load.audio( 'backgroundMusic', 'assets/audio/AnimalCrossing-TownHall.ogg');
    this.game.load.audio( 'ding', 'assets/audio/coincollect.ogg');
    this.game.load.audio( 'zapSound', 'assets/audio/zap.wav');
    this.game.load.audio( 'freezeSound', 'assets/audio/freeze.wav');
}

function create() {
    this.preloadBar.cropEnabled = false;
}

function update()
{
    this.preloadBar.angle += 1;
    if(this.cache.isSoundDecoded('backgroundMusic') && this.ready === false) {
        this.ready = true;
        this.state.start("Menu");
    }
}