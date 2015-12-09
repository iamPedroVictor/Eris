"use strict"; // sempre colocar no começo do arquivo

// Um estado é sempre um objeto JavaScript, com no mínimo as 3 funções principais:
// preload, create e update
// Não esquecer da vírgula depois da definição de cada função

var IntroState = {
    // preload: carregar todos os assets necessários para esta scene ou para as próximas
    preload: function(){
        game.load.image('MenuBG', "assets/Menu/menu.png");
        
        game.load.image('startNoSelect', "assets/Menu/botao-de-play-nao-selecionado.png");
        game.load.image('startSelect', "assets/Menu/botao-play-selecionado.png");
        
        game.load.image('creditosNoSelect', "assets/Menu/botao-de-creditos-nao-selecionado.png");
        game.load.image('creditosSelect', "assets/Menu/botao-creditos-selecionado.png");
        
        
    },   
    
    // create: instanciar e inicializar todos os objetos dessa scene
    create: function(){
        this.game.world.resize(1200, 950);
        
        this.spaceField = this.game.add.tileSprite(0,0,1200,950,'MenuBG');
        
        this.game.status = 2;
        
        this.keyEnter = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
        this.keyEnter.onDown.add(this.keyEventGameEnter, this);
        
        this.keyUp = game.input.keyboard.addKey(Phaser.Keyboard.UP);
        this.keyUp.onDown.add(this.keyEventGameUp, this);
        
        this.keyDw = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
        this.keyDw.onDown.add(this.keyEventGameDw, this);
        
        this.spStartSelc = this.game.add.sprite(400, 350, 'startSelect', 0);
        this.spStartNoSelc = this.game.add.sprite(400, 350, 'startNoSelect', 0);
        
        this.spAboutSelc = this.game.add.sprite(400, 550, 'creditosSelect', 0);
        this.spAboutNoSelc = this.game.add.sprite(400, 550, 'creditosNoSelect', 0);
        
    },
    
    // update: o que fazer a cada quadro
    update: function(){
        if(this.game.status == 2){
            this.spStartSelc.alpha = 1;
            this.spStartNoSelc.alpha = 0;
            
            this.spAboutSelc.alpha = 0;
            this.spAboutNoSelc.alpha = 1;
            
        }else if(this.game.status == 1){
            this.spStartSelc.alpha = 0;
            this.spStartNoSelc.alpha = 1;
            
            this.spAboutSelc.alpha = 1;
            this.spAboutNoSelc.alpha = 0;
            
        }
        

    },
    
    keyEventGameEnter: function(){
        if(this.game.status == 2){
            this.game.state.start('gameState');
            console.log("GameState");
        }else if(this.game.status == 1){
            this.game.state.start('aboutState');
            console.log("Creditos");
        }
    },
    
    keyEventGameUp: function(){
        if(this.game.status < 2 && this.game.status > 0)
            this.game.status += 1;
        console.log("Valor do estado aumentou:");
        console.log(this.game.status);
    },
    
    keyEventGameDw: function(){
        if(this.game.status < 3 && this.game.status > 1) 
            this.game.status -= 1;
        console.log("Valor do estado diminuiu:");
        console.log(this.game.status);
    }
    
}