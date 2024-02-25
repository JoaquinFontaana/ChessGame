import { BoardContext } from "../../context/board";
import styles from "../Board.module.css"
import { useState, useEffect, lazy, useContext } from "react";
export default function useSquare(classAdditional, piece, color, filaIndex, columnaIndex, team) {
    const {handlePieceSelect, turn} = useContext(BoardContext)

    const [DynamicComponent, setDynamicComponent] = useState(null);

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
        if(classAdditional === "attackable") setAttackableSquare(true)
        else setAttackableSquare(false)
    }, [classAdditional]);

    const squareClass = styles.square;

    const colorClass = color === "white" ? styles.white : styles.black;

    const combinedClasses = `${squareClass} ${colorClass} ${classAdditional}`;

    function onSelect() {
        if(turn === team)
        handlePieceSelect(columnaIndex, filaIndex)
    }
    return { combinedClasses, DynamicComponent, availableSquare, onSelect, attackableSquare}
}