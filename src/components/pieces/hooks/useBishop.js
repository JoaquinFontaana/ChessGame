import { useContext, useEffect,useRef } from "react";
import { BoardContext } from "../../../context/board";
import moves from "../../../helpers/moves";
import checkJaque from "../../../helpers/checkJaque"
export default function useBishop(filaIndex, columnaIndex, team) {
    const {resetAvailableMovements, updateBoard,board,turn} = useContext(BoardContext)
    const boardToupdate = [...board]
    const {bishopJaqueMoves}= checkJaque(filaIndex,columnaIndex,team,boardToupdate)
    const isFirstRender= useRef(true)
    useEffect(() => {
        if(isFirstRender.current){
            isFirstRender.current=false
            return
        }
        else if (turn && team !== undefined && turn !== team){
            console.log("JaqueMoves")
            bishopJaqueMoves()
            updateBoard(boardToupdate)
        }
    }, [turn])

    function showMovements() {
        const resetedBoard = resetAvailableMovements()
        const {diagonalMoves} = moves(filaIndex,columnaIndex,team,resetedBoard)
        diagonalMoves()
        updateBoard(resetedBoard)
                }
    function checkLegalMoves() {
        
    }
    return { showMovements }
}