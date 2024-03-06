import { useContext } from "react";
import { BoardContext } from "../../../context/board";
import useMakeSimulatedMoves from "./useMakeSimulatedMoves";
import { PiecesContext } from "../../../context/pieces";
/**
 * Custom hook that provides common methods for chess piece components.
 *
 * @param {number} filaIndex - The row index of the chess piece.
 * @param {number} columnaIndex - The column index of the chess piece.
 * @param {string} team - The team of the chess piece.
 * @returns {Object} An object containing common methods for chess piece components.
 */
export default function useCommomMethods(filaIndex, columnaIndex, team) {
  const { board, updateBoard, turn,resetAllSquareClasses} = useContext(BoardContext);
  const { setWhiteLegalMovements, setBlackLegalMovements} = useContext(PiecesContext);
  /**
   * Updates the board with the provided possible moves.
   *
   * @param {Array} posibleMoves - The possible moves to be shown on the board.
   * @param {Array} resetedBoard - The board to be updated.
   */
  function commonShowMovements(posibleMoves, resetedBoard) {
    if(resetedBoard[filaIndex][columnaIndex].classAdditional === "threatened") {
      posibleMoves = commonCheckLegalMoves(posibleMoves,null,false)
    }
    posibleMoves.forEach((move) => {
      const { fila, columna, classAdditional } = move;
      resetedBoard[fila][columna].classAdditional = classAdditional;
    });
    updateBoard(resetedBoard);
  }

  /**
   * Updates the board with the provided legal moves.
   *
   * @param {Array} legalMoves - The legal moves to be shown on the board.
   * @param {Array} resetedBoard - The board to be updated.
   */
  function commonShowLegalMovements(legalMoves, resetedBoard) {
    legalMoves.forEach((move) => {
      const { fila, columna, classAdditional } = move;
      resetedBoard[fila][columna].classAdditional = classAdditional;
    });
    updateBoard(resetedBoard);
  }

  const { simulateMoves } = useMakeSimulatedMoves();

  /**
   * Checks the legality of the provided possible moves on jaque.
   * @param {Array} posibleMoves - The possible moves to be checked.
   * @returns {Array} An array of legal moves.
   */
  function commonCheckLegalMoves(posibleMoves,setLegalMoves = null,boolean = true) {
    let boardToSimulate = board.map((fila) => fila.map((cell) => ({ ...cell })));
    boardToSimulate = resetAllSquareClasses(boardToSimulate);
    const newLegalMoves = simulateMoves(
      posibleMoves,
      filaIndex,
      columnaIndex,
      boardToSimulate,
      team
    );
    if(boolean){
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
    setLegalMoves(newLegalMoves);
  }
  else return newLegalMoves
  }

  return { commonShowMovements, commonShowLegalMovements, commonCheckLegalMoves };
}