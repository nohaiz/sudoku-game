
import data from './data.js';


/*-------------- Constants -------------*/

const winningCombinations = [];

const inGameBoardNumbers = [];

const wrongNumbersAssignment = [];

/*---------- Variables (state) ---------*/

let selectedNumber = '';

let losingScoreCounter = 0;

let hasWon = false;

let hasReset = false;

/*----- Cached Element References  -----*/

const difficultyBtns = document.querySelectorAll('.difficultyBtn');

const squares = document.querySelectorAll('.square');

const cells = document.querySelectorAll('.cell');

const numberSelections = document.querySelectorAll('.numberSelection');

const messageText = document.querySelector('.messageText');

const undoBtn = document.querySelector('.undoBtn');

const resetBtn = document.querySelector('.resetBtn');

const losingScore = document.querySelector('.losingScore');

/*-------------- Functions -------------*/

function render() {

    if (losingScoreCounter === 3) {
        cells.forEach((cell,index) => {
            cell.innerHTML = winningCombinations[index];
            cell.style.color = "red";
            messageText.innerHTML = 'Game over you lose.';
            numberSelections.forEach((otherNum) => {
                otherNum.classList.remove('selected');
            });
        });
    }
    else if (hasWon) {
        cells.forEach((cell,index) => {
            cell.innerHTML = winningCombinations[index];
            cell.style.color = "green";
            messageText.innerHTML = 'Game over you win.'
        });
    }
    else if (hasReset){
            return;
    }
    else {
        cells.forEach((cell,index) => {
            cell.innerHTML = inGameBoardNumbers[index];
        });  
    }
}

function resetGame() {
    winningCombinations.length = 0;
    inGameBoardNumbers.length = 0;
    wrongNumbersAssignment.length = 0;
    selectedNumber = '';
    losingScoreCounter = 0;
    hasWon = false;
    hasReset = true;
}

function clearBoard() {
    cells.forEach((cell) => {
        cell.innerHTML = '';
        cell.style.color = '';
    });
    messageText.innerHTML = 'Complete the board to win!';
    losingScore.innerHTML = `Mistakes: 0/3`;
    cells.forEach((cell) => {
        cell.classList.remove('wrongNum');
    })
}
function init() {
    
    resetGame();
    clearBoard();

    difficultyBtns.forEach((btn) => {
        btn.disabled = false;
    });

    numberSelections.forEach((numBtn) => {
        numBtn.disabled = true;
    });

    numberSelections.forEach((otherNum) => {
        otherNum.classList.remove('selected');
    });
    undoBtn.disabled = true;
}

function randomDifficultySelector(minNum,maxNum) {
    return Math.round(Math.random() * (maxNum-minNum) + minNum);
}


function boardSetting(randomNumberOfTimes) {
    
    for (let i=0; i <= randomNumberOfTimes; i++) {
        let randomCell = randomDifficultySelector(0,81);
        inGameBoardNumbers[randomCell] = '';
    }
}

function difficultySetting(btn) {
    hasReset = false;
    let boardSelectedNum = randomDifficultySelector(0,2);
    data[boardSelectedNum].forEach((square) => {
        square.forEach((num) => {
            winningCombinations.push(num);
            inGameBoardNumbers.push(num);
        });
    });
    if (btn.textContent === 'Easy') {
        boardSetting(randomDifficultySelector(30,40));
    }
    else if (btn.textContent === 'Medium') {
        boardSetting(randomDifficultySelector(50,60));
    }
    else if (btn.textContent === 'Difficult') {
        boardSetting(randomDifficultySelector(70,75));
    }

    difficultyBtns.forEach((btn) => {
        btn.disabled = true;
    });
    numberSelections.forEach((numBtn) => {
        numBtn.disabled = false;
    });
    numberSelections.forEach((otherNum) => {
        otherNum.classList.remove('selected');
    });
    undoBtn.disabled = false;
    render();
}

function numberAssignment() {    
    cells.forEach((cell) => {
        cell.addEventListener('click', () => {
            gridSelection(cell.textContent, cell.id);
            cell = 0;
        });
    });
}

function gridSelection(cellNum, cellId) {
    if (cellNum === '' && !hasReset) {
        if (selectedNumber === '') {
            return;
        }
        else {
            if (cellId.charAt(0) === '0') {            
                inGameBoardNumbers[cellId.charAt(1)] = selectedNumber;
            }
            else {
                inGameBoardNumbers[cellId] = selectedNumber;
            }
            winningOnCompletion();
            losingScoreFn(cellId);
            render();
        }
    }    
}

function winningOnCompletion() {
    hasWon = inGameBoardNumbers.every(num => num !== '');
}

function losingScoreFn (cellId) {
    let int = parseInt(cellId);

    if (winningCombinations[int] !== inGameBoardNumbers[int] && !hasReset) {
        losingScoreCounter++;
        wrongNumbersAssignment.push(int);

        losingScore.innerHTML = `Mistakes: ${losingScoreCounter}/3`;
        cells[int].classList.add('wrongNum');
    }
}

function undoNumberAssignment() {
    wrongNumbersAssignment.forEach(num => {
        let index = parseInt(num);
        inGameBoardNumbers[index] = '';
        cells[index].classList.remove('wrongNum');
    });
    wrongNumbersAssignment.length = 0;
    numberSelections.forEach((otherNum) => {
        otherNum.classList.remove('selected');
    });
    render();
}

function cellsHighlight (selectedCell) {
    let row = selectedCell.split(' ');
    let col = selectedCell.split(' ');
    cells.forEach((cell) => {
        cell.classList.remove('highlight');
    });
    
    cells.forEach((cell) => {
        if (cell.className.split(' ')[1] === row[1]) {
            cell.classList.add('highlight');

        }
        if (cell.className.split(' ')[2] === col[2]) {
            cell.classList.add('highlight');
        }
    })

    squares.forEach((square) => {
        square.addEventListener('click', () => {
            Array.from(square.children).forEach((child) => {
                child.classList.add('highlight');
            });
        });
    });
}


/*----------- Event Listeners ----------*/

difficultyBtns.forEach((btn) => {

    btn.addEventListener('click', () => {
        difficultySetting(btn);
    });
});

numberSelections.forEach((num) => {
    
    num.addEventListener('click', () => {
        numberSelections.forEach((otherNum) => {
            otherNum.classList.remove('selected');
        });
        numberAssignment();
        selectedNumber = num.textContent;
        num.classList.add('selected');
    });
});

undoBtn.addEventListener('click', undoNumberAssignment);

resetBtn.addEventListener('click', init);

cells.forEach((cell) => {
    cell.addEventListener('mouseover', () => {
        cells.forEach((cell) => {
            cell.classList.remove('highlightDark');
        })
        cellsHighlight(cell.className)
        cell.classList.add('highlightDark');
    });
});
