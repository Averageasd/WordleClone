const letterStatus = {
    IN_WORD_WRONG_POS: Symbol('yellow'),
    RIGHT_POS: Symbol('green'),
    NOT_IN_WORD: Symbol('red'),
    NOT_GUESSED: Symbol('white')
}
const gameBoard = {
    'state': {
        size: 30,
        curRow: 0,
        curCol: 0,
        gameFinish: false,
        gameWon: false,
        gameLost: false,
        allCellsFilled: false,
        filledCell: 0,
        colMax: 4,
        rowMax: 5,
        curRowFilled: false,
    }, 'rows': [
        [{
            id: 0, r: 0, c: 0, selected: false, character: '', status: letterStatus.NOT_GUESSED,
        }, {
            id: 1, r: 0, c: 1, selected: false, character: '', status: letterStatus.NOT_GUESSED,
        }, {
            id: 2, r: 0, c: 2, selected: false, character: '', status: letterStatus.NOT_GUESSED,
        }, {
            id: 3, r: 0, c: 3, selected: false, character: '', status: letterStatus.NOT_GUESSED,
        }, {
            id: 4, r: 0, c: 4, selected: false, character: '', status: letterStatus.NOT_GUESSED,
        },], [{
            id: 5, r: 1, c: 0, selected: false, character: '', status: letterStatus.NOT_GUESSED,
        }, {
            id: 6, r: 1, c: 1, selected: false, character: '', status: letterStatus.NOT_GUESSED,
        }, {
            id: 7, r: 1, c: 2, selected: false, character: '', status: letterStatus.NOT_GUESSED,
        }, {
            id: 8, r: 1, c: 3, selected: false, character: '', status: letterStatus.NOT_GUESSED,
        }, {
            id: 9, r: 1, c: 4, selected: false, character: '', status: letterStatus.NOT_GUESSED,
        },], [{
            id: 10, r: 2, c: 0, selected: false, character: '', status: letterStatus.NOT_GUESSED,
        }, {
            id: 11, r: 2, c: 1, selected: false, character: '', status: letterStatus.NOT_GUESSED,
        }, {
            id: 12, r: 2, c: 2, selected: false, character: '', status: letterStatus.NOT_GUESSED,
        }, {
            id: 13, r: 2, c: 3, selected: false, character: '', status: letterStatus.NOT_GUESSED,
        }, {
            id: 14, r: 2, c: 4, selected: false, character: '', status: letterStatus.NOT_GUESSED,
        },], [{
            id: 15, r: 3, c: 0, selected: false, character: '', status: letterStatus.NOT_GUESSED,
        }, {
            id: 16, r: 3, c: 1, selected: false, character: '', status: letterStatus.NOT_GUESSED,
        }, {
            id: 17, r: 3, c: 2, selected: false, character: '', status: letterStatus.NOT_GUESSED,
        }, {
            id: 18, r: 3, c: 3, selected: false, character: '', status: letterStatus.NOT_GUESSED,
        }, {
            id: 19, r: 3, c: 4, selected: false, character: '', status: letterStatus.NOT_GUESSED,
        },], [{
            id: 20, r: 4, c: 0, selected: false, character: '', status: letterStatus.NOT_GUESSED,
        }, {
            id: 21, r: 4, c: 1, selected: false, character: '', status: letterStatus.NOT_GUESSED,
        }, {
            id: 22, r: 4, c: 2, selected: false, character: '', status: letterStatus.NOT_GUESSED,
        }, {
            id: 23, r: 4, c: 3, selected: false, character: '', status: letterStatus.NOT_GUESSED,
        }, {
            id: 24, r: 4, c: 4, selected: false, character: '', status: letterStatus.NOT_GUESSED,
        },], [{
            id: 25, r: 5, c: 0, selected: false, character: '', status: letterStatus.NOT_GUESSED,
        }, {
            id: 26, r: 5, c: 1, selected: false, character: '', status: letterStatus.NOT_GUESSED,
        }, {
            id: 27, r: 5, c: 2, selected: false, character: '', status: letterStatus.NOT_GUESSED,
        }, {
            id: 28, r: 5, c: 3, selected: false, character: '', status: letterStatus.NOT_GUESSED,
        }, {
            id: 29, r: 5, c: 4, selected: false, character: '', status: letterStatus.NOT_GUESSED,
        },]],
}

const curWord = 'CLOSE';

const allWords = [
    'CLOSE',
    'CANDY',
    'MINUS',
    'MESSY',
    'PANDA',
]

function generateWord() {
    return allWords[Math.floor(Math.random() * allWords.length)];
}

export {
    curWord,
    gameBoard,
    letterStatus,
    generateWord
}