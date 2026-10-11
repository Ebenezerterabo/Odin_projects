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
    // Create two players with their names and marks
    player1 = createPlayer(name1, "X");
    player2 = createPlayer(name2, "O");
    // Player 1 goes first
    currentPlayer = player1;
    // Reset the game over flag
    gameOver = false;
    // Reset the game board
    GameBoard.resetBoard();
    };

    // Switch the current player after a move
    // The index is the cell the player clicked on.
    const switchPlayer = (index) => {
        if (gameOver) {
            return { type: 'gameOver', message: 'The game is over. Please start a new game.' };
        }

        // Place the current  players mark
        const placed = GameBoard.placeMark(index, currentPlayer.mark);
        // if the cell is already occupied tell the caller
        if (!placed) {
            return { type: 'invalidMove', message: 'This cell is already occupied. Please choose another cell.' };
        }
        
        // Check for a winner after the move
        const winnerMark = GameBoard.checkWin();

        if (winnerMark) {
            // Find which player won based on the mark
            const winningPlayer = winnerMark === player1.mark ? player1 : player2;
            // Set the game over flag
            gameOver = true;

            return { type: 'win', message: `${winningPlayer.name} wins!` };
        }

        if (GameBoard.isFull()) {
            // Set the game over flag
            gameOver = true;
            return { type: 'draw', message: "It's a draw!" };
        }

        // Switch to the other player
        currentPlayer = currentPlayer === player1 ? player2 : player1;

        return { type: 'continue', message: `${currentPlayer.name}'s turn (${currentPlayer.mark})` };
    };

    const getCurrentPlayer = () => currentPlayer;
    const isGameOver = () => gameOver;

    return { startGame, switchPlayer, getCurrentPlayer, isGameOver };

})();

// const DisplayController = (() => {
//     const boardEl = document.querySelector(".board");
//     const statusEl = document.querySelector(".status");
//     const resetBtn = document.querySelector(".reset");

//     const renderBoard = () => {
//         const board = GameBoard.getBoard();
//         boardEl.innerHTML = "";
//         board.forEach((cell, index) => {
//             const cellEl = document.createElement("div");
//             cellEl.classList.add("cell");
//             cellEl.textContent = cell;
//             cellEl.addEventListener("click", () => handleCellClick(index));
//             boardEl.appendChild(cellEl);
//         });
//     };

//     const handleCellClick = (index) => {
//         const result = GameController.switchPlayer(index);
//         renderBoard();
        
//         if (result == 'win') {
//             statusEl.textContent = `${result} wins!`;
//         } else if (result == 'draw') {
//             statusEl.textContent = "It's a draw!";
//         } else {
//             statusEl.textContent = `${GameController.getCurrentPlayer().name}'s turn (${GameController.getCurrentPlayer().mark})`;
//         }
//     };
// })();

// GameController.startGame("Abigail", "Ebenezer");
// console.log(GameController.getCurrentPlayer());
// console.log(GameController.isGameOver());

