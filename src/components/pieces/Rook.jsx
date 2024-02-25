import PieceWhite from "../../assets/Piece=Rook, Side=White.png";
import PieceBlack from "../../assets/Piece=Rook, Side=Black.png";
import useRook from "./hooks/useRook";
import { useContext, useEffect } from "react";
import { BoardContext } from "../../context/board";

export default function Rook({ filaIndex,columnaIndex,team }) {
  const src = team === "White" ? PieceWhite : PieceBlack;
  const {showMovements}= useRook(filaIndex,columnaIndex,team)
  const {selectedPiece} = useContext(BoardContext)
  useEffect(()=>{
    if(selectedPiece === `${filaIndex}-${columnaIndex}`){
      showMovements()
    }
  },[selectedPiece])
  return (
    <span>
      <img src={src} alt="Rook" />
    </span>
  );
}
