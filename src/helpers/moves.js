export default function moves(filaIndex, columnaIndex, team, board) {

    function verticalHorizontalMoves() {
        let i = filaIndex + 1
        let y = columnaIndex
        let enemyPiece = false
        while (
            i >= 0 &&
            i < board.length &&
            board[i][y] &&
            board[i][y].team !== team
            && !enemyPiece
        ) {
            if (board[i][y].piece === undefined) board[i][y].classAdditional = "available"
            else if (board[i][y].piece && board[i][y].team !== team) {
                board[i][y].classAdditional = "attackable"
                enemyPiece = true
            }
            i++
        }
        i = filaIndex - 1
        y = columnaIndex
        enemyPiece = false
        while (
            i >= 0 &&
            i < board.length &&
            board[i][y] &&
            board[i][y].team !== team
            && !enemyPiece
        ) {
            if (board[i][y].piece === undefined) board[i][y].classAdditional = "available"
            else if (board[i][y].piece && board[i][y].team !== team) {
                board[i][y].classAdditional = "attackable"
                enemyPiece = true
            }
            i--
        }
        i = filaIndex
        y = columnaIndex + 1
        enemyPiece = false
        while (
            y >= 0 &&
            y < board.length &&
            board[i][y] &&
            board[i][y].team !== team
            && !enemyPiece
        ) {
            if (board[i][y].piece === undefined) board[i][y].classAdditional = "available"
            else if (board[i][y].piece && board[i][y].team !== team) {
                board[i][y].classAdditional = "attackable"
                enemyPiece = true
            }
            y++
        }
        i = filaIndex
        y = columnaIndex - 1
        enemyPiece = false
        while (
            y >= 0 &&
            y < board.length &&
            board[i][y] &&
            board[i][y].team !== team
            && !enemyPiece
        ) {
            if (board[i][y].piece === undefined) board[i][y].classAdditional = "available"
            else if (board[i][y].piece && board[i][y].team !== team) {
                board[i][y].classAdditional = "attackable"
                enemyPiece = true
            }
            y--
        }
    }

    function diagonalMoves() {
        let enemyPiece = false
        let i = filaIndex - 1
        let y = columnaIndex + 1
        while (
            i >= 0 &&
            i < board.length &&
            y >= 0 &&
            y < board[0].length &&
            board[i][y] &&
            board[i][y].team !== team
            && !enemyPiece
        ) {
            if (board[i][y].piece === undefined) board[i][y].classAdditional = "available"
            else if (board[i][y].piece && board[i][y].team !== team) {
                board[i][y].classAdditional = "attackable"
                enemyPiece = true
            }
            i--
            y++
        }
        i = filaIndex - 1
        y = columnaIndex - 1
        enemyPiece = false
        while (
            i >= 0 &&
            i < board.length &&
            y >= 0 &&
            y < board[0].length &&
            board[i][y] &&
            board[i][y].team !== team
            && !enemyPiece
        ) {
            if (board[i][y].piece === undefined) board[i][y].classAdditional = "available"
            else if (board[i][y].piece && board[i][y].team !== team) {
                board[i][y].classAdditional = "attackable"
                enemyPiece = true
            }
            i--
            y--
        }
        enemyPiece = false
        i = filaIndex + 1
        y = columnaIndex + 1
        while (
            i >= 0 &&
            i < board.length &&
            y >= 0 &&
            y < board[0].length &&
            board[i][y] &&
            board[i][y].team !== team
            && !enemyPiece
        ) {
            if (board[i][y].piece === undefined) board[i][y].classAdditional = "available"
            else if (board[i][y].piece && board[i][y].team !== team) {
                board[i][y].classAdditional = "attackable"
                enemyPiece = true
            }
            i++
            y++
        }
        i = filaIndex + 1
        y = columnaIndex - 1
        enemyPiece = false
        while (
            i >= 0 &&
            i < board.length &&
            y >= 0 &&
            y < board[0].length &&
            board[i][y] &&
            board[i][y].team !== team
            && !enemyPiece
        ) {
            if (board[i][y].piece === undefined) board[i][y].classAdditional = "available"
            else if (board[i][y].piece && board[i][y].team !== team) {
                board[i][y].classAdditional = "attackable"
                enemyPiece = true
            }
            i++
            y--
        }
    }
    function kingMoves() {
        console.log("funcion")
        for (let a = -1; a < 2; a++) {
            for (let b = -1; b < 2; b++) {
                const i = filaIndex + a;
                const y = columnaIndex + b;

                if (board[i] && board[i][y]) {
                    if (board[i][y].piece && board[i][y].team !== team) {
                        board[i][y].classAdditional = "attackable";
                    } else if (board[i][y].piece === undefined) {
                        board[i][y].classAdditional = "available";
                    }
                }
            }
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
                    board[i][y].classAdditional = board[i][y].piece ? "attackable" : "available";
                }
            }
        })
    }
    return { verticalHorizontalMoves, diagonalMoves, knightMoves, kingMoves }
}