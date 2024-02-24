import { createContext, useState } from "react";
import { BOARD, STARTEDBOARD } from "../const/BOARD";

export const BoardContext = createContext();

export function BoardProvider({ children }) {
    const [board, setBoard] = useState(BOARD);

    function updateBoard(columnaIndex, filaIndex) {
        const updatedBoard = [...board];
        updatedBoard[filaIndex][columnaIndex] = /* nuevo valor */
            setBoard(updatedBoard);
        console.log(updatedBoard[filaIndex][columnaIndex]);
    }
    function toogleGame(boolean) {
        if (boolean) {
            console.log('Starting game:', STARTEDBOARD);
            setBoard(STARTEDBOARD);
        } else {
            console.log('Ending game:', BOARD);
            setBoard(BOARD);
        }
    }

    return (
        <BoardContext.Provider
            value={{
                board: board,
                updateBoard: updateBoard,
                toogleGame: toogleGame
            }}
        >
            {children}
        </BoardContext.Provider>
    );
}
