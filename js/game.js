
var GameState = {

    preload: function(){

        this.game.load.image('pausePopUp', "assets/Menu/pause.png");
        this.game.load.spritesheet('player',"assets/navespritesheet.png", 102, 228, 12);
        this.game.load.image('bullet',"assets/bala.png");
        this.game.load.image('bullet2',"assets/tiro2.png");
        this.game.load.spritesheet('bullet3', "assets/missil.png", 25, 55, 2);
        
        this.game.load.spritesheet('enemy', "assets/menor.png", 110, 110, 4);
        
        this.game.load.spritesheet('asha_hud',"assets/Hud/asha_hud.png", 275, 265, 6);
        this.game.load.spritesheet('niko_hud',"assets/Hud/niko_hud.png", 275, 265, 6);
        this.game.load.image('hudFundo',"assets/Hud/fundo.png");
        this.game.load.image('star', "assets/star.png");

    },

    create: function(){
        this.game.world.resize(1200, 950);
        this.bulletsTime = 0;
        this.bulletsTime2 = 0;
        
        this.bulletsTimeS = 0;
        this.bulletsTimeS2 = 0;
        
        this.bulletsTimeD = 0;
        this.bulletsTimeD2 = 0;
        
        this.scorePoint = 0;
        
        this.playerLifePoint = 5000;
        
        this.verifyDirectionUD = " ";
        this.verifyDirectionLR = " ";
        
        
        this.player = this.game.add.sprite(500, 700,'player');
       // this.player.scale.x = 0.2;
       // this.player.scale.y = 0.2;
        this.player.anchor.setTo(0.5, 0.5);
        game.camera.follow(this.player);
        
        this.game.physics.enable(this.player,Phaser.Physics.ARCADE);
        this.cursors = this.game.input.keyboard.createCursorKeys();

        this.player.body.collideWorldBounds = true;

        this.player.animations.add('front', [0, 1, 2, 3], 12);
        this.player.animations.add('frontUP', [0, 1, 2, 3], 16);
        this.player.animations.add('frontDW', [0, 1, 2, 3], 6);
        this.player.animations.add('left' , [4, 5, 6, 7], 12);
        this.player.animations.add('right', [8, 9, 10, 11], 12);

        this.bullets = game.add.group();
        this.bullets.enableBody = true;
        this.bullets.physicsBodyType = Phaser.Physics.ARCADE;
        this.bullets.createMultiple(1000,'bullet');
        this.bullets.setAll('anchor.x', 0.5);
        this.bullets.setAll('anchor.y', 1);
        this.bullets.setAll('outOfBoundskill', true);
        this.bullets.setAll('checkWorldBounds', true);
        
        this.bullets2 = game.add.group();
        this.bullets2.enableBody = true;
        this.bullets2.physicsBodyType = Phaser.Physics.ARCADE;
        this.bullets2.createMultiple(200,'bullet2');
        this.bullets2.setAll('anchor.x', 0.5);
        this.bullets2.setAll('anchor.y', 1);
        this.bullets2.setAll('outOfBoundskill', true);
        this.bullets2.setAll('checkWorldBounds', true);
        
        this.bullets3 = game.add.group();
        this.bullets3.enableBody = true;
        this.bullets3.physicsBodyType = Phaser.Physics.ARCADE;
        
        this.aliens = game.add.group();
        this.aliens.enableBody = true;
        this.aliens.physicsBodyType = Phaser.Physics.ARCADE;
        
        this.aliensTimeSP = 1000;
        
        
        this.hudFundoA = this.game.add.sprite(160, 680, 'hudFundo');
        this.hudFundoA.fixedToCamera = true;
        
        this.hudAsha = this.game.add.sprite(120, 720,'asha_hud');
        this.hudAsha.scale.x = 0.7;
        this.hudAsha.scale.y = 0.7;
        this.hudAsha.animations.add('5life',[0],6);
        this.hudAsha.animations.add('4life',[1],6);
        this.hudAsha.animations.add('3life',[2],6);
        this.hudAsha.animations.add('2life',[3],6);
        this.hudAsha.animations.add('1life',[4],6);
        this.hudAsha.animations.add('0life',[5],6);
        this.hudAsha.fixedToCamera = true;
        this.hudAsha.animations.play('5life');
        this.textScore = game.add.text(725, 770, "Score: ", {
            font: "32px Arial",
            fill: "#FFFFFF",
            align: "center"
        });
        this.textScore.fixedToCamera = true;
        
        this.atualArma = "Normal";
        this.second = true;
        this.third = true;

        
        this.pausePopUp = this.game.add.sprite(600, 475,'pausePopUp');
        this.pausePopUp.anchor.setTo(0.5,0.5);
        this.pauseKey = game.input.keyboard.addKey(Phaser.Keyboard.P);
        this.pauseKey.onDown.add(this.togglePause, this);
        this.pausePopUp.fixedToCamera = true;
        this.pause = false;
        this.game.add.tween(this.pausePopUp).to({ alpha: 0}, 150, Phaser.Easing.Bounce.Out, true);
        
        this.changeWeaponA = game.input.keyboard.addKey(Phaser.Keyboard.A);
        this.changeWeaponA.onDown.add(this.changeNormal, this);
        
        this.changeWeaponS = game.input.keyboard.addKey(Phaser.Keyboard.S);
        this.changeWeaponS.onDown.add(this.changeSecond, this);   
         
        this.changeWeaponD = game.input.keyboard.addKey(Phaser.Keyboard.D);
        this.changeWeaponD.onDown.add(this.changeThird, this);   
        
        this.stars = game.add.group();
        this.stars.enableBody = true;
        this.stars.physicsBodyType = Phaser.Physics.ARCADE;
        //this.stars.setAll('outOfBoundskill', true);
      //  this.stars.setAll('checkWorldBounds', true);
        
        this.startStars();
        
        //this.game.time.events.loop(this.timeSpawnAliens, this.createEnemies,this);

        this.fireButton = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        
        this.game.time.events.loop(this.aliensTimeSP, this.createAliens, this);

    },
    
    changeNormal:function(){
        this.atualArma = "Normal";
    },
    
    changeSecond:function(){
        if(this.second == true) 
            this.atualArma = "Second";
    },
    changeThird:function(){
        if(this.third == true) 
            this.atualArma = "Third";
    },
    
    update:function(){
        this.hudAnimationsControler(this.playerLifePoint, this.hud);
        
        this.spawnStar();
        
        if (game.physics.arcade.collide(this.player, this.aliens, this.playerDamage, this.processHandler, this)){
            console.log('Vida');
            console.log(this.playerLifePoint);
        }

        this.game.physics.arcade.overlap(this.bullets, this.alien, this.collisionHandler, null, this);
        if (game.physics.arcade.collide(this.bullet3, this.aliens, this.collisionHandler, this.processHandler, this)){
            console.log('Vida');
            console.log(this.playerLifePoint);
        }
        this.game.physics.arcade.overlap(this.bullets2, this.alien, this.collisionHandler, null, this);
        this.game.physics.arcade.overlap(this.bullets3, this.alien, this.collisionHandler, null, this);
       
        this.player.body.velocity.x = 0;
        
        this.aliens.forEachAlive(function(aliens) {
            this.game.physics.arcade.accelerateToObject(aliens, this.player, 2000, 250, 250);
            aliens.rotation = this.game.physics.arcade.angleBetween(aliens, this.player);
            aliens.animations.play('alien12');}, this);
        
        this.bullets3.forEachAlive(function(bullets) {
            bullets.animations.play('bullet32');}, this);

        
        if((this.cursors.left.isDown) && (!this.cursors.right.isDown)){
            this.player.body.velocity.x = -350;
            this.verifyDirectionLR = "left";
            this.player.animations.play('left');
        }else if((this.cursors.right.isDown) && (!this.cursors.left.isDown)){
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
            this.player.animations.play('right'); 
        }else if(this.verifyDirectionUD == "Upper" && this.verifyDirectionLR == "left"){
            this.player.animations.play('left');

        }else if(this.verifyDirectionUD == "Down" && this.verifyDirectionLR == "right"){

            this.player.animations.play('right'); 
        }else if(this.verifyDirectionUD == "Down" && this.verifyDirectionLR == "left"){
            this.player.animations.play('left');

        }
 
        
        if(this.fireButton.isDown){
            this.fireBullet(this.verifyDirection);
            this.fireBullet2(this.verifyDirection);
        }
        
        this.game.physics.arcade.overlap(this.bullets, this.aliens, this.collisionHandler, null, this);

    },

    fireBullet:function(direc){
        if(this.atualArma == "Normal"){
            if(this.game.time.now > this.bulletsTime){
                this.bullet = this.bullets.getFirstExists(false);
                if(this.bullet){
                    this.bullet.reset(this.player.x - 25,this.player.y - 60);
                    this.bullet.body.velocity.y = -250;
                    this.bulletsTime = this.game.time.now + 300;
                }
            }
        }else if(this.atualArma == "Third"){
            if(this.game.time.now > this.bulletsTimeD){
                this.bullet3 = this.bullets3.create(this.player.x - 25, this.player.y - 60, 'bullet3');
                this.bullet3.animations.add('bullet32', [0,1], 6);
                this.bullet3.body.moves = true;
                this.bullet3.body.velocity.y = -700;
                this.bulletsTimeD = this.game.time.now + 700;
            }
        }
    },
    
    fireBullet2:function(direc){
        if(this.atualArma == "Normal"){
            if(this.game.time.now > this.bulletsTime2){
                this.bullet = this.bullets.getFirstExists(false);
                if(this.bullet){
                    this.bullet.reset(this.player.x + 25,this.player.y - 60);
                    this.bullet.body.velocity.y = -250;
                }
                this.bulletsTime2 = this.game.time.now + 300;
            }
        }else if(this.atualArma == "Second"){
            if(this.game.time.now > this.bulletsTimeS2){
                this.bullet2 = this.bullets2.getFirstExists(false);
                if(this.bullet2){
                    this.bullet2.reset(this.player.x,this.player.y - 80);
                    this.bullet2.body.velocity.y = -350;
                }
                this.bulletsTimeS2 = this.game.time.now + 500;
            }
        }  
    },

    resetBullet:function(bullet){
        bullet.kill();
    },
    
    collisionHandler:function(b, veg){
        b.kill();
        veg.kill();
        this.scorePoint += 10;
        this.textScore.setText("Score: "+ this.scorePoint);
        console.log(this.scorePoint);
    },
    
    createAliens:function() {
        for(var i = 0; i < 2; i++){
            this.x = game.rnd.integerInRange(100, 800);
            this.y = game.rnd.integerInRange(0, 80);

            this.alien = this.aliens.create(this.x * 1.5, this.y, 'enemy');
            this.alien.animations.add('alien12', [0, 1, 2, 3], 6);
            this.alien.animations.play('alien12');
            this.alien.anchor.setTo(0.5, 1);
            this.alien.body.moves = true;
            this.alien.rotation = this.game.physics.arcade.accelerateToXY(this.alien, this.player.x, this.player.y + 10, 1000, 250, 250);
        }
    },
    
    playerDamage:function(player, veg) {
        this.playerLifePoint -= 1000;
        veg.kill();
        this.gameOver();
    },
    processHandler:function (player, veg) {
        return true;
    },
    
    startStars:function(){
        for (var i = 0; i < 90; i++){
                this.rndscale = ((game.rnd.integerInRange(2, 7)) / 10);
                this.star = this.stars.create(game.rnd.integerInRange(10, 1190), game.rnd.integerInRange(10, 940), 'star');
                this.star.scale.setTo(this.rndscale, this.rndscale);
                this.star.body.velocity.y = this.rndscale * 800;
                this.star.anchor.setTo(0.5, 0.5);
            }
    },
    
    spawnStar: function(){
            this.rndscale = ((game.rnd.integerInRange(2, 7)) / 10);
            this.star = this.stars.create(game.rnd.integerInRange(10, 1190), -25, 'star');
            this.star.scale.setTo(this.rndscale, this.rndscale);
            this.star.body.velocity.y = this.rndscale * 800;
            this.star.anchor.setTo(0.5, 0.5);
    },
    
    gameOver: function(){
        if(this.playerLifePoint <= 0){
            this.game.state.start('introState');
        }
    },
    
    hudAnimationsControler: function(points,hud){
        if(points == 4000){
            this.hudAsha.animations.play('5life');
        }else if(points == 3000 ){
            this.hudAsha.animations.play('4life');
        }else if(points == 2000 ){
            this.hudAsha.animations.play('3life');
        }else if(points == 1000){
            this.hudAsha.animations.play('1life');
        }else if(points <= 0){
            this.hudAsha.animations.play('0life');
        }
        
    },
    
    togglePause: function(){
        if(this.game.paused){
            this.game.add.tween(this.pausePopUp).to({ alpha: 0}, 150, Phaser.Easing.Bounce.Out, true);
            //this.game.physics.arcade.isPaused = (this.game.physics.arcade.isPaused) ? false : true;
            this.hudFundoA.alpha = 1;
            this.hudAsha.alpha = 1;
            this.game.paused = false;
        }else{
            this.game.add.tween(this.pausePopUp).from( { alpha: 1}, 150, Phaser.Easing.Bounce.Out, true);
            this.hudFundoA.alpha = 0;
            this.hudAsha.alpha = 0;            
           // this.game.physics.arcade.isPaused = (this.game.physics.arcade.isPaused) ? false : true;
            this.game.paused = true;
        }
        
    }   
}
