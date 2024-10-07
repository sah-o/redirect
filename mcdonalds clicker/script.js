// Game state variables
let score = 0;
const costs = { bigMac: 100, nuggets: 500, cursor: 50 };
const upgrades = { bigMac: false, nuggets: false };
let cursorCount = 0;

// Initialize the game
function initGame() {
    // Load saved data
    loadGame();

    // Update score display
    document.getElementById('score').innerText = score;

    // Event listener for clicking cheeseburger
    document.getElementById('cheeseburger').addEventListener('click', () => {
        score++;
        document.getElementById('score').innerText = score;
        saveGame();
        checkUpgrades();
    });

    // Purchase Big Mac
    document.getElementById('bigMacContainer').addEventListener('click', () => {
        if (score >= costs.bigMac && !upgrades.bigMac) {
            score -= costs.bigMac;
            upgrades.bigMac = true;
            document.getElementById('bigMacContainer').style.display = 'none';
            alert('Big Mac unlocked!');
            saveGame();
            checkUpgrades();
        }
    });

    // Purchase Nuggets
    document.getElementById('nuggetsContainer').addEventListener('click', () => {
        if (score >= costs.nuggets && !upgrades.nuggets) {
            score -= costs.nuggets;
            upgrades.nuggets = true;
            document.getElementById('nuggetsContainer').style.display = 'none';
            alert('Nuggets unlocked!');
            saveGame();
            checkUpgrades();
        }
    });

    // Purchase Cursor (automatic clicker)
    document.getElementById('cursorContainer').addEventListener('click', () => {
        if (score >= costs.cursor) {
            score -= costs.cursor;
            cursorCount++;
            costs.cursor = Math.floor(costs.cursor * 1.5); // Increase cost after each purchase
            document.getElementById('cursorCost').innerText = costs.cursor;
            saveGame();
            startCursors();
        }
    });

    // Start cursors if any exist
    if (cursorCount > 0) {
        startCursors();
    }

    // Check for available upgrades
    checkUpgrades();
}

// Check for upgrades and display accordingly
function checkUpgrades() {
    if (score >= costs.bigMac && !upgrades.bigMac) {
        document.getElementById('bigMacContainer').style.display = 'block';
    }
    if (score >= costs.nuggets && !upgrades.nuggets) {
        document.getElementById('nuggetsContainer').style.display = 'block';
    }
}

// Save the game state to local storage
function saveGame() {
    localStorage.setItem('mcdonaldsClicker', JSON.stringify({ score, upgrades, cursorCount, costs }));
}

// Load the game state from local storage
function loadGame() {
    const savedData = JSON.parse(localStorage.getItem('mcdonaldsClicker'));
    if (savedData) {
        score = savedData.score || 0;
        upgrades.bigMac = savedData.upgrades.bigMac || false;
        upgrades.nuggets = savedData.upgrades.nuggets || false;
        cursorCount = savedData.cursorCount || 0;
        costs.cursor = savedData.costs.cursor || 50;
    }
}

// Start automatic clickers
function startCursors() {
    setInterval(() => {
        score += cursorCount;
        document.getElementById('score').innerText = score;
        saveGame();
    }, 1000); // 1 cursor = 1 click per second
}

// Initialize game on page load
window.onload = initGame;
