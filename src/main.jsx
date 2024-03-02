import { BoardProvider } from './context/board.jsx'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './global.css'
import { StrictMode } from 'react'
import { PiecesProvider } from './context/pieces.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
  <PiecesProvider>
  <BoardProvider>
    <App />
  </BoardProvider>
  </PiecesProvider>
  </StrictMode>
)
