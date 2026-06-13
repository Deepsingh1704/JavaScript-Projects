const board = document.querySelector(".board");

const blockWidth = 30;
const blockHeight = 30;

const cols = Math.floor(board.clientWidth / blockWidth);
const rows = Math.floor(board.clientHeight / blockHeight);

// Store blocks using x,y coordinates
const blocks = [];

const snake = [
    { x: 3, y: 3 },

];

// Create grid
for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
        const block = document.createElement("div");

        block.classList.add("block");

        // For debugging
        // block.innerText = `${col},${row}`;

        board.appendChild(block);

        // Store using x,y format
        blocks[`${row},${col}`] = block;
    }
}

// Draw snake
const render = () => {
    // Draw current snake
    snake.forEach(segment => {
        blocks[`${segment.x},${segment.y}`].classList.add("fill");
    });
};

// render();

let direction = "up";

// snake print function yy

setInterval(() => {

    let head = null;
    let tail = null;

    if (direction == "left") {

        head = { x: snake[0].x, y: snake[0].y - 1 }
        // tail = { x: snake[length - 1].x, y: snake[0].y }

    } else if (direction == "right") {
        head = { x: snake[0].x, y: snake[0].y + 1 }
    } else if (direction == "up") {
        head = { x: snake[0].x - 1, y: snake[0].y }
    } else if (direction == "down") {
        head = { x: snake[0].x + 1, y: snake[0].y }
    }
    snake.forEach(segment => {
        blocks[`${segment.x},${segment.y}`].classList.remove("fill");
    });

    snake.unshift(head);
    snake.pop();
    // snake.pop(tail);

    render();
}, 500);


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