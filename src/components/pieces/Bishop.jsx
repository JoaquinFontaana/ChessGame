import PieceWhite from "../../assets/Piece=Bishop, Side=White.png";
import PieceBlack from "../../assets/Piece=Bishop, Side=Black.png";
import { useContext, useEffect } from "react";
import { BoardContext } from "../../context/board";
import useBishop from "./hooks/useBishop";
import useCheckJaque from "../../helpers/checkJaque";
export default function Bishop({ columnaIndex,filaIndex,team }) {
  const src = team === "White" ? PieceWhite : PieceBlack;
  const {jaque} = useCheckJaque()
  const {selectedPiece} = useContext(BoardContext)
  const {showMovements} = useBishop(filaIndex,columnaIndex,team)
  useEffect(()=>{
    /*if(jaque){
      //evluar si hay movivmientos posibles const moves = checkMovements()

      //Si se seleciona la pieza mostrar movimientos
      if(selectedPiece === `${filaIndex}-${columnaIndex}`){
        showLegalMovements()
      }
    }
    else */if(selectedPiece === `${filaIndex}-${columnaIndex}`){
      showMovements()
    }
  },[selectedPiece, jaque])
  return (
    <span>
      <img src={src} alt="Bishop" />
    </span>
  );
}
