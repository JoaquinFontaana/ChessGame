import { useContext, useEffect, useState } from "react";
import { BoardContext } from "../../../context/board";
import moves from "../helpers/moves";
import { PiecesContext } from "../../../context/pieces";
import checkJaque from "../helpers/checkJaque";
import useCommomMethods from "./useCommonMethods";
import jaqueSound from "../../../../public/audios/jaque.mp3";
import useCastle from "./useCastle";
const jaqueSoundEffect = new Audio(jaqueSound);
/**
 * Custom hook for handling the behavior of a King piece in a chess game.
 * @param {number} filaIndex - The row index of the King piece on the chessboard.
 * @param {number} columnaIndex - The column index of the King piece on the chessboard.
 * @param {string} team - The team color of the King piece ('White' or 'Black').
 * @returns {Object} An object containing the showMovements function and the jaque state.
 */
export default function useKing(filaIndex, columnaIndex, team) {
  const { resetAvailableMovements, turn, board } = useContext(BoardContext);
  const { commonCheckLegalMoves, commonShowLegalMovements, commonShowMovements } = useCommomMethods(filaIndex, columnaIndex, team)
  const {
    whitePieces,
    blackPieces,
    setIsBlackInJaque,
    setIsWhiteInJaque,
    isWhiteInJaque,
    isBlackInJaque
  } = useContext(PiecesContext);

  const {checkMovesOfJaque} = checkJaque();

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
      let enemyPieces = team === 'White' ? blackPieces : whitePieces;
      if (checkMovesOfJaque(filaIndex, columnaIndex, enemyPieces, board, team === "White" ? "Black" : "White")) {
        if (team === "White") setIsWhiteInJaque(true)
        else setIsBlackInJaque(true)
        jaqueSoundEffect.play()
      }
      else {
        if (team === "White") setIsWhiteInJaque(false)
        else setIsBlackInJaque(false)
      }
    }
  }, [turn])

  const {showCastleMoves}= useCastle(filaIndex,columnaIndex)
  const { kingMoves } = moves(filaIndex, columnaIndex, team)
  function showMovements() {
    const resetedBoard = resetAvailableMovements()
    let castleMoves = showCastleMoves(filaIndex,columnaIndex,resetedBoard)
    let posibleMoves = commonCheckLegalMoves(kingMoves(resetedBoard),undefined,false)
    posibleMoves = [...posibleMoves,...castleMoves]
    commonShowMovements(posibleMoves, resetedBoard)
  }

  function showLegalMovements() {
    const resetedBoard = resetAvailableMovements()
    commonShowLegalMovements(legalMoves, resetedBoard)
  }

  function checkLegalMoves(boolean = true) {
    commonCheckLegalMoves(kingMoves(board),setLegalMoves,boolean)
  }

  return { showMovements, showLegalMovements };
}
