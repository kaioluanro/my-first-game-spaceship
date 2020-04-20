import React,{useEffect,useState} from 'react';
import './menuPower.css';
import ghostImg from './assets/player.PNG';

export default class MenuPower extends React.Component{

render(){
    return(
        <div className="menuPower">
        <div className="componentesMenu">
          <ul ><h1 id='01ul'></h1></ul>
          <ul ><h1 id='02ul'></h1></ul>
          <ul ><h1 id='03ul'></h1></ul>
          <ul ><h1 id='04ul'></h1></ul>
        </div>
      </div>
    )
  }
}

