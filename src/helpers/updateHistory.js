import parseFilaToChar from "./parseFilaToChar"
export default function updateHistory(fromFila, toFila,fromColumna, toColumna, piece, team, setHistory, history,castling = false){
    fromFila = parseFilaToChar(fromFila)
    toFila = parseFilaToChar(toFila)
    const from = `${fromFila}${fromColumna}`
    const to = `${toFila}${toColumna}`
    const newHistory = [...history, {from, to, piece, team, castling}]
    setHistory(newHistory)
}