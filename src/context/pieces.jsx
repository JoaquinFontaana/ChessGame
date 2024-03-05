import {useState,createContext, useEffect } from 'react';
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
    const [isWhiteInJaqueMate, setIsWhiteInJaqueMate] = useState(false)
    const [isBlackInJaqueMate, setIsBlackInJaqueMate] = useState(false)
    const [blackLegalMovements, setBlackLegalMovements] = useState({legalMovements:[],piecesEvaluated:0})
    const [whiteLegalMovements, setWhiteLegalMovements] = useState({legalMovements:[],piecesEvaluated:0})
    function restartPieces(){
        setIsBlackInJaqueMate(false)
        setIsWhiteInJaqueMate(false)
        setIsBlackInJaque(false)
        setIsWhiteInJaque(false)
        setWhiteKingPosition({fila:7,columna:4})
        setBlackKingPosition({fila:0,columna:4})
        setWhitePieces(WHITEPIECES)
        setBlackPieces(BLACKPIECES)
    }
    useEffect(()=>{
        if(isWhiteInJaque && whiteLegalMovements.piecesEvaluated === whitePieces.length){
            console.log(whiteLegalMovements)
            if(whiteLegalMovements.legalMovements.length === 0) setIsWhiteInJaqueMate(true)
            else setWhiteLegalMovements({legalMovements:[],piecesEvaluated:0})
        }
        else if(isBlackInJaque && blackLegalMovements.piecesEvaluated === blackPieces.length){
            if(blackLegalMovements.legalMovements.length === 0) setIsBlackInJaqueMate(true)
            else setBlackLegalMovements({legalMovements:[],piecesEvaluated:0})
        }
    },[blackLegalMovements,whiteLegalMovements])

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
                restartPieces,
                setBlackLegalMovements,
                setWhiteLegalMovements,
                isBlackInJaqueMate,
                isWhiteInJaqueMate
            }
        }>
            {children}
        </PiecesContext.Provider>
    );
};

export { PiecesContext, PiecesProvider };