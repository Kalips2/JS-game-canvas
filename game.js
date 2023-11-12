let canvas, ctx;
let snake;
let food;
let score;

const canvasSize = 400;
const gridSize = 20;

function init() {
    canvas = document.getElementById("gameCanvas");
    ctx = canvas.getContext("2d");

    snake = new Snake();
    food = createFood();
    score = 0;

    setInterval(update, 100);
}

function update() {
    ctx.clearRect(0, 0, canvasSize, canvasSize);

    snake.move();
    snake.draw();

    drawFood();

    checkCollision();
}

function createFood() {
    const foodX = Math.floor(Math.random() * (canvasSize / gridSize)) * gridSize;
    const foodY = Math.floor(Math.random() * (canvasSize / gridSize)) * gridSize;

    return { x: foodX, y: foodY };
}

function drawFood() {
    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, gridSize, gridSize);
}

function checkCollision() {
    if (snake.x < 0 || snake.y < 0 || snake.x >= canvasSize || snake.y >= canvasSize || snake.checkCollision()) {
        alert("Гра закінчена. Рахунок: " + score);
        init();
    }

    if (snake.x === food.x && snake.y === food.y) {
        food = createFood();
        score++;
    }

    drawScore();
}

document.addEventListener("keydown", (event) => {
    snake.changeDirection(event.key);
});

function drawScore() {
    ctx.fillStyle = "black";
    ctx.font = "20px Arial";
    ctx.fillText("Очки: " + score, 10, 30);
}

class Snake {
    constructor() {
        this.x = 0;
        this.y = 0;
        this.direction = "right";
        this.body = [];
    }

    move() {
        let newHead = { x: this.x, y: this.y };

        switch (this.direction) {
            case "up":
                newHead.y -= gridSize;
                break;
            case "down":
                newHead.y += gridSize;
                break;
            case "left":
                newHead.x -= gridSize;
                break;
            case "right":
                newHead.x += gridSize;
                break;
        }

        this.body.unshift(newHead);

        // Перевірка, чи є новий рух дозволений (чи змійка не врізається в себе)
        if (!this.checkCollision(newHead.x, newHead.y)) {
            this.x = newHead.x;
            this.y = newHead.y;
        } else {
            // Якщо є колізія, гра закінчується
            alert("Гра закінчена. Рахунок: " + score);
            init();
        }

        // Видалення хвоста, якщо змійка не з'їла їжу
        if (this.body.length > score) {
            this.body.pop();
        }
    }

    draw() {
        ctx.fillStyle = "green";
        for (let i = 0; i < this.body.length; i++) {
            ctx.fillRect(this.body[i].x, this.body[i].y, gridSize, gridSize);
        }
    }

    checkCollision() {
        for (let i = 0; i < this.body.length; i++) {
            if (this.body[i].x === this.x && this.body[i].y === this.y) {
                return true;
            }
        }
        return false;
    }

    changeDirection(key) {
        switch (key) {
            case "ArrowUp":
                this.direction = "up";
                break;
            case "ArrowDown":
                this.direction = "down";
                break;
            case "ArrowLeft":
                this.direction = "left";
                break;
            case "ArrowRight":
                this.direction = "right";
                break;
        }
    }
}

window.onload = init;
