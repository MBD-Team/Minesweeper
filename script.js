let gameMap = [];
const width = 15;
const height = 9;
//------------------------
function game() {
  gameMap = [];
  generateField();
  generateBomb();
  render();
}
game();
function generateField() {
  for (let i = 0; i < width; i++) {
    const rowY = [];
    for (let k = 0; k < height; k++) {
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
  for (let i = 0; i < width; i++) {
    gameMap[i][Math.round(Math.random() * (height - 1))].isBomb = true;
  }
  gameMap[Math.floor(width / 2)][Math.floor(height / 2)].isBomb = false;
}

function countBombs(y, x) {
  let numberOfBombs = 0;
  if (gameMap[y + 1]?.[x]?.isBomb === true) {
    numberOfBombs++;
  }
  if (gameMap[y - 1]?.[x]?.isBomb === true) {
    numberOfBombs++;
  }
  if (gameMap[y]?.[x + 1]?.isBomb === true) {
    numberOfBombs++;
  }
  if (gameMap[y]?.[x - 1]?.isBomb === true) {
    numberOfBombs++;
  }
  if (gameMap[y + 1]?.[x + 1]?.isBomb === true) {
    numberOfBombs++;
  }
  if (gameMap[y - 1]?.[x + 1]?.isBomb === true) {
    numberOfBombs++;
  }
  if (gameMap[y - 1]?.[x - 1]?.isBomb === true) {
    numberOfBombs++;
  }
  if (gameMap[y + 1]?.[x - 1]?.isBomb === true) {
    numberOfBombs++;
  }

  return numberOfBombs;
}

function render() {
  const gameField = document.querySelector('.field');
  if (gameField !== null) {
    gameField.innerHTML = '';
  }
  gameField?.setAttribute('style', `grid-template-columns: repeat(${width},1fr); width: ${50 * width}px;`);
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
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
          tile.innerHTML = `${countBombs(x, y)}`;
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
  if (gameMap[yIndex][xIndex].isFlag === true) {
    return;
  }
  if (gameMap[yIndex][xIndex].isBomb === true) {
    lost(yIndex, xIndex);
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
    const dialog = document.querySelector('dialog');
    /** @ts-expect-error @type HTMLDialogElement */
    dialog.showModal();
  }
}

function win() {}
