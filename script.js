const gameMap = [];
const mapHeight = 9;
const mapWidth = 15;
//------------------------
function game() {
  generateField();
  generateBomb();
  showState();
  countBombs(4, 7);
  console.log(gameMap.map(e => e.map(t => t.bombCount)));
}
function generateField() {
  for (let i = 0; i < mapHeight; i++) {
    const rowY = [];
    for (let k = 0; k < mapWidth; k++) {
      const field = {
        isBomb: true,
        isFlag: false,
        isOpen: true,
      };
      const rowX = field;
      rowY.push(rowX);
    }

    gameMap.push(rowY);
  }
}
function generateBomb() {
  for (let i = 0; i < mapHeight; i++) {
    gameMap[i][Math.round(Math.random() * (mapWidth - 1))].isBomb = true;
  }
  gameMap[Math.floor(mapHeight / 2)][Math.floor(mapWidth / 2)].isBomb = false;
}
function showState() {
  for (let i = 0; i < mapHeight; i++) {
    for (let k = 0; k < mapWidth; k++) {
      if (gameMap[i][k].isBomb === true) {
        gameMap[i][k].bombCount = 'X'; //TODO: das muss geändert werden
      } else {
        gameMap[i][k].bombCount = 0;
      }
    }
  }
}

function countBombs(X, Y) {
  let numberOfBombs = 0;
  if (gameMap[Y + 1]?.[X]?.isBomb === true) {
    numberOfBombs++;
  }
  if (gameMap[Y - 1]?.[X]?.isBomb === true) {
    numberOfBombs++;
  }
  if (gameMap[Y]?.[X + 1]?.isBomb === true) {
    numberOfBombs++;
  }
  if (gameMap[Y]?.[X - 1]?.isBomb === true) {
    numberOfBombs++;
  }
  if (gameMap[Y + 1]?.[X + 1]?.isBomb === true) {
    numberOfBombs++;
  }
  if (gameMap[Y - 1]?.[X + 1]?.isBomb === true) {
    numberOfBombs++;
  }
  if (gameMap[Y - 1]?.[X - 1]?.isBomb === true) {
    numberOfBombs++;
  }
  if (gameMap[Y + 1]?.[X - 1]?.isBomb === true) {
    numberOfBombs++;
  }

  return numberOfBombs;
}

//----------------------------
game();
//----------------------------
const gameField = document.querySelector('.field');
gameField?.setAttribute('style', `grid-template-columns: repeat(${mapWidth},1fr); width: ${50 * mapWidth}px;`);
function render() {
  for (let y = 0; y < mapWidth; y++) {
    for (let x = 0; x < mapHeight; x++) {
      const tile = document.createElement('div');
      tile.className = 'tile';
      gameField?.appendChild(tile);
      if (gameMap[x][y].isOpen === true) {
        if (gameMap[x][y].isBomb === true) {
          tile.innerHTML = '💣';
        } else {
          tile.innerHTML = ``;
        }
      } else if (gameMap[x][y].isOpen === false) {
        if (gameMap[x][y].isFlag === true) {
          tile.innerHTML = '🚩';
        } else {
          tile.innerHTML = '';
        }
      }
    }
  }
}

render();
