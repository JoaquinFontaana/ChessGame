import { useEffect, useContext, useState } from "react";
import { BoardContext } from "../../context/board";
import { PiecesContext } from "../../context/pieces";
import useKing from "./hooks/useKing";

export default function King({ team, filaIndex, columnaIndex }) {
  const [pieceImage, setPieceImage] = useState(null);
  useEffect(() => {
    if (team === 'White') {
      import("../../assets/Piece=King, Side=White.svg")
        .then(image => setPieceImage(image.default));
    } else {
      import("../../assets/Piece=King, Side=Black.svg")
        .then(image => setPieceImage(image.default));
    }
  }, [team]);

  const { selectedPiece } = useContext(BoardContext);
  const { showMovements, showLegalMovements } = useKing(filaIndex, columnaIndex, team);
  const { isWhiteInJaque, isBlackInJaque } = useContext(PiecesContext);

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
      {pieceImage ? <img src={pieceImage} loading="lazy" alt="King" /> : null}
    </span>
  );
}