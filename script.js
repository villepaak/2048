// Declaring variables

let gameBoard;
let score = 0;
let highScore = 0;
let newHighScore;

const rows = 4;
const columns = 4;

    // Function for clearing the old tile value/id and creating a new tile id

    updateTile = (tile, num) => {

        tile.innerText = "";
        tile.classList.value = "";
    
        // Clears the classlist so contradictions doesn't happen
    
        tile.classList.add("tile");
    
        // Adds tile to tile.classList
    
        if (num > 0) {
    
            tile.innerText = num.toString();
    
        } if (num <= 4096) {
    
            tile.classList.add("x" + num.toString());
    
        } else {
    
            tile.classList.add("x8192");
    
        }

        checkForGameOver();
    
    }

hasEmptyTile = () => {

    let count = 0;

    for (let r = 0; r < rows; r++) {

        for (let c = 0; c < columns; c++) {

            if (gameBoard[r][c] == 0) {

                return true;

            }

        }

        return false;

    }

    return false;

}

setTile = () => {

    if (!hasEmptyTile()) {

        return;

    }

    let isFound = false;

    while (!isFound) {

        // Spawns two tiles randomly

        let r = Math.floor(Math.random() * rows);
        let c = Math.floor(Math.random() * columns);

        if (gameBoard[r][c] == 0) {

            gameBoard[r][c] = 2;
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            tile.innerText = "2";
            tile.classList.add("x2");
            isFound = true;

        }

    }

}

function setGame() {

    // Setting up the board with multidimensional array

    gameBoard = [

        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]

    ]

    // Iterating through the array

    for (let r = 0; r < rows; r++) {

        for (let c = 0; c < columns; c++) {

            let tile = document.createElement("div");

            // "Creating" an id for each tile coordination on board

            tile.id = r.toString() + "-" + c.toString();

            // Checking the coordinates for the id definition

            let num = gameBoard[r][c];

            // Making a function for updating tiles

            updateTile(tile, num);

            document.getElementById("gameBoard").append(tile);

        }

    }

    setTile();
    setTile();

    getScore();

}


function setNewGame() {

    setScore();

    window.location.reload();

}

/*

LOGIC OF MOVEMENT AND TILE MERGING IN THE GAME:

1. Wait for user input
2. Clear zeroes
3. If there is two same value tiles they merge in the direction of input
4. Clear zeroes again to clean the new empty tiles

*/

clearZero = (row) => {

    return row.filter(num => num != 0); // Clears zeroes from the array

}

move = (row) => {

    row = clearZero(row);

    for (let i = 0; i < row.length - 1; i++) {

        if (row[i] == row[i + 1]) {

            // Check every two

            row[i] *= 2;
            row[i + 1] = 0;
            score += row[i];

        }

    }

    row = clearZero(row);

    // Add zeroes

    while (row.length < columns) {

        row.push(0); // Using array method to push the new zero to array

    }

    return row;

}

moveLeft = () => {

    for (let r = 0; r < rows; r++) {

        let row = gameBoard[r]; // Go for each row
        row = move(row); // Move
        gameBoard[r] = row;

        for (let c = 0; c < columns; c++) {

            let tile = document.getElementById(r.toString() + "-" + c.toString());

            let num = gameBoard[r][c];

            updateTile(tile, num);

        }

    }

}

moveRight = () => {

    for (let r = 0; r < rows; r++) {

        let row = gameBoard[r]; // Go for each row
        row.reverse();
        row = move(row); // Move
        row.reverse();
        gameBoard[r] = row;

        for (let c = 0; c < columns; c++) {

            let tile = document.getElementById(r.toString() + "-" + c.toString());

            let num = gameBoard[r][c];

            updateTile(tile, num);

        }

    }

}

moveUp = () => {

    for (let c = 0; c < columns; c++) {

        let row = [gameBoard[0][c], gameBoard[1][c], gameBoard[2][c], gameBoard[3][c]]
        row = move(row);

        for (let r = 0; r < rows; r++) {

            gameBoard[r][c] = row[r]

            let tile = document.getElementById(r.toString() + "-" + c.toString());

            let num = gameBoard[r][c];

            updateTile(tile, num);

        }

    }

}

moveDown = () => {

    for (let c = 0; c < columns; c++) {

        let row = [gameBoard[0][c], gameBoard[1][c], gameBoard[2][c], gameBoard[3][c]]

        row.reverse();
        
        row = move(row);

        row.reverse();

        for (let r = 0; r < rows; r++) {

            gameBoard[r][c] = row[r]

            let tile = document.getElementById(r.toString() + "-" + c.toString());

            let num = gameBoard[r][c];

            updateTile(tile, num);

        }

    }

}

document.addEventListener("keyup", (key) => {

    if (key.code == "ArrowLeft") {

        moveLeft();
        setTile();

    } else if (key.code == "ArrowRight") {

        moveRight();
        setTile();

    } else if (key.code == "ArrowUp") {

        moveUp();
        setTile();

    } else if (key.code == "ArrowDown") {

        moveDown();
        setTile();

    }

    document.getElementById("score").innerText = score;

})

// Sets the game when window is loaded

window.onload = () => setGame()

/*

Check for defeat


Check if move is possible
Check if of any move is possible
Check if there is any legal moves
if not then you have lost

*/

function checkForGameOver() {

    for (let r = 0; r < rows; r++) {

        for (let c = 0; c < columns; c++) {

            if (gameBoard[r][c] == 0 || canCollapse(r, c)) {

                return false;

            }
        }
    }

    document.getElementById("defeatMessage").innerText = "You lost, restart the game to continue";
    gameOver = true;
    return true;

}

function canCollapse(row, column) {

    if (row > 0 && gameBoard[row][column] == gameBoard[row - 1][column]) {

        return true;

    } else if (row < rows - 1 && gameBoard[row][column] == gameBoard[row + 1][column]) {

        return true;

    } else if (column > 0 && gameBoard[row][column] == gameBoard[row][column - 1]) {

        return true;

    } else if (column < columns - 1 && gameBoard[row][column] == gameBoard[row][column + 1]) {

        return true;

    }

    return false;

}

function setScore() {

    highScore = score;
    newHighScore = localStorage.getItem("highScore");

    if (newHighScore <= highScore) {

        localStorage.setItem("highScore", highScore);

    } else {

        return;

    }
}

function getScore() {

    document.getElementById("high_score").innerText = localStorage.getItem("highScore");

}
