let gameMap = [];
const mapHeight = 9;
const mapWidth = 15;
//------------------------
function game() {
  gameMap = [];
  generateField();
  generateBomb();
  showState();
  render();
}
game();
function generateField() {
  for (let i = 0; i < mapHeight; i++) {
    const rowY = [];
    for (let k = 0; k < mapWidth; k++) {
      const field = {
        isBomb: false,
        isFlag: false,
        isOpen: false,
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

function render() {
  const gameField = document.querySelector('.field');
  if (gameField !== null) {
    gameField.innerHTML = '';
  }
  gameField?.setAttribute('style', `grid-template-columns: repeat(${mapWidth},1fr); width: ${50 * mapWidth}px;`);
  for (let y = 0; y < mapWidth; y++) {
    for (let x = 0; x < mapHeight; x++) {
      const tile = document.createElement('div');
      tile.className = 'tile';
      tile.onclick = () => tileClick(x, y, tile);
      tile.oncontextmenu = e => {
        e.preventDefault();
        placeFlag(x, y);
      };
      gameField?.appendChild(tile);
      if (gameMap[x][y].isOpen === true) {
        if (gameMap[x][y].isBomb === true) {
          tile.innerHTML = '💣';
        } else {
          tile.innerHTML = `${countBombs(4, 7)}`;
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

function tileClick(yIndex, xIndex, tile) {
  if (gameMap[yIndex][xIndex].isBomb === true) {
    lost(yIndex, xIndex);
  }
  if (gameMap[yIndex][xIndex].isFlag === true) {
    return;
  } else {
    if (gameMap[yIndex][xIndex].isOpen === false) {
      gameMap[yIndex][xIndex].isOpen = true;
      tile.setAttribute('style', `background-color: grey;`);
      render();
    }
  }
}

function placeFlag(yIndex, xIndex) {
  if (gameMap[yIndex][xIndex].isFlag === false) {
    gameMap[yIndex][xIndex].isFlag = true;
  } else {
    gameMap[yIndex][xIndex].isFlag = false;
  }
  render();
}

function lost(yIndex, xIndex) {
  if (gameMap[yIndex][xIndex].isBomb === true) {
    game();
    // const restart = document.createElement('button');
  }
}
