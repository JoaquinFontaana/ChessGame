import { useCallback, useContext, useEffect } from "react";
import { BoardContext } from "../../../context/board";
import moves from "../../../helpers/moves";
import useMakeSimulatedMove from "../../../helpers/useMakeSimulatedMove";
import { PiecesContext } from "../../../context/pieces";
export default function useBishop(filaIndex, columnaIndex, team) {
  const { resetAvailableMovements, updateBoard, board, turn } = useContext(BoardContext);

  const { isBlackKingInJaque, isWhiteKingInJaque } = useContext(PiecesContext);

 /* useEffect(() => {
    if (turn === team) {
      if (team === "White" && isWhiteKingInJaque) checkLegalMoves();
      else if (team === "Black" && isBlackKingInJaque) checkLegalMoves();
    }
  }, [isBlackKingInJaque,isWhiteKingInJaque]);*/

  const { diagonalMoves } = moves(filaIndex, columnaIndex, team);
  function showMovements() {
    const resetedBoard = resetAvailableMovements();
    const posibleMoves = diagonalMoves(resetedBoard);
    posibleMoves.forEach((move) => {
      const { fila, columna, classAdditional } = move;
      resetedBoard[fila][columna].classAdditional = classAdditional;
    });
    updateBoard(resetedBoard);
  }

  function showLegalMovements(){
    console.log('showLegalMovements')
    const resetedBoard = resetAvailableMovements()
    const legalMoves = checkLegalMoves()
    console.log(legalMoves)
    legalMoves.forEach((move) => {
      const { fila, columna, classAdditional } = move;
      resetedBoard[fila][columna].classAdditional = classAdditional;
    });
    console.log(legalMoves)
    updateBoard(resetedBoard);
  }
  
  const { simulateMoves } = useMakeSimulatedMove();
  function checkLegalMoves(){
    const boardToSimulate = board.map((fila) => [...fila]);
    const posibleMoves = diagonalMoves(board);
    const legalMoves = simulateMoves(
      posibleMoves,
      filaIndex,
      columnaIndex,
      boardToSimulate,
      team
    );
    return legalMoves;
  }
  return {showMovements, showLegalMovements}

}
