import { useContext} from "react";
import { BoardContext } from "../../../context/board";

export default function usePawn(actualColumnaIndex, actualFilaIndex, team) {
    const { updateBoard,resetAvailableMovements} = useContext(BoardContext)

    function showMovements() { 
        const resetedBoard = resetAvailableMovements()
            if (team === "White") {
                let positionToEvaluate = resetedBoard[actualFilaIndex -1][actualColumnaIndex]
                if (positionToEvaluate && positionToEvaluate.piece === undefined) {
                    resetedBoard[actualFilaIndex - 1][actualColumnaIndex].classAdditional = "available";
                    if(resetedBoard[actualFilaIndex][actualColumnaIndex].firstMove){
                        let positionToEvaluate = resetedBoard[actualFilaIndex -2][actualColumnaIndex]
                        if (positionToEvaluate && positionToEvaluate.piece === undefined) {
                            resetedBoard[actualFilaIndex - 2][actualColumnaIndex].classAdditional = "available";
                        }
                    }
                }
                positionToEvaluate = resetedBoard[actualFilaIndex-1][actualColumnaIndex+1]
                if (positionToEvaluate && positionToEvaluate.piece && positionToEvaluate.team !== "White"){
                    resetedBoard[actualFilaIndex-1][actualColumnaIndex+1].classAdditional = "attackable"
                }
                positionToEvaluate = resetedBoard[actualFilaIndex-1][actualColumnaIndex-1]
                if (positionToEvaluate && positionToEvaluate.piece && positionToEvaluate.team !== "White"){
                    resetedBoard[actualFilaIndex-1][actualColumnaIndex-1].classAdditional = "attackable"
                }
            }
            if (team === "Black") {
                let positionToEvaluate = resetedBoard[actualFilaIndex + 1][actualColumnaIndex]
                if (positionToEvaluate && positionToEvaluate.piece === undefined) {
                    resetedBoard[actualFilaIndex + 1][actualColumnaIndex].classAdditional = "available";
                    if(resetedBoard[actualFilaIndex][actualColumnaIndex].firstMove){
                        let positionToEvaluate = resetedBoard[actualFilaIndex +2][actualColumnaIndex]
                        if (positionToEvaluate && positionToEvaluate.piece === undefined) {
                            resetedBoard[actualFilaIndex + 2][actualColumnaIndex].classAdditional = "available";
                        }
                    }
                }
                positionToEvaluate = resetedBoard[actualFilaIndex+1][actualColumnaIndex+1]
                if (positionToEvaluate && positionToEvaluate.piece && positionToEvaluate.team !== "Black"){
                    resetedBoard[actualFilaIndex+1][actualColumnaIndex+1].classAdditional = "attackable"
                }
                positionToEvaluate = resetedBoard[actualFilaIndex+1][actualColumnaIndex-1]
                if (positionToEvaluate && positionToEvaluate.piece && positionToEvaluate.team !== "Black"){
                    resetedBoard[actualFilaIndex+1][actualColumnaIndex-1].classAdditional = "attackable"
                }
            }
            updateBoard(resetedBoard);
        }
    return { showMovements}
}