
import data from './data.js';


/*-------------- Constants -------------*/

const winningCombinations = [];

const inGameBoardNumbers = [];

const lastGridPosition = [];

/*---------- Variables (state) ---------*/

let numBtnSelected = '';

let losingScoreCounter = 0;



/*----- Cached Element References  -----*/

const difficultyBtns = document.querySelectorAll('.difficultyBtn');

// const squares = document.querySelectorAll('.square');

const cells = document.querySelectorAll('.cell');

const numberSelections = document.querySelectorAll('.numberSelection');

const undoBtn = document.querySelector('.undoBtn');

const resetBtn = document.querySelector('.resetBtn');

const messageText = document.querySelector('.messageText');

const losingScore = document.querySelector('.losingScore');

/*-------------- Functions -------------*/

function render() {

    let counter = 0;
    let index = 0;
    if (losingScoreCounter === 3) {
        cells.forEach((cell,index) => {
            cell.innerHTML = winningCombinations[index];
        })
    }
    else {
        cells.forEach((cell,index) => {
            cell.innerHTML = inGameBoardNumbers[index];
        })     
    }
}

// init function

/*
    -Invoked when the (resetBtn) is clicked.
    -Variable states set either empty or 0.
    -Cached Element References (cells,messageText,losingScore) set to default.
    -Buttons need to be enabled.
*/

function init(intialize) {

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
    
    //Picks a random solution from the winning options
    let boardSelectedNum = randomDifficultySelector(0,2);
    //Loops through the board to get each number
    data[boardSelectedNum].forEach((square) => {
        square.forEach((num) => {
            winningCombinations.push(num);
            inGameBoardNumbers.push(num);
        });
    });
    //To check whether a button is selected and what difficulty to pass through the next function
    if (btn.textContent === 'Easy') {
        boardSetting(randomDifficultySelector(20,40));
    }
    else if (btn.textContent === 'Medium') {
        boardSetting(randomDifficultySelector(40,60));
    }
    else if (btn.textContent === 'Difficult') {
        boardSetting(randomDifficultySelector(60,75));
    }

    //Add message text
    difficultyBtns.forEach((btn) => {
        btn.disabled = true;
    })
    render();
}


// Assigning numbers on the board function. (numberAssignment)

/*
            -Invoke (losingScoreFn) and pass the parameters (indexRow) and (indexCol).
            -Calls (winningOnCompletion) function.
    ELSE   
        //THEN **Additional feature I might add is to hightlight the surrounding squares parallel to eachother**
           
*/

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
        lastGridPosition.push(cellId);
        render();
        losingScoreFn(cellId);
        // winningOnCompletion();
    }
}



// Winning on completion function (winningOnCompletion)

/*
    -Using the SOME property for array iterrations to check for an empty string or value.
    -IF inGameBoardNumbers has nothing empty 
        //THEN the game is won is displayed in the (messageText) or anywhere not decided yet.
            -Add disable property to all the buttons for the (numberSelection) and (undoBtn)

*/

// losingScoreFn function 

/*  
    -Passed Param (indexRow) and (indexCol).
    -IF (winningCombination) at (indexRow) and (indexCol) does not matche (inGameBoardNumbers) (indexRow) and (indexCol)
        //THEN (losingScoreCounter) increments by 1.
                -Update (losingScore) to the DOM.
                -Disable property to all the buttons for the (numberSelection)
                -(gridPosition) pushed in (lastGridPosition) used for the undo function
                -(messageText) needs to say wrong answer please undo and u have this many tried left (losingScoreCounter)
                    //IF (losingScoreCounter) equals to 3 
                        //THEN game over is displayed in (messageText) 
                            -Disable property to all the buttons for the (numberSelection) and (undoBtn)

*/
function losingScoreFn (cellId) {
    let int = parseInt(cellId);

    if (winningCombinations[int] !== inGameBoardNumbers[int]) {
        losingScoreCounter++;
        numberSelections.forEach((num) => {
            num.disabled = true;
        })
    }
    if (losingScoreCounter === 3) {
        render();
    }
}

// undoNumberAssignment function

/*
  -Call the element using the first index which is 0 at (lastGridPosition).
  -Split the string (example id="0-0" it split to 0 and 0).
  -Declare variable (indexRow) and (indexCol).
  -Assign the split to each variable.
  -Using (lastGridPosition) array and (indexRow) and (indexCol) as indeces to set the string empty.
  -unshift (lastGridPosition) at the first element.

*/

function undoNumberAssignment(undoInput) {
    console.log(lastGridPosition);
    console.log(inGameBoardNumbers)
    inGameBoardNumbers[parseInt(lastGridPosition[lastGridPosition.length - 1])] = '';
    console.log(inGameBoardNumbers)
    render();
    numberSelections.forEach((num) => {
        num.disabled = false;
    })}

/*----------- Event Listeners ----------*/

difficultyBtns.forEach((btn) => {

    btn.addEventListener('click', () => {
        difficultySetting(btn);
    });
});

numberSelections.forEach((num => {

    num.addEventListener('click', () => {
        numBtnSelected = num.textContent;
        numberAssignment();
    })
}));

undoBtn.addEventListener('click', (undoInput) => {
    undoNumberAssignment(undoInput);
});

resetBtn.addEventListener('click', (intialize)=> {
    init(intialize);
});
 