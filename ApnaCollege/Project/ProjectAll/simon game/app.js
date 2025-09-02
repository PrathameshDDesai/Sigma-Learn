let gameSeq = [];
let userSeq = [];

let started = false;
let level = 0;
let highScore = 0; // Track all-time high score

const h2 = document.querySelector('h2');
const btns = ['red', 'blue', 'green', 'yellow'];

let currentSound = null; // Track the currently playing sound

// Start game on keypress
document.addEventListener('keypress', function () {
    if (!started) {
        console.log('Game started!');
        started = true;
        levelUp();
    }
});

// Increase level and show next color
function levelUp() {
    userSeq = []; // Reset user sequence
    level++;
    h2.innerText = `Level ${level} | High Score: ${highScore}`;

    // Generate random button
    const randIdx = Math.floor(Math.random() * 4);
    const randColor = btns[randIdx];
    gameSeq.push(randColor);

    btnFlash(randColor);
    playSound(randColor);
}

// Flash effect only on the button for 300ms
function btnFlash(color, duration = 300) {
    const btn = document.getElementById(color);
    if (!btn) return;

    btn.classList.add('flash');
    setTimeout(() => {
        btn.classList.remove('flash');
    }, duration);
}

// Play sound for specific color (stops previous sound first)
function playSound(color) {
    if (currentSound) {
        currentSound.pause();
        currentSound.currentTime = 0;
    }
    currentSound = new Audio(`sounds/${color}.mp3`);
    currentSound.play();
}

// Add click event to all buttons
btns.forEach(color => {
    const btn = document.getElementById(color);
    btn.addEventListener('click', function () {
        userSeq.push(color);
        playSound(color);
        btnFlash(color);
        checkAnswer(userSeq.length - 1);
    });
});

// Check user's answer
function checkAnswer(currentLevel) {
    if (userSeq[currentLevel] === gameSeq[currentLevel]) {
        if (userSeq.length === gameSeq.length) {
            setTimeout(levelUp, 1000);
        }
    } else {
        gameOver();
    }
}

// Game over function
function gameOver() {
    if (level - 1 > highScore) {
        highScore = level - 1;
    }

    h2.innerText = `Game Over! Press any key to restart. High Score: ${highScore}`;

    if (currentSound) {
        currentSound.pause();
        currentSound.currentTime = 0;
    }

    currentSound = new Audio('sounds/wrong.mp3');
    currentSound.play();

    document.body.style.backgroundColor = 'red';
    setTimeout(() => {
        document.body.style.backgroundColor = '';
    }, 200);

    resetGame();
}

// Reset game variables
function resetGame() {
    started = false;
    gameSeq = [];
    level = 0;
}
