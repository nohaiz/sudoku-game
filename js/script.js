// Note: Arrays need to be 2D for this to work. Also this works through id's being co-ordinates

/*-------------- Constants -------------*/

// The winning board array. (winningCombinations)

/*
    - This array contains predefined winning combinations for the game.
    - The data.js file will contain a number of random winning combination. That will be selected at random and is assigned to the winning board array.
*/

// The in game board number array. (inGameBoardNumbers)

/*
    -Sets the numbers on the board.
    -Stores new numbers based on their on the board. 
*/

// Last grid position selected (lastGridPosition)

/*
    -An undefined array
*/

/*---------- Variables (state) ---------*/

// Grid position variable. (gridPosition)

/*
    -Variable set when function gridSelected is invoked.
*/
// Losing Score counter (losingScoreCounter)

/*
    -Set to 0.
    -Increments by 1 on mistakes made.
*/

/*----- Cached Element References  -----*/

// Query selector for the difficulty buttons. (difficultyBtn)

/* 
    -It will query the class name of the specific button using the query selector and will be assigned a constant.
*/


// Query selector for a specific grid (gridSelection)

/*
    -It will query the class name of the specific grid using the query selector all and will be assigned a constant.
*/


// Query selector for the number buttons(numberSelection)

/*
    -It will query the class name of the specific number button using the query selector all and will be assigned a constant.
*/


// Query selector for the undo button (undoBtn)

/*
    -It will query the class name of the undo button using the query selector and will be assigned a constant.
*/


// Query selector for the reset button (resetBtn)

/*
    -It will query the class name of the reset button using the query selector and will be assigned a constant.
*/
 

// Query selector for the message text (messageText)

/*
    -It will query the class name of the message text using the query selector and will be assigned a constant.
*/



// Query selector for the losing text (losingScore)

/*
    -It will query the class name of the message text using the query selector and will be assigned a constant.
*/

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
    -Cached Element References (gridSelection,messageText,losingScore) set to default.
    -Buttons need to be enabled.
*/

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

// selectedGridPosition function

/*
    -Function will invoke through (gridSelection) event listener.
    -Parameter passed.
    -Parameter used to get assigned Id.
    -Parameter assigned to (gridPosition) at the global scope.
*/

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

// undoNumberAssignment function

/*
  -Call the element using the first index which is 0 at (lastGridPosition).
  -Split the string (example id="0-0" it split to 0 and 0).
  -Declare variable (indexRow) and (indexCol).
  -Assign the split to each variable.
  -Using (lastGridPosition) array and (indexRow) and (indexCol) as indeces to set the string empty.
  -unshift (lastGridPosition) at the first element.

*/

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

// Add event listener to the difficulty buttons.(difficultyBtn) 

/*
    -Invokes (difficultySetting).
    -Pass Parameters.
*/

// Event listener for the grid (gridSelection)

/*
    -Invokes (selectedGridPosition).
    -Pass Parameters
*/

// Event listener for the (numberSelection)

/*
    -Invokes (numberAssignment)
    -Pass Parameters
*/

// Event listener for the (undoBtn) 

/*
    -Invokes (undoNumberAssignment)
*/

// Event listener for the (resetBtn) 
/*
    -Invokes (init)
*/
 