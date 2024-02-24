import PieceWhite from "../../assets/Piece=Knight, Side=White.png";
import PieceBlack from "../../assets/Piece=Knight, Side=Black.png";

export default function Knight({ team }) {
  const src = (team === "White") ? PieceWhite : PieceBlack;
  return (
    <span>
      <img src={src} alt="Knight" />
    </span>
  );
}
