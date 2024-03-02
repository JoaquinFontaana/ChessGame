import { useContext, useEffect} from "react";
import { BoardContext } from "../../../context/board";
import moves from "../../../helpers/moves";
import useCheckJaque from "../../../helpers/checkJaque";
import { useRef } from "react";
export default function usePawn(columnaIndex, filaIndex, team) {
    const { updateBoard,resetAvailableMovements,turn,board} = useContext(BoardContext)
    const boardToUpdate = [...board]
    const {pawnJaqueMoves} = useCheckJaque(filaIndex,columnaIndex,team,boardToUpdate)

    const isFirstRender = useRef(true);
    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        } else if (turn && team !== undefined && turn !== team) {
            console.log("JaqueMoves")
            pawnJaqueMoves();
            updateBoard(boardToUpdate);
        }
    }, [turn]);
    function showMovements() { 
        const resetedBoard = resetAvailableMovements()
        const {pawnMoves} = moves(filaIndex,columnaIndex,team,resetedBoard)
        pawnMoves()
        updateBoard(resetedBoard);
        }
    return { showMovements}
}