"use strict"; // sempre colocar no começo do arquivo

// Um estado é sempre um objeto JavaScript, com no mínimo as 3 funções principais:
// preload, create e update
// Não esquecer da vírgula depois da definição de cada função

var aboutStage = {
    // preload: carregar todos os assets necessários para esta scene ou para as próximas
    preload: function(){
        this.game.load.image('Creditos', "assets/Menu/credits2.png");
        this.game.load.image('planeta', "assets/Menu/planeta_eris.png");
        this.game.load.spritesheet('MenuAnim', "assets/fundo.png", 1200, 950,4);
        
        
        this.game.load.image('backNoSelect', "assets/Menu/back-nao-selecionado.png");
        this.game.load.image('backSelect', "assets/Menu/back-selecionado.png");
    },   
    
    // create: instanciar e inicializar todos os objetos dessa scene
    create: function(){
       // this.game.world.resize(900, 950);
        
        this.fundo = this.game.add.sprite(0, 0,'MenuAnim');
       // this.fundo.anchor.setTo(0.5, 0.5);
        this.fundo.animations.add('okie',[0,1,2,3],6);
        
        this.game.status = 2;
        
        this.infos = this.game.add.sprite(0, 0,'Creditos');
        
        this.keyEnter = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
        this.keyEnter.onDown.add(this.keyEventGameEnter, this);
        
        this.backSelect = this.game.add.sprite(890, 780, 'backSelect');
        
    },
    
    // update: o que fazer a cada quadro
    update: function(){
        this.fundo.animations.play('okie');

    },
    
    keyEventGameEnter: function(){
        this.game.state.start('introState');

    }
    
}