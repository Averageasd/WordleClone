import {useContext, useEffect} from "react";
import {GameLogicContext} from "../context/GameLogicProvider.jsx";

export function useHandleInputHook() {
    const {
        board,
        gameOver,
        deleteCurChar,
        fillCurCell
    } = useContext(GameLogicContext);

    useEffect(() => {
        function handleKeyboardInput(e) {
            if (!gameOver()) {
                const keyPressed = e.key.toUpperCase();
                const code = keyPressed.charCodeAt(0);
                if (code >= 65 && code <= 97) {
                    fillCurCell(keyPressed);
                }
                if (code === 32) {
                    deleteCurChar();
                }
            }
        }

        window.addEventListener('keypress', handleKeyboardInput);
        return () => {
            window.removeEventListener('keypress', handleKeyboardInput);
        }
    }, [board]);
}