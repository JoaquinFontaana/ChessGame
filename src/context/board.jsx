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
        if(turn === TURNS.white) setTurn(TURNS.black)
        else setTurn(TURNS.white)
        //Obtener fila y columa de la pieza seleccionada
        const [fila, columna] = selectedPiece.split("-");
        //Parsear fila y columna
        const filaIndex = parseInt(fila, 10);
        const columnaIndex = parseInt(columna, 10);
    
        const updatedBoard = [...board];

        // Copiar el objeto
        const pieceToMove = { ...updatedBoard[filaIndex][columnaIndex]};  

        // Actualiza la posición de la pieza en el nuevo lugar
        updatedBoard[toFilaIndex][toColumnaIndex] = pieceToMove;

        //Evaluar si es un peon, y actualizar la propiedad firstMove
        if (pieceToMove.piece === "Pawn") {
            updatedBoard[toFilaIndex][toColumnaIndex].firstMove = false;
        }
        // Limpiar la posición anterior
        updatedBoard[filaIndex][columnaIndex] = {piece:undefined, team: undefined, classAdditional:""}
        setBoard(updatedBoard);
        setSelectedPiece(null)
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
