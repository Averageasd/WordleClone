import './index.css'
import {useContext} from "react";
import {letterStatus} from "./data/game.js";
import {GameLogicContext} from "./context/GameLogicProvider.jsx";
import {useInitializedataHook} from "./hook/initializedataHook.js";
import {useHandleInputHook} from "./hook/handleInputHook.js";

function App() {
    const {
        board,
        setStart,
        curWord,
        canSubmitCurWord,
        gameOver,
        guess,
        deleteCurChar,
    } = useContext(GameLogicContext);

    useInitializedataHook();
    useHandleInputHook();

    let isGameDone = gameOver();
    const isGameLost = board.state.gameLost;
    const isGameWon = board.state.gameWon;
    let buttonDisable;
    if (isGameDone) {
        buttonDisable = true;
    } else {
        buttonDisable = !canSubmitCurWord();
    }

    return (
        <section className="p-4 relative">
            <div className="board relative">
                {
                    board['rows'].map((row) => {
                        return (
                            <ul className="board-row">
                                {row.map((cell) => {
                                    let cellBorder = 'border-slate-200';
                                    let cellBg = 'bg-white';
                                    let cellTextColor = 'text-black';
                                    if (cell.status === letterStatus.RIGHT_POS) {
                                        cellBorder = 'border-green-500';
                                        cellBg = 'bg-green-500';
                                        cellTextColor = 'text-white';
                                    } else if (cell.status === letterStatus.NOT_IN_WORD) {
                                        cellBorder = 'border-gray-500';
                                        cellBg = 'bg-gray-500';
                                        cellTextColor = 'text-white';
                                    } else if (cell.status === letterStatus.IN_WORD_WRONG_POS) {
                                        cellBorder = 'border-amber-500';
                                        cellBg = 'bg-amber-500';
                                        cellTextColor = 'text-white';
                                    }
                                    return (
                                        <li className={`relative border-1 border-solid w-[60px] h-[60px] text-center ${cellBg} ${cellTextColor} ${cellBorder}`}
                                            key={cell.id}>
                                            <p className="font-semibold absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]">{cell.character}</p>
                                        </li>
                                    )
                                })}
                            </ul>
                        )
                    })}
            </div>
            <button
                disabled={buttonDisable}
                className={`text-[1rem] px-4 min-w-[120px] border-none py-2 mx-auto block mt-4 ${buttonDisable ? `bg-gray-200 text-black` : `bg-indigo-600 text-white`}`}
                onClick={() => {
                    guess();
                }}
            >Submit
            </button>
            <button
                className={`text-[1rem] px-4 min-w-[120px] border-none py-2 mx-auto block mt-4 bg-red-500 text-white`}
                onClick={() => {
                    deleteCurChar();
                }}
            >Back
            </button>
            {isGameDone && (
                <div
                    className="absolute flex flex-col justify-center items-center w-[400px] h-[300px] bg-slate-50 z-[1000px] shadow-lg left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]">
                    {isGameLost &&
                        <div>
                            <p className="font-semibold text-center text-[24px]">You Lost</p>
                            <p className="text-center text-[20px]">Correct word is : {curWord}</p>
                        </div>


                    }
                    {isGameWon && <p className="font-semibold text-[24px]">You Won</p>}
                    <button
                        className="text-[1rem] px-4 min-w-[120px] border-none py-2 text-white bg-indigo-500 mx-auto block mt-4"
                        onClick={() => {
                            setStart(true);
                        }}
                    >Again
                    </button>
                </div>
            )}
        </section>
    )
}

export default App
