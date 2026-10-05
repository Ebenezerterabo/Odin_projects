// Gameboard object
const GameBoard = (() => {
    let board = ["", "", "", "", "", "", "", "", ""];

    // Get values from the board
    const getBoard = () => board;
    // Place a mark on the board (x or o) at a specific index
    const placeMark = (index, mark) => {
        if (board[index] === "") {
            board[index] = mark;
            return true;
        }
        return false;
    };
    // Clear the board
    const resetBoard = () => {
        board = ["", "", "", "", "", "", "", "", ""];
    };
    // Check if the board is full
    const isFull = () => {
        return board.every(cell => cell !== "");
    };
    // Check if a player has won
    const winningLines = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
        [0, 4, 8], [2, 4, 6]             // diagonals
    ];
    
    const checkWin = () => {
        // Check each winning line to see if all three cells are the same and not empty
        for (const line of winningLines) {
            const [a, b, c] = line;

            // Get the marks at those three positions
            const markA = board[a];
            const markB = board[b];
            const markC = board[c];
            
            // If all three marks are the same and not empty, we have a winner
            if (markA && markA === markB && markA === markC) {
                return markA; // "X" or "O"
            }
        }
        return null;
    };
    // Return the public methods
    return { getBoard, placeMark, resetBoard, isFull, checkWin };
})();

const createPlayer = (name, mark) => {
    return { name, mark };
};

const GameController = (() => {
    let player1, player2, currentPlayer, gameOver;

    const startGame = (name1, name2) => {
    player1 = createPlayer(name1, "X");
    player2 = createPlayer(name2, "O");
    currentPlayer = player1;
    gameOver = false;
    GameBoard.resetBoard();
    };

    const switchPlayer = (index) => {
        if (gameOver) return;
        if (GameBoard.placeMark(index, currentPlayer.mark)) {
            const winner = GameBoard.checkWin();
            if (winner) {
                gameOver = true;
                console.log(`${currentPlayer.name} wins!`);
            } else if (GameBoard.isFull()) {
                gameOver = true;
                console.log("It's a draw!");
            } else {
        currentPlayer = currentPlayer === player1 ? player2 : player1;
            }
        }
    };

    const getCurrentPlayer = () => currentPlayer;
    const isGameOver = () => gameOver;

    return { startGame, switchPlayer, getCurrentPlayer, isGameOver };

})();

const DisplayController = (() => {
    const boardEl = document.querySelector(".board");
    const statusEl = document.querySelector(".status");
    const resetBtn = document.querySelector(".reset");

    const renderBoard = () => {
        const board = GameBoard.getBoard();
        boardEl.innerHTML = "";
        board.forEach((cell, index) => {
            const cellEl = document.createElement("div");
            cellEl.classList.add("cell");
            cellEl.textContent = cell;
            cellEl.addEventListener("click", () => handleCellClick(index));
            boardEl.appendChild(cellEl);
        });
    };

    const handleCellClick = (index) => {
        const result = GameController.switchPlayer(index);
        renderBoard();
        
        if (result == 'win') {
            statusEl.textContent = `${result} wins!`;
        } else if (result == 'draw') {
            statusEl.textContent = "It's a draw!";
        } else {
            statusEl.textContent = `${GameController.getCurrentPlayer().name}'s turn (${GameController.getCurrentPlayer().mark})`;
        }
    };
})();

// GameController.startGame("Player 1", "Player 2");
// console.log(GameController.getCurrentPlayer().name + " starts the game.");
// GameController.switchPlayer(0); // Player 1 places "X" at index 0
// console.log(GameController.getCurrentPlayer().mark + " starts the game.");
// GameController.switchPlayer(1); // Player 2 places "O" at index 1
// console.log(GameController.getCurrentPlayer().name + " starts the game.");
// GameController.switchPlayer(2); // Player 1 places "X" at index 2
// console.log(GameController.getCurrentPlayer().name + " starts the game.");

GameBoard.placeMark(1, "x");
GameBoard.placeMark(2, "x");
console.log(GameBoard.checkWin());