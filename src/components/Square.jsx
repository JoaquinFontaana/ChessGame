/* eslint-disable react/prop-types */
import {Suspense} from "react";
import useSquare from "./hooks/useSquare";
import Button from "./Button"
import { BoardContext } from "../context/board";
import { useContext } from "react";
import { PiecesContext } from "../context/pieces";

export default function Square({cellInfo,filaIndex, columnaIndex, color}) {
  const {classAdditional, team, piece} = cellInfo
  const {combinedClass,DynamicComponent,availableSquare, attackableSquare, onSelect} = useSquare(classAdditional,piece,color,filaIndex, columnaIndex, team)
  const {handleMove, board} =  useContext(BoardContext)
  const {setWhitePieces, setBlackPieces, whitePieces, blackPieces} = useContext(PiecesContext)
  
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