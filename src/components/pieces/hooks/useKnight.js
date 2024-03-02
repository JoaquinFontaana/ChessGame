import { useContext, useEffect, useRef} from "react"
import { BoardContext } from "../../../context/board"
import moves from "../../../helpers/moves"
import checkjaque from "../../../helpers/checkJaque"
export default function useKnight(filaIndex,columnaIndex,team){

    const {resetAvailableMovements, updateBoard,board,turn} = useContext(BoardContext)
    const boardToupdate = [...board]
    const {knightJaqueMoves}= checkjaque(filaIndex,columnaIndex,team,boardToupdate)
    const isFirstRender= useRef(true)
    useEffect(() => {
        if(isFirstRender.current){
            isFirstRender.current=false
            return
        }
        else if (turn && team !== undefined && turn !== team) {
            knightJaqueMoves()
            updateBoard(boardToupdate)
        }
    }, [turn])

    function showMovements(){
        const resetedBoard= resetAvailableMovements()
        const {knightMoves} = moves(filaIndex,columnaIndex,team,resetedBoard)
        knightMoves()
        updateBoard(resetedBoard)
    }
    return{ showMovements}
}