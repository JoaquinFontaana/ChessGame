import { useContext, useEffect, useRef} from "react";
import { BoardContext } from "../../../context/board";
import moves from "../../../helpers/moves";
import checkjaque from "../../../helpers/checkJaque"
export default function Queen (filaIndex,columnaIndex,team) {
    const {resetAvailableMovements, updateBoard,board,turn} = useContext(BoardContext)
    const boardToupdate = [...board]
    const {queenJaqueMoves}= checkjaque(filaIndex,columnaIndex,team,boardToupdate)
    const isFirstRender= useRef(true)
    useEffect(() => {
        if(isFirstRender.current){
            isFirstRender.current=false
            return
        }
        else if (turn && turn !== team) {
            queenJaqueMoves()
            updateBoard(boardToupdate)
        }
    }, [turn])
    function showMovements(){
        const resetedBoard = resetAvailableMovements()
        const {verticalHorizontalMoves, diagonalMoves} = moves(filaIndex,columnaIndex,team,resetedBoard)
        verticalHorizontalMoves()
        diagonalMoves()
        updateBoard(resetedBoard)
    }
    return{showMovements}
}