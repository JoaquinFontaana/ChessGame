import {useContext, useState} from 'react'
import Board from './components/Board'
import Button from './components/Button'
import { BoardContext } from './context/board'

function App() {
  const [gameStarted, setGameStarted] = useState(false);

  const { toggleGame, turn} = useContext(BoardContext);

  function gameButton() {
    setGameStarted((prevgameStarted) =>{
      const newGameStarted = !prevgameStarted
      toggleGame(newGameStarted)
      return newGameStarted
    });
  }

  return (
    <main>
      {turn && <span>Turn of {turn} side</span>}
      <Board/>
      <Button className="toogleGameButton" handleClick={gameButton}>
        {gameStarted ? 'End game' : 'Start game'}
      </Button>
    </main>
  );
}


export default App
