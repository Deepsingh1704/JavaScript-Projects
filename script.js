const board = document.querySelector(".board");
const scoreElement = document.querySelector("#score");
const highScoreElement = document.querySelector("#highScore");
const startButton = document.querySelector(".btn-start");
const modal = document.querySelector(".modal");
const startGameModal = document.querySelector(".start-game")
const gameOverModal = document.querySelector(".game-over")
const restartButton = document.querySelector(".btn-restart")
const blockWidth = 50;
const blockHeight = 50;

const cols = Math.floor(board.clientWidth / blockWidth);
const rows = Math.floor(board.clientHeight / blockHeight);

let intervalId = null;
let food = { x: Math.floor(Math.random() * rows), y: Math.floor(Math.random() * cols) }
let score = 0;
let highScore = 0;
// Store blocks using x,y coordinates
const blocks = [];

let snake = [
    { x: 7, y: 3 },
];

// Create grid
for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
        const block = document.createElement("div");
        block.classList.add("block");
        board.appendChild(block);
        // Store using x,y format
        blocks[`${row},${col}`] = block;
    }
}

// Draw snake
const render = () => {
    let head = null;
    blocks[`${food.x},${food.y}`].classList.add("food");
    //direction control
    if (direction == "left") {
        head = { x: snake[0].x, y: snake[0].y - 1 }
    } else if (direction == "right") {
        head = { x: snake[0].x, y: snake[0].y + 1 }
    } else if (direction == "up") {
        head = { x: snake[0].x - 1, y: snake[0].y }
    } else if (direction == "down") {
        head = { x: snake[0].x + 1, y: snake[0].y }
    }

    // food is eaten or not

    if (head.x == food.x && head.y == food.y) {
        score++;
        scoreElement.innerText = score;
        blocks[`${food.x},${food.y}`].classList.remove("food");
        food = { x: Math.floor(Math.random() * rows), y: Math.floor(Math.random() * cols) }
        blocks[`${food.x},${food.y}`].classList.add("food");
        console.log(head);
        snake.unshift(head);
    }

    //game over condition 
    if (head.x < 0 || head.x >= rows || head.y < 0 || head.y >= cols) {
        // alert("Game Over");
        clearInterval(intervalId);
        // highScore = Math.max(score, highScore);
        // highScoreElement.innerText = highScore;
        modal.style.display = "flex"
        startGameModal.style.display = "none";
        gameOverModal.style.display = "flex";
        return

    }


    snake.forEach(segment => {
        blocks[`${segment.x},${segment.y}`].classList.remove("fill");
    });

    snake.unshift(head);
    snake.pop();
    // Draw current snake
    snake.forEach(segment => {
        blocks[`${segment.x},${segment.y}`].classList.add("fill");
    });
};

let direction = "up";

// direction controls 

addEventListener("keydown", (e) => {
    if (event.key == "ArrowLeft") {
        direction = "left";
    } else if (event.key == "ArrowRight") {
        direction = "right";
    } else if (event.key == "ArrowUp") {
        direction = "up";
    } else if (event.key == "ArrowDown") {
        direction = "down";
    }
})

//start the game
startButton.addEventListener("click", () => {
    modal.style.display = "none"
    intervalId = setInterval(() => {
        render();
    }, 300)
})

//restart the game

const restartGame = () => {
    blocks[`${food.x},${food.y}`].classList.remove("food");
    snake.forEach((segment) => {
        blocks[`${segment.x},${segment.y}`].classList.remove("fill");
    })
    modal.style.display = "none"
    direction = "down"
    snake = [{ x: 2, y: 4 }]
    food = { x: Math.floor(Math.random() * rows), y: Math.floor(Math.random() * cols) }
    intervalId = setInterval(() => {
        render();
    }, 300)
}

restartButton.addEventListener("click", restartGame)
