import { useContext } from 'react';
import checkJaque from './checkJaque';
import { PiecesContext } from '../context/pieces';

export default function useMakeSimulatedMoves() {
    const { blackPieces, whitePieces, whiteKingPosition, blackKingPosition } = useContext(PiecesContext);
    /**
     * Simulates moves on a chess board and returns the legal moves.
     *
     * @param {Array} moves - The list of moves to simulate.
     * @param {number} fromFilaIndex - The fila index of the piece to move.
     * @param {number} fromColumnaIndex - The columna index of the piece to move.
     * @param {Array} boardToSimulate - The chess board to simulate the moves on.
     * @param {string} team - The team color of the piece to move.
     * @returns {Array} - The legal moves after simulating the moves.
     */
    function simulateMoves(moves, fromFilaIndex, fromColumnaIndex, boardToSimulate, team) {
        const { rookJaqueMoves, queenJaqueMoves, pawnJaqueMoves, bishopJaqueMoves, kingJaqueMoves, knightJaqueMoves, checkKingJaque } = checkJaque()
        const legalMoves = []
        let blackPiecesCopy = []
        let whitePiecesCopy = []
        let whiteKingPositionCopy = { ...whiteKingPosition }
        let blackKingPositionCopy = { ...blackKingPosition }
        moves.forEach(move => {
            const simulatedMove = boardToSimulate.map((fila) => fila.map((columna) => ({ ...columna })))
            const { fila, columna } = move
  
           simulatedMove[fila][columna] = {...simulatedMove[fromFilaIndex][fromColumnaIndex]} 
            /*
            //Si el movimiento es un ataque hacer una copia profunda de los whitePieces y blackPieces, 
            hacer un find para encontrar la pieza que se va a eliminar y eliminarla de la lista
            para poder iterar sobre las piezas restantes y verificar si el rey esta en jaque
            */
                if (team === "White") {
                    if (move.classAdditional === "attackable") blackPiecesCopy = blackPieces.filter(piece => !(piece.fila === fila && piece.columna === columna))
                    else blackPiecesCopy = blackPieces.map(piece => ({...piece}))
                    if(simulatedMove[fromFilaIndex][fromColumnaIndex].piece === "King") {
                        whiteKingPositionCopy = {fila, columna}
                    }
                }
                else {
                     if(move.classAdditional === "attackable") whitePiecesCopy = whitePieces.filter(piece => !(piece.fila === fila && piece.columna === columna))
                     else  whitePiecesCopy = whitePieces.map(piece => ({...piece}))
                    if(simulatedMove[fromFilaIndex][fromColumnaIndex].piece === "King") {
                        blackKingPositionCopy = {fila, columna}
                    }
                } 
            simulatedMove[fromFilaIndex][fromColumnaIndex] = { piece: undefined, team: undefined, classAdditional: undefined }
            if (team === "White") {
                blackPiecesCopy.forEach(piece => {
                    if (piece.piece === "King") {
                        kingJaqueMoves(piece.fila, piece.columna, "Black", simulatedMove)
                    }
                    else if (piece.piece === "Queen") {
                        queenJaqueMoves(piece.fila, piece.columna, "Black", simulatedMove)
                    }
                    else if (piece.piece === "Rook") {
                        rookJaqueMoves(piece.fila, piece.columna, "Black", simulatedMove)
                    }
                    else if (piece.piece === "Bishop") {
                        bishopJaqueMoves(piece.fila, piece.columna, "Black", simulatedMove)
                    }
                    else if (piece.piece === "Knight") {
                        knightJaqueMoves(piece.fila, piece.columna, "Black", simulatedMove)
                    }
                    else if (piece.piece === "Pawn") {
                        pawnJaqueMoves(piece.fila, piece.columna, "Black", simulatedMove)
                    }
                })
                if (checkKingJaque(whiteKingPositionCopy.fila, whiteKingPositionCopy.columna, simulatedMove) === false) {
                    legalMoves.push(move)
                }
            }
            else {
                whitePiecesCopy.forEach(piece => {
                    if (piece.piece === "King") {
                        kingJaqueMoves(piece.fila, piece.columna, "White", simulatedMove)
                    }
                    else if (piece.piece === "Queen") {
                        queenJaqueMoves(piece.fila, piece.columna, "White", simulatedMove)
                    }
                    else if (piece.piece === "Rook") {
                        rookJaqueMoves(piece.fila, piece.columna, "White", simulatedMove)
                    }
                    else if (piece.piece === "Bishop") {
                        bishopJaqueMoves(piece.fila, piece.columna, "White", simulatedMove)
                    }
                    else if (piece.piece === "Knight") {
                        knightJaqueMoves(piece.fila, piece.columna, "White", simulatedMove)
                    }
                    else if (piece.piece === "Pawn") {
                        pawnJaqueMoves(piece.fila, piece.columna, "White", simulatedMove)
                    }
                })
                if (checkKingJaque(blackKingPositionCopy.fila, blackKingPositionCopy.columna, simulatedMove) === false) {
                    legalMoves.push(move)
                }
            }
        });
        return legalMoves
    }
    return { simulateMoves }
}