import { useContext } from "react"
import { BoardContext } from "../../../context/board"

export default function useRook(filaIndex,columnaIndex,team){
    const {resetAvailableMovements} = useContext(BoardContext)
    function showMovements(){
        const resetedBoard = resetAvailableMovements()
        let i = filaIndex+1
        let y = columnaIndex
        let enemyPiece = false
        while( 
            i >= 0 &&
            i < resetedBoard.length &&
            resetedBoard[i][y] &&
            resetedBoard[i][y].team !== team
            && !enemyPiece
        ){
            if(resetedBoard[i][y].piece === undefined) resetedBoard[i][y].classAdditional = "available"
            else if (resetedBoard[i][y].piece && resetedBoard[i][y].team !== team) {
                resetedBoard[i][y].classAdditional = "attackable"
                enemyPiece = true
            }
            i++
        }
        i = filaIndex-1
        y = columnaIndex
        enemyPiece = false
        while( 
            i >= 0 &&
            i < resetedBoard.length &&
            resetedBoard[i][y] &&
            resetedBoard[i][y].team !== team
            && !enemyPiece
        ){
            if(resetedBoard[i][y].piece === undefined) resetedBoard[i][y].classAdditional = "available"
            else if (resetedBoard[i][y].piece && resetedBoard[i][y].team !== team) {
                resetedBoard[i][y].classAdditional = "attackable"
                enemyPiece = true
            }
            i--
        }
        i = filaIndex
        y = columnaIndex+1
        enemyPiece = false
        while( 
            y >= 0 &&
            y < resetedBoard.length &&
            resetedBoard[i][y] &&
            resetedBoard[i][y].team !== team
            && !enemyPiece
        ){
            if(resetedBoard[i][y].piece === undefined) resetedBoard[i][y].classAdditional = "available"
            else if (resetedBoard[i][y].piece && resetedBoard[i][y].team !== team) {
                resetedBoard[i][y].classAdditional = "attackable"
                enemyPiece = true
            }
            y++
        }
        i = filaIndex
        y = columnaIndex-1
        enemyPiece = false
        while( 
            y >= 0 &&
            y < resetedBoard.length &&
            resetedBoard[i][y] &&
            resetedBoard[i][y].team !== team
            && !enemyPiece
        ){
            if(resetedBoard[i][y].piece === undefined) resetedBoard[i][y].classAdditional = "available"
            else if (resetedBoard[i][y].piece && resetedBoard[i][y].team !== team) {
                resetedBoard[i][y].classAdditional = "attackable"
                enemyPiece = true
            }
            y--
        }
    }
    return{showMovements}
}