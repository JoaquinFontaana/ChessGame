import { useEffect, useContext, useState} from "react";
import { BoardContext } from "../../context/board";
import useKnight from "./hooks/useKnight";
import { PiecesContext } from "../../context/pieces";

export default function Knight({ columnaIndex,filaIndex,team }) {
  const [pieceImage, setPieceImage] = useState(null);
  useEffect(() => {
    if (team === 'White') {
      import("../../assets/Piece=Knight, Side=White.svg")
        .then(image => setPieceImage(image.default));
    } else {
      import("../../assets/Piece=Knight, Side=Black.svg")
        .then(image => setPieceImage(image.default));
    }
  }, [team]);

  const{selectedPiece} = useContext(BoardContext)
  const {isWhiteInJaque, isBlackInJaque} = useContext(PiecesContext)
  const {showMovements, showLegalMovements} = useKnight(filaIndex,columnaIndex,team)
  

  useEffect(() => {
    if (selectedPiece === `${filaIndex}-${columnaIndex}`) {
      if (team === "White"){ 
        if(isWhiteInJaque) showLegalMovements()
        else showMovements()
    }
    if (team === "Black"){ 
      if(isBlackInJaque) showLegalMovements()
      else showMovements()
  }
}
  },[selectedPiece, isWhiteInJaque, isBlackInJaque]);
  return (
    <span>
      {pieceImage ? <img src={pieceImage} loading="lazy" alt="Knight" /> : null}
    </span>
  );
}
