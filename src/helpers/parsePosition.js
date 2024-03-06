export default function parsePosition(selectedPiece){
    //Obtener fila y columa de la pieza seleccionada
    const [fila, columna] = selectedPiece.split("-");

    //Parsear fila y columna
    const filaIndex = parseInt(fila, 10);
    const columnaIndex = parseInt(columna, 10);
    return {filaIndex, columnaIndex}
}
