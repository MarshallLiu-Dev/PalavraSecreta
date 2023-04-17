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

const guessesQty = 5 

function App() {

  const [gameStage, setGameStage] = useState(stages[0].name);
  const [words] = useState(wordsList);

  const [pickedWord, setPickedWord] = useState("");
  const [pickedCategory, setPickedCategory] = useState("");
  const [letters, setLetters] = useState([]);

  const [guessedLetters, setGuessedLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);
  const [guesses, setGuesses] = useState(guessesQty);
  const [score, setScore] = useState(50);

  const pickWordAndCategory = useCallback(  () =>{
// pick a random category    
    const categories = Object.keys(words)
    const category = 
      categories[Math.floor(Math.random() * Object.keys(categories).length)];
  
    console.log(category);
// pick a random word
    const word =
      words[category][Math.floor(Math.random() * words[category].length)];

    console.log(category, word);  

    return{word, category};
}, [words]);


//start the game 
  const startGame = useCallback( () => {
  
//clear all letters

    clearLettersStates();

//pick word and pick category    
   const { word, category } = pickWordAndCategory();
//create an array of letters
    let wordLetters = word.split("")

    wordLetters = wordLetters.map((l) => l.toLowerCase());

   console.log(word, category);
   console.log(wordLetters);

//fill states
    setPickedWord(word);
    setPickedCategory(category);
    setLetters(wordLetters);

    setGameStage(stages[1].name);
  }, [pickWordAndCategory]);

// process the letter input

  const verifyLetter = (letter) => {
    
    const normalizedLetter = letter.toLowerCase();

// check if letter has already been utlized    

    if(guessedLetters.includes(normalizedLetter) ||
     wrongLetters.includes(normalizedLetter)) {
      return;
    }

// push guessed letters or remove a guess

    if(letters.includes(normalizedLetter)){
      setGuessedLetters((actualGuessedLetters) =>[
        ...actualGuessedLetters,
        normalizedLetter
      ])
    }else{
      setWrongLetters((actualWrongLetters ) => [
        ...actualWrongLetters,
        normalizedLetter
      ])
      setGuesses((actualGuesses) => actualGuesses -1);
    }
  };
      console.log(guessedLetters);
      console.log(wrongLetters);
     
  const clearLettersStates = () => {
    setGuessedLetters([])
    setWrongLetters([])
  }

// check win condition 
useEffect(() =>{

const uniqueLetters = [... new Set(letters)];
//win condition 

if(guessedLetters.length === uniqueLetters.length){
  //add score
  setScore((actualScore) => actualScore += 100)

  //restart game with new word
  startGame();

}

},[guessedLetters, letters, startGame])

// check if guesses ended
      useEffect(() =>{

        if(guesses <= 0){
          // reset all stages
          clearLettersStates();

          setGameStage(stages[2].name);
        }

      }, [guesses])

//restarts the game
  const retry = () =>{
    setScore(0);
    setGuesses(guessesQty);


    setGameStage(stages[0].name);
  };
  return (
    <div className="App">
      {gameStage === "start" && <StartScreen startGame={startGame} />}
      {gameStage === "game" && (
        <Game
          verifyLetter={verifyLetter}
          pickedWord={pickedWord}
          pickedCategory={pickedCategory}
          letters={letters}
          guessedLetters={guessedLetters}
          wrongLetters={wrongLetters}
          guesses={guesses}
          score={score}
        />
      )}
      {gameStage === "end" && <GameOver retry={retry} score={score} />}
    </div>
  );
};

export default App;
