/* eslint-disable react/prop-types */
import {Suspense} from "react";
import useSquare from "./hooks/useSquare";
import Button from "./Button"

export default function Square({cellInfo,filaIndex, columnaIndex, color}) {
  const {classAdditional, team, piece} = cellInfo
  const {combinedClass,DynamicComponent,availableSquare, attackableSquare,castleSquare ,onSelect, onMove,onCastle} = useSquare(classAdditional,piece,color,filaIndex, columnaIndex, team)

  return (
      <div className={combinedClass} onClick={onSelect}>
        <Suspense fallback={<span>...</span>}>
        {DynamicComponent && <DynamicComponent team={team} filaIndex={filaIndex} columnaIndex={columnaIndex}/>}
        </Suspense>
        {availableSquare && <Button handleClick={onMove} className="availableSquareButton"></Button>}
        {attackableSquare && <Button handleClick={onMove} className="attackableSquareButton"></Button>}
        {castleSquare && <Button handleClick={onCastle} className="attackableSquareButton"></Button>}
      </div>
  );
}