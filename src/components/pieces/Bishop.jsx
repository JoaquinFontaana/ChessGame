import { useContext, useEffect, useState} from "react";
import { BoardContext } from "../../context/board";
import { PiecesContext } from "../../context/pieces";
import useBishop from "./hooks/useBishop";

export default function Bishop({ columnaIndex,filaIndex,team }) {
  const [pieceImage, setPieceImage] = useState(null);
  useEffect(() => {
    if (team === 'White') {
      import("../../assets/Piece=Bishop, Side=White.svg")
        .then(image => setPieceImage(image.default));
    } else {
      import("../../assets/Piece=Bishop, Side=Black.svg")
        .then(image => setPieceImage(image.default));
    }
  }, [team]);

  const {selectedPiece} = useContext(BoardContext)
  const {showMovements, showLegalMovements} = useBishop(filaIndex,columnaIndex,team)
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
      {pieceImage ? <img loading="lazy" src={pieceImage} alt="Bishop" /> : null}
    </span>
  );
}
