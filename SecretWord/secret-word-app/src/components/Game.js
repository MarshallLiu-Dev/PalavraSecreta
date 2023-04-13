import './Game.css'

    const game = ({verfyLetter}) => {
  return (
    <div>
        <h1>Game</h1>
          <button onClick={verfyLetter} >Finalizar Jogo</button>
    </div>
  )
}

export default game