import { useContext } from 'react';
import checkJaque from './checkJaque';
import { PiecesContext } from '../context/pieces';

export default function useMakeSimulatedMoves() {
    const { blackPieces, whitePieces, whiteKingPosition, blackKingPosition } = useContext(PiecesContext);
    function simulateMoves(moves, fromFilaIndex, fromColumnaIndex, boardToSimulate, team) {
        const { rookJaqueMoves, queenJaqueMoves, pawnJaqueMoves, bishopJaqueMoves, kingJaqueMoves, knightJaqueMoves, checkKingJaque } = checkJaque()
        const legalMoves = []
        moves.forEach(move => {
            const simulatedMove = boardToSimulate.map((fila)=> fila.map((columna)=>({...columna})))
            const { fila, columna } = move
            simulatedMove[fila][columna] = {...simulatedMove[fromFilaIndex][fromColumnaIndex]}
            simulatedMove[fromFilaIndex][fromColumnaIndex] = { piece: undefined, team: undefined, classAdditional: undefined }
            if (team === "White") {
                blackPieces.forEach(piece => {
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
                console.log("Simulated move",boardToSimulate[fromFilaIndex][fromColumnaIndex].piece ,simulatedMove)
                if (checkKingJaque(whiteKingPosition.fila, whiteKingPosition.columna, "White", simulatedMove) === false) {
                    console.log("Movimiento valido", move)
                    legalMoves.push(move)
                }
            }
            else {
                whitePieces.forEach(piece => {
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
                if (checkKingJaque(blackKingPosition.fila, blackKingPosition.columna, "Black", simulatedMove)=== false) {
                    legalMoves.push(move)
                }
            }
        });
        return legalMoves
    }
    return{simulateMoves}
}