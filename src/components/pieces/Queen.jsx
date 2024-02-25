import PieceWhite from "../../assets/Piece=Queen, Side=White.png";
import PieceBlack from "../../assets/Piece=Queen, Side=Black.png";
import { useContext, useEffect } from "react";
import { BoardContext } from "../../context/board";
import useQueen from "./hooks/useQueen"
export default function Queen({filaIndex, columnaIndex ,team }) {
  const src = team === "White" ? PieceWhite : PieceBlack;
  
  const{selectedPiece}=useContext(BoardContext)
  const {showMovements}= useQueen(filaIndex,columnaIndex,team)
  useEffect(()=>{
    if(selectedPiece === `${filaIndex}-${columnaIndex}`){
      showMovements()
    }
  },[selectedPiece])
  return (
    <span>
      <img src={src} alt="Queen" />
    </span>
  );
}
