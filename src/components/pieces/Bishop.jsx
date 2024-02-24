import PieceWhite from "../../assets/Piece=Bishop, Side=White.png";
import PieceBlack from "../../assets/Piece=Bishop, Side=Black.png";

export default function Bishop({ team }) {
  const src = team === "White" ? PieceWhite : PieceBlack;

  return (
    <span>
      <img src={src} alt="Bishop" />
    </span>
  );
}
