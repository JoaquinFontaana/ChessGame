import { createContext, useContext, useState } from "react";
import { BOARD, STARTEDBOARD } from "../const/BOARD";
import TURNS from "../const/TURNS";
import { PiecesContext } from "./pieces";
export const BoardContext = createContext();


export function BoardProvider({ children }) {
    const { setWhiteKingPosition } = useContext(PiecesContext);
    const [board, setBoard] = useState(BOARD);
    const [turn, setTurn] = useState(null);
    const [selectedPiece, setSelectedPiece] = useState(null);

    /**
     * Updates the chess board with a new board configuration.
     * @param {Array} newBoard - The new board configuration.
     */
    function updateBoard(newBoard) {
        setBoard(newBoard);
    }

    /**
     * Toggles the game state between starting and ending.
     * @param {boolean} boolean - The boolean value indicating whether to start or end the game.
     */
    function toggleGame(boolean) {
        if (boolean) {
            setTurn(TURNS.white);
            setWhiteKingPosition({ filaIndex: 7, columnaIndex: 4 });
            setBoard(STARTEDBOARD);
        } else {
            setSelectedPiece(null);
            setTurn(null);
            setWhiteKingPosition(null);
            setBoard(BOARD);
        }
    }

    /**
     * Handles the selection of a chess piece on the board.
     * @param {number} columnaIndex - The column index of the selected piece.
     * @param {number} filaIndex - The row index of the selected piece.
     */
    function handlePieceSelect(columnaIndex, filaIndex) {
        if (board[filaIndex][columnaIndex].piece) {
            const location = `${filaIndex}-${columnaIndex}`;
            setSelectedPiece(location);
        }
    }

    /**
     * Resets the available movements for all chess pieces on the board.
     * @returns {Array} The updated board configuration with reseted available movements.
     */
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
        );
        return resetedBoard;
    }

    /**
     * Resets all square classes on the board.
     * @param {Array} updatedBoard - The updated board configuration.
     */
    function resetAllSquareClasses(updatedBoard) {
        const resetedBoard = updatedBoard.map((fila) =>
            fila.map((casilla) => ({ ...casilla, classAdditional: "" }))
        );
        console.log(resetedBoard);
        setBoard(resetedBoard);
    }

    /**
     * Handles the movement of a chess piece on the board.
     * @param {number} toFilaIndex - The row index to move the piece to.
     * @param {number} toColumnaIndex - The column index to move the piece to.
     */
    function handleMove(toFilaIndex, toColumnaIndex) {
        //Actualizar turno
        if (selectedPiece) {
            if (turn === TURNS.white) {
                setTurn(TURNS.black);
            } else {
                setTurn(TURNS.white);
            }
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
            if (pieceToMove.piece === "King") {
                console.log("fila:", toFilaIndex, "columna:", toColumnaIndex);
                if (pieceToMove.team === TURNS.white) {
                    setWhiteKingPosition({ filaIndex: toFilaIndex, columnaIndex: toColumnaIndex });
                }
            }
            // Limpiar la posición anterior
            updatedBoard[filaIndex][columnaIndex] = { piece: undefined, team: undefined, classAdditional: "" };
            setSelectedPiece(null);
            resetAllSquareClasses(updatedBoard);
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
            }}
        >
            {children}
        </BoardContext.Provider>
    );
}
