const canvas = document.getElementById('gameCanvas');
const ctx = canvas ? canvas.getContext('2d') : null;
const scoreElement = document.getElementById('score');
const highScoreElement = document.getElementById('highScore');
const gameOverElement = document.getElementById('gameOver');
const wallCollisionElement = document.getElementById('wallCollision');

if (!canvas || !ctx || !scoreElement || !highScoreElement || !gameOverElement || !wallCollisionElement) {
    console.error('Um ou mais elementos HTML não foram encontrados. Verifique o HTML.');
    alert('Erro ao carregar o jogo. Verifique o console para mais detalhes.');
    throw new Error('Elementos HTML não encontrados');
}

const gridSize = 20;
const tileCount = canvas.width / gridSize;
let snake = [{ x: 10, y: 10 }];
let food = { x: 15, y: 15 };
let dx = 0;
let dy = 0;
let score = 0;
let highScore = localStorage.getItem('snakeHighScore') || 0;
let gameSpeed = 100;
let isMoving = false;
let gameOver = false;

// Carrega a imagem da maçã
const foodImage = new Image();
foodImage.src = 'apple.jpg'; // Substitua pelo caminho da sua imagem, se necessário

highScoreElement.textContent = `Recorde: ${highScore}`;

document.addEventListener('keydown', changeDirection);
function changeDirection(event) {
    if (gameOver && event.keyCode === 32) {
        resetGame();
        return;
    }

    if (!isMoving && event.keyCode !== 32) {
        gameOverElement.style.display = 'none';
        wallCollisionElement.style.display = 'none';
    }

    const LEFT_KEY = 37;
    const RIGHT_KEY = 39;
    const UP_KEY = 38;
    const DOWN_KEY = 40;

    const keyPressed = event.keyCode;
    const goingUp = dy === -1;
    const goingDown = dy === 1;
    const goingRight = dx === 1;
    const goingLeft = dx === -1;

    if (keyPressed === LEFT_KEY && !goingRight) {
        dx = -1;
        dy = 0;
        isMoving = true;
    }
    if (keyPressed === UP_KEY && !goingDown) {
        dx = 0;
        dy = -1;
        isMoving = true;
    }
    if (keyPressed === RIGHT_KEY && !goingLeft) {
        dx = 1;
        dy = 0;
        isMoving = true;
    }
    if (keyPressed === DOWN_KEY && !goingUp) {
        dx = 0;
        dy = 1;
        isMoving = true;
    }
}

function gameLoop() {
    if (!gameOver) {
        if (isMoving) {
            updateGame();
        }
        drawGame();
    }
    setTimeout(gameLoop, gameSpeed);
}

function updateGame() {
    const head = { x: snake[0].x + dx, y: snake[0].y + dy };

    if (head.x < 0 || head.x >= tileCount || head.y < 0 || head.y >= tileCount) {
        endGame(true);
        return;
    }

    for (let i = 0; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            endGame(false);
            return;
        }
    }

    snake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
        score += 10;
        scoreElement.textContent = `Pontuação: ${score}`;
        if (score > highScore) {
            highScore = score;
            highScoreElement.textContent = `Recorde: ${highScore}`;
            localStorage.setItem('snakeHighScore', highScore);
        }
        generateFood();
    } else {
        snake.pop();
    }
}

function generateFood() {
    food.x = Math.floor(Math.random() * tileCount);
    food.y = Math.floor(Math.random() * tileCount);

    for (let i = 0; i < snake.length; i++) {
        if (food.x === snake[i].x && food.y === snake[i].y) {
            generateFood();
            return;
        }
    }
}

function drawGame() {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#FF69B4'; // Cor da cobrinha (rosa)
    for (let i = 0; i < snake.length; i++) {
        ctx.fillRect(snake[i].x * gridSize, snake[i].y * gridSize, gridSize - 2, gridSize - 2);
    }

    // Desenha a imagem da maçã maior e centralizada
    if (foodImage.complete && foodImage.naturalHeight !== 0) {
        const foodSize = 24; // Tamanho maior para a maçã (ajuste conforme desejar)
        const offset = (gridSize - foodSize) / 2; // Centraliza a imagem na célula
        ctx.drawImage(foodImage, food.x * gridSize + offset, food.y * gridSize + offset, foodSize, foodSize);
    } else {
        // Fallback para quadrado vermelho se a imagem não carregar
        ctx.fillStyle = 'red';
        ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize - 2, gridSize - 2);
    }
}

function endGame(isWallCollision) {
    gameOver = true;
    isMoving = false;
    if (isWallCollision) {
        wallCollisionElement.style.display = 'block';
    } else {
        gameOverElement.style.display = 'block';
    }
}

function resetGame() {
    snake = [{ x: 10, y: 10 }];
    food = { x: 15, y: 15 };
    dx = 0;
    dy = 0;
    score = 0;
    isMoving = false;
    gameOver = false;
    scoreElement.textContent = `Pontuação: ${score}`;
    gameOverElement.style.display = 'none';
    wallCollisionElement.style.display = 'none';
}

gameLoop();