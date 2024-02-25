export default function moves(filaIndex, columnaIndex, team, board){
    function verticalHorizontalMoves(){
        let i = filaIndex+1
        let y = columnaIndex
        let enemyPiece = false
        while( 
            i >= 0 &&
            i < board.length &&
            board[i][y] &&
            board[i][y].team !== team
            && !enemyPiece
        ){
            if(board[i][y].piece === undefined) board[i][y].classAdditional = "available"
            else if (board[i][y].piece && board[i][y].team !== team) {
                board[i][y].classAdditional = "attackable"
                enemyPiece = true
            }
            i++
        }
        i = filaIndex-1
        y = columnaIndex
        enemyPiece = false
        while( 
            i >= 0 &&
            i < board.length &&
            board[i][y] &&
            board[i][y].team !== team
            && !enemyPiece
        ){
            if(board[i][y].piece === undefined) board[i][y].classAdditional = "available"
            else if (board[i][y].piece && board[i][y].team !== team) {
                board[i][y].classAdditional = "attackable"
                enemyPiece = true
            }
            i--
        }
        i = filaIndex
        y = columnaIndex+1
        enemyPiece = false
        while( 
            y >= 0 &&
            y < board.length &&
            board[i][y] &&
            board[i][y].team !== team
            && !enemyPiece
        ){
            if(board[i][y].piece === undefined) board[i][y].classAdditional = "available"
            else if (board[i][y].piece && board[i][y].team !== team) {
                board[i][y].classAdditional = "attackable"
                enemyPiece = true
            }
            y++
        }
        i = filaIndex
        y = columnaIndex-1
        enemyPiece = false
        while( 
            y >= 0 &&
            y < board.length &&
            board[i][y] &&
            board[i][y].team !== team
            && !enemyPiece
        ){
            if(board[i][y].piece === undefined) board[i][y].classAdditional = "available"
            else if (board[i][y].piece && board[i][y].team !== team) {
                board[i][y].classAdditional = "attackable"
                enemyPiece = true
            }
            y--
        }
    }
    function diagonalMoves(){
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
            return board
    }
    return{verticalHorizontalMoves,diagonalMoves}
}