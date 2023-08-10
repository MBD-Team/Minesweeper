const gameMap = [];
const mapHeight = 7;
const mapWidth = 9;
//------------------------
function game() {
  generateField();
  generateBomb();
  showState();
  console.log(gameMap.map(e => e.map(t => t.test)));
}
function generateField() {
  for (let i = 0; i < mapHeight; i++) {
    const rowY = [];
    for (let k = 0; k < mapWidth; k++) {
      const field = {
        isBomb: false,
        isFlag: false,
        isOpen: false,
        test: 'O',
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
        gameMap[i][k].test = 'X';
      } else {
        gameMap[i][k].test = 'O';
      }
    }
  }
}
//----------------------------
game();
