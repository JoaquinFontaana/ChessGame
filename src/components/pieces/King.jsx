import PieceWhite from "../../assets/Piece=King, Side=White.png";
import PieceBlack from "../../assets/Piece=King, Side=Black.png";

export default function King({ team }) {
  const src = team === "White" ? PieceWhite : PieceBlack;

  return (
    <span>
      <img src={src} alt="King" />
    </span>
  );
}
