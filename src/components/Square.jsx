import { useEffect, useState, lazy, Suspense } from "react";
import styles from "./Board.module.css";

export default function Square({ piece,team, filaIndex, columnaIndex, color}) {
  const [DynamicComponent, setDynamicComponent] = useState(null);
  useEffect(() => {
    if (piece) {
      const pieceToRender = lazy(() => import(`./pieces/${piece}`));
      setDynamicComponent(pieceToRender);
    }
    else{
        setDynamicComponent(null)
    }
  }, [piece]);


  const squareClass = styles.square;
  const colorClass = color === "white" ? styles.white : styles.black;

  const combinedClasses = `${squareClass} ${colorClass}`;

  function handleClick(){
    console.log("Soy el Square de la fila:", filaIndex, " y columna", columnaIndex)
  }
  return (
    <Suspense fallback="..">
      <div className={combinedClasses} onClick={handleClick}>
        {DynamicComponent && <DynamicComponent team={team} filaIndex={filaIndex} columnaIndex={columnaIndex}/>}
      </div>
    </Suspense>
  );
}