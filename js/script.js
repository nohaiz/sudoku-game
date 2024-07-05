// Note: Arrays need to be 2D for this to work. Also this works through id's being co-ordinates

//const data = require('./data.js');


/*-------------- Constants -------------*/

const winningCombinations = [];

const inGameBoardNumbers = [];

const lastGridPosition = [];

/*---------- Variables (state) ---------*/

let gridPosition;

let losingScoreCounter = 0;

/*----- Cached Element References  -----*/

const difficultyBtns = document.querySelectorAll('.difficultyBtn');

const cells = document.querySelectorAll('.square');

const numberSelection = document.querySelectorAll('.numberSelection');

const undoBtn = document.querySelector('.undoBtn');

const resetBtn = document.querySelector('.resetBtn');

const messageText = document.querySelector('.messageText');

const losingScore = document.querySelector('.losingScore');

/*-------------- Functions -------------*/


// render function
/*
    -Function invoked at (difficultySetting) function.
    -Radomizer to choose winning combinations from the data.js.
    -Calls the (randomDifficultySelector) and passes a param depending on the size of the array.
    -Array assigned to (inGameBoardNumbers) and (winningCombination) using the MAP property.
    -Render to the DOM.
*/


// init function

/*
    -Invoked when the (resetBtn) is clicked.
    -Variable states set either empty or 0.
    -Cached Element References (cells,messageText,losingScore) set to default.
    -Buttons need to be enabled.
*/

function init(intialize) {

}

// randomDifficultySelector function 

/*
    -Function with 2 param min integer and max integer.
    -Returns random value between the 2 integers
*/

// difficultySetting function

/*
    -Function will invoke through (difficultySetting) event listener.
    -Parameter passed.
    -Declaring randomNumber
    -Declaring randomIdexRow and randomIdexRow (for my info: 0-81)
    IF the parameter is easy 
        //THEN invokes (randomDifficultySelector) between 1 and 30 which are param and stores in (randomNumer).
                -FOR loop is used to itterate the number of times it needs to remove from (inGameBoardNumbers). 
                    -Invokes (randomDifficultySelector) between 0 and 81 which are param and stored in (randomIdexRow).
                    -Invokes (randomDifficultySelector) between 0 and 81 which are param and stored in (randomIdexCol).
                    -(inGameBoardNumbers) array now assigns empty string depending on the co-ordinate.
                -(messageText) should say easy was selected
    ELSE IF medium
        //THEN invokes (randomDifficultySelector) between 30 and 55 which are param and stores in (randomNumer).
                -FOR loop is used to itterate the number of times it needs to remove from (inGameBoardNumbers). 
                    -Invokes (randomDifficultySelector) between 0 and 81 which are param and stored in (randomIdexRow).
                    -Invokes (randomDifficultySelector) between 0 and 81 which are param and stored in (randomIdexCol).
                    -(inGameBoardNumbers) array now assigns empty string depending on the co-ordinate.
                -(messageText) should say medium was selected
    ELSE IF hard
        //THEN invokes (randomDifficultySelector) between 55 and 65 which are param and stores in (randomNumer).
                -FOR loop is used to itterate the number of times it needs to remove from (inGameBoardNumbers). 
                    -Invokes (randomDifficultySelector) between 0 and 81 which are param and stored in (randomIdexRow).
                    -Invokes (randomDifficultySelector) between 0 and 81 which are param and stored in (randomIdexCol).
                    -(inGameBoardNumbers) array now assigns empty string depending on the co-ordinate.
                -(messageText) should say medium was selected
    -difficulty buttons are disabled.
    -Render function invoked;
*/

function difficultySetting(btn) {

}

// selectedGridPosition function

/*
    -Function will invoke through (cells) event listener.
    -Parameter passed.
    -Parameter used to get assigned Id.
    -Parameter assigned to (gridPosition) at the global scope.
*/

function selectedGridPosition(cellSpace) {

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

cells.forEach((cellSpace) => {

    cellSpace.addEventListener('click', selectedGridPosition);
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
 