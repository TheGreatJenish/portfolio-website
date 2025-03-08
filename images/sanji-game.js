let sanji, ground, obstacles, collectibles;
let score = 0;
let gameSpeed = 5;
let isGameOver = false;
let gameStarted = false;

function setup() {
    let canvas = createCanvas(600, 300);
    canvas.parent('game-canvas');
    
    sanji = new Sanji();
    ground = height - 20;
    obstacles = [];
    collectibles = [];
    
    // Initially hide the canvas and score
    document.getElementById('game-canvas').style.display = 'block';
    document.getElementById('game-score').style.display = 'block';
}

function draw() {
    background('#1a3c5e'); // Match website theme
    
    if (!gameStarted) {
        // Show start screen
        textAlign(CENTER, CENTER);
        textSize(32);
        fill(255);
        text('Sanji Runner', width / 2, height / 2 - 20);
        textSize(16);
        text('Click "Start Game" to begin!', width / 2, height / 2 + 20);
        return;
    }

    if (!isGameOver) {
        // Update game speed over time
        gameSpeed += 0.005;
        
        // Update Sanji
        sanji.update();
        sanji.show();
        
        // Update and show obstacles
        for (let i = obstacles.length - 1; i >= 0; i--) {
            obstacles[i].update();
            obstacles[i].show();
            
            // Check for collision
            if (obstacles[i].hits(sanji)) {
                isGameOver = true;
            }
            
            // Remove off-screen obstacles
            if (obstacles[i].offscreen()) {
                obstacles.splice(i, 1);
            }
        }
        
        // Update and show collectibles
        for (let i = collectibles.length - 1; i >= 0; i--) {
            collectibles[i].update();
            collectibles[i].show();
            
            // Check for collection
            if (collectibles[i].collected(sanji)) {
                score += 10;
                document.getElementById('game-score').innerText = `Score: ${score}`;
                collectibles.splice(i, 1);
            }
            
            // Remove off-screen collectibles
            if (collectibles[i].offscreen()) {
                collectibles.splice(i, 1);
            }
        }
        
        // Draw ground
        stroke(255);
        line(0, ground, width, ground);
    } else {
        // Game Over screen
        textAlign(CENTER, CENTER);
        textSize(32);
        fill(255, 0, 0);
        text('Game Over!', width / 2, height / 2);
        textSize(16);
        fill(255);
        text(`Score: ${score}`, width / 2, height / 2 + 30);
        text('Press R to Restart', width / 2, height / 2 + 60);
    }
}

function keyPressed() {
    if (key === ' ' && !sanji.isJumping && gameStarted && !isGameOver) {
        sanji.jump();
    }
    if (key === 'r' && isGameOver) {
        resetGame();
    }
}

function spawnObstacle() {
    if (!isGameOver && gameStarted) {
        obstacles.push(new Obstacle());
    }
}

function spawnCollectible() {
    if (!isGameOver && gameStarted) {
        collectibles.push(new Collectible());
    }
}

function resetGame() {
    score = 0;
    gameSpeed = 5;
    isGameOver = false;
    gameStarted = true;
    obstacles = [];
    collectibles = [];
    sanji = new Sanji();
    document.getElementById('game-score').innerText = `Score: ${score}`;
    setInterval(spawnObstacle, 1500);
    setInterval(spawnCollectible, 2000);
}

// Start Game Button Logic
document.getElementById('start-game-btn').addEventListener('click', () => {
    if (!gameStarted || isGameOver) {
        gameStarted = true;
        isGameOver = false;
        resetGame();
        document.getElementById('start-game-btn').innerText = 'Restart Game';
    }
});

// Sanji Class
class Sanji {
    constructor() {
        this.x = 50;
        this.y = ground - 40;
        this.width = 30;
        this.height = 40;
        this.velocity = 0;
        this.gravity = 0.6;
        this.lift = -15;
        this.isJumping = false;
    }
    
    update() {
        this.velocity += this.gravity;
        this.y += this.velocity;
        
        if (this.y > ground - this.height) {
            this.y = ground - this.height;
            this.velocity = 0;
            this.isJumping = false;
        }
    }
    
    show() {
        fill('#FFD700'); // Sanji's blonde hair color
        rect(this.x, this.y, this.width, this.height);
        fill(0);
        textSize(12);
        text('Sanji', this.x + this.width / 2, this.y + this.height / 2);
    }
    
    jump() {
        this.velocity += this.lift;
        this.isJumping = true;
    }
}

// Obstacle Class (Marine Swords)
class Obstacle {
    constructor() {
        this.x = width;
        this.y = ground - 20;
        this.width = 15;
        this.height = 30;
    }
    
    update() {
        this.x -= gameSpeed;
    }
    
    show() {
        fill('#A9A9A9'); // Silver for swords
        rect(this.x, this.y, this.width, this.height);
        fill(0);
        textSize(10);
        text('Sword', this.x + this.width / 2, this.y + this.height / 2);
    }
    
    offscreen() {
        return this.x < -this.width;
    }
    
    hits(sanji) {
        return (
            sanji.x + sanji.width > this.x &&
            sanji.x < this.x + this.width &&
            sanji.y + sanji.height > this.y
        );
    }
}

// Collectible Class (Meat)
class Collectible {
    constructor() {
        this.x = width;
        this.y = ground - 50;
        this.size = 15;
    }
    
    update() {
        this.x -= gameSpeed;
    }
    
    show() {
        fill('#8B4513'); // Brown for meat
        ellipse(this.x, this.y, this.size);
        fill(0);
        textSize(10);
        text('Meat', this.x, this.y);
    }
    
    offscreen() {
        return this.x < -this.size;
    }
    
    collected(sanji) {
        let d = dist(this.x, this.y, sanji.x + sanji.width / 2, sanji.y + sanji.height / 2);
        return d < this.size + sanji.width / 2;
    }
}