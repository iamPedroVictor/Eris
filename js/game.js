
var GameState = {

    preload: function(){
        game.load.image('starfield', "assets/starfield.png");
        game.load.spritesheet('player',"assets/navespritesheet.png", 399, 928, 12);
        game.load.spritesheet('asha_hud',"assets/Hud/asha_hud.png", 275, 265, 6);
        game.load.spritesheet('niko_hud',"assets/Hud/niko_hud.png", 275, 265, 6);
        game.load.image('bullet',"assets/bala.png");
        game.load.image('enemy', "assets/sprites/alien2.png");

    },

    create: function(){
        this.game.world.resize(1200, 950);
        this.bulletsTime = 0;
        this.bulletsTime2 = 0;
        
        this.playerLifePoint = 5000;
        
        this.verifyDirectionUD = " ";
        this.verifyDirectionLR = " ";
        
        this.spaceField = this.game.add.tileSprite(0,0,1200,950,'starfield');
        
        this.player = this.game.add.sprite(395, 800,'player');
        this.player.scale.x = 0.2;
        this.player.scale.y = 0.2;
        this.player.anchor.setTo(0.5, 0.5);
        
        this.game.physics.enable(this.player,Phaser.Physics.ARCADE);
        this.cursors = this.game.input.keyboard.createCursorKeys();

        this.player.body.collideWorldBounds = true;

        this.player.animations.add('front', [0, 1, 2, 3], 12);
        this.player.animations.add('frontUP', [0, 1, 2, 3], 16);
        this.player.animations.add('frontDW', [0, 1, 2, 3], 6);
        this.player.animations.add('left' , [4, 6, 7, 8], 12);
        this.player.animations.add('right', [5, 9, 10, 11], 12);

        this.bullets = game.add.group();
        this.bullets.enableBody = true;
        this.bullets.physicsBodyType = Phaser.Physics.ARCADE;
        this.bullets.createMultiple(1000,'bullet');
        this.bullets.setAll('anchor.x', 0.5);
        this.bullets.setAll('anchor.y', 1);
        this.bullets.setAll('outOfBoundskill', true);
        this.bullets.setAll('checkWorldBounds', true);
        
        this.aliens = game.add.group();
        this.aliens.enableBody = true;
        this.aliens.physicsBodyType = Phaser.Physics.ARCADE;
        
        this.aliensTimeSP = 1000;
        
        this.hud = this.game.add.sprite(100, 50,'asha_hud');
        this.hud.animations.add('5life',[0],6);
        this.hud.animations.add('4life',[1],6);
        this.hud.animations.add('3life',[2],6);
        this.hud.animations.add('2life',[3],6);
        this.hud.animations.add('1life',[4],6);
        this.hud.animations.add('0life',[5],6);
        this.hud.fixedToCamera = true;
        this.hud.animations.play('5life'); 
        
        
        //this.game.time.events.loop(this.timeSpawnAliens, this.createEnemies,this);

        this.fireButton = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        
        this.game.time.events.loop(this.aliensTimeSP, this.createAliens, this);

    },
    update:function(){
        this.hudAnimationsControler(this.playerLifePoint, this.hud);
        
        if (game.physics.arcade.collide(this.player, this.aliens, this.playerDamage, this.processHandler, this)){
            console.log('Vida');
            console.log(this.playerLifePoint);
        }

        this.game.physics.arcade.overlap(this.bullets, this.alien, this.collisionHandler, null, this);
        this.player.body.velocity.x = 0;
        
        this.aliens.forEachAlive(function(aliens) {
            this.game.physics.arcade.accelerateToObject(aliens, this.player, 1500, 250, 250);
            aliens.rotation = -1 * this.game.physics.arcade.angleBetween(aliens, this.player);}, this);

        
        if(this.cursors.left.isDown){
            this.player.body.velocity.x = -350;
            this.verifyDirectionLR = "left";
            this.player.animations.play('left');
        }else if(this.cursors.right.isDown){
            this.player.body.velocity.x = 350;
            this.player.animations.play('right');
            this.verifyDirectionLR = "right";
        }else{
            this.player.animations.play('front');
            this.verifyDirectionLR = " ";
        }
        
        
        if(this.cursors.up.isDown){
            this.player.body.velocity.y = -150;
            this.verifyDirectionUD = "Upper";
          //  this.spaceField.tilePosition.y += 8;
           // this.player.animations.play('front');
        }else if(this.cursors.down.isDown){
            this.player.body.velocity.y = +150;
           // this.player.animations.play('front');
            this.verifyDirectionUD = "Down";
          //  this.spaceField.tilePosition.y += 4;
        }else{
            this.player.body.velocity.y = 0;
            this.verifyDirectionUD = " "
       }
        
        if(this.verifyDirectionUD == "Upper" && this.verifyDirectionLR == "right"){
            this.spaceField.tilePosition.x -= 4;
            this.spaceField.tilePosition.y += 8;
            this.player.animations.play('right'); 
        }else if(this.verifyDirectionUD == "Upper" && this.verifyDirectionLR == "left"){
            this.player.animations.play('left');
            this.spaceField.tilePosition.x += 4;
            this.spaceField.tilePosition.y += 8;
        }else if(this.verifyDirectionUD == "Down" && this.verifyDirectionLR == "right"){
            this.spaceField.tilePosition.y += 2;
            this.spaceField.tilePosition.x -= 4;
            this.player.animations.play('right'); 
        }else if(this.verifyDirectionUD == "Down" && this.verifyDirectionLR == "left"){
            this.player.animations.play('left');
            this.spaceField.tilePosition.y += 2;
            this.spaceField.tilePosition.x += 4;
        }else if(this.verifyDirectionLR == "left"){
            this.spaceField.tilePosition.x += 4;
            this.spaceField.tilePosition.y += 5;
        }else if(this.verifyDirectionLR == "right"){
            this.spaceField.tilePosition.x -= 4;
            this.spaceField.tilePosition.y += 5;
        }else if(this.verifyDirectionUD == "Down"){
            this.spaceField.tilePosition.x -= 0;
            this.spaceField.tilePosition.y += 2;
        }else if(this.verifyDirectionUD == "Upper"){
            this.spaceField.tilePosition.x -= 0;
            this.spaceField.tilePosition.y += 8;
        }else{
            this.spaceField.tilePosition.y += 6;
            this.spaceField.tilePosition.x += 0;
        }
        
        if(this.fireButton.isDown){
            this.fireBullet(this.verifyDirection);
            this.fireBullet2(this.verifyDirection);
        }
        
        this.game.physics.arcade.overlap(this.bullets, this.aliens, this.collisionHandler, null, this);

    },

    fireBullet:function(direc){
        if(this.game.time.now > this.bulletsTime){
            this.bullet = this.bullets.getFirstExists(false);
            if(this.bullet){
                this.bullet.reset(this.player.x - 25,this.player.y - 60);
                this.bullet.body.velocity.y = -250;
                if(direc == "left"){
            //        this.bullet.body.velocity.x = -100;
                }
                if(direc == "right"){
              //      this.bullet.body.velocity.x = +100;
                }
                if(direc == " "){
               //     this.bullet.body.velocity.x = 0;
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
                   // this.bullet.body.velocity.x = -100;
                }
                if(direc == "right"){
                   // this.bullet.body.velocity.x = +100;
                }
                if(direc == " "){
                   // this.bullet.body.velocity.x = 0;
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
        console.log("Acertou algo");
    },
    
    createAliens:function() {
        this.x = game.rnd.integerInRange(100, 800);
        this.alien = this.aliens.create(this.x, 10, 'enemy');
        this.alien.anchor.setTo(0.5, 0.5);
        this.alien.body.moves = true;
        this.alien.rotation = this.game.physics.arcade.accelerateToXY(this.alien, this.player.x, this.player.y -10, 1000, 250, 250);
    },
    
    playerDamage:function(player, veg) {
        this.playerLifePoint -= 100;
        veg.kill();
    },
    processHandler:function (player, veg) {
        return true;
    },
    
    hudAnimationsControler: function(points,hud){
        if(points > 4000){
            this.hud.animations.play('5life');
        }else if(points > 3000 && points < 4000){
            this.hud.animations.play('4life');
        }else if(points > 2000 && points < 3000){
            this.hud.animations.play('3life');
        }else if(points > 1000 && points < 2000){
            this.hud.animations.play('1life');
        }else if(points <= 0){
            this.hud.animations.play('0life');
        }
        
    }


}
