import { useContext, useEffect} from "react";
import { BoardContext } from "../../../context/board";
import moves from "../../../helpers/moves";
import checkjaque from "../../../helpers/checkJaque"
export default function Queen (filaIndex,columnaIndex,team) {
    const {resetAvailableMovements, updateBoard,board,turn} = useContext(BoardContext)
    const boardToupdate = [...board]
    const {queenJaqueMoves}= checkjaque(filaIndex,columnaIndex,team,boardToupdate)
    useEffect(()=>{
        queenJaqueMoves()
        updateBoard(boardToupdate)
    },[turn])

    function showMovements(){
        const resetedBoard = resetAvailableMovements()
        const {verticalHorizontalMoves, diagonalMoves} = moves(filaIndex,columnaIndex,team,resetedBoard)
        verticalHorizontalMoves()
        diagonalMoves()
        updateBoard(resetedBoard)
    }
    return{showMovements}
}