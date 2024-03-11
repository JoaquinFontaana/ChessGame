import PropTypes from 'prop-types';
import { pieceImages } from '../utils/piecesImages';
import styles from './History.module.css';
import { useContext } from 'react';
import { BoardContext } from '../context/board';
import { FaLongArrowAltRight } from "react-icons/fa";
import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';

export default function History() {
    const { history } = useContext(BoardContext)
    return (
        <div className={styles.history}>
            <SimpleBar style={{ maxHeight: "100%" }}>
                <ul>
                    {history.map((move, index) => { 
                    const pieceToRender = `${move.team.charAt(0).toLowerCase()+move.team.slice(1)}${move.piece}`;
                    console.log(pieceToRender)
                    console.log(pieceImages[pieceToRender])
                    return(
                        <li key={index} className={((index + 1) % 2 === 0) ? `${styles.par}` : ""}>
                            <p>{index + 1}.</p>
                            <img src={pieceImages[pieceToRender]} alt={pieceToRender} />
                            <p className={styles.from}>{move.from}</p>
                            <p className={styles.arrow}><FaLongArrowAltRight /></p>
                            <p className={styles.to}>{move.to}</p>
                        </li>
                    )}
                    )}
                </ul>
            </SimpleBar>
        </div>
    )
}
History.propTypes = {
    history: PropTypes.arrayOf(PropTypes.shape({
        piece: PropTypes.string,
        from: PropTypes.number,
        to: PropTypes.number,
        team: PropTypes.string
    }))
}