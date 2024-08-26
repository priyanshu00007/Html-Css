const boardElement = document.getElementById("chess-board");
        const chess = new Chess(); // Initialize the Chess.js library

        const board = [
            ["r", "n", "b", "q", "k", "b", "n", "r"],
            ["p", "p", "p", "p", "p", "p", "p", "p"],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["P", "P", "P", "P", "P", "P", "P", "P"],
            ["R", "N", "B", "Q", "K", "B", "N", "R"]
        ];

        // Timer variables
        let whiteTimer = document.getElementById('white-timer');
        let blackTimer = document.getElementById('black-timer');

        let whiteTime = 5 * 60; // 5 minutes in seconds
        let blackTime = 5 * 60; // 5 minutes in seconds

        let whiteInterval;
        let blackInterval;

        let currentPlayer = 'white'; // 'white' starts first

        function startTimer() {
            if (currentPlayer === 'white') {
                if (whiteInterval) clearInterval(whiteInterval);
                whiteInterval = setInterval(() => {
                    whiteTime--;
                    updateTimer(whiteTimer, whiteTime);
                    if (whiteTime <= 0) endGame('black');
                }, 1000);
            } else {
                if (blackInterval) clearInterval(blackInterval);
                blackInterval = setInterval(() => {
                    blackTime--;
                    updateTimer(blackTimer, blackTime);
                    if (blackTime <= 0) endGame('white');
                }, 1000);
            }
        }

        function pauseTimer() {
            if (currentPlayer === 'white' && whiteInterval) {
                clearInterval(whiteInterval);
            } else if (currentPlayer === 'black' && blackInterval) {
                clearInterval(blackInterval);
            }
        }

        function updateTimer(timerElement, timeInSeconds) {
            const minutes = Math.floor(timeInSeconds / 60);
            const seconds = timeInSeconds % 60;
            timerElement.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        }

        function endGame(winner) {
            clearInterval(whiteInterval);
            clearInterval(blackInterval);
            alert(`Game Over! ${winner.charAt(0).toUpperCase() + winner.slice(1)} wins!`);
        }

        function renderBoard() {
            boardElement.innerHTML = "";

            const pieceImages = {
                r: "images/black_rook.png",
                n: "images/black_knight.png",
                b: "images/black_bishop.png",
                q: "images/black_queen.png",
                k: "images/black_king.png",
                p: "images/black_pawn.png",
                R: "images/white_rook.png",
                N: "images/white_knight.png",
                B: "images/white_bishop.png",
                Q: "images/white_queen.png",
                K: "images/white_king.png",
                P: "images/white_pawn.png",
            };

            for (let row = 0; row < 8; row++) {
                for (let col = 0; col < 8; col++) {
                    const square = document.createElement("div");
                    square.classList.add("square", (row + col) % 2 === 0 ? "white" : "black");
                    square.dataset.row = row;
                    square.dataset.col = col;

                    const piece = board[row][col];
                    if (piece) {
                        const pieceElement = document.createElement("img");
                        pieceElement.src = pieceImages[piece];
                        pieceElement.alt = piece;
                        pieceElement.draggable = true; // Make the piece draggable
                        pieceElement.dataset.row = row;
                        pieceElement.dataset.col = col;

                        pieceElement.addEventListener("dragstart", handleDragStart);
                        square.appendChild(pieceElement);
                    }

                    square.addEventListener("dragover", handleDragOver);
                    square.addEventListener("drop", (e) => handleDrop(e, row, col));

                    boardElement.appendChild(square);
                }
            }
        }

        // Variables to keep track of the dragged piece
        let draggedPiece = null;
        let draggedFrom = { row: null, col: null };

        function handleDragStart(e) {
            draggedPiece = e.target;
            draggedFrom.row = +e.target.dataset.row;
            draggedFrom.col = +e.target.dataset.col;
        }

        function handleDragOver(e) {
            e.preventDefault(); // Allow dropping by preventing the default behavior
        }

        function handleDrop(e, targetRow, targetCol) {
            e.preventDefault();

            // Pause the current player's timer
            pauseTimer();

            const move = {
                from: `${String.fromCharCode(draggedFrom.col + 97)}${8 - draggedFrom.row}`,
                to: `${String.fromCharCode(targetCol + 97)}${8 - targetRow}`
            };

            const moveResult = chess.move(move);

            if (moveResult) {
                // Update the board array
                board[targetRow][targetCol] = board[draggedFrom.row][draggedFrom.col];
                board[draggedFrom.row][draggedFrom.col] = "";
                renderBoard(); // Re-render the board with the updated state

                // Switch the current player and start the timer for the new player
                currentPlayer = currentPlayer === 'white' ? 'black' : 'white';
                startTimer();
            } else {
                alert("Invalid move!");
            }

            draggedPiece = null;
            draggedFrom = { row: null, col: null };
        }

        // Initial render
        renderBoard();
        startTimer();