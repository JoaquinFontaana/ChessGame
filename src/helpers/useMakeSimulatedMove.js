import { useContext } from 'react';
import checkJaque from './checkJaque';
import { PiecesContext } from '../context/pieces';

export default function useMakeSimulatedMoves() {
    const { blackPieces, whitePieces, whiteKingPosition, blackKingPosition } = useContext(PiecesContext);
    function simulateMoves(moves, fromFilaIndex, fromColumnaIndex, boardToSimulate, team) {
        const { rookJaqueMoves, queenJaqueMoves, pawnJaqueMoves, bishopJaqueMoves, kingJaqueMoves, knightJaqueMoves, checkKingJaque } = checkJaque()
        const legalMoves = []
        console.log("moves to simulate", moves)
        moves.forEach(move => {
            const simulatedMove = boardToSimulate.map((fila) => fila.map((columna) => ({ ...columna })))
            const { fila, columna } = move
            /*
            //Si el movimiento es un ataque hacer una copia profunda de los whitePieces y blackPieces, 
            hacer un find para encontrar la pieza que se va a eliminar y eliminarla de la lista
            para poder iterar sobre las piezas restantes y verificar si el rey esta en jaque
            */
           let blackPiecesCopy = blackPieces.map(piece => ({...piece}))
           let whitePiecesCopy = whitePieces.map(piece => ({...piece}))
            if (move.classAdditional === "attackable") {
                if (team === "White") {
                     blackPiecesCopy = blackPieces.filter(piece => !(piece.fila === fila && piece.columna === columna))
                }
                else {
                     whitePiecesCopy = whitePieces.filter(piece => !(piece.fila === fila && piece.columna === columna))
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
                console.log("Simulated move", boardToSimulate[fromFilaIndex][fromColumnaIndex].piece, simulatedMove)
                if (checkKingJaque(whiteKingPosition.fila, whiteKingPosition.columna, "White", simulatedMove) === false) {
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
                if (checkKingJaque(blackKingPosition.fila, blackKingPosition.columna, "Black", simulatedMove) === false) {
                    legalMoves.push(move)
                }
            }
        });
        return legalMoves
    }
    return { simulateMoves }
}