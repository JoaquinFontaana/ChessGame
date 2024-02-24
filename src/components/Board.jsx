import { useContext } from "react";
import Square from "./Square";
import styles from "./Board.module.css";
import { BoardContext } from "../context/board";

export default function Board() {
    const { board } = useContext(BoardContext);

    return (
        <section className={styles.board}>
            {board.map((fila, filaIndex) => (
                <div key={filaIndex} className={styles.fila}>
                    {fila.map((piece, columnaIndex) => (
                        <Square
                            piece={piece && piece.piece}
                            team={piece  && piece.team}
                            key={columnaIndex}
                            filaIndex={filaIndex}
                            columnaIndex={columnaIndex}
                            color={(filaIndex + columnaIndex) % 2 === 0 ? "white" : "black"}
                        />
                    ))}
                </div>
            ))}
        </section>
    );
}
