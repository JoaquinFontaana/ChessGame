import { useContext } from "react";
import { BoardContext } from "../../../context/board";
import moves from "../../../helpers/moves";
export default function useBishop(filaIndex, columnaIndex, team) {
    const { resetAvailableMovements, updateBoard } = useContext(BoardContext)

    function showMovements() {
        const resetedBoard = resetAvailableMovements()
        const {diagonalMoves} = moves(filaIndex,columnaIndex,team,resetedBoard)
        diagonalMoves()
        updateBoard(resetedBoard)
                }
    return { showMovements }
}