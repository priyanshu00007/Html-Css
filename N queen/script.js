const boardElement = document.getElementById('board');

function solveNQueens(N) {
    boardElement.style.gridTemplateColumns = `repeat(${N}, 50px)`;
    boardElement.style.gridTemplateRows = `repeat(${N}, 50px)`;

    const board = Array.from({ length: N }, () => Array(N).fill(0));
    const solutions = [];

    function isSafe(row, col) {
        // Check this row on the left side
        for (let i = 0; i < col; i++) {
            if (board[row][i]) return false;
        }

        // Check upper diagonal on left side
        for (let i = row, j = col; i >= 0 && j >= 0; i--, j--) {
            if (board[i][j]) return false;
        }

        // Check lower diagonal on left side
        for (let i = row, j = col; i < N && j >= 0; i++, j--) {
            if (board[i][j]) return false;
        }

        return true;
    }

    function solve(col) {
        if (col >= N) {
            solutions.push(board.map(row => row.slice()));
            return true;
        }

        for (let i = 0; i < N; i++) {
            if (isSafe(i, col)) {
                board[i][col] = 1;
                if (solve(col + 1)) {
                    return true;
                }
                board[i][col] = 0; // Backtrack
            } else {
                alert(`Placing a queen at row ${i + 1}, column ${col + 1} is not safe!`);
            }
        }
        return false;
    }

    if (solve(0)) {
        renderBoard(solutions[0], N);
    } else {
        alert('No solution found!');
    }
}

function renderBoard(board, N) {
    boardElement.innerHTML = '';

    for (let row = 0; row < N; row++) {
        for (let col = 0; col < N; col++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            if (board[row][col]) {
                cell.innerHTML = '♛'; // Display a queen using the chess symbol
                cell.classList.add('queen');
            }
            boardElement.appendChild(cell);
        }
    }
}
