import PieceWhite from "../../assets/Piece=Rook, Side=White.png";
import PieceBlack from "../../assets/Piece=Rook, Side=Black.png";

export default function Rook({ team }) {
  const src = team === "White" ? PieceWhite : PieceBlack;

  return (
    <span>
      <img src={src} alt="Rook" />
    </span>
  );
}
