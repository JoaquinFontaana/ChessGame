import { useContext, useEffect, useState } from "react"
import { BoardContext } from "../context/board"

export default function useCheckJaque(filaIndex, columnaIndex, team, board) {
    const [jaque, setJaque] = useState(false)
    const { whiteKingPosition, turn } = useContext(BoardContext)
    useEffect(() => {
        if (turn && turn === "White") {
            const { whiteKingFila, whiteKingColumna } = whiteKingPosition
            if (board && board[whiteKingFila][whiteKingColumna].classAdditional === "threatenedKing") {
                setJaque(true)
                console.log("Deteccion de jaque para king blanco")
            }
            else setJaque(false)
        }
    }, [turn])

    function rookMoves() {
        let i = filaIndex + 1
        let y = columnaIndex
        let king = false
        let enemyPiece = false
        while (
            i >= 0 &&
            i < board.length &&
            board[i][y] &&
            board[i][y].team !== team
            && !king
            && !enemyPiece
        ) {
            if (board[i][y].piece === undefined) board[i][y].classAdditional = "threatened"
            else if (board[i][y].piece === "King" && board[i][y].team !== team) {
                board[i][y].classAdditional = "threatenedKing"
                king = true
            }
            else if (board[i][y].piece && board[i][y].team !== team) {
                enemyPiece = true
            }
            i++
        }
        i = filaIndex - 1
        y = columnaIndex
        king = false
        enemyPiece = false
        while (
            i >= 0 &&
            i < board.length &&
            board[i][y] &&
            board[i][y].team !== team
            && !king
        ) {
            if (board[i][y].piece === undefined) board[i][y].classAdditional = "threatened"
            else if (board[i][y].piece === "King" && board[i][y].team !== team) {
                board[i][y].classAdditional = "threatenedKing"
                king = true
            }
            else if (board[i][y].piece && board[i][y].team !== team) {
                enemyPiece = true
            }
            i--
        }
        i = filaIndex
        y = columnaIndex + 1
        king = false
        enemyPiece = false
        while (
            y >= 0 &&
            y < board.length &&
            board[i][y] &&
            board[i][y].team !== team
            && !king
        ) {
            if (board[i][y].piece === undefined) board[i][y].classAdditional = "threatened"
            else if (board[i][y].piece === "King" && board[i][y].team !== team) {
                board[i][y].classAdditional = "threatenedKing"
                king = true
            }
            else if (board[i][y].piece && board[i][y].team !== team) {
                enemyPiece = true
            }
            y++
        }
        i = filaIndex
        y = columnaIndex - 1
        king = false
        enemyPiece = false
        while (
            y >= 0 &&
            y < board.length &&
            board[i][y] &&
            board[i][y].team !== team
            && !king
        ) {
            if (board[i][y].piece === undefined) board[i][y].classAdditional = "threatened"
            else if (board[i][y].piece === "King" && board[i][y].team !== team) {
                board[i][y].classAdditional = "threatenedKing"
                king = true
            }
            else if (board[i][y].piece && board[i][y].team !== team) {
                enemyPiece = true
            }
            y--
        }
    }

    function bishopMoves() {
        let king = false
        let i = filaIndex - 1
        let y = columnaIndex + 1
        let enemyPiece = false
        while (
            i >= 0 &&
            i < board.length &&
            y >= 0 &&
            y < board[0].length &&
            board[i][y] &&
            board[i][y].team !== team
            && !king
        ) {
            if (board[i][y].piece === undefined) board[i][y].classAdditional = "threatened"
            else if (board[i][y].piece === "King" && board[i][y].team !== team) {
                board[i][y].classAdditional = "threatenedKing"
                king = true
            }
            else if (board[i][y].piece && board[i][y].team !== team) {
                enemyPiece = true
            }
            i--
            y++
        }
        i = filaIndex - 1
        y = columnaIndex - 1
        king = false
        enemyPiece = false
        while (
            i >= 0 &&
            i < board.length &&
            y >= 0 &&
            y < board[0].length &&
            board[i][y] &&
            board[i][y].team !== team
            && !king
        ) {
            if (board[i][y].piece === undefined) board[i][y].classAdditional = "threatened"
            else if (board[i][y].piece === "King" && board[i][y].team !== team) {
                board[i][y].classAdditional = "threatenedKing"
                king = true
            }
            else if (board[i][y].piece && board[i][y].team !== team) {
                enemyPiece = true
            }
            i--
            y--
        }
        king = false
        i = filaIndex + 1
        y = columnaIndex + 1
        enemyPiece = false
        while (
            i >= 0 &&
            i < board.length &&
            y >= 0 &&
            y < board[0].length &&
            board[i][y] &&
            board[i][y].team !== team
            && !king
        ) {
            if (board[i][y].piece === undefined) board[i][y].classAdditional = "threatened"
            else if (board[i][y].piece === "King" && board[i][y].team !== team) {
                board[i][y].classAdditional = "threatenedKing"
                king = true
            }
            else if (board[i][y].piece && board[i][y].team !== team) {
                enemyPiece = true
            }
            i++
            y++
        }
        i = filaIndex + 1
        y = columnaIndex - 1
        king = false
        enemyPiece = false
        while (
            i >= 0 &&
            i < board.length &&
            y >= 0 &&
            y < board[0].length &&
            board[i][y] &&
            board[i][y].team !== team
            && !king
            && !enemyPiece
        ) {
            if (board[i][y].piece === undefined) board[i][y].classAdditional = "threatened"
            else if (board[i][y].piece === "King" && board[i][y].team !== team) {
                board[i][y].classAdditional = "threatenedKing"
                king = true
            }
            else if (board[i][y].piece && board[i][y].team !== team) {
                enemyPiece = true
            }
            i++
            y--
        }
    }
    function knightMoves() {
        const moves = [
            { fila: -2, columna: -1 },
            { fila: -2, columna: 1 },
            { fila: -1, columna: -2 },
            { fila: -1, columna: 2 },
            { fila: 1, columna: -2 },
            { fila: 1, columna: 2 },
            { fila: 2, columna: -1 },
            { fila: 2, columna: 1 },
        ];

        // Verificar cada movimiento posible
        moves.forEach(posiciones => {
            const { fila, columna } = posiciones
            const i = filaIndex + fila;
            const y = columnaIndex + columna;
            // Verificar si la posición está dentro del tablero
            if (i >= 0 &&
                i < board.length &&
                y >= 0 &&
                y < board[0].length) {
                // Verificar si la posición está vacía o tiene una pieza del equipo contrario
                if (board[i][y].team !== team) {
                    // Asignar la clase según si está vacía o tiene una pieza para atacar
                    board[i][y].classAdditional = board[i][y].piece === "King" ? "threatenedKing" : "";
                    board[i][y].classAdditional = board[i][y].piece === undefined ? "threatened" : "";
                }
            }
        })
    }

    function queenMoves() {
        rookMoves()
        bishopMoves()
    }
    return { rookMoves, bishopMoves, knightMoves, queenMoves, jaque }
}