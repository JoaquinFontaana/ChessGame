import PieceWhite from "../../assets/Piece=Knight, Side=White.png";
import PieceBlack from "../../assets/Piece=Knight, Side=Black.png";
import { useEffect, useContext} from "react";
import { BoardContext } from "../../context/board";
import useKnight from "./hooks/useKnight";
export default function Knight({ columnaIndex,filaIndex,team }) {
  const src = (team === "White") ? PieceWhite : PieceBlack;

  const{selectedPiece} = useContext(BoardContext)

  const {showMovements} = useKnight(filaIndex,columnaIndex,team)
  useEffect(()=>{
    if(selectedPiece === `${filaIndex}-${columnaIndex}`){
        showMovements()
    }
},[selectedPiece])
  return (
    <span>
      <img src={src} alt="Knight" />
    </span>
  );
}
