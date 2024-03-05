import { useContext } from "react"
import { PiecesContext } from "../context/pieces"
import Button from "./Button"
import { BoardContext } from "../context/board"
export default function Modal(){
    const {isWhiteInJaqueMate,IsBlackInJaqueMate} = useContext(PiecesContext)
    const {setToggleGame} = useContext(BoardContext)
    return(
        <section className="modal">
            {isWhiteInJaqueMate && <h2>Blacks won</h2>}
            {IsBlackInJaqueMate && <h2>Whites won</h2>}
            <Button handleClick={()=>{ setToggleGame(false)}}>Play Again</Button>
        </section>
    )
}