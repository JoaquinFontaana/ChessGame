import { useContext } from "react";
import { BoardContext } from "../../../context/board";
export default function useBishop(filaIndex, columnaIndex, team) {
    const { resetAvailableMovements, updateBoard } = useContext(BoardContext)

    function showMovements() {
        const resetedBoard = resetAvailableMovements()
            let enemyPiece = false
            let i = filaIndex - 1
            let y = columnaIndex + 1
            while (
                i >= 0 &&
                i < resetedBoard.length &&
                y >= 0 &&
                y < resetedBoard[0].length &&
                resetedBoard[i][y] &&
                resetedBoard[i][y].team !== team
                && !enemyPiece
            ) {
                if (resetedBoard[i][y].piece === undefined) resetedBoard[i][y].classAdditional = "available"
                else if (resetedBoard[i][y].piece && resetedBoard[i][y].team !== team) {
                    resetedBoard[i][y].classAdditional = "attackable"
                    enemyPiece = true
                }
                i--
                y++
            }
            i = filaIndex - 1
            y = columnaIndex - 1
            enemyPiece = false
            while (
                i >= 0 &&
                i < resetedBoard.length &&
                y >= 0 &&
                y < resetedBoard[0].length &&
                resetedBoard[i][y] &&
                resetedBoard[i][y].team !== team
                && !enemyPiece
            ) {
                if (resetedBoard[i][y].piece === undefined) resetedBoard[i][y].classAdditional = "available"
                else if (resetedBoard[i][y].piece && resetedBoard[i][y].team !== team) {
                    resetedBoard[i][y].classAdditional = "attackable"
                    enemyPiece = true
                }
                i--
                y--
            }
                enemyPiece = false
                i = filaIndex + 1
                y = columnaIndex + 1
                while (
                    i >= 0 &&
                    i < resetedBoard.length &&
                    y >= 0 &&
                    y < resetedBoard[0].length &&
                    resetedBoard[i][y] &&
                    resetedBoard[i][y].team !== team
                    && !enemyPiece
                ) {
                    if (resetedBoard[i][y].piece === undefined) resetedBoard[i][y].classAdditional = "available"
                    else if (resetedBoard[i][y].piece && resetedBoard[i][y].team !== team) {
                        resetedBoard[i][y].classAdditional = "attackable"
                        enemyPiece = true
                    }
                    i++
                    y++
                }
                i = filaIndex + 1
                y = columnaIndex - 1
                enemyPiece = false
                while (
                    i >= 0 &&
                    i < resetedBoard.length &&
                    y >= 0 &&
                    y < resetedBoard[0].length &&
                    resetedBoard[i][y] &&
                    resetedBoard[i][y].team !== team
                    && !enemyPiece
                ) {
                    if (resetedBoard[i][y].piece === undefined) resetedBoard[i][y].classAdditional = "available"
                    else if (resetedBoard[i][y].piece && resetedBoard[i][y].team !== team) {
                        resetedBoard[i][y].classAdditional = "attackable"
                        enemyPiece = true
                    }
                    i++
                    y--
                }
            updateBoard(resetedBoard)
    }
    return { showMovements }
}