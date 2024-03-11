import { useState, useContext, useEffect } from "react";
import { BoardContext } from "../../../context/board";
import moves from "../helpers/moves";
import { PiecesContext } from "../../../context/pieces";
import useCommonMethods from "./useCommonMethods";
export default function useBishop(filaIndex, columnaIndex, team) {
  const { resetAvailableMovements, board, turn } = useContext(BoardContext);
  const [legalMoves, setLegalMoves] = useState([])
  const { isBlackInJaque, isWhiteInJaque} = useContext(PiecesContext);

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

  const { diagonalMoves } = moves(filaIndex, columnaIndex, team);

  const { commonCheckLegalMoves, commonShowMovements, commonShowLegalMovements } = useCommonMethods(filaIndex, columnaIndex, team)
  
  function showMovements() {
    const resetedBoard = resetAvailableMovements();
    const posibleMoves = diagonalMoves(resetedBoard);
    commonShowMovements(posibleMoves, resetedBoard)
  }

  function showLegalMovements() {
    const resetedBoard = resetAvailableMovements()
    commonShowLegalMovements(legalMoves, resetedBoard)
  }

  function checkLegalMoves() {
    const posibleMoves = diagonalMoves(board);
    commonCheckLegalMoves(posibleMoves,setLegalMoves)
  }

  return { showMovements, showLegalMovements }

}
