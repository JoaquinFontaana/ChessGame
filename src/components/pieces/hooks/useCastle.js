import checkJaque from "../helpers/checkJaque"
import { useContext } from "react";
import { PiecesContext } from "../../../context/pieces";
export default function useCastle() {
    let boardToCheck = []
    const { blackPieces, whitePieces } = useContext(PiecesContext)
    const { checkMovesOfJaque } = checkJaque()
    function showCastleMoves(filaIndex, columnaIndex, board) {
        
        if (board[filaIndex][columnaIndex].firstMove) {
            let posibleCastleMoves = []
            if (board[filaIndex][columnaIndex].team === "White") {
                if (board[7][0].firstMove) {
                    if (board[7][1].piece === undefined && board[7][2].team === undefined && board[7][3].team === undefined) {
                        boardToCheck = board.map((fila) => fila.map((cell) => ({ ...cell })));
                        boardToCheck[7][2] = { ...boardToCheck[filaIndex][columnaIndex] }
                        boardToCheck[7][2].firstMove = false
                        boardToCheck[filaIndex][columnaIndex] = { piece: undefined, team: undefined, classAdditional: "" }
                        boardToCheck[7][3] = { ...boardToCheck[7][0] }
                        boardToCheck[7][3].firstMove = false
                        boardToCheck[7][0] = { piece: undefined, team: undefined, classAdditional: "" }
                        if (!checkMovesOfJaque(7, 2, blackPieces, boardToCheck, "Black")) {
                            posibleCastleMoves.push({ fila: 7, columna: 0, classAdditional: "castle" })
                        }
                    }
                }
                if (board[7][7].firstMove) {
                    if (board[7][5].team === undefined && board[7][6].team === undefined) {
                        boardToCheck = board.map((fila) => fila.map((cell) => ({ ...cell })));
                        boardToCheck[7][6] = { ...boardToCheck[filaIndex][columnaIndex] }
                        boardToCheck[7][6].firstMove = false
                        boardToCheck[filaIndex][columnaIndex] = { piece: undefined, team: undefined, classAdditional: "" }
                        boardToCheck[7][5] = { ...boardToCheck[7][7] }
                        boardToCheck[7][5].firstMove = false
                        boardToCheck[7][7] = { piece: undefined, team: undefined, classAdditional: "" }
                        if (!checkMovesOfJaque(7, 6, blackPieces, boardToCheck, "Black")) {
                            posibleCastleMoves.push({ fila: 7, columna: 7, classAdditional: "castle" })
                        }
                    }
                }
                return posibleCastleMoves
            }
            else if (board[filaIndex][columnaIndex].firstMove && board[filaIndex][columnaIndex].team === "Black") {
                if (board[0][0].firstMove) {
                    if (board[0][1].team === undefined && board[0][2].team === undefined && board[0][3].team === undefined) {
                        boardToCheck = board.map((fila) => fila.map((cell) => ({ ...cell })));
                        boardToCheck[0][2] = { ...boardToCheck[filaIndex][columnaIndex] }
                        boardToCheck[0][2].firstMove = false
                        boardToCheck[filaIndex][columnaIndex] = { piece: undefined, team: undefined, classAdditional: "" }
                        boardToCheck[0][3] = { ...boardToCheck[0][0] }
                        boardToCheck[0][3].firstMove = false
                        boardToCheck[0][0] = { piece: undefined, team: undefined, classAdditional: "" }
                        if (!checkMovesOfJaque(0, 2, whitePieces, boardToCheck, "White")) {
                            posibleCastleMoves.push({ fila: 0, columna: 0, classAdditional: "castle" })
                        }
                    }
                }
                if (board[0][7].firstMove) {
                    if (board[0][5].team === undefined && board[0][6].team === undefined) {
                        boardToCheck = board.map((fila) => fila.map((cell) => ({ ...cell })));
                        boardToCheck[0][6] = { ...boardToCheck[filaIndex][columnaIndex] }
                        boardToCheck[0][6].firstMove = false
                        boardToCheck[filaIndex][columnaIndex] = { piece: undefined, team: undefined, classAdditional: "" }
                        boardToCheck[0][5] = { ...boardToCheck[0][7] }
                        boardToCheck[0][5].firstMove = false
                        boardToCheck[0][7] = { piece: undefined, team: undefined, classAdditional: "" }
                        if (!checkMovesOfJaque(0, 6, whitePieces, boardToCheck, "White")) {
                            posibleCastleMoves.push({ fila: 0, columna: 7, classAdditional: "castle" })
                        }
                    }
                }
                return posibleCastleMoves
            }
        }
        else return []
    }
    function handleCastle(kingFilaIndex, kingColumnaIndex, rookColumnaIndex, board, kingTeam, setWhiteKingPosition, setBlackKingPosition) {
        const boardToUpdate = board.map((fila) => fila.map((cell) => ({ ...cell })));
        if (rookColumnaIndex === 0) {
            boardToUpdate[kingFilaIndex][2] = { ...boardToUpdate[kingFilaIndex][kingColumnaIndex] }
            boardToUpdate[kingFilaIndex][kingColumnaIndex] = { piece: undefined, team: undefined, classAdditional: "" }
            boardToUpdate[kingFilaIndex][3] = { ...boardToUpdate[kingFilaIndex][0] }
            boardToUpdate[kingFilaIndex][0] = { piece: undefined, team: undefined, classAdditional: "" }
            if (kingTeam === "White") {
                setWhiteKingPosition({ fila: kingFilaIndex, columna: 2 })
            }
            else {
                setBlackKingPosition({ fila: kingFilaIndex, columna: 2 })
            }
        }
        else if (rookColumnaIndex === 7) {
            boardToUpdate[kingFilaIndex][6] = { ...boardToUpdate[kingFilaIndex][kingColumnaIndex] }
            boardToUpdate[kingFilaIndex][kingColumnaIndex] = { piece: undefined, team: undefined, classAdditional: "" }
            boardToUpdate[kingFilaIndex][5] = { ...boardToUpdate[kingFilaIndex][7] }
            boardToUpdate[kingFilaIndex][7] = { piece: undefined, team: undefined, classAdditional: "" }
            if (kingTeam === "White") {
                setWhiteKingPosition({ fila: kingFilaIndex, columna: 6 })
            }
            else {
                setBlackKingPosition({ fila: kingFilaIndex, columna: 6 })
            }
        }
        return boardToUpdate
    }
    return { showCastleMoves, handleCastle }
}