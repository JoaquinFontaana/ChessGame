import usePawn from "./hooks/usePawn";
import { useContext, useEffect, useState} from "react";
import { BoardContext } from "../../context/board";
import { PiecesContext } from "../../context/pieces";
export default function Pawn({ columnaIndex, filaIndex, team}) {

  const [pieceImage, setPieceImage] = useState(null);
  
  useEffect(() => {
    if (team === 'White') {
      import("../../assets/Piece=Pawn, Side=White.svg")
        .then(image => setPieceImage(image.default));
    } else {
      import("../../assets/Piece=Pawn, Side=Black.svg")
        .then(image => setPieceImage(image.default));
    }
  }, [team]);

  const { showMovements, showLegalMovements} = usePawn(columnaIndex, filaIndex, team)
  const{selectedPiece} = useContext(BoardContext)
  const {isWhiteInJaque, isBlackInJaque} = useContext(PiecesContext)

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
      {pieceImage ? <img src={pieceImage} loading="lazy" alt="Pawn" /> : null}
    </span>
  );
}
