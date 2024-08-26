const cells = document.querySelectorAll('.cell');
const resetButton = document.getElementById('reset');
const resultDiv = document.querySelector('.result');
let currentPlayer = 'X';

cells.forEach((cell) => {
    cell.addEventListener('click', () => {
        if (cell.textContent === '') {
            cell.textContent = currentPlayer;
            checkWinner();
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }
    });
});

resetButton.addEventListener('click', () => {
    cells.forEach((cell) => {
        cell.textContent = '';
    });
    currentPlayer = 'X';
    resultDiv.textContent = '';
});

function checkWinner() {
    const winningCombinations = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
        [1, 4, 7],
        [2, 5, 8],
        [3, 6, 9],
        [1, 5, 9],
        [3, 5, 7],
    ];

    for (const combination of winningCombinations) {
        const [a, b, c] = combination;
        if (
            cells[a - 1].textContent === currentPlayer &&
            cells[b - 1].textContent === currentPlayer &&
            cells[c - 1].textContent === currentPlayer
        ) {
            resultDiv.textContent = `Player ${currentPlayer} wins!`;
            resetButton.click();
            return;
        }
    }
}