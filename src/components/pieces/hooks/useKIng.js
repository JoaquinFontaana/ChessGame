import { useContext, useEffect, useState } from "react";
import { BoardContext } from "../../../context/board";
import moves from "../../../helpers/moves";

export default function useKing(filaIndex, columnaIndex, team) {
    const { resetAvailableMovements, updateBoard, board,turn, whiteKingPosition} = useContext(BoardContext);
    const[jaque, setJaque] = useState(false)
    useEffect(()=>{
        if(turn && turn === team){
            checkKingJaque()
        }
    },[turn])
    function checkKingJaque(){
        console.log("entra a la funcion", team)
        if (turn === "White") {
            const { whiteKingFila, whiteKingColumna } = whiteKingPosition
            if (board && board[whiteKingFila][whiteKingColumna].classAdditional === "threatenedKing") {
                setJaque(true)
                console.log("Deteccion de jaque para king blanco")
            }
            else setJaque(false)
    }
}
    function showMovements() {
        const resetedBoard = resetAvailableMovements();
        const { kingMoves } = moves(filaIndex, columnaIndex, team, resetedBoard);
        kingMoves();
        updateBoard(resetedBoard);
    }

    return { showMovements };
}