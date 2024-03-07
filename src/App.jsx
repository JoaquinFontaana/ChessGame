import {useContext} from 'react'
import Board from './components/Board'
import Button from './components/Button'
import { BoardContext } from './context/board'
import Modal from './components/Modal'
import { PiecesContext } from './context/pieces'
function App() {

  const { toggleGame,setToggleGame, turn} = useContext(BoardContext);
  const {isBlackInJaqueMate,isWhiteInJaqueMate} = useContext(PiecesContext)
  function gameButton() {
      setToggleGame(!toggleGame);
    }
  return (
    <main>
      {(isBlackInJaqueMate || isWhiteInJaqueMate) && <Modal></Modal>}
      {turn && <span className='turn'>Turn of {turn} side</span>}
      <Board/>
      <Button className="toogleGameButton" handleClick={gameButton}>
        {toggleGame ? 'End game' : 'Start game'}
      </Button>
    </main>
  );
}


export default App
