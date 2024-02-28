import { useContext, useEffect} from "react";
import { BoardContext } from "../../../context/board";
import moves from "../../../helpers/moves";
import checkjaque from "../../../helpers/checkJaque"
export default function Queen (filaIndex,columnaIndex,team) {
    const { resetAvailableMovements, updateBoard, board, turn} = useContext(BoardContext)

    const {queenMoves} = checkjaque(filaIndex,columnaIndex,team,board)
    useEffect(()=>{
        if(turn !== null && team !== turn) queenMoves()
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