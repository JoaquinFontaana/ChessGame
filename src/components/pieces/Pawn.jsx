import PieceWhite from "../../assets/Piece=Pawn, Side=White.png";
import PieceBlack from "../../assets/Piece=Pawn, Side=Black.png";
import usePawn from "./hooks/usePawn";
import { useContext, useEffect, useState} from "react";
import { BoardContext } from "../../context/board";
export default function Pawn({ columnaIndex, filaIndex, team}) {

  const src = team === "White" ? PieceWhite : PieceBlack;

  const { showMovements} = usePawn(columnaIndex, filaIndex, team)

  const{selectedPiece} = useContext(BoardContext)

  useEffect(()=>{
    if(selectedPiece === `${filaIndex}-${columnaIndex}`){
        showMovements()
    }
},[selectedPiece])

  return (
    <span>
      <img src={src} alt="Pawn" />
    </span>
  );
}
