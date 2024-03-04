import {useState,createContext } from 'react';
import BLACKPIECES from '../const/BLACKPIECES.JS';
import WHITEPIECES from '../const/WHITEPIECES';

const PiecesContext = createContext();


const PiecesProvider = ({ children }) => {

    const [isWhiteInJaque, setIsWhiteInJaque] = useState(false)
    const [isBlackInJaque, setIsBlackInJaque] = useState(false)
    const [whiteKingPosition,setWhiteKingPosition] = useState({fila:7,columna:4})
    const [blackKingPosition,setBlackKingPosition] = useState({fila:0,columna:4})
    const [whitePieces,setWhitePieces] = useState(WHITEPIECES)
    const[blackPieces,setBlackPieces] = useState(BLACKPIECES)
    
    function restartPieces(){
        setWhiteKingPosition({fila:7,columna:4})
        setBlackKingPosition({fila:0,columna:4})
        setWhitePieces(WHITEPIECES)
        setBlackPieces(BLACKPIECES)
        setIsBlackInJaque(false)
        setIsWhiteInJaque(false)
    }
    
    return (
        <PiecesContext.Provider value={
            {
                isWhiteInJaque,
                setIsWhiteInJaque,
                isBlackInJaque,
                setIsBlackInJaque,
                whiteKingPosition,
                setWhiteKingPosition,
                blackKingPosition,
                setBlackKingPosition,
                blackPieces,
                setBlackPieces,
                whitePieces,
                setWhitePieces,
                restartPieces
            }
        }>
            {children}
        </PiecesContext.Provider>
    );
};

export { PiecesContext, PiecesProvider };