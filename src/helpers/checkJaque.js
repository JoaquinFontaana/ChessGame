export default function useCheckJaque() {

    function rookJaqueMoves(filaIndex, columnaIndex, team, boardToUpdate) {
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
            if (boardToUpdate[i][y].piece === undefined || boardToUpdate[i][y].team === team) boardToUpdate[i][y].classAdditional = "threatened"
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
            && !enemyPiece
        ) {
            if (boardToUpdate[i][y].piece === undefined || boardToUpdate[i][y].team === team) boardToUpdate[i][y].classAdditional = "threatened"
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
            && !enemyPiece
        ) {
            if (boardToUpdate[i][y].piece === undefined || boardToUpdate[i][y].team === team) boardToUpdate[i][y].classAdditional = "threatened"
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
            && !enemyPiece
        ) {
            if (boardToUpdate[i][y].piece === undefined || boardToUpdate[i][y].team === team) boardToUpdate[i][y].classAdditional = "threatened"
            else if (boardToUpdate[i][y].piece === "King" && boardToUpdate[i][y].team !== team) {
                boardToUpdate[i][y].classAdditional = "threatenedKing"
                king = true
            }
            else if (boardToUpdate[i][y].piece && boardToUpdate[i][y].team !== team) {
                enemyPiece = true
            }
            y--
        }
    }

    function bishopJaqueMoves(filaIndex, columnaIndex, team, boardToUpdate) {
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
            && !enemyPiece
        ) {
            if (boardToUpdate[i][y].piece === undefined || boardToUpdate[i][y].team === team) boardToUpdate[i][y].classAdditional = "threatened"
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
            && !enemyPiece
        ) {
            if (boardToUpdate[i][y].piece === undefined || boardToUpdate[i][y].team === team) boardToUpdate[i][y].classAdditional = "threatened"
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
            && !enemyPiece
        ) {
            if (boardToUpdate[i][y].piece === undefined || boardToUpdate[i][y].team === team) boardToUpdate[i][y].classAdditional = "threatened"
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
            if (boardToUpdate[i][y].piece === undefined || boardToUpdate[i][y].team === team) boardToUpdate[i][y].classAdditional = "threatened"
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
    }
    /**
     * Calculates the possible knight moves that can result in a check (jaque).
     */
    function knightJaqueMoves(filaIndex, columnaIndex, team, boardToUpdate) {
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
                    if(boardToUpdate[i][y].piece === "King" && boardToUpdate[i][y].team !== team) boardToUpdate[i][y].classAdditional = "threatenedKing"
                    else if (boardToUpdate[i][y].piece === undefined || boardToUpdate[i][y].team === team) {
                        boardToUpdate[i][y].classAdditional = "threatened";
                    }
                }
            }
        })
    }
    function queenJaqueMoves(filaIndex, columnaIndex, team, boardToUpdate) {
        rookJaqueMoves(filaIndex, columnaIndex, team, boardToUpdate)
        bishopJaqueMoves(filaIndex, columnaIndex, team, boardToUpdate)
    }
    /**
     * Calculates the possible moves for a pawn to put the opponent's king in check.
     */
    function pawnJaqueMoves(filaIndex, columnaIndex, team, boardToUpdate) {
        if (team === "White") {
            let positionToEvaluate = boardToUpdate[filaIndex - 1][columnaIndex + 1]
            if (positionToEvaluate && positionToEvaluate.piece === "King" && positionToEvaluate.team !== team) {
                boardToUpdate[filaIndex - 1][columnaIndex + 1].classAdditional = "threatenedKing"
            }
            else if (positionToEvaluate && (positionToEvaluate.piece === undefined || positionToEvaluate.team === team)) {
                boardToUpdate[filaIndex - 1][columnaIndex + 1].classAdditional = "threatened";
            }
            positionToEvaluate = boardToUpdate[filaIndex - 1][columnaIndex - 1]
            if (positionToEvaluate && positionToEvaluate.piece === "King" && positionToEvaluate.team !== team) {
                boardToUpdate[filaIndex - 1][columnaIndex - 1].classAdditional = "threatenedKing"
            }
            else if (positionToEvaluate && (positionToEvaluate.piece === undefined || positionToEvaluate.team === team)) {
                boardToUpdate[filaIndex - 1][columnaIndex - 1].classAdditional = "threatened";
            }
        }
        if (team === "Black") {
            let positionToEvaluate = boardToUpdate[filaIndex + 1][columnaIndex + 1]
            if (positionToEvaluate && positionToEvaluate.piece === "King" && positionToEvaluate.team !== team) {
                boardToUpdate[filaIndex + 1][columnaIndex + 1].classAdditional = "threatenedKing"
            }
            else if (positionToEvaluate && (positionToEvaluate.piece === undefined || positionToEvaluate.team === team)) {
                boardToUpdate[filaIndex + 1][columnaIndex + 1].classAdditional = "threatened";
            }
            positionToEvaluate = boardToUpdate[filaIndex + 1][columnaIndex - 1]
            if (positionToEvaluate && positionToEvaluate.piece === "King" && positionToEvaluate.team !== team) {
                boardToUpdate[filaIndex + 1][columnaIndex - 1].classAdditional = "threatenedKing"
            }
            else if (positionToEvaluate && (positionToEvaluate.piece === undefined || positionToEvaluate.team === team)) {
                boardToUpdate[filaIndex + 1][columnaIndex - 1].classAdditional = "threatened";
            }
        }
    }

    function kingJaqueMoves(filaIndex, columnaIndex, team, boardToUpdate) {
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
    }

    /**
     * Checks if the king is in check.
     *
     * @param {number} filaIndex - The row index of the king's position.
     * @param {number} columnaIndex - The column index of the king's position.
     * @param {Array<Array<Object>>} boardToCheck - The chess board to check.
     * @returns {boolean} - True if the king is in check, false otherwise.
     */
    function checkKingJaque(filaIndex, columnaIndex, boardToCheck) {
        if (boardToCheck[filaIndex][columnaIndex].classAdditional === "threatenedKing") {
            return (true);
        } else return (false);
    }

    /**
     * Checks the possible moves of a piece to determine if it puts the opponent's king in check.
     * 
     * @param {number} filaIndexKing - The row index of the king's position.
     * @param {number} columnaIndexKing - The column index of the king's position.
     * @param {Array} enemyPieces - An array of enemy pieces.
     * @param {Array} boardToCheck - The chess board to check for possible moves.
     * @param {string} enemyTeam - The enemy team color.
     * @returns {boolean} - Returns true if the king is in check, false otherwise.
     */
    function checkMovesOfJaque(filaIndexKing, columnaIndexKing, enemyPieces, boardToCheck, enemyTeam) {
        enemyPieces.forEach((piece) => {
            const { fila, columna } = piece
            if (piece.piece === "King") {
                kingJaqueMoves(fila, columna, enemyTeam, boardToCheck);
            }
            else if (piece.piece === "Bishop") {
                bishopJaqueMoves(fila, columna, enemyTeam, boardToCheck);
            }
            else if (piece.piece === "Queen") {
                queenJaqueMoves(fila, columna, enemyTeam, boardToCheck);
            }
            else if (piece.piece === "Pawn") {
                pawnJaqueMoves(fila, columna, enemyTeam, boardToCheck);
            }
            else if (piece.piece === "Knight") {
                knightJaqueMoves(fila, columna, enemyTeam, boardToCheck);
            }
            else if (piece.piece === "Rook") {
                rookJaqueMoves(fila, columna, enemyTeam, boardToCheck);
            }
        })
        return checkKingJaque(filaIndexKing, columnaIndexKing, boardToCheck)
    }
    return { checkMovesOfJaque }
}