import { useContext, useEffect, useState } from "react"
import { BoardContext } from "../../../context/board"
import moves from "../../../helpers/moves"
import { PiecesContext } from "../../../context/pieces"
import useCommomMethods from "./useCommonMethods"
export default function useKnight(filaIndex, columnaIndex, team) {

  const { resetAvailableMovements, board, turn } = useContext(BoardContext)
  const { knightMoves } = moves(filaIndex, columnaIndex, team)
  const { isBlackInJaque, isWhiteInJaque} = useContext(PiecesContext);
  const { commonCheckLegalMoves, commonShowMovements, commonShowLegalMovements } = useCommomMethods(filaIndex, columnaIndex, team)
  const [legalMoves, setLegalMoves] = useState([])
  useEffect(() => {
    if (turn === team) {
      if (team === "White") {
        if (isWhiteInJaque) {
          checkLegalMoves()
          console.log(legalMoves)
        }
      }
      else if (isBlackInJaque) {
        checkLegalMoves()
      }
    }
  }, [turn, isBlackInJaque, isWhiteInJaque])

  function showMovements() {
    const resetedBoard = resetAvailableMovements()
    const posibleMoves = knightMoves(resetedBoard)
    commonShowMovements(posibleMoves, resetedBoard)
  }
  function showLegalMovements() {
    const resetedBoard = resetAvailableMovements()
    commonShowLegalMovements(legalMoves, resetedBoard)
  }
  function checkLegalMoves() {
    commonCheckLegalMoves(knightMoves(board),setLegalMoves)
  }
  return { showMovements, showLegalMovements }
}