import { useEffect, useContext } from "react";
import { BoardContext } from "../../context/board";
import useKing from "./hooks/useKing";
import PieceWhite from "../../assets/Piece=King, Side=White.png";
import PieceBlack from "../../assets/Piece=King, Side=Black.png";

export default function King({ team, filaIndex, columnaIndex }) {
  const src = team === "White" ? PieceWhite : PieceBlack;
  const { selectedPiece } = useContext(BoardContext);
  const { showMovements } = useKing(filaIndex, columnaIndex, team);

  useEffect(() => {
    if (selectedPiece === `${filaIndex}-${columnaIndex}`) {
      showMovements();
    }
  }, [selectedPiece, filaIndex, columnaIndex, showMovements]);

  return (
    <span>
      <img src={src} alt={`King - ${team}`} />
    </span>
  );
}