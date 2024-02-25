/* eslint-disable react/prop-types */
import {Suspense} from "react";
import useSquare from "./hooks/useSquare";
import Button from "./Button"
import { BoardContext } from "../context/board";
import { useContext } from "react";
export default function Square({cellInfo,filaIndex, columnaIndex, color}) {
  const {classAdditional, team, piece} = cellInfo
  const {combinedClass,DynamicComponent,availableSquare, attackableSquare, onSelect} = useSquare(classAdditional,piece,color,filaIndex, columnaIndex, team)
  const {handleMove,selectedPiece} =  useContext(BoardContext)

  function onMove(){
    console.log(selectedPiece)
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