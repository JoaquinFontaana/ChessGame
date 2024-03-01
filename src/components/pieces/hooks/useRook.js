import { useContext, useEffect } from "react"
import { BoardContext } from "../../../context/board"
import moves from "../../../helpers/moves"
import checkJaque from "../../../helpers/checkJaque"
export default function useRook(filaIndex,columnaIndex,team){
    const {resetAvailableMovements, updateBoard,board,turn} = useContext(BoardContext)
    const boardToupdate = [...board]
    const {rookJaqueMoves}= checkJaque(filaIndex,columnaIndex,team,boardToupdate)
    useEffect(()=>{
        rookJaqueMoves()
        updateBoard(boardToupdate)
    },[turn])

    function showMovements(){
        const resetedBoard = resetAvailableMovements()
        const{verticalHorizontalMoves} = moves(filaIndex,columnaIndex,team,resetedBoard)
        verticalHorizontalMoves()
        updateBoard(resetedBoard)
    }
    return{showMovements}
}