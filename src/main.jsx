import { BoardProvider } from './context/board.jsx'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './global.css'
import { StrictMode } from 'react'

ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
  <BoardProvider>
    <App />
  </BoardProvider>
  </StrictMode>
)
