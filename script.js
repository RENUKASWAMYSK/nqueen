const N = 8; // Size of the chessboard
let queens = []; // Store the positions of queens

// Initialize the chessboard
const chessboard = document.getElementById("chessboard");
for (let i = 0; i < N * N; i++) {
    const square = document.createElement("div");
    square.classList.add("square");
    square.dataset.row = Math.floor(i / N);
    square.dataset.col = i % N;
    square.addEventListener("click", placeQueen);
    chessboard.appendChild(square);
}

// Function to place a queen
function placeQueen() {
    const row = this.dataset.row;
    const col = this.dataset.col;

    if (isValidPlacement(row, col)) {
        queens.push({ row: parseInt(row), col: parseInt(col) });
        this.innerHTML = "♕"; // Display a queen
        this.removeEventListener("click", placeQueen); // Prevent further clicks on the same square
        checkStatus();
    } else {
        document.getElementById("status").textContent = "Invalid move! The queen is under attack.";
    }
}

// Function to check if a queen placement is valid
function isValidPlacement(row, col) {
    for (const queen of queens) {
        if (queen.row == row || queen.col == col || Math.abs(queen.row - row) == Math.abs(queen.col - col)) {
            return false; // Attack condition met
        }
    }
    return true;
}

// Function to check the status of the game
function checkStatus() {
    if (queens.length === N) {
        document.getElementById("status").textContent = "All queens placed successfully!";
    } else {
        document.getElementById("status").textContent = `Queen placed. ${N - queens.length} more to go.`;
    }
}
