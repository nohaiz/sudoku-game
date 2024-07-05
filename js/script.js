
import data from './data.js';


/*-------------- Constants -------------*/

const winningCombinations = [];

const inGameBoardNumbers = [];

const lastGridPosition = [];

/*---------- Variables (state) ---------*/

let gridPosition;

let losingScoreCounter = 0;

/*----- Cached Element References  -----*/

const difficultyBtns = document.querySelectorAll('.difficultyBtn');

const squares = document.querySelectorAll('.square');

const cells = document.querySelectorAll('.cell');

const numberSelection = document.querySelectorAll('.numberSelection');

const undoBtn = document.querySelector('.undoBtn');

const resetBtn = document.querySelector('.resetBtn');

const messageText = document.querySelector('.messageText');

const losingScore = document.querySelector('.losingScore');

/*-------------- Functions -------------*/

function render() {

    cells.forEach((cell,index) => {
        cell.innerHTML = inGameBoardNumbers[index];
    })        
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
     
    let boardSelectedNum = randomDifficultySelector(1,3);
    winningCombinations.push(data[boardSelectedNum]);
    
    //Ask dennis
    winningCombinations[0].forEach((square) => {
        square.forEach((num) => {
            inGameBoardNumbers.push(num);
        })
    })

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

// selectedGridPosition function

/*
    -Function will invoke through (cells) event listener.
    -Parameter passed.
    -Parameter used to get assigned Id.
    -Parameter assigned to (gridPosition) at the global scope.
*/

function selectedGridPosition(square) {
    console.log(square.target.className)

}

// Assigning numbers on the board function. (numberAssignment)

/*
    -Function will invoke through (numberSelection) event listener.
    -Parameter passed.
    -Parameter used to get text content from (numberSelection) event listener
    -IF (gridPosition) is empty  
        //THEN sets the inner text for (gridPosition) set to (numberSelection). 
            -Split the (gridPosition) id string to get position of the grid (example id="0-0" it split to 0 and 0).
            -Declare variable (indexRow) and (indexCol).
            -Invoke (losingScoreFn) and pass the parameters (indexRow) and (indexCol).
            -Update the (inGameBoardNumbers)
            -Calls (winningOnCompletion) function.
    ELSE   
        //THEN **Additional feature I might add is to hightlight the surrounding squares parallel to eachother**
           
*/

function numberAssignment(num) {
    console.log(num.innerHTML)
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
    -Function invoked at (numberAssignment) function.
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


/*----------- Event Listeners ----------*/

difficultyBtns.forEach((btn) => {

    btn.addEventListener('click', () => {
        difficultySetting(btn);
    });
});

squares.forEach((square) => {

    square.addEventListener('click', selectedGridPosition);
});

numberSelection.forEach((num => {

    num.addEventListener('click', () => {
        numberAssignment(num);
    })
}));

undoBtn.addEventListener('click', (undoInput) => {
    undoNumberAssignment(undoInput);
});

resetBtn.addEventListener('click', (intialize)=> {
    init(intialize);
});
 