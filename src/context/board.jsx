import { createContext, useContext, useEffect, useState } from "react";
import { BOARD, STARTEDBOARD } from "../const/BOARD";
import TURNS from "../const/TURNS";
import moveSound from "../../public/audios/move-self.mp3";
import captureSound from "../../public/audios/capture.mp3";
import { PiecesContext } from "./pieces";
export const BoardContext = createContext();

export function BoardProvider({ children }) {
    const [board, setBoard] = useState(BOARD);
    const [turn, setTurn] = useState(null);
    const [toggleGame, setToggleGame] = useState(false);
    const [selectedPiece, setSelectedPiece] = useState(null);
    const { setWhiteKingPosition, setBlackKingPosition, setBlackPieces, setWhitePieces, blackPieces, whitePieces,restartPieces } = useContext(PiecesContext);
    const moveSoundAudio = new Audio(moveSound)
    const captureSoundAudio = new Audio(captureSound)
    /**
     * Updates the chess board with a new board configuration.
     * @param {Array} newBoard - The new board configuration.
     */
    function updateBoard(newBoard) {
        setBoard(newBoard);
    }
    /**
     * Toggles the game state between starting and ending.
     */
    useEffect(()=>{
        if (toggleGame) {
            setTurn(TURNS.white);
            //Hago una copia de la constante STARTEDBOARD para no modificar la constante original
            const NEWSTARTEDBOARD = STARTEDBOARD.map((fila) => fila.map((columna) => ({ ...columna })))
            setBoard(NEWSTARTEDBOARD);
        } else {
            setSelectedPiece(null);
            setTurn(null);
            restartPieces()
            setBoard(BOARD);
        }
    },[toggleGame]) 


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
    function resetAvailableMovements(boardToReset = board) {
        const resetedBoard = boardToReset.map((fila) =>
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
            //Obtener fila y columa de la pieza seleccionada
            const [fila, columna] = selectedPiece.split("-");
            //Parsear fila y columna
            const filaIndex = parseInt(fila, 10);
            const columnaIndex = parseInt(columna, 10);

            const updatedBoard = board.map((fila) =>(fila.map((casilla) => ({ ...casilla }))));

            // Copiar el objeto
            const pieceToMove = { ...updatedBoard[filaIndex][columnaIndex] };
            if(board[toFilaIndex][toColumnaIndex].piece) captureSoundAudio.play()
            else moveSoundAudio.play()
            // Actualiza la posición de la pieza en el nuevo lugar
            updatedBoard[toFilaIndex][toColumnaIndex] = pieceToMove;
            //Evaluar si es un peon, y actualizar la propiedad firstMove
            if (pieceToMove.piece === "Pawn") {
                updatedBoard[toFilaIndex][toColumnaIndex].firstMove = false;
            }   
            //Actualizar el state que contiene la informacion de las piezas
            if (pieceToMove.team === "White") {
                const newWhitePieces = whitePieces.map((piece) => ({ ...piece }));
                const piece = newWhitePieces.find((piece) => piece.fila === filaIndex && piece.columna === columnaIndex)
                if(piece.piece === "Pawn"){
                    piece.firstMove = false
                }
                piece.fila = toFilaIndex
                piece.columna = toColumnaIndex
                setWhitePieces(newWhitePieces)
            }
            if (pieceToMove.team === "Black") {
                const newBlackPieces = blackPieces.map((piece) => ({ ...piece }));
                const piece = newBlackPieces.find((piece) => piece.fila === filaIndex && piece.columna === columnaIndex)
                if(piece.piece === "Pawn"){
                    piece.firstMove = false
                }
                piece.fila = toFilaIndex
                piece.columna = toColumnaIndex
                setBlackPieces(newBlackPieces)
            }
            //Actualizar la posición del rey
            if (pieceToMove.piece === "King") {
                if (pieceToMove.team === "White") {
                    setWhiteKingPosition({ fila: toFilaIndex, columna: toColumnaIndex })
                } else {
                    setBlackKingPosition({ fila: toFilaIndex, columna: toColumnaIndex })
                }
            }
            // Limpiar la posición anterior y los estados de seleccion y clases del tablero
            updatedBoard[filaIndex][columnaIndex] = { piece: undefined, team: undefined, classAdditional: "" };
            setSelectedPiece(null);
            resetAllSquareClasses(updatedBoard);
            if (turn === TURNS.white) {
                setTurn(TURNS.black);
            } else {
                setTurn(TURNS.white);
            }
        }
    }

    return (
        <BoardContext.Provider
            value={{
                board: board,
                toggleGame,
                updateBoard,
                handlePieceSelect,
                resetAvailableMovements,
                handleMove,
                turn: turn,
                setToggleGame,
                selectedPiece
            }}
        >
            {children}
        </BoardContext.Provider>
    );
}
