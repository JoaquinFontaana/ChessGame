import { useContext } from "react"
import { BoardContext } from "../../../context/board"
import moves from "../../../helpers/moves"
export default function useKnight(filaIndex,columnaIndex,team){
    const {resetAvailableMovements, updateBoard} = useContext(BoardContext)
    function showMovements(){
        const resetedBoard= resetAvailableMovements()
        const {knightMoves} = moves(filaIndex,columnaIndex,team,resetedBoard)
        knightMoves()
        updateBoard(resetedBoard)
    }
    return{ showMovements}
}