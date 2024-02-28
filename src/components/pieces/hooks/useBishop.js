import { useContext, useEffect } from "react";
import { BoardContext } from "../../../context/board";
import moves from "../../../helpers/moves";
import checkJaque from "../../../helpers/checkJaque"
export default function useBishop(filaIndex, columnaIndex, team) {
    const { resetAvailableMovements, updateBoard, board, turn} = useContext(BoardContext)
    
    const {bishopMoves} = checkJaque(filaIndex,columnaIndex,team,board)
    useEffect(()=>{
        if(turn !== null && team !== turn) bishopMoves()
    },[turn])

    function showMovements() {
        const resetedBoard = resetAvailableMovements()
        const {diagonalMoves} = moves(filaIndex,columnaIndex,team,resetedBoard)
        diagonalMoves()
        updateBoard(resetedBoard)
                }
    function checkLegalMoves() {
        
    }
    return { showMovements }
}