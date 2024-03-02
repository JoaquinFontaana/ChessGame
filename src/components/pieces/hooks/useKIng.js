import { useContext, useEffect, useRef, useState } from "react";
import { BoardContext } from "../../../context/board";
import moves from "../../../helpers/moves";
import { PiecesContext } from "../../../context/pieces";
import useCheckJaque from "../../../helpers/checkJaque";

/**
 * Custom hook for handling the behavior of a King piece in a chess game.
 * @param {number} filaIndex - The row index of the King piece on the chessboard.
 * @param {number} columnaIndex - The column index of the King piece on the chessboard.
 * @param {string} team - The team color of the King piece ('White' or 'Black').
 * @returns {Object} An object containing the showMovements function and the jaque state.
 */
export default function useKing(filaIndex, columnaIndex, team) {
  const { resetAvailableMovements, updateBoard, turn, board } =
    useContext(BoardContext);
  const { whitePieces, blackPieces, piecesEvaluated, setPiecesEvaluated } =
    useContext(PiecesContext);
  const boardToupdate = [...board];
  const { kingJaqueMoves } = useCheckJaque(
    filaIndex,
    columnaIndex,
    team,
    boardToupdate
  );
  const isFirstRender = useRef(true);
  const [jaque, setJaque] = useState(false);

  /**
   * Effect hook that runs when the turn changes.
   */
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    } else if (turn && team !== undefined && turn !== team) {
      console.log("JaqueMoves");
      kingJaqueMoves();
      updateBoard(boardToupdate);
    }
  }, [turn]);

  /**
   * Effect hook that runs when the piecesEvaluated, blackPieces, or whitePieces change.
   */
  useEffect(() => {
    if (turn && turn === team) {
      if (team !== "White") {
        console.log(piecesEvaluated, team);
        if (piecesEvaluated === whitePieces) {
          console.log("Deteccion de todas las piezas evaluadas");
          setPiecesEvaluated(0);
          if (board[filaIndex][columnaIndex].classAdditional === "threatenedKing") {
            setJaque(true);
          } else setJaque(false);
        }
      } else if (piecesEvaluated === blackPieces) {
        console.log("Deteccion de todas las piezas evaluadas");
        setPiecesEvaluated(0);
        if (board[filaIndex][columnaIndex].classAdditional === "threatenedKing") {
          setJaque(true);
        } else setJaque(false);
      }
    }
  }, [piecesEvaluated, blackPieces, whitePieces]);

  /**
   * Function to show the available movements for the King piece.
   */
  function showMovements() {
    const resetedBoard = resetAvailableMovements();
    const { kingMoves } = moves(filaIndex, columnaIndex, team, resetedBoard);
    kingMoves();
    updateBoard(resetedBoard);
  }

  return { showMovements, jaque };
}
