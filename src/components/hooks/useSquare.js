import { BoardContext } from "../../context/board";
import { PiecesContext } from "../../context/pieces";
import styles from "../Board.module.css"
import { useState, useEffect, lazy, useContext } from "react";
/**
 * Custom hook for managing a chess square.
 * @param {string} classAdditional - Additional CSS class for the square.
 * @param {string} piece - Name of the chess piece on the square.
 * @param {string} color - Color of the square ("white" or "black").
 * @param {number} filaIndex - Row index of the square.
 * @param {number} columnaIndex - Column index of the square.
 * @param {string} team - Team color of the piece.
 * @returns {Object} - An object containing the combined CSS class, dynamic component, availability status, selection handler, and attackability status.
 */
export default function useSquare(classAdditional, piece, color, filaIndex, columnaIndex, team) {
    const { handlePieceSelect, turn, selectedPiece, board, handleMove} = useContext(BoardContext)
    const {whitePieces,blackPieces, setWhitePieces, setBlackPieces} = useContext(PiecesContext)
    const colorClass = color === "white" ? styles.white : styles.black;

    const [DynamicComponent, setDynamicComponent] = useState(null);

    const [combinedClass, setCombinedClass] = useState(`${styles.square} ${colorClass} ${classAdditional}`)

    const [availableSquare, setAvailableSquare] = useState(false)

    const [attackableSquare, setAttackableSquare] = useState(false)

    useEffect(() => {
        if (piece !== undefined && piece !== null) {
            const pieceToRender = lazy(() => import(`../pieces/${piece}.jsx`));
            setDynamicComponent(pieceToRender);
        }
        else {
            setDynamicComponent(null)
        }
    }, [piece]);

    useEffect(() => {
        if (classAdditional === "available") setAvailableSquare(true);
        else setAvailableSquare(false);
        if (classAdditional === "attackable") setAttackableSquare(true)
        else setAttackableSquare(false)
    }, [classAdditional]);

    useEffect(()=>{
        if(selectedPiece === `${filaIndex}-${columnaIndex}`){
            setCombinedClass(`${styles.square} ${colorClass} ${classAdditional} ${styles.activeSquare}`)
        }
        else setCombinedClass(`${styles.square} ${colorClass} ${classAdditional}`)
    },
    [selectedPiece])

    /**
     * Handles the selection of the square.
     */
    function onSelect() {
        if (turn === team)
            handlePieceSelect(columnaIndex, filaIndex)
    }
    function onMove(){
        if(board[filaIndex][columnaIndex].piece){
          if(board[filaIndex][columnaIndex].team === "White"){
            const newWhitePieces = whitePieces.filter((piece) => !(piece.fila === filaIndex && piece.columna === columnaIndex));
            setWhitePieces(newWhitePieces)
          }
          else{
            const newBlackPieces = blackPieces.filter((piece) => !(piece.fila === filaIndex && piece.columna === columnaIndex));
            setBlackPieces(newBlackPieces)
          }
        }
        handleMove(filaIndex,columnaIndex)
      }
    return { combinedClass, DynamicComponent, availableSquare, onSelect, attackableSquare, onMove }
}