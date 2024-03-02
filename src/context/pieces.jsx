import {useState,createContext } from 'react';

// Crea el contexto
const PiecesContext = createContext();

// Crea el proveedor del contexto
const PiecesProvider = ({ children }) => {
    // Aquí puedes agregar la lógica y el estado relacionados con las piezas del juego de ajedrez
    const [whitePieces,setWhitePieces] = useState(16)
    const [blackPieces,setBlackPieces] = useState(16)
    const [piecesEvaluated, setPiecesEvaluated] = useState(0)
    const [whiteKingPosition, setWhiteKingPosition] = useState(null)
    return (
        <PiecesContext.Provider value={
            {
                whitePieces,
                setWhitePieces,
                blackPieces,
                setBlackPieces,
                piecesEvaluated,
                setPiecesEvaluated,
                whiteKingPosition,
                setWhiteKingPosition
            }
        }>
            {children}
        </PiecesContext.Provider>
    );
};

export { PiecesContext, PiecesProvider };