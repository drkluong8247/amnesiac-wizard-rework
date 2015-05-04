/**
 * Created by Brannon on 4/2/2015.
 */

BasicGame.Game = function(game) {
    //background
    this.world = null;
    
    //player 1 variables
    this.player = null;
    this.keys = null;
    this.score = 0;
    this.health = 100;
    this.maxHealth = 100;
    this.isAlive = true;
    
    //related to player attacking
    this.bolts = null;
    this.nextFire = null;
    this.fireRate = 300;
    //this.playerDmg = 5;
    
    //related to player skills (advanced magic)
    this.skillSelect = 0;
    this.nextSkill = 0;
    this.skillCoolDown = 10000;
    this.fireballs = null;
    this.thunders = null;
    this.blizzardActive = false;
    this.blizzardCount = 0;
    this.blizzardDuration = 100;
    this.icicles = null;
    
    //enemies
    this.enemies = null;
    this.enemyKilled = 0;
    this.boss = null;
    this.enemyDmg = 10;
    
    //sound
    this.fx = null;
    this.music = null;
    this.burst = null;
    this.shock = null;
    this.shatter = null;
    
    //controls the player's blank periods
    this.blank = true;
    this.blankCount;
    this.blankDuration;
    this.blankCoolDown;
    this.blankIndicator;
    this.attackIndicator;
    
    //end game text
    this.endText = "";
    
    //animating sprites
    this.playerFlash = null;
    this.enemyFlash = null;
    
    //checks player 1 input
    this.checkKeys = function() {
        //player movement
        this.player.body.velocity.setTo(0, 0);
        if(this.keys.w.isDown)
        {
            this.player.body.velocity.y = -150;
        }
        else if(this.keys.s.isDown)
        {
            this.player.body.velocity.y = 150;
        }
        if(this.keys.a.isDown)
        {
            this.player.body.velocity.x = -150;
        }
        else if(this.keys.d.isDown)
        {
            this.player.body.velocity.x = 150;
        }
        
        //player skills and shooting
        if ((this.game.input.activePointer.isDown) && this.isAlive)
        {
            //now to check if you're suffering from amnesia
            if(!(this.blank))
            {
                this.fire();
            }
        }
        if(this.keys.f.isDown && this.isAlive)
        {
            this.skill(this.skillSelect);
        }
    };
    
    //player fires
    this.fire = function()
    {
        if (this.game.time.now > this.nextFire && this.bolts.countDead() > 0)
        {
            this.nextFire = this.game.time.now + this.fireRate;
            var bolt = this.bolts.getFirstExists(false);
            bolt.reset(this.player.x, this.player.y);
            bolt.rotation = this.game.physics.arcade.moveToPointer(bolt, 1000, this.game.input.activePointer, 500);
            bolt.body.velocity.x = Math.cos(bolt.rotation) * 700;
            bolt.body.velocity.y = Math.sin(bolt.rotation) * 700;
            bolt.health = 5;
            this.fx.play();
        }
    };
    
    //selects skill
    this.skill = function(number)
    {
        if(this.game.time.now > this.nextSkill)
        {
            this.nextSkill = this.game.time.now + this.skillCoolDown;
            this.skillSelect = this.game.rnd.integer() % 4;
            if(number == 1)
            {
                this.skill1();
            }
            else if(number == 2)
            {
                this.skill2();
            }
            else if(number == 3)
            {
                this.skill3();
            }
            else if(number == 4)
            {
                this.skill3();
            }
            else
            {
                this.skill0();
            }
        }
    };
    
    //skill 0 (heal)
    this.skill0 = function()
    {
        this.health += 25;
        if(this.health >= this.maxHealth)
        {
            this.health = this.maxHealth;
        }
    }
    
    //skill 1 (fire)
    this.skill1 = function()
    {
        var i = 0;
        for(i = 0; i < 24; i++)
        {
            var fireball = this.fireballs.getFirstExists(false);
            fireball.reset(this.player.x, this.player.y);
            fireball.body.velocity.x = Math.cos(i*15) * 400;
            fireball.body.velocity.y = Math.sin(i*15) * 400;
        }
        this.burst.play();
    };
    
    //skill 2 (lightning)
    this.skill2 = function()
    {
        var thunder = this.thunders.getFirstExists(false);
        thunder.reset(this.player.x, this.player.y);
        thunder.health = 10;
        thunder.rotation = this.game.physics.arcade.moveToPointer(thunder, 1000, this.game.input.activePointer, 500);
        thunder.body.velocity.x = Math.cos(thunder.rotation) * 1000;
        thunder.body.velocity.y = Math.sin(thunder.rotation) * 1000;
        
        thunder = this.thunders.getFirstExists(false);
        thunder.reset(this.player.x, this.player.y);
        thunder.health = 10;
        thunder.rotation = this.game.physics.arcade.moveToPointer(thunder, 1000, this.game.input.activePointer, 500);
        thunder.body.velocity.x = Math.cos(thunder.rotation) * 1000;
        thunder.body.velocity.y = Math.sin(thunder.rotation) * 1000;
        thunder.x -= 10;
        thunder.y -= 10;
        
        thunder = this.thunders.getFirstExists(false);
        thunder.reset(this.player.x, this.player.y);
        thunder.health = 10;
        thunder.rotation = this.game.physics.arcade.moveToPointer(thunder, 1000, this.game.input.activePointer, 500);
        thunder.body.velocity.x = Math.cos(thunder.rotation) * 1000;
        thunder.body.velocity.y = Math.sin(thunder.rotation) * 1000;
        thunder.x -= 10;
        thunder.y += 10;
        
        thunder = this.thunders.getFirstExists(false);
        thunder.reset(this.player.x, this.player.y);
        thunder.health = 10;
        thunder.rotation = this.game.physics.arcade.moveToPointer(thunder, 1000, this.game.input.activePointer, 500);
        thunder.body.velocity.x = Math.cos(thunder.rotation) * 1000;
        thunder.body.velocity.y = Math.sin(thunder.rotation) * 1000;
        thunder.x += 10;
        thunder.y -= 10;
        
        thunder = this.thunders.getFirstExists(false);
        thunder.reset(this.player.x, this.player.y);
        thunder.health = 10;
        thunder.rotation = this.game.physics.arcade.moveToPointer(thunder, 1000, this.game.input.activePointer, 500);
        thunder.body.velocity.x = Math.cos(thunder.rotation) * 1000;
        thunder.body.velocity.y = Math.sin(thunder.rotation) * 1000;
        thunder.x += 10;
        thunder.y += 10;
        
        this.shock.play();
    };
    
    this.skill3 = function()
    {
        this.blizzardActive = true;
    }
    
    this.blizzard = function()
    {
        this.blizzardCount++;
        if(this.blizzardCount >= this.blizzardDuration)
        {
            this.blizzardActive = false;
            this.blizzardCount = 0;
        }
        var icicle = this.icicles.getFirstExists(false);
        icicle.reset(this.player.x, this.player.y);
        icicle.health = 1;
        icicle.rotation = this.game.physics.arcade.moveToPointer(icicle, 1000, this.game.input.activePointer, 500);
        icicle.body.velocity.x = Math.cos(icicle.rotation) * 700 + (this.game.rnd.integer() % 70 - 35);
        icicle.body.velocity.y = Math.sin(icicle.rotation) * 700 + (this.game.rnd.integer() % 70 - 35);
        icicle.lifespan = 700;
        this.shatter.play();
    }
    
    //initializes enemies
    this.createEnemies = function()
    {
        //modified from Invaders
        for(var y = 0; y < 10; y++)
        {
            var enemy = this.enemies.create(0, 0, 'monster');
            enemy.anchor.setTo(0.5, 0.5);
            enemy.body.bounce.set(1);
            enemy.body.velocity.x = this.game.rnd.integer() % 200 + 50;
            enemy.body.velocity.y = this.game.rnd.integer() % 200 + 50;
            enemy.body.collideWorldBounds = true;
            enemy.health = 10;
        }
        
        this.enemies.x = 20;
        this.enemies.y = 20;
    };
    
    this.blankHandler = function()
    {
        this.blankCount += 1;
        if((this.blank) && (this.blankCount > this.blankDuration))
        {
            this.blank = false;
            this.blankIndicator.kill();
        }
        
        if(this.blankCount > this.blankCoolDown)
        {
            this.blankCount = 0;
            this.blank = true;
            this.blankDuration = this.game.rnd.integer() % 200 + 200;
            this.blankCoolDown = this.game.rnd.integer() % 500 + 800;
            this.blankIndicator.reset(775, 575);
        }
    };
    
    // handles monster attacks
    this.monsterHandler = function(player, enemy)
    {
        enemy.kill();
        this.health -= 10;
        if(this.health <= 0)
        {
            isAlive = false;
            player.kill();
            this.gameOver();
        }
        this.revive(enemy);
    }
    
    this.damageEnemy = function(bolt, enemy)
    {
        enemy.health -= bolt.health;
        bolt.kill();
        if(enemy.health <= 0)
        {
            enemy.kill();
            this.score += 20;
            this.revive(enemy);
        }
    }
    
    //revives enemies as needed
    this.revive = function(enemy)
    {
        this.enemyKilled++;
        enemy.reset(20, 20);
        enemy.health = 10;
        enemy.body.velocity.x = game.rnd.integer() % 200 + 50;
        enemy.body.velocity.y = game.rnd.integer() % 200 + 50;
    };
    
    //end game feedback
    this.gameOver = function()
    {
        var tempStyle = {font: "40px Arial", fill: "#ffffff", align: "left"}
        this.endText = this.game.add.text(400, 300, "GAME OVER!\nScore:" + this.score, tempStyle);
        this.endText.anchor.setTo(0.5, 0.5);
    }
};

BasicGame.Game.prototype = {
    create: create,
    update: update,
    render: render
};

function create() {
    //create background
    this.world = this.game.add.tileSprite(0, 0, 800, 600, 'world');
    
    //creates player 1
    this.player = this.game.add.sprite( this.game.world.centerX, this.game.world.centerY, 'wizard');
    this.player.anchor.setTo( 0.5, 0.5 );
    this.game.physics.enable( this.player, Phaser.Physics.ARCADE );
    this.player.body.collideWorldBounds = true;
    
    //creates input for player 1
    this.keys = {};
    this.keys.w = this.game.input.keyboard.addKey(Phaser.Keyboard.W);
    this.keys.a = this.game.input.keyboard.addKey(Phaser.Keyboard.A);
    this.keys.s = this.game.input.keyboard.addKey(Phaser.Keyboard.S);
    this.keys.d = this.game.input.keyboard.addKey(Phaser.Keyboard.D);
    this.keys.f = this.game.input.keyboard.addKey(Phaser.Keyboard.F);
    
    //magic bolts for player 1
    this.bolts = this.game.add.group();
    this.bolts.enableBody = true;
    this.bolts.physicsBodyType = Phaser.Physics.ARCADE;
    this.bolts.createMultiple(30, 'magic', 0, false);
    this.bolts.setAll('anchor.x', 0.5);
    this.bolts.setAll('anchor.y', 0.5);
    this.bolts.setAll('outOfBoundsKill', true);
    this.bolts.setAll('checkWorldBounds', true);
    this.nextFire = 0;
    
    this.fireballs = this.game.add.group();
    this.fireballs.enableBody = true;
    this.fireballs.physicsBodyType = Phaser.Physics.ARCADE;
    this.fireballs.createMultiple(30, 'fire', 0, false);
    this.fireballs.setAll('anchor.x', 0.5);
    this.fireballs.setAll('anchor.y', 0.5);
    this.fireballs.setAll('outOfBoundsKill', true);
    this.fireballs.setAll('checkWorldBounds', true);
    
    this.thunders = this.game.add.group();
    this.thunders.enableBody = true;
    this.thunders.physicsBodyType = Phaser.Physics.ARCADE;
    this.thunders.createMultiple(30, 'lightning', 0, false);
    this.thunders.setAll('anchor.x', 0.5);
    this.thunders.setAll('anchor.y', 0.5);
    this.thunders.setAll('outOfBoundsKill', true);
    this.thunders.setAll('checkWorldBounds', true);
    
    this.icicles = this.game.add.group();
    this.icicles.enableBody = true;
    this.icicles.physicsBodyType = Phaser.Physics.ARCADE;
    this.icicles.createMultiple(100, 'ice', 0, false);
    this.icicles.setAll('anchor.x', 0.5);
    this.icicles.setAll('anchor.y', 0.5);
    this.icicles.setAll('outOfBoundsKill', true);
    this.icicles.setAll('checkWorldBounds', true);
    
    //enemies
    this.enemies = this.game.add.group();
    this.enemies.enableBody = true;
    this.enemies.physicsBodyType = Phaser.Physics.ARCADE;
    this.createEnemies();
    
    //sound
    this.fx = this.game.add.audio('castSound');
    this.burst = this.game.add.audio('boomSound');
    this.shock = this.game.add.audio('zapSound');
    this.shatter = this.game.add.audio('freezeSound');
    this.music = this.game.add.audio('backgroundMusic', 1, true);
    this.music.play('', 0, 1, true);
    
    //blank moment parameters(initial)
    this.blankCount = 0;
    this.blankDuration = 200;
    this.blankCoolDown = this.blankDuration + 800;
    
    //sets attack indicator
    this.attackIndicator = this.game.add.sprite(775, 575, 'sword');
    this.attackIndicator.anchor.setTo(0.5, 0.5);
    this.blankIndicator = this.game.add.sprite(775, 575, 'not');
    this.blankIndicator.anchor.setTo(0.5, 0.5);
    
    //sets skills
    this.skillSelect = 3;
}

function update(){
    //updates blanks
    this.blankHandler();
    
    //check player input
    this.checkKeys();
    
    //check collision
    this.game.physics.arcade.overlap(this.bolts, this.enemies, this.damageEnemy, null, this);
    this.game.physics.arcade.overlap(this.fireballs, this.enemies, this.damageEnemy, null, this);
    this.game.physics.arcade.overlap(this.thunders, this.enemies, this.damageEnemy, null, this);
    this.game.physics.arcade.overlap(this.icicles, this.enemies, this.damageEnemy, null, this);
    this.game.physics.arcade.overlap(this.enemies, this.player, this.monsterHandler, null, this);
    
    //blizzard skill
    if(this.blizzardActive)
    {
        this.blizzard();
    }
}

function render()
{
    this.game.debug.text('Health: ' + this.health + '/' + this.maxHealth, 20, 550);
    this.game.debug.text('Score:' + this.score, 20, 570);
    
    if(this.game.time.now <= this.nextSkill)
    {
        this.game.debug.text('Skill: NOT READY', 350, 570);
    }
    else if(this.skillSelect == 1)
    {
        this.game.debug.text('Skill: Erupting Embers', 350, 570);
    }
    else if(this.skillSelect == 2)
    {
        this.game.debug.text('Skill: Lightning Lancer', 350, 570);
    }
    else if(this.skillSelect == 3)
    {
        this.game.debug.text('Skill: Blizzard Breeze', 350, 570);
    }
    else
    {
        this.game.debug.text('Skill: Heal', 350, 570);
    }
}