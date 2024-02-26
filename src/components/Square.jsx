/* eslint-disable react/prop-types */
import {Suspense} from "react";
import useSquare from "./hooks/useSquare";
import Button from "./Button"
import { BoardContext } from "../context/board";
import { useContext } from "react";
import usePawn from "./pieces/hooks/usePawn";
export default function Square({cellInfo,filaIndex, columnaIndex, color}) {
  const {classAdditional, team, piece} = cellInfo
  const {combinedClass,DynamicComponent,availableSquare, attackableSquare, onSelect} = useSquare(classAdditional,piece,color,filaIndex, columnaIndex, team)
  const {handleMove} =  useContext(BoardContext)

  function onMove(){
    handleMove(filaIndex,columnaIndex)
  }

  return (
    <Suspense>
      <div className={combinedClass} onClick={onSelect}>
        {DynamicComponent && <DynamicComponent team={team} filaIndex={filaIndex} columnaIndex={columnaIndex}/>}
        {availableSquare && <Button handleClick={onMove} className="availableSquareButton"></Button>}
        {attackableSquare && <Button handleClick={onMove} className="attackableSquareButton"></Button>}
      </div>
    </Suspense>
  );
}