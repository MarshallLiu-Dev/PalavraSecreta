import './Game.css'

    const game = ({verfyLetter, pickedWord, pickedCategory, letters,
    guessedletters, wrongLetters, guesses, score }) => {
  return (

    <div className="game">
      <p className="pointer">
        <span>Pontuação: {score}</span>
      </p>
      <h1>Qual é a palavra:</h1>
      <h3 className="tip">
        Dica sobre a palavra: <span>{pickedCategory}</span>
      </h3>
      <p>Voce ainda tem {guesses} tentativa(s).</p>
      <div className="wordContainer">
        {letters.map((letters, i) =>
          guessedletters.includes(letters) ? (
            <span className="letter" key={i}>
              {letters}
            </span>
          ) : (
            <span key={i} className="blankSquare"></span>
          )
        )}
      </div>
      <div className="letterContainer">
        <p>Tente adivinhar a palavra</p>
        <form>
          <input type="text" className="text" name='letter' maxLength='1' required/>
        </form>
        <button>Jogar!</button>
      </div>
      <div className="wrongLettersContainer">
        <p>Letras já utilizadas:</p>
        {wrongLetters.map((letter, i) => (
          <span key={i}>{letter}, </span>
        ))}
      </div>
    </div>
  )
}

export default game