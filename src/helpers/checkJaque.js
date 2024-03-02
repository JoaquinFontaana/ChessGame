import {useContext} from "react"
import {PiecesContext} from "../context/pieces"

/**
 * Checks for possible moves to put the opponent's king in check.
 *
 * @param {number} filaIndex - The row index of the piece.
 * @param {number} columnaIndex - The column index of the piece.
 * @param {string} team - The team of the piece.
 * @param {Array<Array<Object>>} boardToUpdate - The current state of the chess board.
 */
export default function useCheckJaque(filaIndex, columnaIndex, team, boardToUpdate) {
    const {setPiecesEvaluated}= useContext(PiecesContext)
    /**
     * Marks the threatened squares by a rook and checks if the king is threatened.
     * @param {boolean} [boolean=true] - Optional parameter to indicate whether to update the count of evaluated pieces.
     */
    function rookJaqueMoves(boolean = true) {
        let i = filaIndex + 1
        let y = columnaIndex
        let king = false
        let enemyPiece = false
        while (
            i >= 0 &&
            i < boardToUpdate.length &&
            boardToUpdate[i][y] &&
            boardToUpdate[i][y].team !== team
            && !king
            && !enemyPiece
        ) {
            if (boardToUpdate[i][y].piece === undefined) boardToUpdate[i][y].classAdditional = "threatened"
            else if (boardToUpdate[i][y].piece === "King" && boardToUpdate[i][y].team !== team) {
                boardToUpdate[i][y].classAdditional = "threatenedKing"
                king = true
            }
            else if (boardToUpdate[i][y].piece && boardToUpdate[i][y].team !== team) {
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
            i < boardToUpdate.length &&
            boardToUpdate[i][y] &&
            boardToUpdate[i][y].team !== team
            && !king
        ) {
            if (boardToUpdate[i][y].piece === undefined) boardToUpdate[i][y].classAdditional = "threatened"
            else if (boardToUpdate[i][y].piece === "King" && boardToUpdate[i][y].team !== team) {
                boardToUpdate[i][y].classAdditional = "threatenedKing"
                king = true
            }
            else if (boardToUpdate[i][y].piece && boardToUpdate[i][y].team !== team) {
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
            y < boardToUpdate.length &&
            boardToUpdate[i][y] &&
            boardToUpdate[i][y].team !== team
            && !king
        ) {
            if (boardToUpdate[i][y].piece === undefined) boardToUpdate[i][y].classAdditional = "threatened"
            else if (boardToUpdate[i][y].piece === "King" && boardToUpdate[i][y].team !== team) {
                boardToUpdate[i][y].classAdditional = "threatenedKing"
                king = true
            }
            else if (boardToUpdate[i][y].piece && boardToUpdate[i][y].team !== team) {
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
            y < boardToUpdate.length &&
            boardToUpdate[i][y] &&
            boardToUpdate[i][y].team !== team
            && !king
        ) {
            if (boardToUpdate[i][y].piece === undefined) boardToUpdate[i][y].classAdditional = "threatened"
            else if (boardToUpdate[i][y].piece === "King" && boardToUpdate[i][y].team !== team) {
                boardToUpdate[i][y].classAdditional = "threatenedKing"
                king = true
            }
            else if (boardToUpdate[i][y].piece && boardToUpdate[i][y].team !== team) {
                enemyPiece = true
            }
            y--
        }
        if(boolean) setPiecesEvaluated(prevCount => prevCount + 1 )
    }

    /**
     * Calculates the possible moves for a bishop piece to check for checkmate.
     * @param {boolean} [boolean=true] - Optional parameter to indicate whether to update the count of evaluated pieces.
     */
    function bishopJaqueMoves(boolean = true) {
        let king = false
        let i = filaIndex - 1
        let y = columnaIndex + 1
        let enemyPiece = false
        while (
            i >= 0 &&
            i < boardToUpdate.length &&
            y >= 0 &&
            y < boardToUpdate[0].length &&
            boardToUpdate[i][y] &&
            boardToUpdate[i][y].team !== team
            && !king
        ) {
            if (boardToUpdate[i][y].piece === undefined) boardToUpdate[i][y].classAdditional = "threatened"
            else if (boardToUpdate[i][y].piece === "King" && boardToUpdate[i][y].team !== team) {
                boardToUpdate[i][y].classAdditional = "threatenedKing"
                king = true
            }
            else if (boardToUpdate[i][y].piece && boardToUpdate[i][y].team !== team) {
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
            i < boardToUpdate.length &&
            y >= 0 &&
            y < boardToUpdate[0].length &&
            boardToUpdate[i][y] &&
            boardToUpdate[i][y].team !== team
            && !king
        ) {
            if (boardToUpdate[i][y].piece === undefined) boardToUpdate[i][y].classAdditional = "threatened"
            else if (boardToUpdate[i][y].piece === "King" && boardToUpdate[i][y].team !== team) {
                boardToUpdate[i][y].classAdditional = "threatenedKing"
                king = true
            }
            else if (boardToUpdate[i][y].piece && boardToUpdate[i][y].team !== team) {
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
            i < boardToUpdate.length &&
            y >= 0 &&
            y < boardToUpdate[0].length &&
            boardToUpdate[i][y] &&
            boardToUpdate[i][y].team !== team
            && !king
        ) {
            if (boardToUpdate[i][y].piece === undefined) boardToUpdate[i][y].classAdditional = "threatened"
            else if (boardToUpdate[i][y].piece === "King" && boardToUpdate[i][y].team !== team) {
                boardToUpdate[i][y].classAdditional = "threatenedKing"
                king = true
            }
            else if (boardToUpdate[i][y].piece && boardToUpdate[i][y].team !== team) {
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
            i < boardToUpdate.length &&
            y >= 0 &&
            y < boardToUpdate[0].length &&
            boardToUpdate[i][y] &&
            boardToUpdate[i][y].team !== team
            && !king
            && !enemyPiece
        ) {
            if (boardToUpdate[i][y].piece === undefined) boardToUpdate[i][y].classAdditional = "threatened"
            else if (boardToUpdate[i][y].piece === "King" && boardToUpdate[i][y].team !== team) {
                boardToUpdate[i][y].classAdditional = "threatenedKing"
                king = true
            }
            else if (boardToUpdate[i][y].piece && boardToUpdate[i][y].team !== team) {
                enemyPiece = true
            }
            i++
            y--
        }
        if(boolean) setPiecesEvaluated(prevCount => prevCount + 1 )
    }
    /**
     * Calculates the possible knight moves that can result in a check (jaque).
     */
    function knightJaqueMoves() {
        const JaqueMoves = [
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
        JaqueMoves.forEach(posiciones => {
            const { fila, columna } = posiciones
            const i = filaIndex + fila;
            const y = columnaIndex + columna;
            // Verificar si la posición está dentro del tablero
            if (i >= 0 &&
                i < boardToUpdate.length &&
                y >= 0 &&
                y < boardToUpdate[0].length) {
                // Verificar si la posición está vacía o tiene una pieza del equipo contrario
                if (boardToUpdate[i][y].team !== team) {
                    // Asignar la clase según si está vacía o tiene una pieza para atacar
                    boardToUpdate[i][y].classAdditional = boardToUpdate[i][y].piece === "King" ? "threatenedKing" : "";
                    boardToUpdate[i][y].classAdditional = boardToUpdate[i][y].piece === undefined ? "threatened" : "";
                }
            }
        })
        setPiecesEvaluated(prevCount => prevCount + 1 )
    }
    function queenJaqueMoves() {
        rookJaqueMoves(false)
        bishopJaqueMoves(false)
        setPiecesEvaluated(prevCount => prevCount + 1 )
    }
    /**
     * Calculates the possible moves for a pawn to put the opponent's king in check.
     */
    function pawnJaqueMoves(){
        if (team === "White") {
            let positionToEvaluate = boardToUpdate[filaIndex -1][columnaIndex]
            if (positionToEvaluate && positionToEvaluate.piece === undefined) {
                boardToUpdate[filaIndex - 1][columnaIndex].classAdditional = "threatened";
                if(boardToUpdate[filaIndex][columnaIndex].firstMove){
                    let positionToEvaluate = boardToUpdate[filaIndex -2][columnaIndex]
                    if (positionToEvaluate && positionToEvaluate.piece === undefined) {
                        boardToUpdate[filaIndex - 2][columnaIndex].classAdditional = "threatened";
                    }
                }
            }
            positionToEvaluate = boardToUpdate[filaIndex-1][columnaIndex+1]
            if (positionToEvaluate && positionToEvaluate.piece === "King" && positionToEvaluate.team !== "White"){
                boardToUpdate[filaIndex-1][columnaIndex+1].classAdditional = "threatenedKing"
            }
            positionToEvaluate = boardToUpdate[filaIndex-1][columnaIndex-1]
            if (positionToEvaluate && positionToEvaluate.piece === "King" && positionToEvaluate.team !== "White"){
                boardToUpdate[filaIndex-1][columnaIndex-1].classAdditional = "threatenedKing"
            }
            setPiecesEvaluated(prevCount => prevCount + 1 )
        }
        if (team === "Black") {
            let positionToEvaluate = boardToUpdate[filaIndex + 1][columnaIndex]
            if (positionToEvaluate && positionToEvaluate.piece === undefined) {
                boardToUpdate[filaIndex + 1][columnaIndex].classAdditional = "threatened";
                if(boardToUpdate[filaIndex][columnaIndex].firstMove){
                    let positionToEvaluate = boardToUpdate[filaIndex +2][columnaIndex]
                    if (positionToEvaluate && positionToEvaluate.piece === undefined) {
                        boardToUpdate[filaIndex + 2][columnaIndex].classAdditional = "threatened";
                    }
                }
            }
            positionToEvaluate = boardToUpdate[filaIndex+1][columnaIndex+1]
            if (positionToEvaluate && positionToEvaluate.piece === "King" && positionToEvaluate.team !== "Black"){
                boardToUpdate[filaIndex+1][columnaIndex+1].classAdditional = "threatenedKing"
            }
            positionToEvaluate = boardToUpdate[filaIndex+1][columnaIndex-1]
            if (positionToEvaluate && positionToEvaluate.piece === "King" && positionToEvaluate.team !== "Black"){
                boardToUpdate[filaIndex+1][columnaIndex-1].classAdditional = "threatenedKing"
            }
            setPiecesEvaluated(prevCount => prevCount + 1 )
        }
    }
    function kingJaqueMoves() {
        for (let a = -1; a < 2; a++) {
            for (let b = -1; b < 2; b++) {
                const i = filaIndex + a;
                const y = columnaIndex + b;

                if (boardToUpdate[i] && boardToUpdate[i][y]) {
                    if (boardToUpdate[i][y].piece === "King" && boardToUpdate[i][y].team !== team) {
                        boardToUpdate[i][y].classAdditional = "threatenedKing";
                    } else if (boardToUpdate[i][y].piece === undefined) {
                        boardToUpdate[i][y].classAdditional = "threatened";
                    }
                }
            }
        }
        setPiecesEvaluated(prevCount => prevCount + 1 )
    }

    return { rookJaqueMoves, bishopJaqueMoves, knightJaqueMoves, queenJaqueMoves,pawnJaqueMoves, kingJaqueMoves}
}
