let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let gameActive = true;
let mode = 'player'; // Default mode: player vs player

const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// Set game mode
function setMode(selectedMode) {
    mode = selectedMode;
    resetGame();
}

// Handle user move
function makeMove(index) {
    if (board[index] === '' && gameActive) {
        board[index] = currentPlayer;
        document.querySelectorAll('.cell')[index].innerText = currentPlayer;
        checkResult();

        // Switch player or make computer move
        if (mode === 'computer' && currentPlayer === 'O') {
            computerMove();
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }
    }
}

// Check for winning conditions or draw
function checkResult() {
    for (let condition of winConditions) {
        const [a, b, c] = condition;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            gameActive = false;
            alert(`${currentPlayer} Won the match!!`);
            return;
        }
    }
    
    if (!board.includes('')) {
        gameActive = false;
        alert('Match Draw!');
    }
}

// Computer move (random strategy)
function computerMove() {
    let emptyCells = board
        .map((val, idx) => (val === '' ? idx : null))
        .filter(val => val !== null);

    if (emptyCells.length > 0) {
        let randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        board[randomIndex] = 'O';
        document.querySelectorAll('.cell')[randomIndex].innerText = 'O';
        checkResult();
        currentPlayer = 'X';
    }
}

// Reset the game
function resetGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    gameActive = true;
    document.querySelectorAll('.cell').forEach(cell => (cell.innerText = ''));
}