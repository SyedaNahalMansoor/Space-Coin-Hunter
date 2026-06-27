let startBtn = document.getElementById("startBtn");
let instructionBtn = document.getElementById("instructionBtn");
let backBtn = document.getElementById("backBtn");
let startScreen = document.getElementById("startScreen");
let instructionScreen = document.getElementById("instructionScreen");
let gameArea = document.getElementById("gameArea");
let score = 0;
let scoreText = document.getElementById("score");
let health = 100;
let healthText = document.getElementById("health");
let gameOverScreen = document.getElementById("gameOverScreen");
let finalScore = document.getElementById("finalScore");
let restartBtn = document.getElementById("restartBtn");

let coinSound = new Audio("./sounds/coin.mp3");
let shootSound = new Audio("./sounds/shoot.mp3");
// let hitSound = new Audio("./sounds/hit.mp3");
// let explosionSound = new Audio("./sounds/explosion.mp3");
let gameOverSound = new Audio("./sounds/gameover.mp3");
// let levelUpSound = new Audio("./sounds/levelup.mp3");
let bgMusic = new Audio("./sounds/background.mp3");
let clickSound = new Audio("./sounds/click.mp3");

bgMusic.loop = true;

bgMusic.volume = 0.3;

function playClickSound() {

    clickSound.currentTime = 0;
    clickSound.play();
}

instructionBtn.addEventListener("click", () => {
    playClickSound();

    startScreen.style.display = "none";
    instructionScreen.style.display = "flex";
});

backBtn.addEventListener("click", () => {
    playClickSound();

    instructionScreen.style.display = "none";
    startScreen.style.display = "flex";
});

startBtn.addEventListener("click", () => {
    playClickSound();

    startScreen.style.display = "none";
    gameArea.style.display = "block";

    bgMusic.play();
    for (let i = 0; i < 5; i++) {

        createCoin();
    }
});

restartBtn.addEventListener("click", () => {

    playClickSound();
    setTimeout(() => {
        location.reload();

    }, 150);

});

let player = document.getElementById("player");

let playerX = 100;
let playerY = 300;

let speed = 8;

let keys = {};

document.addEventListener("keydown", (event) => {

    keys[event.key.toLowerCase()] = true;

});

document.addEventListener("keyup", (event) => {

    keys[event.key.toLowerCase()] = false;

});

function movePlayer() {

    if((keys["w"] || keys["arrowup"]) && playerY > 0){

    playerY -= speed;

}

if((keys["s"] || keys["arrowdown"]) && playerY < window.innerHeight - 70){

    playerY += speed;

}

if((keys["a"] || keys["arrowleft"]) && playerX > 0){

    playerX -= speed;

}

if((keys["d"] || keys["arrowright"]) && playerX < window.innerWidth - 70){

    playerX += speed;

}

    player.style.left = playerX + "px";

    player.style.top = playerY + "px";

    let coins = document.querySelectorAll(".coin");

    coins.forEach((coin) => {

        let playerRect =
            player.getBoundingClientRect();

        let coinRect =
            coin.getBoundingClientRect();

        if (

            playerRect.left < coinRect.right &&
            playerRect.right > coinRect.left &&
            playerRect.top < coinRect.bottom &&
            playerRect.bottom > coinRect.top

        ) {

            coin.remove();

            score += 20;

            coinSound.currentTime = 0;
            coinSound.play();

            scoreText.innerHTML =
                "Score : " + score;

        }

    });

    requestAnimationFrame(movePlayer);

}

movePlayer();

document.addEventListener("keydown", (event) => {

    if (event.code === "Space") {

        createBullet();



        shootSound.currentTime = 0;
        shootSound.play();

    }

});

function createBullet() {

    let bullet = document.createElement("div");

    bullet.classList.add("bullet");

    bullet.style.left = playerX + 60 + "px";

    bullet.style.top = playerY + 32 + "px";

    gameArea.appendChild(bullet);

    let bulletMove = setInterval(() => {

        let bulletLeft = parseInt(bullet.style.left);

        bullet.style.left = bulletLeft + 12 + "px";

        let enemies =
            document.querySelectorAll(".enemy");

        enemies.forEach((enemy) => {

            let bulletRect =
                bullet.getBoundingClientRect();

            let enemyRect =
                enemy.getBoundingClientRect();

            if (

                bulletRect.left < enemyRect.right &&
                bulletRect.right > enemyRect.left &&
                bulletRect.top < enemyRect.bottom &&
                bulletRect.bottom > enemyRect.top

            ) {

                bullet.remove();

enemy.style.transform = "scale(2)";

enemy.style.opacity = "0";

enemy.style.transition = ".2s";

explosionSound.currentTime = 0;

explosionSound.play();

setTimeout(()=>{

    enemy.remove();

},180);

score += 10;

scoreText.innerHTML =
"Score : " + score;

clearInterval(bulletMove);

            }

        });

        if (bulletLeft > window.innerWidth) {

            bullet.remove();

            clearInterval(bulletMove);

        }

    }, 20);

}

function createEnemy() {

    let enemy = document.createElement("div");

    enemy.classList.add("enemy");

    enemy.style.left = window.innerWidth + "px";

    enemy.style.top =
        Math.floor(Math.random() * (window.innerHeight - 60))
        + "px";

    gameArea.appendChild(enemy);

    let enemyMove = setInterval(() => {

        let enemyLeft = parseInt(enemy.style.left);

        enemy.style.left = enemyLeft - 5 + "px";

        if (enemyLeft < -60) {

            enemy.remove();

            clearInterval(enemyMove);

        }

        let playerRect =
            player.getBoundingClientRect();

        let enemyRect =
            enemy.getBoundingClientRect();

        if (

            playerRect.left < enemyRect.right &&
            playerRect.right > enemyRect.left &&
            playerRect.top < enemyRect.bottom &&
            playerRect.bottom > enemyRect.top

        ) {

            enemy.remove();

            health = Math.max(0, health - 10);

            healthText.innerHTML =
                "Health : " + health;

                player.style.filter = "brightness(2.5)";

setTimeout(()=>{

    player.style.filter = "drop-shadow(0 0 12px cyan)";

},120);

            clearInterval(enemyMove);

        }

        if (health <= 0) {

            bgMusic.pause();

            gameOverSound.play();
            gameArea.style.display = "none";



            gameOverScreen.style.display = "flex";

            finalScore.innerHTML =
                "Final Score : " + score;

        }

    }, 20);

}

setInterval(() => {

    createEnemy();

}, 700);

function createCoin() {

    let totalCoins =
        document.querySelectorAll(".coin");

    if (totalCoins.length >= 10) {

        return;

    }

    let coin = document.createElement("div");

    coin.classList.add("coin");

    coin.style.left =
        Math.floor(
            Math.random() *
            (window.innerWidth - 40)
        ) + "px";

    coin.style.top =
        Math.floor(
            Math.random() *
            (window.innerHeight - 40)
        ) + "px";

    gameArea.appendChild(coin);

}

setInterval(() => {

    createCoin();

}, 3000);