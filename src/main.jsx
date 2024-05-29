import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {GameLogicProvider} from "./context/GameLogicProvider.jsx";

ReactDOM.createRoot(document.getElementById('root')).render(
    <GameLogicProvider>
        <App/>,
    </GameLogicProvider>
)
