import {createContext, useEffect, useState} from "react";
import {gameBoard, generateWord, letterStatus} from "../data/game.js";
import {useHandleInputHook} from "../hook/handleInputHook.js";
import {useInitializedataHook} from "../hook/initializedataHook.js";

export const GameLogicContext = createContext();

export function GameLogicProvider({children}) {
    const [board, setBoard] = useState({...gameBoard});
    const [start, setStart] = useState(false);
    const [curWord, setCurWord] = useState(generateWord());

    function reset() {
        const tmpBoard = getCurBoardDeepCopy();
        const allRows = tmpBoard['rows'];
        for (let r = 0; r < allRows.length; r++) {
            for (let c = 0; c < allRows[r].length; c++) {
                allRows[r][c].selected = false;
                allRows[r][c].character = '';
                allRows[r][c].status = letterStatus.NOT_GUESSED;
            }
        }

        const tmpState = tmpBoard['state'];
        tmpState.curRow = 0;
        tmpState.curCol = 0;
        tmpState.gameFinish = false;
        tmpState.filledCell = 0;
        tmpState.curRowFilled = false;
        tmpState.allCellsFilled = false;
        tmpState.gameWon = false;
        tmpState.gameLost = false;
        setBoard({...tmpBoard});
        setCurWord(generateWord());
        setStart(false);
    }


    function canSubmitCurWord() {
        return board.state.curRowFilled;
    }

    function gameOver() {
        return gameWon() || gameLost();
    }

    function gameWon() {
        return board.state.gameWon;
    }

    function gameLost() {
        return board.state.gameLost;
    }

    function nextCol(col, colMax) {
        if (col < colMax) {
            return col + 1;
        }
        return col;
    }

    function nextRow(row, rowMax) {
        if (row < rowMax) {
            return row + 1;
        }
        return 0;
    }

    function getCurBoardDeepCopy() {
        const rowsCopy = [];
        for (const curRow of board.rows) {
            const newRow = [];
            for (const cell of curRow) {
                const newCell = {...cell};
                newRow.push(newCell);
            }
            rowsCopy.push(newRow);
        }

        return {...board, rows: [...rowsCopy], state: {...board.state}};
    }

    function fillCurCell(keyPressed) {
        if (gameOver()) {
            return;
        }
        const tmpBoard = getCurBoardDeepCopy();
        const boardState = tmpBoard.state;
        if (boardState.curRowFilled) {
            return;
        }
        const rows = tmpBoard.rows;
        let curRow = boardState.curRow;
        let curCol = boardState.curCol;
        const selectedRow = rows[curRow];
        selectedRow[curCol].selected = true;
        selectedRow[curCol].character = keyPressed;
        boardState.filledCell += 1;
        boardState.curCol = nextCol(curCol, boardState.colMax);
        if (curCol === selectedRow.length - 1) {
            boardState.curRowFilled = true;
        }
        if (boardState.filledCell === boardState.size) {
            boardState.allCellsFilled = true;
        }
        setBoard({...tmpBoard});
    }

    function guess() {
        const tmpBoard = getCurBoardDeepCopy();
        const boardState = tmpBoard.state;
        let curRow = boardState.curRow;
        updateStatusOfCurRow(tmpBoard.rows[curRow]);
        if (!boardState.allCellsFilled) {
            boardState.curRow = nextRow(curRow, boardState.rowMax);
            boardState.curRowFilled = false;
            boardState.curCol = 0;
        }
        if (allCellsCorrect(tmpBoard.rows[curRow])) {
            boardState.gameWon = true;
        }
        if (boardState.allCellsFilled && !boardState.gameWon) {
            boardState.gameLost = true;
        }
        setBoard({...tmpBoard});
    }

    function allCellsCorrect(curRow) {
        return curRow.filter((cell) => cell.status === letterStatus.RIGHT_POS).length === curRow.length;
    }

    function updateStatusOfCurRow(row) {
        const mapCurWord = getMapOfWord(curWord);
        for (let i = 0; i < row.length; i++) {
            const curLetter = row[i].character;
            if (mapCurWord[curLetter]) {
                if (mapCurWord[curLetter].count === 0) {
                    row[i].status = letterStatus.NOT_IN_WORD;
                } else {
                    if (mapCurWord[curLetter].indexSet.has(i)) {
                        row[i].status = letterStatus.RIGHT_POS;
                        mapCurWord[curLetter].count -= 1;
                        mapCurWord[curLetter].indexSet.delete(i);
                    }
                }
            } else {
                row[i].status = letterStatus.NOT_IN_WORD;
            }
        }

        // second iteration to check if letter is in word but wrong position
        // first iteration already checks letter is in right position
        for (let i = 0; i < row.length; i++) {
            const curLetter = row[i].character;
            if (row[i].status === letterStatus.NOT_GUESSED) {
                if (mapCurWord[curLetter]) {
                    if (mapCurWord[curLetter].count === 0) {
                        row[i].status = letterStatus.NOT_IN_WORD;
                    } else {
                        if (!mapCurWord[curLetter].indexSet.has(i)) {
                            mapCurWord[curLetter].count -= 1;
                            row[i].status = letterStatus.IN_WORD_WRONG_POS;
                        }
                    }
                }
            }
        }
    }

    function getMapOfWord(word) {
        const wordMap = {};
        for (let i = 0; i < word.length; i++) {
            const curLetter = word[i];
            if (!wordMap[curLetter]) {
                wordMap[curLetter] = {count: 0, indexSet: new Set()};
            }
            wordMap[curLetter].indexSet.add(i);
            wordMap[curLetter].count += 1;
        }
        return wordMap;
    }

    function deleteCurChar() {
        const tmpBoard = getCurBoardDeepCopy();
        const boardState = tmpBoard.state;
        const rows = tmpBoard.rows;
        let curRow = boardState.curRow;
        const selectedRow = rows[curRow];
        for (let i = selectedRow.length - 1; i >= 0; i--) {
            const cell = selectedRow[i];
            if (cell.selected) {
                selectedRow[i].selected = false;
                selectedRow[i].character = '';
                boardState.curCol = i;
                boardState.filledCell -= 1;
                break;
            }
        }
        boardState.curRowFilled = false;
        boardState.allCellsFilled = false;
        setBoard({...tmpBoard});
    }

    return (
        <GameLogicContext.Provider value={{
            board: board,
            setBoard: setBoard,
            start: start,
            setStart: setStart,
            curWord: curWord,
            setCurWord: setCurWord,
            reset: reset,
            canSubmitCurWord: canSubmitCurWord,
            gameOver: gameOver,
            gameWon: gameWon,
            gameLost: gameLost,
            getCurBoardDeepCopy,
            fillCurCell: fillCurCell,
            guess: guess,
            deleteCurChar: deleteCurChar,
        }}>
            {children}
        </GameLogicContext.Provider>
    )
}