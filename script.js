const tileSize = 100;
const tilesArray = Array.from({ length: 15 }, (_, i) => i + 1);
tilesArray.push(0); // empty tile
let emptyIndex = 15;
let moveCount = 0;

function updateMoveCounter() {
  document.getElementById('move-counter').textContent = `Moves: ${moveCount}`;
}

function isAdjacent(a, b) {
  const rowA = Math.floor(a / 4), colA = a % 4;
  const rowB = Math.floor(b / 4), colB = b % 4;
  return (Math.abs(rowA - rowB) === 1 && colA === colB) ||
         (Math.abs(colA - colB) === 1 && rowA === rowB);
}

function handleTileClick(index) {
  if (isAdjacent(index, emptyIndex)) {
    tilesArray[emptyIndex] = tilesArray[index];
    tilesArray[index] = 0;
    emptyIndex = index;
    moveCount++;
    updateMoveCounter();
    renderTiles();

    if (isSolved()) {
      document.getElementById('message').style.display = 'block';
    }
  }
}

function isSolved() {
  for (let i = 0; i < tilesArray.length - 1; i++) {
    if (tilesArray[i] !== i + 1) return false;
  }
  return true;
}

function renderTiles() {
  const container = document.getElementById('puzzle-container');
  container.innerHTML = '';
  tilesArray.forEach((value, index) => {
    const tile = document.createElement('div');
    tile.className = value === 0 ? 'tile empty' : 'tile';
    tile.textContent = value !== 0 ? value : '';
    tile.addEventListener('click', () => handleTileClick(index));

    const row = Math.floor(index / 4);
    const col = index % 4;
    tile.style.top = `${row * tileSize}px`;
    tile.style.left = `${col * tileSize}px`;

    container.appendChild(tile);
  });
}

function shuffleTiles() {
  for (let i = 0; i < 1000; i++) {
    const possibleMoves = [];
    const row = Math.floor(emptyIndex / 4);
    const col = emptyIndex % 4;

    if (row > 0) possibleMoves.push(emptyIndex - 4);
    if (row < 3) possibleMoves.push(emptyIndex + 4);
    if (col > 0) possibleMoves.push(emptyIndex - 1);
    if (col < 3) possibleMoves.push(emptyIndex + 1);

    const move = possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
    [tilesArray[emptyIndex], tilesArray[move]] = [tilesArray[move], tilesArray[emptyIndex]];
    emptyIndex = move;
  }

  moveCount = 0;
  updateMoveCounter();
  document.getElementById('message').style.display = 'none';
  renderTiles();
}

document.getElementById('shuffle-btn').addEventListener('click', shuffleTiles);

document.getElementById('about-btn').addEventListener('click', () => {
  const aboutBox = document.getElementById('about-box');
  aboutBox.classList.toggle('hidden');
});

shuffleTiles();

const aboutBtn = document.getElementById("about-btn");
const modal = document.getElementById("about-modal");
const closeBtn = document.getElementById("close-about");

aboutBtn.addEventListener("click", () => {
  modal.style.display = "block";
});

closeBtn.addEventListener("click", () => {
  modal.style.display = "none";
});

window.addEventListener("click", (event) => {
  if (event.target === modal) {
    modal.style.display = "none";
  }
});

