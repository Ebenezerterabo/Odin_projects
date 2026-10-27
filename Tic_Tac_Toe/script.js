// Gameboard object
const GameBoard = (() => {
    let board = ["", "", "", "", "", "", "", "", ""];

    // Get values from the board.
    const getBoard = () => board;
    // Place a mark on the board (x or o) at a specific index.
    const placeMark = (index, mark) => {
        if (board[index] === "") {
            board[index] = mark;
            return true;
        }
        return false;
    };
    // Clear the board.
    const resetBoard = () => {
        board = ["", "", "", "", "", "", "", "", ""];
    };
    // Check if the board is full.
    const isFull = () => {
        return board.every(cell => cell !== "");
    };
    // Check if a player has won.
    const winningLines = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
        [0, 4, 8], [2, 4, 6]             // diagonals
    ];
    
    const checkWin = () => {
        // Check each winning line to see if all three cells are the same and not empty.
        for (const line of winningLines) {
            const [a, b, c] = line;

            // Get the marks at those three positions.
            const markA = board[a];
            const markB = board[b];
            const markC = board[c];
            
            // If all three marks are the same and not empty, we have a winner.
            if (markA && markA === markB && markA === markC) {
                return markA; // "X" or "O"
            };
        };
        return null;
    };
    // Return the public methods.
    return { getBoard, placeMark, resetBoard, isFull, checkWin };
})();

const createPlayer = (name, mark) => {
    return { name, mark };
};

const GameController = (() => {
    let player1, player2, currentPlayer, gameOver;

    const startGame = (name1, name2) => {
    // Create two players with their names and marks.
    player1 = createPlayer(name1, "X");
    player2 = createPlayer(name2, "O");
    // Player 1 goes first.
    currentPlayer = player1;
    // Reset the game over flag.
    gameOver = false;
    // Reset the game board.
    GameBoard.resetBoard();
    };

    // Switch the current player after a move.
    // The index is the cell the player clicked on.
    const switchPlayer = (index) => {
        // console.log(currentPlayer);
        // console.log(gameOver);
        if (gameOver) {
            return { type: 'gameOver', message: 'The game is over. Please start a new game.' };
        };

        // Place the current  players mark.
        const placed = GameBoard.placeMark(index, currentPlayer.mark);
        // if the cell is already occupied tell the caller.
        if (!placed) {
            return { type: 'invalidMove', message: 'This cell is already occupied. Please choose another cell.' };
        };
        
        // Check for a winner after the move.
        const winnerMark = GameBoard.checkWin();

        if (winnerMark) {
            // Find which player won based on the mark.
            const winningPlayer = winnerMark === player1.mark ? player1 : player2;
            // Set the game over flag.
            gameOver = true;

            return { type: 'win', message: `${winningPlayer.name} wins!` };
        };

        if (GameBoard.isFull()) {
            // Set the game over flag.
            gameOver = true;
            return { type: 'draw', message: "It's a draw!" };
        };



        // Switch to the other player.
        currentPlayer = currentPlayer === player1 ? player2 : player1;

        return { type: 'continue', message: `${currentPlayer.name}'s turn (${currentPlayer.mark})` };
    };

    const getCurrentPlayer = () => currentPlayer;
    const isGameOver = () => gameOver;

    return { startGame, switchPlayer, getCurrentPlayer, isGameOver };

})();


const DisplayController = (() => {
    const boardEl = document.querySelector(".board");  // Container for the game board
    const statusEl = document.querySelector(".status");  // message area
    const resetBtn = document.querySelector(".reset");  // Reset button
    
    console.log("boardEl", boardEl);
    const renderBoard = () => {
        console.log("Rendering board...", GameBoard.getBoard());
        // Get the current board array.
        const board = GameBoard.getBoard();
        // Clear out any old squares.
        boardEl.innerHTML = "";
        // Create a new square for each cell in the board.
        board.forEach((mark, index) => {
            // Create the square element.
            const squareEl = document.createElement("div");
            squareEl.classList.add("cell");
            // Show the mark in the square.
            squareEl.textContent = mark;

            // If the cell has been taken
            if (mark !== "") {
                // Add a class to indicate it's taken.
                squareEl.classList.add("taken");
            } else {
                // If the cell is empty, add a click event listener.
                squareEl.addEventListener("click", () => handleCellClick(index));
            }

            // Add the square to the board container.
            boardEl.appendChild(squareEl);
        });
    };

    const handleCellClick = (index) => {
        // Call the GameController to handle the move.
        const result = GameController.switchPlayer(index);
        // Re-render the board after the move.
        renderBoard();

        // Update the status message based on the result. (updateStatus function)
        updateStatus(result);
    };

    const updateStatus = (result) => {
        switch (result.type) {
            case 'win':
                statusEl.textContent = result.message;
                break;
            case 'draw':
                statusEl.textContent = result.message;
                break;
            case 'gameOver':
                statusEl.textContent = result.message;
                break;
            case 'invalidMove':
                statusEl.textContent = result.message;
                break;
            case 'continue':
                statusEl.textContent = result.message;
                break;
        };
    };

    const resetGame = () => {
        // Reset the game state in the GameController.
        GameController.startGame(player1.name, player2.name);
        // Re-render the board.
        renderBoard();
        // Update the status message to indicate the new game has started.
        statusEl.textContent = `${GameController.getCurrentPlayer().name}'s turn (${GameController.getCurrentPlayer().mark})`;
    };

    resetBtn.addEventListener("click", resetGame);

    const init = () => {
        // Start a new game with default player names.
        GameController.startGame("Player 1", "Player 2");
    };

    return { init, renderBoard, updateStatus };

})();

DisplayController.renderBoard();
GameController.getCurrentPlayer();  // Initialize the current player
DisplayController.updateStatus({ type: 'continue', message: `${GameController.getCurrentPlayer().name}'s turn (${GameController.getCurrentPlayer().mark})` });








