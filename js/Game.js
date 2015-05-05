/**
 * Created by Brannon on 4/2/2015.
 */

BasicGame.Game = function(game) {
    //background
    this.world = null;
    
    //timer stuff
    this.timerStart = 180000;
    this.timer = null;
    this.timerText = null;
    this.timerStyle = {font: "40px Arial", fill: "#000000", align: "left"};
    
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
    this.skillCoolDown = 10000;
    this.blank1 = false;
    this.blank2 = false;
    this.blank3 = false;
    this.blank4 = false;
    this.blank5 = false;
    
    //skill1 fire
    this.fireballs = null;
    this.nextSkill1 = 0;
    
    //skill2 thunder
    this.thunders = null;
    this.nextSkill2 = 0;
    
    //skill3 ice
    this.blizzardActive = false;
    this.blizzardCount = 0;
    this.blizzardDuration = 100;
    this.icicles = null;
    this.nextSkill3 = 0;
    
    //skill4 tornado
    this.whirlwinds = null;
    this.nextSkill4 = 0;
    
    //skill5 heal
    this.nextSkill5 = 0;
    
    //enemies
    this.enemies = null;
    this.enemyKilled = 0;
    this.enemyDmg = 10;
    
    this.boss = null;
    this.bossSpawned = false;
    this.bossDmg = 10;
    this.darkness = null;
    this.nextDarkness = 0;
    this.bossAlive = false;
    
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
        if((this.game.input.activePointer.isDown) && this.isAlive)
        {
            //now to check if you're suffering from amnesia
            if(!(this.blank))
            {
                this.fire();
            }
        }
        
        if(this.keys.one.isDown && this.isAlive)
        {
            if((this.game.time.now > this.nextSkill1) && !(this.blank1))
            {
                this.nextSkill1 = this.game.time.now + this.skillCoolDown;
                this.skill(1);
            }
        }
        
        if(this.keys.two.isDown && this.isAlive)
        {
            if((this.game.time.now > this.nextSkill2) && !(this.blank2))
            {
                this.nextSkill2 = this.game.time.now + this.skillCoolDown;
                this.skill(2);
            }
        }
        
        if(this.keys.three.isDown && this.isAlive)
        {
            if((this.game.time.now > this.nextSkill3) && !(this.blank3))
            {
                this.nextSkill3 = this.game.time.now + this.skillCoolDown;
                this.skill(3);
            }
        }
        
        if(this.keys.four.isDown && this.isAlive)
        {
            if((this.game.time.now > this.nextSkill4) && !(this.blank4))
            {
                this.nextSkill4 = this.game.time.now + this.skillCoolDown;
                this.skill(4);
            }
        }
        
        if(this.keys.five.isDown && this.isAlive)
        {
            if((this.game.time.now > this.nextSkill5) && !(this.blank5))
            {
                this.nextSkill5 = this.game.time.now + this.skillCoolDown;
                this.skill(5);
            }
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
            this.skill4();
        }
        else
        {
            this.skill0();
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
    
    this.skill4 = function()
    {
        var i = 0;
        for(i = 0; i < 18; i++)
        {
            var whirlwind = this.whirlwinds.getFirstExists(false);
            whirlwind.reset(this.game.input.activePointer.x, this.game.input.activePointer.y);
            whirlwind.body.velocity.x = Math.cos(i*20) * 600;
            whirlwind.body.velocity.y = Math.sin(i*20) * 600;
            whirlwind.lifespan = 300;
            whirlwind.health = 5;
        }
        this.burst.play();
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
            enemy.body.velocity.x = this.game.rnd.integer() % 200;
            enemy.body.velocity.y = this.game.rnd.integer() % 200;
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
            
            var temp = this.game.rnd.integer() % 100;
            if(temp > 70)
                this.blank1 = true;
            else
                this.blank1 = false;
            
            temp = this.game.rnd.integer() % 100;
            if(temp > 70)
                this.blank2 = true;
            else
                this.blank2 = false
            
            temp = this.game.rnd.integer() % 100;
            if(temp > 70)
                this.blank3 = true;
            else
                this.blank3 = false;
            
            temp = this.game.rnd.integer() % 100;
            if(temp > 70)
                this.blank4 = true;
            else
                this.blank4 = false;
            
            temp = this.game.rnd.integer() % 100;
            if(temp > 70)
                this.blank5 = true;
            else
                this.blank5 = false;
        }
    };
    
    // handles monster attacks
    this.monsterHandler = function(player, enemy)
    {
        enemy.kill();
        this.health -= 10;
        if(this.health <= 0)
        {
            this.isAlive = false;
            player.kill();
            this.gameOver();
        }
        this.revive(enemy);
    }
    
    // handles boss projectile attacks
    this.shotHandler = function(player, enemy)
    {
        enemy.kill();
        this.health -= 10;
        if(this.health <= 0)
        {
            this.isAlive = false;
            player.kill();
            this.gameOver();
        }
    }
    
    // handles boss attacks
    this.bossHandler = function(boss, player)
    {
        boss.kill();
        this.health -= 50;
        if(this.health <= 0)
        {
            this.isAlive = false;
            player.kill();
            this.gameOver();
        }
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
    
    this.damageBoss = function(boss, bolt)
    {
        boss.health -= bolt.health;
        bolt.kill();
        if(boss.health <= 0)
        {
            boss.kill();
            this.score += 1000;
            this.bossAlive = false;
        }
    }
    
    this.updateBoss = function()
    {
        if(this.game.time.now > this.nextDarkness)
        {
            this.nextDarkness = this.game.time.now + 3000;
            var i = 0;
            for(i = 0; i < 12; i++)
            {
                var darkbolt = this.darkness.getFirstExists(false);
                darkbolt.reset(this.boss.x, this.boss.y);
                darkbolt.body.velocity.x = Math.cos(i*30) * 300;
                darkbolt.body.velocity.y = Math.sin(i*30) * 300;
            }
        }
    }
    
    //revives enemies as needed
    this.revive = function(enemy)
    {
        this.enemyKilled++;
        enemy.reset(20, 20);
        enemy.health = 10;
        enemy.body.velocity.x = game.rnd.integer() % 200;
        enemy.body.velocity.y = game.rnd.integer() % 200;
    };
    
    //handles timer
    this.updateTimer = function()
    {
        this.timerText.setText("" + parseInt((this.timer - this.game.time.now) / 1000));
        
        if(this.game.time.now > this.timer)
        {
            this.timerText.setText("0");
            this.score += 1000;
            this.player.kill();
            this.isAlive = false;
            this.gameOver();
        }
        
        if(!(this.bossSpawned) && ((this.timer - this.game.time.now) < 180000))
        {
            this.bossSpawned = true;
            this.boss = this.game.add.sprite( 100, 100, 'bossy');
            this.boss.health = 300;
            this.game.physics.enable( this.boss, Phaser.Physics.ARCADE );
            this.boss.body.bounce.set(1);
            this.boss.body.velocity.x = 50;
            this.boss.body.velocity.y = 50;
            this.boss.anchor.setTo( 0.5, 0.5 );
            this.boss.body.collideWorldBounds = true;
            this.bossAlive = true;
        }
    }
    
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
    this.keys.one = this.game.input.keyboard.addKey(Phaser.Keyboard.ONE);
    this.keys.two = this.game.input.keyboard.addKey(Phaser.Keyboard.TWO);
    this.keys.three = this.game.input.keyboard.addKey(Phaser.Keyboard.THREE);
    this.keys.four = this.game.input.keyboard.addKey(Phaser.Keyboard.FOUR);
    this.keys.five = this.game.input.keyboard.addKey(Phaser.Keyboard.FIVE);
    
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
    
    this.whirlwinds = this.game.add.group();
    this.whirlwinds.enableBody = true;
    this.whirlwinds.physicsBodyType = Phaser.Physics.ARCADE;
    this.whirlwinds.createMultiple(100, 'tornado', 0, false);
    this.whirlwinds.setAll('anchor.x', 0.5);
    this.whirlwinds.setAll('anchor.y', 0.5);
    this.whirlwinds.setAll('outOfBoundsKill', true);
    this.whirlwinds.setAll('checkWorldBounds', true);
    
    
    this.darkness = this.game.add.group();
    this.darkness.enableBody = true;
    this.darkness.physicsBodyType = Phaser.Physics.ARCADE;
    this.darkness.createMultiple(30, 'dark', 0, false);
    this.darkness.setAll('anchor.x', 0.5);
    this.darkness.setAll('anchor.y', 0.5);
    this.darkness.setAll('outOfBoundsKill', true);
    this.darkness.setAll('checkWorldBounds', true);
    this.nextDarkness = 0;
    
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
    
    //sets timer
    this.timer = this.game.time.now + this.timerStart;
    this.timerText = this.game.add.text(400, 50, "180", this.timerStyle);
    this.timerText.anchor.setTo(0.5, 0.5);
}

function update(){
    //updates blanks
    this.blankHandler();
    
    //check player input
    if(this.isAlive)
    {
        this.checkKeys();
        this.updateTimer();
    }
    
    //check collision
    this.game.physics.arcade.overlap(this.bolts, this.enemies, this.damageEnemy, null, this);
    this.game.physics.arcade.overlap(this.fireballs, this.enemies, this.damageEnemy, null, this);
    this.game.physics.arcade.overlap(this.thunders, this.enemies, this.damageEnemy, null, this);
    this.game.physics.arcade.overlap(this.icicles, this.enemies, this.damageEnemy, null, this);
    this.game.physics.arcade.overlap(this.whirlwinds, this.enemies, this.damageEnemy, null, this);
    this.game.physics.arcade.overlap(this.enemies, this.player, this.monsterHandler, null, this);
    
    this.game.physics.arcade.overlap(this.bolts, this.boss, this.damageBoss, null, this);
    this.game.physics.arcade.overlap(this.fireballs, this.boss, this.damageBoss, null, this);
    this.game.physics.arcade.overlap(this.thunders, this.boss, this.damageBoss, null, this);
    this.game.physics.arcade.overlap(this.icicles, this.boss, this.damageBoss, null, this);
    this.game.physics.arcade.overlap(this.whirlwinds, this.boss, this.damageBoss, null, this);
    
    this.game.physics.arcade.overlap(this.darkness, this.player, this.shotHandler, null, this);
    this.game.physics.arcade.overlap(this.boss, this.player, this.bossHandler, null, this);
    
    if((this.boss != null) && this.bossAlive)
        this.updateBoss();
    
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
    
    
    this.game.debug.text('Erupting Embers:', 200, 520);
    if(this.blank1)
    {
        this.game.debug.text('??????????', 200, 540);
    }
    else if(this.game.time.now < this.nextSkill1)
    {
        this.game.debug.text('NOT READY', 200, 540);
    }
    else
    {
        this.game.debug.text('READY!!!', 200, 540);
    }
    
    
    this.game.debug.text('Lightning Lancer:', 200, 570);
    if(this.blank2)
    {
        this.game.debug.text('??????????', 200, 590);
    }
    else if(this.game.time.now < this.nextSkill2)
    {
        this.game.debug.text('NOT READY', 200, 590);
    }
    else
    {
        this.game.debug.text('READY!!!', 200, 590);
    }
    
    
    this.game.debug.text('Blizzard Breeze:', 400, 520);
    if(this.blank3)
    {
        this.game.debug.text('??????????', 400, 540);
    }
    else if(this.game.time.now < this.nextSkill3)
    {
        this.game.debug.text('NOT READY', 400, 540);
    }
    else
    {
        this.game.debug.text('READY!!!', 400, 540);
    }
    
    
    this.game.debug.text('Tornado:', 400, 570);
    if(this.blank4)
    {
        this.game.debug.text('??????????', 400, 590);
    }
    else if(this.game.time.now < this.nextSkill4)
    {
        this.game.debug.text('NOT READY', 400, 590);
    }
    else
    {
        this.game.debug.text('READY!!!', 400, 590);
    }
    
    this.game.debug.text('Heal:', 600, 520);
    if(this.blank5)
    {
        this.game.debug.text('??????????', 600, 540);
    }
    else if(this.game.time.now < this.nextSkill5)
    {
        this.game.debug.text('NOT READY', 600, 540);
    }
    else
    {
        this.game.debug.text('READY!!!', 600, 540);
    }
}