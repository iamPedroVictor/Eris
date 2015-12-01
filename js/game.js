
var GameState = {

    preload: function(){
        game.load.image('starfield', "assets/starfield.png");
        game.load.spritesheet('player',"assets/navespritesheet.png", 399, 928, 12);
        game.load.image('bullet',"assets/bala.png");
        game.load.image('enemy', "assets/sprites/alien2.png");

    },

    create: function(){
        this.game.world.resize(800, 950);
        this.bulletsTime = 0;
        this.bulletsTime2 = 0;
        
        this.timeSpawnAliens = 500;
        
        this.aliens = this.game.add.group();
        this.aliens.enableBody = true;
        this.aliens.physicsBodyType = Phaser.Physics.ARCADE;
        game.physics.enable(this.aliens,Phaser.Physics.ARCADE);
        
        this.verifyDirection = " ";
        
        this.spaceField = this.game.add.tileSprite(0,0,800,900,'starfield');
        this.player = this.game.add.sprite(395, 800,'player');
        this.player.scale.x = 0.2;
        this.player.scale.y = 0.2;
        this.player.anchor.setTo(0.5, 0.5);
        
        this.game.physics.enable(this.player,Phaser.Physics.ARCADE);
        this.cursors = this.game.input.keyboard.createCursorKeys();

        this.player.body.collideWorldBounds = true;

        this.player.animations.add('front', [0, 1, 2, 3], 6);
        this.player.animations.add('left' , [4, 6, 7, 8], 6);
        this.player.animations.add('right', [5, 9, 10, 11], 6);

        this.bullets = game.add.group();
        this.bullets.enableBody = true;
        this.bullets.physicsBodyType = Phaser.Physics.ARCADE;
        this.bullets.createMultiple(1000,'bullet');
        this.bullets.setAll('anchor.x', 0.5);
        this.bullets.setAll('anchor.y', 1);
        this.bullets.setAll('outOfBoundskill', true);
        this.bullets.setAll('checkWorldBounds', true);
        
         //this.game.time.events.loop(this.timeSpawnAliens, this.createEnemies,this);

        this.fireButton = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        

    },
    update:function(){
        
       

        //this.game.physics.arcade.overlap(this.bullets, this.enemie, this.collisionHandler, null, this);
        this.spaceField.tilePosition.y += 2;
        this.player.body.velocity.x = 0;
        
        //this.aliens.forEachAlive(function(aliens) {
        //    this.game.physics.arcade.accelerateToObject(aliens, this.player, 600, 120, 120);}, this);

        if(this.cursors.left.isDown){
            this.player.body.velocity.x = -350;
            this.player.animations.play('left');
            this.verifyDirection = "left";
        }else if(this.cursors.right.isDown){
            this.player.body.velocity.x = 350;
            this.player.animations.play('right');
            this.verifyDirection = "right";
        }else{
            this.player.animations.play('front');
            this.verifyDirection = " ";
        }
        if(this.fireButton.isDown){
            this.fireBullet(this.verifyDirection);
            this.fireBullet2(this.verifyDirection);
        }

    },

    fireBullet:function(direc){
        if(this.game.time.now > this.bulletsTime){
            this.bullet = this.bullets.getFirstExists(false);
            if(this.bullet){
                this.bullet.reset(this.player.x - 25,this.player.y - 60);
                this.bullet.body.velocity.y = -250;
                if(direc == "left"){
                    this.bullet.body.velocity.x = -10;
                }
                if(direc == "right"){
                    this.bullet.body.velocity.x = +10;
                }
                if(direc == " "){
                    this.bullet.body.velocity.x = 0;
                }
                this.bulletsTime = this.game.time.now + 150;
            }
        }
    },
    fireBullet2:function(direc){
        if(this.game.time.now > this.bulletsTime2){
            this.bullet = this.bullets.getFirstExists(false);
            if(this.bullet){
                this.bullet.reset(this.player.x + 25,this.player.y - 60);
                this.bullet.body.velocity.y = -250;
                if(direc == "left"){
                    this.bullet.body.velocity.x = -10;
                }
                if(direc == "right"){
                    this.bullet.body.velocity.x = +10;
                }
                if(direc == " "){
                    this.bullet.body.velocity.x = 0;
                }
                this.bulletsTime2 = this.game.time.now + 150;
            }
        }
    },

    resetBullet:function(bullet){
        bullet.kill();
    },
    
    collisionHandler:function(bullet, veg){
        bullet.kill();
        veg.kill();
    },
    
    createEnemies:function(){
        this.randomValueX = game.rnd.integerInRange(10, 800);
        this.randomValueY = game.rnd.integerInRange(5, 200);
        this.enemie = this.game.add.sprite(this.randomValueX, this.randomValueY,'enemy');
        //this.game.add.tween(this.enemie).to({y: 1000}, 100, Phaser.Easing.Exponential.Out);
        /*for(var i = 0; i < 4; i++){
            this.randomValueX = game.rnd.integerInRange(10, 800);
            this.randomValueY = game.rnd.integerInRange(5, 200);
            this.alien = this.aliens.create(this.randomValueX, this.randomValueY, 'enemy');
            this.alien.anchor.setTo(0.5,0.5);
            this.alien.body.moves = false;
        }*/
        //this.game.add.tween(this.alien).from({alpha: 0},1500, Phaser.Easing.Linear.None, true, 0, 1000, true);
        //var tween = this.game.add.tween(this.alien).to({x: this.player.x, y: this.player.y}, 2000, Phaser.Easing.Linear.None, true, 0, 1000, true);
    }

}
