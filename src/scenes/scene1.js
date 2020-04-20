import Phaser from 'phaser';

import fontImg from '../assets/font/font.PNG'
import fontXml from '../assets/font/font.xml'

import beamMp3 from '../assets/sounds/beam.mp3'
import beamOGG from '../assets/sounds/beam.ogg'
import explosionMp3 from '../assets/sounds/explosion.mp3'
import explosionOGG from '../assets/sounds/explosion.ogg'
import pickupMp3 from '../assets/sounds/pickup.mp3'
import pickupOGG from '../assets/sounds/pickup.ogg'
import scifiMp3 from '../assets/sounds/sci-fi_platformer12.mp3'
import scifiOGG from '../assets/sounds/sci-fi_platformer12.ogg'

import backgroundImg from '../assets/background.png';
import shipImg from '../assets/spritesheets/enemy-small.PNG';
import ship2Img from '../assets/spritesheets/enemy-medium.PNG';
import ship3Img from '../assets/spritesheets/enemy-big.PNG';
import explosionImg from '../assets/spritesheets/explosion.PNG';
import powerUpImg from '../assets/spritesheets/power-up.PNG';
import laserImg from '../assets/spritesheets/laser-bolts.PNG';
import playerSprite from '../assets/player.PNG';

export default class Scene1 extends Phaser.Scene{
  constructor(){
    super("bootGame");
  }

  preload(){
    this.load.audio("audio_beam",[beamOGG,beamMp3]);
    this.load.audio("audio_explosion",[explosionOGG,explosionMp3]);
    this.load.audio("audio_pickup",[pickupOGG,pickupMp3]);
    this.load.audio("music",[scifiOGG,scifiMp3]);

    this.load.image('background',backgroundImg);
    // this.load.image("ship01", shipImg);
    // this.load.image('ship02',ship2Img);
    // this.load.image('ship03',ship3Img);

    this.load.spritesheet("player",playerSprite,{
      frameWidth:16,
      frameHeight:24,
    })

    this.load.spritesheet("ship01", shipImg,{
      frameWidth:16,
      frameHeight:16,
    })

    this.load.spritesheet("ship02", ship2Img,{
      frameWidth:32,
      frameHeight:16,
    })

    this.load.spritesheet("ship03", ship3Img,{
      frameWidth:32,
      frameHeight:32,
    })

    this.load.spritesheet("explosion", explosionImg,{
      frameWidth:16,
      frameHeight:16,
    })
    
    this.load.spritesheet("power-up", powerUpImg,{
      frameWidth:16,
      frameHeight:16,
    })

    this.load.spritesheet("beam", laserImg,{
      frameWidth:16,
      frameHeight:16
    })

    this.load.bitmapFont("pixelFont",fontImg,fontXml);
  }

  create(){
    this.add.text(50, 50,'Loading...')
    this.scene.start("playGame")

    this.anims.create({
      key:"ship1_anim",
      frames: this.anims.generateFrameNumbers('ship01'),
      frameRate:20,
      repeat:-1
    })

    this.anims.create({
      key:"ship2_anim",
      frames: this.anims.generateFrameNumbers('ship02'),
      frameRate:20,
      repeat:-1
    })

    this.anims.create({
      key:"ship3_anim",
      frames: this.anims.generateFrameNumbers('ship03'),
      frameRate:20,
      repeat:-1
    })
    
    this.anims.create({
      key:"explode_anim",
      frames: this.anims.generateFrameNumbers('explosion'),
      frameRate:20,
      repeat:0,
      hideOnComplete:true
    })

    this.anims.create({
      key:"red",
      frames:this.anims.generateFrameNumbers("power-up",{
        start:0,
        end:1
      }),
      frameRate:20,
      repeat:-1
    })

    this.anims.create({
      key:"gray",
      frames:this.anims.generateFrameNumbers("power-up",{
        start:2,
        end:3
      }),
      frameRate:20,
      repeat:-1
    })

    this.anims.create({
      key:"playering",
      frames:this.anims.generateFrameNumbers("player"),
      frameRate:20,
      repeat:-1,
    })

    this.anims.create({
      key:"beam_anim",
      frames:this.anims.generateFrameNumbers("beam",{
        start:2,
        end:3
      }),
      frameRate:20,
      repeat:-1,
    })

  }
}