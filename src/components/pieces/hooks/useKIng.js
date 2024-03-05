import { useContext, useEffect, useState } from "react";
import { BoardContext } from "../../../context/board";
import moves from "../../../helpers/moves";
import { PiecesContext } from "../../../context/pieces";
import useCheckJaque from "../../../helpers/checkJaque";
import useCommomMethods from "./useCommonMethods";

/**
 * Custom hook for handling the behavior of a King piece in a chess game.
 * @param {number} filaIndex - The row index of the King piece on the chessboard.
 * @param {number} columnaIndex - The column index of the King piece on the chessboard.
 * @param {string} team - The team color of the King piece ('White' or 'Black').
 * @returns {Object} An object containing the showMovements function and the jaque state.
 */
export default function useKing(filaIndex, columnaIndex, team) {
  const { resetAvailableMovements, turn, board} = useContext(BoardContext);
  const { commonCheckLegalMoves, commonShowLegalMovements, commonShowMovements } = useCommomMethods(filaIndex, columnaIndex, team)
  const {
    whitePieces,
    blackPieces,
    setIsBlackInJaque,
    setIsWhiteInJaque,
    isWhiteInJaque,
    isBlackInJaque,
    setWhiteLegalMovements,
    setBlackLegalMovements
  } = useContext(PiecesContext);

  const {
    kingJaqueMoves,
    queenJaqueMoves,
    pawnJaqueMoves,
    knightJaqueMoves,
    rookJaqueMoves,
    checkKingJaque
  } = useCheckJaque();

  /**
   * Effect hook that evaluate jaque when the all enemy pieces are evaluated.
   */
  const [legalMoves, setLegalMoves] = useState([])
  /**
* Check the legal moves for the King piece.
* This function will simulate the possible moves for the King on a copy of the board, and return the moves that are legal.
* A move is considered legal if it does not put the King in check.
* @returns {Array} An array of the legal moves for the King.
*/
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

  /**
 * useEffect hook that evaluates if the King is in check when the turn changes.
 * It creates a copy of the board and checks if the King is in check by any of the enemy pieces.
 * If the King is in check, it updates the corresponding state.
 */
  useEffect(() => {
    if (turn && turn === team) {
      const boardToCheck = board.map((fila) => fila.map((cell) => ({ ...cell })));
      if (team === "White") {
        //Evaluar jaque al rey Blanco por las piezas negras
        blackPieces.forEach((piece) => {
          const { fila, columna } = piece
          if (piece.piece === "King") {
            kingJaqueMoves(fila, columna, "Black", boardToCheck);
          }
          else if (piece.piece === "Queen") {
            queenJaqueMoves(fila, columna, "Black", boardToCheck);
          }
          else if (piece.piece === "Pawn") {
            pawnJaqueMoves(fila, columna, "Black", boardToCheck);
          }
          else if (piece.piece === "Knight") {
            knightJaqueMoves(fila, columna, "Black", boardToCheck);
          }
          else if (piece.piece === "Rook") {
            rookJaqueMoves(fila, columna, "Black", boardToCheck);
          }
        });
        if (checkKingJaque(filaIndex, columnaIndex, boardToCheck)) {
          setIsWhiteInJaque(true)
        } else {
          setIsWhiteInJaque(false)
        }
      }
      else {
        //Evaluar jaque al rey negro por las piezas blanca
        whitePieces.forEach((piece) => {
          const { fila, columna } = piece
          if (piece.piece === "King") {
            kingJaqueMoves(fila, columna, "White", boardToCheck);
          }
          else if (piece.piece === "Queen") {
            queenJaqueMoves(fila, columna, "White", boardToCheck);
          }
          else if (piece.piece === "Pawn") {
            pawnJaqueMoves(fila, columna, "White", boardToCheck);
          }
          else if (piece.piece === "Knight") {
            knightJaqueMoves(fila, columna, "White", boardToCheck);
          }
          else if (piece.piece === "Rook") {
            rookJaqueMoves(fila, columna, "White", boardToCheck);
          }
        });
        if (checkKingJaque(filaIndex, columnaIndex, boardToCheck)) {
          setIsBlackInJaque(true)
        } else {
          setIsBlackInJaque(false)
        }
      }
    }
  }, [turn]);

  const { kingMoves } = moves(filaIndex, columnaIndex, team)
  function showMovements() {
    const resetedBoard = resetAvailableMovements()
    const posibleMoves = commonCheckLegalMoves(kingMoves(resetedBoard))
    commonShowMovements(posibleMoves, resetedBoard)
  }

  function showLegalMovements() {
    const resetedBoard = resetAvailableMovements()
    commonShowLegalMovements(legalMoves, resetedBoard)
  }

  function checkLegalMoves() {
    const newLegalMoves = commonCheckLegalMoves(kingMoves(board))
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

  return { showMovements, showLegalMovements };
}
