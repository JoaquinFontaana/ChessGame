import {useContext, useState} from 'react'
import Board from './components/Board'
import Button from './components/Button'
import { BoardContext } from './context/board'

function App() {
  const [gameStarted, setGameStarted] = useState(false);
  const { toogleGame } = useContext(BoardContext);
  function gameButton() {
    setGameStarted((prevgameStarted) =>{
      const newGameStarted = !prevgameStarted
      toogleGame(newGameStarted)
      return newGameStarted
    });
  }

  return (
    <main>
      <Board/>
      <Button handleClick={gameButton}>
        {gameStarted ? 'End game' : 'Start game'}
      </Button>
    </main>
  );
}


export default App
