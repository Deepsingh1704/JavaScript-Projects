const board = document.querySelector(".board");
const scoreElement = document.querySelector("#score");
const highScoreElement = document.querySelector("#highScore");
const startButton = document.querySelector(".btn-start");
const modal = document.querySelector(".modal");
const startGameModal = document.querySelector(".start-game")
const gameOverModal = document.querySelector(".game-over")
const restartButton = document.querySelector(".btn-restart")
const timeElement = document.querySelector("#time");

const blockWidth = 30;
const blockHeight = 30;

const cols = Math.floor(board.clientWidth / blockWidth);
const rows = Math.floor(board.clientHeight / blockHeight);
let timerIntervalId = null;
let intervalId = null;
let food = { x: Math.floor(Math.random() * rows), y: Math.floor(Math.random() * cols) }
let score = 0;
let time = `00:00`

let highScore = localStorage.getItem("highScore") || 0;
highScoreElement.innerText = highScore;
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

        blocks[`${food.x},${food.y}`].classList.remove("food");
        food = { x: Math.floor(Math.random() * rows), y: Math.floor(Math.random() * cols) }
        blocks[`${food.x},${food.y}`].classList.add("food");
        snake.unshift(head);
        score++;
        scoreElement.innerText = score;
        //highscore feature
        if (score > highScore) {
            highScore = score;
            localStorage.setItem('highScore', highScore.toString());
            highScoreElement.innerText = highScore;
        }
    }

    //game over condition 
    if (head.x < 0 || head.x >= rows || head.y < 0 || head.y >= cols) {
        clearInterval(intervalId);
        clearInterval(timerIntervalId)
        modal.style.display = "flex"
        startGameModal.style.display = "none";
        gameOverModal.style.display = "flex";
        highScoreElement.innerText = highScore;
        time = "00:00";
        timeElement.innerText = time;
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
    if (e.key === "ArrowLeft" && direction !== "right") {
        direction = "left";
    }
    else if (e.key === "ArrowRight" && direction !== "left") {
        direction = "right";
    }
    else if (e.key === "ArrowUp" && direction !== "down") {
        direction = "up";
    }
    else if (e.key === "ArrowDown" && direction !== "up") {
        direction = "down";
    }
})

// startTimer function logic 
const startTimer = () => {
    timerIntervalId = setInterval(() => {
        let [min, sec] = time.split(":").map(Number)
        if (sec == 59) {
            min += 1;
            sec = 0;
        } else {
            sec += 1;
        }
        time = `${String(min).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
        timeElement.innerText = time;
    }, 1000)
}


//start the game
startButton.addEventListener("click", () => {
    modal.style.display = "none"
    intervalId = setInterval(() => {
        render();
    }, 300)
    startTimer();
})

//restart the game

const restartGame = () => {
    clearInterval(intervalId);
    clearInterval(timerIntervalId)
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
    score = 0;
    time = `00:00`
    timeElement.innerText = time;
    scoreElement.innerText = score;
    startTimer();
}

restartButton.addEventListener("click", restartGame)
