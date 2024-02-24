import { useContext } from "react";
import { BoardContext } from "../../../context/board";

export default function usePawn (){
    const {board} = useContext(BoardContext)
    
    function showMovements (actualFilaIndex,actualColumnaIndex) {
        if(!board[actualFilaIndex-1][actualColumnaIndex]){
            console.log("Entro")
            board[actualFilaIndex - 1][actualColumnaIndex] = { class: "available" };
            console.log(board[actualFilaIndex -1][actualColumnaIndex])
        }
    }
    return{showMovements}
}