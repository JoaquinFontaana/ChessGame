import { useContext } from "react";
import { BoardContext } from "../../../context/board";
import moves from "../../../helpers/moves";
export default function Queen (filaIndex,columnaIndex,team) {
    const{resetAvailableMovements, updateBoard} = useContext(BoardContext)
    function showMovements(){
        const resetedBoard = resetAvailableMovements()
        const {verticalHorizontalMoves, diagonalMoves} = moves(filaIndex,columnaIndex,team,resetedBoard)
        verticalHorizontalMoves()
        diagonalMoves()
        updateBoard(resetedBoard)
    }
    return{showMovements}
}