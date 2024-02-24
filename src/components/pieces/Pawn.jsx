import PieceWhite from "../../assets/Piece=Pawn, Side=White.png";
import PieceBlack from "../../assets/Piece=Pawn, Side=Black.png";
import usePawn from "./hooks/usePawn";
export default function Pawn({ team, filaIndex, columnaIndex}) {
  const src = team === "White" ? PieceWhite : PieceBlack;
  const {showMovements} = usePawn()
  function handleClick () {
    showMovements(filaIndex,columnaIndex)
  }
  return (
    <span>
      <img src={src} alt="Pawn" onClick={handleClick}/>
    </span>
  );
}
