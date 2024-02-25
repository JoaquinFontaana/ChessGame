import { createContext, useState } from "react";
import { BOARD, STARTEDBOARD } from "../const/BOARD";
import TURNS from "../const/TURNS";
export const BoardContext = createContext();

export function BoardProvider({ children }) {
    const [board, setBoard] = useState(BOARD);
    const [turn,setTurn] = useState(null)
    const [selectedPiece, setSelectedPiece] = useState(null)
    function updateBoard(newBoard) {
        setBoard(newBoard)
    }

    function toggleGame(boolean) {
        if (boolean) {
            setTurn(TURNS.white)
            setBoard(STARTEDBOARD);
        } else {
            setSelectedPiece(null)
            setTurn(null)
            setBoard(BOARD);
        }
    }


    function handlePieceSelect(columnaIndex, filaIndex) {
        if (board[filaIndex][columnaIndex].piece) {
            const location = `${filaIndex}-${columnaIndex}`
            setSelectedPiece(location)
        }
    }
    function resetAvailableMovements() {
        const resetedBoard = board.map((fila) =>
            fila.map((casilla) => ({ ...casilla, classAdditional: "" }))
        );
        setBoard(resetedBoard)
        return resetedBoard
    }
    function handleMove(toFilaIndex, toColumnaIndex) {
        //Actualizar turno
        setSelectedPiece(null)
        if(turn === TURNS.white) setTurn(TURNS.black)
        else setTurn(TURNS.white)

        const [fila, columna] = selectedPiece.split("-");
    
        const filaIndex = parseInt(fila, 10);
        const columnaIndex = parseInt(columna, 10);
    
        const updatedBoard = [...board];
        const pieceToMove = { ...updatedBoard[filaIndex][columnaIndex] };  // Copiar el objeto
    
        // Actualiza la posición de la pieza en el nuevo lugar
        updatedBoard[toFilaIndex][toColumnaIndex] = pieceToMove;
    
        // Limpiar la posición anterior
        updatedBoard[filaIndex][columnaIndex] = {piece:undefined, team: undefined, classAdditional:""}
        setBoard(updatedBoard);
        resetAvailableMovements()
    }
    return (
        <BoardContext.Provider
            value={{
                board: board,
                toggleGame,
                updateBoard,
                selectedPiece: selectedPiece,
                handlePieceSelect,
                resetAvailableMovements,
                handleMove,
                turn:turn
            }}
        >
            {children}
        </BoardContext.Provider>
    );
}
