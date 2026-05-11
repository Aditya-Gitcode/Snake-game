const restartBtn = document.getElementById("restart");
const scoreText = document.getElementById("score");

let score = 0;

let direction = 1;

// CREATE BOARD
let board = document.getElementById("board");
for(let i = 0; i < 400; i++){
    let cell = document.createElement("div");
    cell.classList.add("cell");
    board.append(cell);
}

// SELECT CELLS
const cells = document.querySelectorAll(".cell");

// CREATE FOOD
let food = Math.floor(Math.random() * 400);
cells[food].classList.add("food");

// SNAKE START POSITION
let snake = [46,45,44];

// DRAW SNAKE
function drawSnake(){
    cells.forEach((cell) => { cell.classList.remove("snake"); });
    snake.forEach((position) => { cells[position].classList.add("snake"); });
}

// MOVE SNAKE
function snakeMove(){
    let head = snake[0] + direction;

    // WALL COLLISION
    if(
        head < 0 ||
        head >= cells.length ||
        (direction === 1 && snake[0] % 20 === 19) ||
        (direction === -1 && snake[0] % 20 === 0)
    ){
        alert("Game Over");
        clearInterval(game);
        restartBtn.style.display = "block";
        return;
    }

    // SELF COLLISION
    if(snake.includes(head)){
        alert("Game Over");
        clearInterval(game);
        restartBtn.style.display = "block";
        return;
    }

    // MOVE SNAKE
    snake.unshift(head);

    // FOOD COLLISION
    if(head === food){
        cells[food].classList.remove("food");
        food = Math.floor(Math.random() * cells.length);
        cells[food].classList.add("food");
        score++;
        scoreText.innerText = score;
    }else{
        snake.pop();
    }
    drawSnake();
}

// START GAME
const game = setInterval(snakeMove, 200);

// KEYBOARD CONTROLS
document.addEventListener("keydown", function(event){
    if(event.key === "ArrowRight"){
        direction = 1;
    }
    if(event.key === "ArrowLeft"){
        direction = -1;
    }
    if(event.key === "ArrowUp"){
        direction = -20;
    }
    if(event.key === "ArrowDown"){
        direction = 20;
    }
});

// RESTART BUTTON
restartBtn.addEventListener("click", () => {
    location.reload();
});