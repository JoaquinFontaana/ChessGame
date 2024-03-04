import { useContext, useEffect} from "react";
import { BoardContext } from "../../../context/board";
import moves from "../../../helpers/moves";
import { PiecesContext } from "../../../context/pieces";
import useCheckJaque from "../../../helpers/checkJaque";
import useMakeSimulatedMoves from "../../../helpers/useMakeSimulatedMove";

/**
 * Custom hook for handling the behavior of a King piece in a chess game.
 * @param {number} filaIndex - The row index of the King piece on the chessboard.
 * @param {number} columnaIndex - The column index of the King piece on the chessboard.
 * @param {string} team - The team color of the King piece ('White' or 'Black').
 * @returns {Object} An object containing the showMovements function and the jaque state.
 */
export default function useKing(filaIndex, columnaIndex, team) {
  const { resetAvailableMovements, updateBoard, turn, board } = useContext(BoardContext);
  
  const {
    whitePieces,
    blackPieces,
    setIsBlackInJaque,
    setIsWhiteInJaque,
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
 useEffect(() => {
    if (turn && turn === team) {
      const boardToCheck = board.map((fila) => fila.map((cell) => ({...cell})));
      if(team === "White"){
        //Evaluar jaque al rey Blanco por las piezas negras
        blackPieces.forEach((piece) => {
          const {fila, columna} = piece
          if(piece.piece === "King"){
            kingJaqueMoves(fila, columna, "Black",boardToCheck);
          }
          else if(piece.piece === "Queen"){
            queenJaqueMoves(fila, columna,"Black",boardToCheck);
          }
          else if(piece.piece === "Pawn"){
            pawnJaqueMoves(fila, columna, "Black",boardToCheck);
          }
          else if(piece.piece === "Knight"){
            knightJaqueMoves(fila, columna, "Black",boardToCheck);
          }
          else if(piece.piece === "Rook"){
            rookJaqueMoves(fila, columna, "Black",boardToCheck);
          }
        });
        if(checkKingJaque(filaIndex, columnaIndex,team, boardToCheck)){
          setIsWhiteInJaque(true)
        } else{
          setIsWhiteInJaque(false)
        }
      }
      else{
        //Evaluar jaque al rey negro por las piezas blanca
        whitePieces.forEach((piece) => {
          const {fila, columna} = piece
          if(piece.piece === "King"){
            kingJaqueMoves(fila, columna, "White",boardToCheck);
          }
          else if(piece.piece === "Queen"){
            queenJaqueMoves(fila, columna,"White",boardToCheck);
          }
          else if(piece.piece === "Pawn"){
            pawnJaqueMoves(fila, columna, "White",boardToCheck);
          }
          else if(piece.piece === "Knight"){
            knightJaqueMoves(fila, columna, "White",boardToCheck);
          }
          else if(piece.piece === "Rook"){
            rookJaqueMoves(fila, columna, "White",boardToCheck);
          }
        });
        if(checkKingJaque(filaIndex, columnaIndex, team,boardToCheck)){
          setIsBlackInJaque(true)
        } else{
          setIsBlackInJaque(false)
        }
      }
    }
  }, [turn]);
  /**
   * Function to show the available movements for the King piece.
   */
  const { kingMoves } = moves(filaIndex, columnaIndex, team);
  function showMovements() {
    const resetedBoard = resetAvailableMovements();
    const posibleMoves = kingMoves(resetedBoard);
    posibleMoves.forEach((move) => {
      const { fila, columna, classAdditional } = move;
      resetedBoard[fila][columna].classAdditional = classAdditional;
    });
    updateBoard(resetedBoard);
  }
  function showLegalMovements(){
    const resetedBoard = resetAvailableMovements()
    const legalMoves = checkLegalMoves()
    legalMoves.forEach((move) => {
      const { fila, columna, classAdditional } = move;
      resetedBoard[fila][columna].classAdditional = classAdditional;
    });
    updateBoard(resetedBoard);
  }

  const { simulateMoves } = useMakeSimulatedMoves();
  function checkLegalMoves(){
    const boardToSimulate = board.map((fila) => fila.map((cell) => ({...cell})));
    const posibleMoves = kingMoves(board);
    const legalMoves = simulateMoves(
      posibleMoves,
      filaIndex,
      columnaIndex,
      boardToSimulate,
      team
    );
    return legalMoves;
  }

  return { showMovements, showLegalMovements};
}
