import {useContext} from 'react'
import Board from './components/Board'
import Button from './components/Button'
import { BoardContext } from './context/board'

function App() {

  const { toggleGame,setToggleGame, turn} = useContext(BoardContext);

  function gameButton() {
      setToggleGame(!toggleGame);
    }
  return (
    <main>
      {turn && <span>Turn of {turn} side</span>}
      <Board/>
      <Button className="toogleGameButton" handleClick={gameButton}>
        {toggleGame ? 'End game' : 'Start game'}
      </Button>
    </main>
  );
}


export default App
