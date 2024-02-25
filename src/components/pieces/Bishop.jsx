import PieceWhite from "../../assets/Piece=Bishop, Side=White.png";
import PieceBlack from "../../assets/Piece=Bishop, Side=Black.png";
import { useContext, useEffect } from "react";
import { BoardContext } from "../../context/board";
import useBishop from "./hooks/useBishop";

export default function Bishop({ columnaIndex,filaIndex,team }) {
  const src = team === "White" ? PieceWhite : PieceBlack;

  const {selectedPiece} = useContext(BoardContext)
  const {showMovements} = useBishop(filaIndex,columnaIndex,team)
  useEffect(()=>{
    if(selectedPiece === `${filaIndex}-${columnaIndex}`){
      showMovements()
    }
  },[selectedPiece])
  return (
    <span>
      <img src={src} alt="Bishop" />
    </span>
  );
}
