import { useContext, useEffect, useState } from "react"
import { BoardContext } from "../../../context/board"
import { PiecesContext } from "../../../context/pieces"
import moves from "../../../helpers/moves"
import useCommomMethods from "./useCommonMethods"
export default function useRook(filaIndex, columnaIndex, team) {

  const { resetAvailableMovements, board, turn } = useContext(BoardContext)
  const { verticalHorizontalMoves } = moves(filaIndex, columnaIndex, team)
  const [legalMoves, setLegalMoves] = useState([])
  const { isBlackInJaque, isWhiteInJaque, setBlackLegalMovements,setWhiteLegalMovements} = useContext(PiecesContext);
  const { commonCheckLegalMoves, commonShowMovements, commonShowLegalMovements } = useCommomMethods(filaIndex, columnaIndex, team)

  useEffect(() => {
    if (turn === team) {
      if (team === "White") {
        if (isWhiteInJaque) {
          checkLegalMoves()
        }
      }
      else if (isBlackInJaque) {
        checkLegalMoves()
      }
    }
  }, [turn, isBlackInJaque, isWhiteInJaque])

  function showMovements() {
    const resetedBoard = resetAvailableMovements()
    const posibleMoves = verticalHorizontalMoves(resetedBoard)
    commonShowMovements(posibleMoves, resetedBoard)
  }
  function showLegalMovements() {
    const resetedBoard = resetAvailableMovements()
    commonShowLegalMovements(legalMoves, resetedBoard)
  }

  function checkLegalMoves() {
    const posibleMoves = verticalHorizontalMoves(board);
    const newLegalMoves = commonCheckLegalMoves(posibleMoves)
    setLegalMoves(newLegalMoves)
    if(turn === 'White') setWhiteLegalMovements(prev => ({
      ...prev,
      legalMovements: [...prev.legalMovements, ...newLegalMoves],
      piecesEvaluated: prev.piecesEvaluated + 1
    }))
    else setBlackLegalMovements(prev => ({
      ...prev,
      legalMovements: [...prev.legalMovements, ...newLegalMoves],
      piecesEvaluated: prev.piecesEvaluated + 1
    }))
  }
  return { showMovements, showLegalMovements }
}