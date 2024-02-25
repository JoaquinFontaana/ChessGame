import { BoardContext } from "../../context/board";
import styles from "../Board.module.css"
import { useState, useEffect, lazy, useContext } from "react";
export default function useSquare(classAdditional, piece, color, filaIndex, columnaIndex, team) {
    const { handlePieceSelect, turn, selectedPiece} = useContext(BoardContext)
    const colorClass = color === "white" ? styles.white : styles.black;

    const [DynamicComponent, setDynamicComponent] = useState(null);

    const [combinedClass, setCombinedClass] = useState(`${styles.square} ${colorClass} ${classAdditional}`)

    const [availableSquare, setAvailableSquare] = useState(false)

    const [attackableSquare, setAttackableSquare] = useState(false)

    useEffect(() => {
        if (piece !== undefined && piece !== null) {
            const pieceToRender = lazy(() => import(`../pieces/${piece}`));
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

    function onSelect() {
        if (turn === team)
            handlePieceSelect(columnaIndex, filaIndex)
    }
    return { combinedClass, DynamicComponent, availableSquare, onSelect, attackableSquare }
}