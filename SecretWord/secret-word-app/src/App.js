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

  const [guessedLettes, setGuessedLettes] = useState([])
  const [wrongLettes, setwrongLettes] = useState([])
  const [guesses, setGuesses] = useState(5)
  const [score, setScore] = useState(0)

  const pickedWordAndCategory= () =>{
  
    // pick a random category
    const categories = Object.keys(words)
    const category = categories[Math.floor(Math.random() * Object.keys(categories).length)];

    console.log(category);

    // pick a random word    
    const word = words[category][Math.floor(Math.random() * words[category].length)];
 
    // criando um array para as letras 

    let wordLetters = word.split("")

    wordLetters = wordLetters.map((l) => l.toLowerCase());

   // console.log(wordLetters);
    console.log(word);
    return{word, category};
  }

  // inicio do jogo
  const startGame = () => {

    // pick word and picke category 

    const {word, category} = pickedWordAndCategory();
      
    console.log(word, category);

    setGameStage(stages[1].name)
    

    // fill states

    setPickedWord(word);
    setPickedCategory(category);
    setLetters(wordLetters);
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
      {gameStage === "start" && <StartScreen startGame={startGame} />}
      {gameStage === "game" && (
        <Game
          verifyLetter={verfyLetter}
          pickedWord={pickedWord}
          pickedCategory={pickedCategory}
          letters={letters}
          guessedLetters={guessedLettes}
          wrongLetters={wrongLettes}
          guesses={guesses}
          score={score}
        />
      )}
      {gameStage === "end" && <GameOver retry={retry} score={score} />}
    </div>
  );
}

export default App;
