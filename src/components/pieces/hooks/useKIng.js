import { useContext, useEffect, useRef, useState } from "react";
import { BoardContext } from "../../../context/board";
import moves from "../../../helpers/moves";
import { PiecesContext } from "../../../context/pieces";
import useCheckJaque from "../../../helpers/checkJaque";

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
    useEffect(() => {
        if(isFirstRender.current){
            isFirstRender.current=false
            return
        }
        else if (turn && turn !== team) {
        kingJaqueMoves();
        updateBoard(boardToupdate);
        }
    }, [turn]);

  useEffect(() => {
    if (turn && turn === team) {
      if (team !== "white") {
        console.log(piecesEvaluated);
        if (piecesEvaluated === whitePieces) {
          console.log("Deteccion de todas las piezas evaluadas");
          console.log(board);
          setPiecesEvaluated(0);
        }
      } else if (piecesEvaluated === blackPieces) {
        console.log("Deteccion de todas las piezas evaluadas");
        console.log(board);
        setPiecesEvaluated(0);
      }
    }
  }, [piecesEvaluated]);



  function showMovements() {
    const resetedBoard = resetAvailableMovements();
    const { kingMoves } = moves(filaIndex, columnaIndex, team, resetedBoard);
    kingMoves();
    updateBoard(resetedBoard);
  }

  /*   function checkKingJaque(turn, boardRef){
        const board = boardRef.current
        if(board && turn){ 
        if (turn === "White") {
            const { filaIndex, columnaIndex } = whiteKingPosition
            console.log(board[filaIndex][columnaIndex].classAdditional)
            if (board[filaIndex][columnaIndex].classAdditional === "threatenedKing") {
                setJaque(true)
                console.log("Deteccion de jaque para king blanco")
            }
            else setJaque(false)
    }
        else{
            console.log(turn)
        }
    }
}*/
  return { showMovements, jaque };
}
