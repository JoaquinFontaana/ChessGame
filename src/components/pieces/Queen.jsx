import PieceWhite from "../../assets/Piece=Queen, Side=White.png";
import PieceBlack from "../../assets/Piece=Queen, Side=Black.png";

export default function Queen({ team }) {
  const src = team === "White" ? PieceWhite : PieceBlack;

  return (
    <span>
      <img src={src} alt="Queen" />
    </span>
  );
}
