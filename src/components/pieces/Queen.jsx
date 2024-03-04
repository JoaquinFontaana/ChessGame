import { useContext, useEffect, useState} from "react";
import { BoardContext } from "../../context/board";
import useQueen from "./hooks/useQueen"
import { PiecesContext } from "../../context/pieces";
export default function Queen({filaIndex, columnaIndex ,team }) {

  const [pieceImage, setPieceImage] = useState(null); 
  useEffect(() => {
    if (team === 'White') {
      import("../../assets/Piece=Queen, Side=White.png")
        .then(image => setPieceImage(image.default));
    } else {
      import("../../assets/Piece=Queen, Side=Black.png")
        .then(image => setPieceImage(image.default));
    }
  }, [team]);
  
  const{selectedPiece}=useContext(BoardContext)
  const {isWhiteInJaque, isBlackInJaque} = useContext(PiecesContext)
  const {showMovements, showLegalMovements}= useQueen(filaIndex,columnaIndex,team)

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
      {pieceImage ? <img src={pieceImage} alt="Queen" /> : null}
    </span>
  );
}
