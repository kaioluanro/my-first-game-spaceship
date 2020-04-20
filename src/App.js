import React from 'react';
import './App.css';
import Phaser from 'phaser';
import Scene1 from './scenes/scene1';
import Scene2 from './scenes/scene2';
import {Ouvindo} from './menuPower';

export const gameSettings = {
  playerSpeed:100,
}

export function config(){
  const configCanvas = {
    width:256,
    height:272,
    backgroundColor:0xF0C12B,
    scene:[Scene1,Scene2],
    pixilArt:true,
    physics:{
      default:"arcade",
      arcade:{
        debug:false
      }
    }
  }

  return configCanvas;
}

class App extends React.Component{
  
  componentDidMount(){
    this.renderCanvas()
  }

  renderCanvas(){
    const configCanvas = config();

    const game = new Phaser.Game(configCanvas);
  }

  render(){
    return (
      <div className="App">
        <h1>My Firts Game</h1>
        <div><h2 id="score">SCORE 000000</h2></div>
      </div>
    );
  }
}

export default App;
