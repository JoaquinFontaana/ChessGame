import { createContext, useContext, useEffect, useState } from "react";
import { BOARD, STARTEDBOARD } from "../const/BOARD";
import TURNS from "../const/TURNS";
import moveSound from "../../public/audios/move-self.mp3";
import captureSound from "../../public/audios/capture.mp3";
import { PiecesContext } from "./pieces";
import parsePosition from "../helpers/parsePosition";
import useCastle from "../components/pieces/hooks/useCastle";
export const BoardContext = createContext();
import moveLogic from "../helpers/moveLogic";
import castleSound from "../../public/audios/castle.mp3";
const moveSoundAudio = new Audio(moveSound)
const captureSoundAudio = new Audio(captureSound)
const castleSoundAudio = new Audio(castleSound)
export function BoardProvider({ children }) {
    const [board, setBoard] = useState(BOARD);
    const [turn, setTurn] = useState(null);
    const [toggleGame, setToggleGame] = useState(false);
    const [selectedPiece, setSelectedPiece] = useState(null);
    const { setWhiteKingPosition, setBlackKingPosition, setBlackPieces, setWhitePieces, blackPieces, whitePieces, restartPieces } = useContext(PiecesContext);
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
    useEffect(() => {
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
    }, [toggleGame])


    /**
     * Handles the selection of a chess piece on the board.
     * @param {number} columnaIndex - The column index of the selected piece.
     * @param {number} filaIndex - The row index of the selected piece.
     */
    function handlePieceSelect(columnaIndex, filaIndex) {
        if (board[filaIndex][columnaIndex].piece && board[filaIndex][columnaIndex].classAdditional !== "castle") {
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
                    .filter((clase) => clase !== "attackable" && clase !== "available" && clase !== "castle")
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
    function resetAllSquareClasses(boardToReset) {
        const resetedBoard = boardToReset.map((fila) =>
            fila.map((casilla) => ({ ...casilla, classAdditional: "" }))
        );
        return resetedBoard;
    }


    function newTurn(updatedBoard){
        setSelectedPiece(null);
        const resetedBoard = resetAllSquareClasses(updatedBoard);
        updateBoard(resetedBoard);
        // Cambiar el turno
        if (turn === TURNS.white) {
            setTurn(TURNS.black);
        } else {
            setTurn(TURNS.white);
        }
        return resetedBoard
    }

    function handleMove(toFilaIndex, toColumnaIndex) {
        if (selectedPiece) {
            const { filaIndex, columnaIndex } = parsePosition(selectedPiece)

            let boardToUpdate = board.map((fila) => (fila.map((casilla) => ({ ...casilla }))));

            const updatedBoard = moveLogic(
                boardToUpdate,
                filaIndex,
                columnaIndex,
                toFilaIndex,
                toColumnaIndex,
                board, 
                whitePieces, 
                blackPieces,
                setWhitePieces,
                setBlackPieces,
                setWhiteKingPosition,
                setBlackKingPosition,
                moveSoundAudio,
                captureSoundAudio)

                const restedBoard = newTurn(updatedBoard)
                updateBoard(restedBoard)
        }
    }
    const { handleCastle } = useCastle()
    function doCastle(rookFilaIndex, rookColumnaIndex) {
        const { filaIndex, columnaIndex } = parsePosition(selectedPiece)
        const kingTeam =  board[filaIndex][columnaIndex].team
        castleSoundAudio.play()
        const updatedBoard = handleCastle(filaIndex, columnaIndex, rookColumnaIndex, board, kingTeam,setWhiteKingPosition,setBlackKingPosition)
        const restedBoard = newTurn(updatedBoard)
        updateBoard(restedBoard)
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
                selectedPiece,
                resetAllSquareClasses,
                doCastle
            }}
        >
            {children}
        </BoardContext.Provider>
    );
}
