export default function handleMoveLogic(updatedBoard, filaIndex, columnaIndex, toFilaIndex, toColumnaIndex, board, whitePieces, blackPieces, setWhitePieces, setBlackPieces, setWhiteKingPosition, setBlackKingPosition, moveSoundAudio, captureSoundAudio) {
    const pieceToMove = { ...updatedBoard[filaIndex][columnaIndex] };
    if (board[toFilaIndex][toColumnaIndex].piece) captureSoundAudio.play()
    else moveSoundAudio.play()

    // Actualiza la posición de la pieza en el nuevo lugar
    updatedBoard[toFilaIndex][toColumnaIndex] = pieceToMove;

    //Evaluar si es una pieza con la propiedad firstMove, y actualizar la propiedad
    if (pieceToMove.piece === "Pawn" || pieceToMove.piece === "Rook" || pieceToMove.piece === "King") {
        updatedBoard[toFilaIndex][toColumnaIndex].firstMove = false;
    }

    //Actualizar el state que contiene la informacion de las piezas
    if (pieceToMove.team === "White") {
        const newWhitePieces = whitePieces.map((piece) => ({ ...piece }));
        const piece = newWhitePieces.find((piece) => piece.fila === filaIndex && piece.columna === columnaIndex)
        if (piece.piece === "Pawn") {
            piece.firstMove = false
        }
        piece.fila = toFilaIndex
        piece.columna = toColumnaIndex
        setWhitePieces(newWhitePieces)
    }
    if (pieceToMove.team === "Black") {
        const newBlackPieces = blackPieces.map((piece) => ({ ...piece }));
        const piece = newBlackPieces.find((piece) => piece.fila === filaIndex && piece.columna === columnaIndex)
        if (piece.piece === "Pawn") {
            piece.firstMove = false
        }
        piece.fila = toFilaIndex
        piece.columna = toColumnaIndex
        setBlackPieces(newBlackPieces)
    }

    //Actualizar la posición del rey
    if (pieceToMove.piece === "King") {
        if (pieceToMove.team === "White") {
            setWhiteKingPosition({ fila: toFilaIndex, columna: toColumnaIndex })
        } else {
            setBlackKingPosition({ fila: toFilaIndex, columna: toColumnaIndex })
        }
    }
    // Limpiar la posición anterior y los estados de seleccion y clases del tablero
    updatedBoard[filaIndex][columnaIndex] = { piece: undefined, team: undefined, classAdditional: "" };
    return updatedBoard
}