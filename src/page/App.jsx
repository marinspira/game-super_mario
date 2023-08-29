import React, { useState, useEffect, useRef } from 'react';

// assets
import './App.css';
import clouds from '../assets/clouds.png';
import over from '../assets/game-over.png';
import marioImg from '../assets/mario.gif';
import pipeImg from '../assets/pipe.png';

function App() {
  const pipe = useRef(null)
  const mario = useRef(null)

  const [isJumping, setIsJumping] = useState(false);
  const [alive, setAlive] = useState(marioImg)

  useEffect(() => {

    // Faz o Mario pular quando qualquer tecla for pressionada
    const handleKeyDown = () => {
      setIsJumping(true);
      setTimeout(() => {
        setIsJumping(false);
      }, 1000);
    };
    window.addEventListener('keydown', handleKeyDown);

    // Verifica se o Mario pulou quando o pipe chega a uma determinada área da tela
    if (pipe.current && mario.current) {
      setInterval(() => {
        const pipePosition = pipe.current.offsetLeft;
        const marioPosition = +window.getComputedStyle(mario.current).bottom.replace('px', '')
        
        if (pipePosition <= 120 && marioPosition <= 210) {
          pipe.current.style.animation = 'none'
          pipe.current.style.left = `${pipePosition}px`
          mario.current.style.animation = 'none'
          mario.current.style.bottom = `${marioPosition}px`
          setAlive(over)
        }
      }, 10);
    }
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [pipe]);

  return (
    <div className='app'>
      <img className='clouds' src={clouds} alt='clouds'/>
      <img ref={mario} className={`mario ${isJumping ? 'jump' : ''}`} src={alive} alt='Mario' />
      <img ref={pipe} className='pipe' src={pipeImg} alt='Pipe' />
    </div>
  );
}

export default App;