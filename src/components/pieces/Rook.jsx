import useRook from "./hooks/useRook";
import { useContext, useEffect, useState } from "react";
import { BoardContext } from "../../context/board";
import { PiecesContext } from "../../context/pieces";

export default function Rook({ filaIndex,columnaIndex,team }) {
  const [pieceImage, setPieceImage] = useState(null);
  useEffect(() => {
    if (team === 'White') {
      import("../../assets/Piece=Rook, Side=White.png")
        .then(image => setPieceImage(image.default));
    } else {
      import("../../assets/Piece=Rook, Side=Black.png")
        .then(image => setPieceImage(image.default));
    }
  }, []);

  const {selectedPiece} = useContext(BoardContext)
  const {isWhiteInJaque, isBlackInJaque} = useContext(PiecesContext)
  const {showMovements, showLegalMovements}= useRook(filaIndex,columnaIndex,team)


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
      {pieceImage ? <img src={pieceImage} alt="Rook" /> : null}
    </span>
  );
}
