import { useContext } from "react"
import { BoardContext } from "../../../context/board"
import moves from "../../../helpers/moves"
export default function useRook(filaIndex,columnaIndex,team){
    const {resetAvailableMovements, updateBoard} = useContext(BoardContext)
    function showMovements(){
        const resetedBoard = resetAvailableMovements()
        const{verticalHorizontalMoves} = moves(filaIndex,columnaIndex,team,resetedBoard)
        verticalHorizontalMoves()
        updateBoard(resetedBoard)
    }
    return{showMovements}
}