import { useContext } from "react";
import { BoardContext } from "../../../context/board";
import moves from "../../../helpers/moves";

export default function useKing(filaIndex, columnaIndex, team) {
    const { resetAvailableMovements, updateBoard, board } = useContext(BoardContext);
    function showMovements() {
        const resetedBoard = resetAvailableMovements();
        const { kingMoves } = moves(filaIndex, columnaIndex, team, resetedBoard);
        kingMoves();
        updateBoard(resetedBoard);
    }

    return { showMovements };
}