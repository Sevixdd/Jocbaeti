const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Set canvas dimensions
canvas.width = 800;
canvas.height = 600;

class Player {
    constructor(x, y, radius, color) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }
}

const players = [];
const player1 = new Player(200, canvas.height / 2, 20, 'blue');
const player2 = new Player(600, canvas.height / 2, 20, 'red');

players.push(player1, player2);

function gameLoop() {
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw all players
    players.forEach(player => {
        player.draw();
    });

    // Request the next frame
    requestAnimationFrame(gameLoop);
}

// Start the game loop
gameLoop();

// Game logic will go here