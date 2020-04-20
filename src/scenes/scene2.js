import Phaser from 'phaser';
import {config, gameSettings} from '../App';
import {Ouvindo} from '../menuPower';
import Beam from './beam';
import Explosion from './explosion';

export default class Scene2 extends Phaser.Scene{
  constructor(){
    super("playGame");
  }

  create(){
    this.background = this.add.tileSprite(0,0,config().width,config().height,'background');
    this.background.setOrigin(0,0);

    this.ship01 = this.add.sprite(config().width / 2 - 50,config().height/2,"ship01");
    this.ship02 = this.add.sprite(config().width / 2,config().height/2,"ship02");
    this.ship03 = this.add.sprite(config().width / 2 + 50,config().height /2,"ship03");
    
    this.enemies = this.physics.add.group();
    this.enemies.add(this.ship01);
    this.enemies.add(this.ship02);
    this.enemies.add(this.ship03);

    this.ship01.play('ship1_anim');
    this.ship02.play('ship2_anim');
    this.ship03.play('ship3_anim');

    this.ship01.setInteractive();
    this.ship02.setInteractive();
    this.ship03.setInteractive();
    
    this.input.on('gameobjectdown',this.destroyShip,this);

    
    this.powerUps = this.physics.add.group();
    this.projectiles = this.add.group();

    var maxObjects = 5;
    for(var i=0; i<=maxObjects;i++){
      var powerUp= this.physics.add.sprite(16,16,"power-up");
      this.powerUps.add(powerUp);
      powerUp.setRandomPosition(0,0, config().width,config().height);
      
      if(Math.random()>0.5){
        powerUp.play("red");
      }else{
        powerUp.play("gray");
      }
          
      powerUp.setVelocity(100,100);
      powerUp.setCollideWorldBounds(true);
      powerUp.setBounce(1);
          
          
    }

        
    this.player = this.physics.add.sprite(config().width / 2 -8,config().height - 64, "player");
    this.player.play("playering");
    this.cursorKeys = this.input.keyboard.createCursorKeys();
    this.player.setCollideWorldBounds(true);

    this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    this.physics.add.collider(this.projectiles, this.powerUps,(projectile,powerUp)=>{
      projectile.destroy();
    });

    this.physics.add.overlap(this.player, this.powerUps, this.pickPowerUp, null,this);
    this.physics.add.overlap(this.player, this.enemies, this.hurtPlayer, null,this);
    this.physics.add.overlap(this.projectiles, this.enemies, this.hitEnemy, null,this);

    var graphics = this.add.graphics();
    graphics.fillStyle(0x000000, 1);
    graphics.beginPath();
    graphics.moveTo(0,0);
    graphics.lineTo(config().width, 0);
    graphics.lineTo(config().width, 20);
    graphics.lineTo(0,20);
    graphics.lineTo(0,0);
    graphics.closePath();
    graphics.fillPath();

    this.score=0;
    this.heady=0;

    this.scoreLabel=this.add.bitmapText(10, 5,"pixelFont",'SCORE',16)
    
    this.beamSound = this.sound.add('audio_beam');
    this.explosionSound =this.sound.add('audio_explosion');
    this.pickupSound = this.sound.add('audio_pickup');

    this.music = this.sound.add('music');

    const musicConfig= {
      mute:false,
      volume: 0.5,
      rate:1,
      detune:0,
      seek:0,
      loop:false,
      delay:0
    }

    // this.music.play(musicConfig);

  }
  
  pickPowerUp(player, powerUp){
    powerUp.disableBody(true,true);
    this.pickupSound.play();
  }

  hurtPlayer(player,enemy){
    this.resetShipPos(enemy);
    
    if(this.player.alpha < 1){
      return;
    }

    var explosion = new Explosion(this, player.x,player.y);
    // this.explosionSound.play();
    this.createTExtDom();
    player.disableBody(true,true);

    this.time.addEvent({
      delay:1000,
      callback:this.resetPLayer,
      callbackScope:this,
      loop:false
    })
  }

  createTExtDom(){
    this.heady += 1;
    let text = ['Já foi uma Vida', "Tenta mais Uma vez", "Vishhh... Ta dificil", "Ja era Game-Over"];
    
    const textElemento = document.createElement('h1');

    console.log(this.heady)
    switch(this.heady){
      case 2:
        document.getElementById("01ul").appendChild(document.createTextNode(text[0]));
        break;
      case 3:
        document.getElementById("02ul").appendChild(document.createTextNode(text[1]));
        break;
      case 4:
        document.getElementById("03ul").appendChild(document.createTextNode(text[2]));
        break;
      case 5:
        document.getElementById("04ul").appendChild(document.createTextNode(text[3]));
        break;

    }
    
  }

  resetPLayer(){
    var x = config().width /2 -8
    var y = config().height +64
    this.player.enableBody(true,x,y,true,true);

    this.player.alpha = 0.5;

    var tween = this.tweens.add({
      targets: this.player,
      y:config().height - 64,
      ease:'Power1',
      duration:1500,
      repeat:0,
      onComplete:function(){
        this.player.alpha = 1;
      },
      callbackScope:this
    })
  }

  hitEnemy(projectile,enemy){

    this.explosionSound.play();
    var explosion = new Explosion(this, enemy.x,enemy.y);
    
    this.resetShipPos(enemy);
    projectile.destroy();
    this.score += 15;
    var scoreFormated = this.zeroPad(this.score, 6);
    this.scoreLabel.text = 'SCORE ' + scoreFormated;
    let textCLient = 'SCORE ' + scoreFormated;

    document.getElementById('score').innerHTML = textCLient

  }

  zeroPad(number, size){
    var stringNumber = String(number);
    while(stringNumber.length < (size || 2)){
      stringNumber = "0"+stringNumber;
    }
    return stringNumber;
  }

  update(){
    this.moveShip(this.ship01,1);
    this.moveShip(this.ship02,2);
    this.moveShip(this.ship03,3);
    

    this.background.tilePositionY -= 0.5;
    this.movePlayerManager();

    
  }

  moveShip(ship,speed){
    ship.y += speed;
    if(ship.y > config().height){
      this.resetShipPos(ship)
    }
  }

  resetShipPos(ship){
    ship.y =0;
    const randomX = Phaser.Math.Between(0,config().width);
    ship.x = randomX;
  }

  destroyShip(pointer, gameObject){
    gameObject.setTexture('explosion');
    gameObject.play("explode_anim");
  }

 movePlayerManager(){
   if(this.cursorKeys.left.isDown){
     this.player.setVelocityX(-gameSettings.playerSpeed);
   }else if(this.cursorKeys.right.isDown){
     this.player.setVelocityX(gameSettings.playerSpeed);
   }

   if(this.cursorKeys.up.isDown){
     this.player.setVelocityY(-gameSettings.playerSpeed);
   }else if(this.cursorKeys.down.isDown){
     this.player.setVelocityY(gameSettings.playerSpeed);
   }

   if(Phaser.Input.Keyboard.JustDown(this.spacebar)){
     if(this.player.active){
      this.shootBeam();
     }
     
   }

   for(var i = 0; i < this.projectiles.getChildren().length; i++){
     var beam = this.projectiles.getChildren()[i];

     beam.update();
   }
 }

 shootBeam(){
   var beam = new Beam(this);
  //  this.beamSound.play({volume:0.4});
 }

 
}