const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');
const scoreDisplay = document.getElementById('score');

let snake = [
	{x: 200, y: 200},
	{x: 190, y: 200},
	{x: 180, y: 200}
];

let direction = 'right';
let food = {x: 100, y: 100};
let score = 0;

// Mobile button controls
const upButton = document.getElementById('up-button');
const downButton = document.getElementById('down-button');
const leftButton = document.getElementById('left-button');
const rightButton = document.getElementById('right-button');

upButton.addEventListener('touchstart', () => {
	if (direction !== 'down') direction = 'up';
});

downButton.addEventListener('touchstart', () => {
	if (direction !== 'up') direction = 'down';
});

leftButton.addEventListener('touchstart', () => {
	if (direction !== 'right') direction = 'left';
});

rightButton.addEventListener('touchstart', () => {
	if (direction !== 'left') direction = 'right';
});

function drawSnake() {
	snake.forEach(segment => {
		ctx.fillStyle = 'green';
		ctx.fillRect(segment.x, segment.y, 10, 10);
	});
}

function drawFood() {
	ctx.fillStyle = 'red';
	ctx.fillRect(food.x, food.y, 10, 10);
}

function update() {
	const head = snake[0];
	let newHead;

	switch (direction) {
		case 'right':
			newHead = {x: head.x + 10, y: head.y};
			break;
		case 'left':
			newHead = {x: head.x - 10, y: head.y};
			break;
		case 'up':
			newHead = {x: head.x, y: head.y - 10};
			break;
		case 'down':
			newHead = {x: head.x, y: head.y + 10};
			break;
	}

	snake.unshift(newHead);

	if (snake[0].x === food.x && snake[0].y === food.y) {
		score++;
		scoreDisplay.textContent = `Score: ${score}`;
		food = {x: Math.floor(Math.random() * 39) * 10, y: Math.floor(Math.random() * 39) * 10};
	} else {
		snake.pop();
	}

	// Infinite game logic
	if (snake[0].x < 0) {
		snake[0].x = canvas.width - 10;
	} else if (snake[0].x >= canvas.width) {
		snake[0].x = 0;
	}

	if (snake[0].y < 0) {
		snake[0].y = canvas.height - 10;
	} else if (snake[0].y >= canvas.height) {
		snake[0].y = 0;
	}
}

function draw() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	drawSnake();
	drawFood();
}

function handleInput(event) {
	switch (event.key) {
		case 'ArrowUp':
			if (direction !== 'down') direction = 'up';
			break;
		case 'ArrowDown':
			if (direction !== 'up') direction = 'down';
			break;
		case 'ArrowLeft':
			if (direction !== 'right') direction = 'left';
			break;
		case 'ArrowRight':
			if (direction !== 'left') direction = 'right';
			break;
	}
}

document.addEventListener('keydown', handleInput);

setInterval(() => {
	update();
	draw();
}, 100);    