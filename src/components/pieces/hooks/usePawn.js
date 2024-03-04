import { useContext, useEffect, useState } from "react";
import { BoardContext } from "../../../context/board";
import { PiecesContext } from "../../../context/pieces";
import useCommomMethods from "./useCommonMethods";
import moves from "../../../helpers/moves";
export default function usePawn(columnaIndex, filaIndex, team) {
  const { resetAvailableMovements, board, turn } = useContext(BoardContext)
  const { commonCheckLegalMoves, commonShowMovements, commonShowLegalMovements } = useCommomMethods(filaIndex, columnaIndex, team)
  const { pawnMoves } = moves(filaIndex, columnaIndex, team)
  const [legalMoves, setLegalMoves] = useState([])
  const { isBlackInJaque, isWhiteInJaque } = useContext(PiecesContext);

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
    const posibleMoves = pawnMoves(resetedBoard)
    commonShowMovements(posibleMoves, resetedBoard)
  }
  function showLegalMovements() {
    const resetedBoard = resetAvailableMovements()
    commonShowLegalMovements(legalMoves, resetedBoard)
  }

  function checkLegalMoves() {
    const newLegalMoves = commonCheckLegalMoves(pawnMoves(board))
    setLegalMoves(newLegalMoves)
  }
  return { showMovements, showLegalMovements }
}