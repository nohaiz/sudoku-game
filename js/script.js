
import data from './data.js';


/*-------------- Constants -------------*/

const winningCombinations = [];

const inGameBoardNumbers = [];

const lastGridPosition = [];

/*---------- Variables (state) ---------*/

let numBtnSelected = '';

let losingScoreCounter = 0;

let hasWon = false;

let hasReset = false;

/*----- Cached Element References  -----*/

const difficultyBtns = document.querySelectorAll('.difficultyBtn');

const cells = document.querySelectorAll('.cell');

const numberSelections = document.querySelectorAll('.numberSelection');

const messageText = document.querySelector('.messageText');

const undoBtn = document.querySelector('.undoBtn');

const resetBtn = document.querySelector('.resetBtn');

const losingScore = document.querySelector('.losingScore');

/*-------------- Functions -------------*/

function cellsLoop() {
    
}

function render() {

    if (losingScoreCounter === 3) {
        cells.forEach((cell,index) => {
            cell.innerHTML = winningCombinations[index];
            cell.style.color = "red";
            messageText.innerHTML = 'YOU LOSE!!!'
        })
    }
    else if (hasWon) {
        cells.forEach((cell,index) => {
            cell.innerHTML = winningCombinations[index];
            cell.style.color = "green";
            messageText.innerHTML = 'YOU WIN!!!'
        })
    }
    else {
        if (hasReset) {
            return;
        }
        else {
            cells.forEach((cell,index) => {
                cell.innerHTML = inGameBoardNumbers[index];
            });  
        }
    } 
}

function init() {
    winningCombinations.length = 0;
    inGameBoardNumbers.length = 0;
    lastGridPosition.length = 0;
    numBtnSelected = '';
    losingScoreCounter = 0;
    hasWon = false;

    cells.forEach((cell) => {
        cell.innerHTML = '';
        cell.style.color = '';
    })
    difficultyBtns.forEach((btn) => {
        btn.disabled = false;
    });

    numberSelections.forEach((numBtn) => {
        numBtn.disabled = true;
    });

    undoBtn.disabled = true;
    hasReset = true;

    messageText.innerHTML = 'Complete the board to win!!!';
    losingScore.innerHTML = `Mistakes: 0/3`;
    cells.forEach((cell) => {
        cell.classList.remove('wrongNum');
    })
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
        boardSetting(randomDifficultySelector(20,40));
    }
    else if (btn.textContent === 'Medium') {
        boardSetting(randomDifficultySelector(40,60));
    }
    else if (btn.textContent === 'Difficult') {
        boardSetting(randomDifficultySelector(60,75));
    }

    difficultyBtns.forEach((btn) => {
        btn.disabled = true;
    })
    numberSelections.forEach((numBtn) => {
        numBtn.disabled = false;
    })
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
    if (cellNum === '') {
        if (cellId.charAt(0) === '0') {            
            inGameBoardNumbers[cellId.charAt(1)] = numBtnSelected;
        }
        else {
            inGameBoardNumbers[cellId] = numBtnSelected;
        }
        winningOnCompletion();
        losingScoreFn(cellId);
        render();
    }    
}

function winningOnCompletion() {
    hasWon = inGameBoardNumbers.every(num => num !== '');
}

function losingScoreFn (cellId) {
    let int = parseInt(cellId);

    if (winningCombinations[int] !== inGameBoardNumbers[int] && !hasReset) {
        losingScoreCounter++;
        lastGridPosition.push(int);

        losingScore.innerHTML = `Mistakes: ${losingScoreCounter}/3`;
        cells[int].classList.add('wrongNum');
    }
}

function undoNumberAssignment() {
    lastGridPosition.forEach(num => {
        let index = parseInt(num);
        inGameBoardNumbers[index] = '';
        cells[index].classList.remove('wrongNum');
    });
    lastGridPosition.length = 0;
    render();
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
        numBtnSelected = num.textContent;
        num.classList.add('selected');;
    });
});



undoBtn.addEventListener('click', undoNumberAssignment);

resetBtn.addEventListener('click', init);
 