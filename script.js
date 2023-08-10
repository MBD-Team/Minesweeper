const fields = [
  [
    {
      isBomb: false,
      isFlag: false,
      isOpen: false,
    },
    {
      isBomb: true,
      isFlag: true,
      isOpen: false,
    },
    {
      isBomb: true,
      isFlag: true,
      isOpen: false,
    },
  ],
  [
    {
      isBomb: true,
      isFlag: false,
      isOpen: true,
    },
    {
      isBomb: false,
      isFlag: false,
      isOpen: false,
    },
    {
      isBomb: true,
      isFlag: true,
      isOpen: true,
    },
  ],
  [
    {
      isBomb: true,
      isFlag: false,
      isOpen: false,
    },
    {
      isBomb: false,
      isFlag: true,
      isOpen: false,
    },
    {
      isBomb: true,
      isFlag: false,
      isOpen: false,
    },
  ],
];

const gameField = document.querySelector('.field');
function render() {
  for (let y = 0; y < 3; y++) {
    for (let x = 0; x < 3; x++) {
      const tile = document.createElement('div');
      tile.className = 'tile';
      gameField?.appendChild(tile);
      if (fields[x][y].isOpen === true) {
        if (fields[x][y].isBomb === true) {
          tile.innerHTML = '💣';
        } else {
          tile.innerHTML = '1';
        }
      } else if (fields[x][y].isOpen === false) {
        if (fields[x][y].isFlag === true) {
          tile.innerHTML = '🚩';
        } else {
          tile.innerHTML = '';
        }
      }
    }
  }
}

render();
