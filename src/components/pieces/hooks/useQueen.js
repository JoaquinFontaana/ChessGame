import { useContext, useEffect} from "react";
import { BoardContext } from "../../../context/board";
import moves from "../../../helpers/moves";
import useMakeSimulatedMoves from "../../../helpers/useMakeSimulatedMove";
export default function Queen (filaIndex,columnaIndex,team) {
    const {resetAvailableMovements, updateBoard,board} = useContext(BoardContext)
    const {verticalHorizontalMoves, diagonalMoves} = moves(filaIndex,columnaIndex,team)

    function showMovements(){
        const resetedBoard = resetAvailableMovements()
        const posibleMoves = [...verticalHorizontalMoves(resetedBoard), ...diagonalMoves(resetedBoard)]
        posibleMoves.forEach(move => {
            const {fila, columna, classAdditional} = move
            resetedBoard[fila][columna].classAdditional = classAdditional
        });
        updateBoard(resetedBoard)
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
        const boardToSimulate = board.map((fila) => [...fila]);
        const posibleMoves = [...verticalHorizontalMoves(board), ...diagonalMoves(board)]
        const legalMoves = simulateMoves(
          posibleMoves,
          filaIndex,
          columnaIndex,
          boardToSimulate,
          team
        );
        return legalMoves;
      }
    return{showMovements,showLegalMovements}
}