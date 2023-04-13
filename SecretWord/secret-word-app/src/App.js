// Style css
import './App.css';

// React

import { useCallback, useEffect, useState } from 'react';

// Data

import { wordsList } from './data/words';

// Components
import StartScreen from './components/StartScreen';
import GameOver from './components/GameOver';
import Game from './components/Game';


// Game

const stages = [
  { id: 1, name: "start"},
  { id: 2, name: "game" },
  { id: 3, name: "end" },
];


function App() {

  const [gameStage, setGameStage] = useState(stages[0].name);
  const [words] = useState(wordsList)

  const [pickedWord, setPickedWord] = useState("")
  const [pickedCategory, setPickedCategory] = useState("")
  const [letters, setLetters] = useState([]);

  const pickedWordAndCategory= () =>{
  
    // pick a random category
    const categories = Object.keys(words)
    const category = categories[Math.floor(Math.random() * Object.keys(categories).length)];

    console.log(category);

    // pick a random word    
    const word = words[category][Math.floor(Math.random() * words[category].length)];

    console.log(word);
  }

  // inicio do jogo
  const startGame = () => {

    // pick word and picke category 

    pickedWordAndCategory();


    setGameStage(stages[1].name)

  };

  // processar a última entrada
  const verfyLetter = () => {
    setGameStage(stages[2].name)
  }

  // reiniciando o jogo

  const retry = () => {
    setGameStage(stages[0].name)
  }


  return (
    <div className="App">
      {gameStage === 'start' && <StartScreen startGame={startGame} />}
      {gameStage === 'game' && <Game verfyLetter={verfyLetter} />}
      {gameStage === 'end' && <GameOver retry={retry} />}
    </div>
  );
}

export default App;
