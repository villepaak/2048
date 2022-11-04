// Declaring variables

let gameBoard;
let score;

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
    
            tile.innerText = num;
    
        } if (num <= 4096) {
    
            tile.classList.add("x" + num.toString());
    
        } else {
    
            tile.classList.add("x8192");
    
        }
    
    }

function setGame() {

    // Setting up the board with multidimensional array

    gameBoard = [

        [2, 2, 2, 2],
        [2, 2, 2, 2],
        [4, 4, 8, 8],
        [4, 4, 8, 8]

    ]

    // Iterating through the array

    for (let r = 0; r < rows; r++) {

        for (let c = 0; c < columns; c++) {

            let tile = document.createElement("div");

            // Creating an id for each tile coordination on board

            tile.id = r.toString() + "-" + c.toString();

            // Checking the coordinates for the id definition

            let num = gameBoard[r][c];

            // Making a function for updating tiles

            updateTile(tile, num);

            document.getElementById("gameBoard").append(tile);

        }
    }
}

// Sets the game when window is loaded

window.onload = () => setGame()