import { createContext, useEffect, useState } from "react";
import { BOARD, STARTEDBOARD } from "../const/BOARD";
import TURNS from "../const/TURNS";
export const BoardContext = createContext();

export function BoardProvider({ children }) {
    const [board, setBoard] = useState(BOARD);
    const [turn, setTurn] = useState(null)
    const [whiteKingPosition, setWhiteKingPosition] = useState(null)
    const [selectedPiece, setSelectedPiece] = useState(null)
    function updateBoard(newBoard) {
        setBoard(newBoard)
    }
    function toggleGame(boolean) {
        if (boolean) {
            setTurn(TURNS.white)
            setWhiteKingPosition({whiteKingFila:7 , whiteKingColumna: 4})
            setBoard(STARTEDBOARD);
        } else {
            setSelectedPiece(null)
            setTurn(null)
            setWhiteKingPosition(null)
            setBoard(BOARD);
        }
    }
    useEffect(() => {
        console.log(STARTEDBOARD)
    }, [STARTEDBOARD])
    function handlePieceSelect(columnaIndex, filaIndex) {
        if (board[filaIndex][columnaIndex].piece) {
            const location = `${filaIndex}-${columnaIndex}`
            setSelectedPiece(location)
        }
    }

    function resetAvailableMovements() {
        const resetedBoard = board.map((fila) =>
            fila.map((casilla) => {
                // Filtra las clases existentes, eliminando attackable y available
                casilla.classAdditional = casilla.classAdditional
                    .split(" ")
                    .filter((clase) => clase !== "attackable" && clase !== "available")
                    .join(" ");
                return casilla;
            })
        )
        return resetedBoard
    }
    function resetAllSquareClasses(updatedBoard) {
        const resetedBoard = updatedBoard.map((fila) =>
            fila.map((casilla) => ({ ...casilla, classAdditional: "" }))
        );
        console.log(resetedBoard);
        setBoard(resetedBoard);
    }
    
    function handleMove(toFilaIndex, toColumnaIndex) {
        //Actualizar turno
        if(selectedPiece){ 
        if (turn === TURNS.white) setTurn(TURNS.black)
        else setTurn(TURNS.white)
        //Obtener fila y columa de la pieza seleccionada
        const [fila, columna] = selectedPiece.split("-");
        //Parsear fila y columna
        const filaIndex = parseInt(fila, 10);
        const columnaIndex = parseInt(columna, 10);

        const updatedBoard = [...board];

        // Copiar el objeto
        const pieceToMove = { ...updatedBoard[filaIndex][columnaIndex] };

        // Actualiza la posición de la pieza en el nuevo lugar
        updatedBoard[toFilaIndex][toColumnaIndex] = pieceToMove;

        //Evaluar si es un peon, y actualizar la propiedad firstMove
        if (pieceToMove.piece === "Pawn") {
            updatedBoard[toFilaIndex][toColumnaIndex].firstMove = false;
        }
        if(pieceToMove.piece === "King"){
            setWhiteKingPosition({filaIndex:toFilaIndex,columnaIndex:toColumnaIndex})
        }
        // Limpiar la posición anterior
        updatedBoard[filaIndex][columnaIndex] = { piece: undefined, team: undefined, classAdditional: "" }
        setSelectedPiece(null)
        resetAllSquareClasses(updatedBoard)
    }
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
                turn: turn,
                whiteKingPosition:whiteKingPosition
            }}
        >
            {children}
        </BoardContext.Provider>
    );
}
