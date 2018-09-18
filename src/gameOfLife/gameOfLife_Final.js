const LIVE_CELL = 1;
const DEAD_CELL = 0;

export function createBoard(size) {
  return new Array(size).fill(new Array(size).fill(DEAD_CELL));
}

export function addLiveCellsToBoard(board, coordinates = []) {
  const boardCopy = board.map(row => row.slice(0));
  coordinates.forEach(([x, y]) => (boardCopy[x][y] = LIVE_CELL));
  return boardCopy;
}

export function liveNeighboursCount(board, x, y) {
  const isCellAlive = (x, y) => board[x] && board[x][y] === LIVE_CELL;
  let neighboursCount = 0;

  if (isCellAlive(x - 1, y - 1)) neighboursCount += 1; // Top Left
  if (isCellAlive(x - 1, y)) neighboursCount += 1; // Top
  if (isCellAlive(x - 1, y + 1)) neighboursCount += 1; // Top Right
  if (isCellAlive(x, y + 1)) neighboursCount += 1; // Right
  if (isCellAlive(x + 1, y + 1)) neighboursCount += 1; // Bottom Right
  if (isCellAlive(x + 1, y)) neighboursCount += 1; // Bottom
  if (isCellAlive(x + 1, y - 1)) neighboursCount += 1; // Bottom Left
  if (isCellAlive(x, y - 1)) neighboursCount += 1; // Left

  return neighboursCount;
}

export function regenerate(board) {
  return board.map((row, rowIndex) =>
    row.map((cell, cellIndex) => {
      let neighboursCount = liveNeighboursCount(board, rowIndex, cellIndex);
      let newCellValue;

      if (cell === LIVE_CELL) {
        newCellValue = neighboursCount < 2 || neighboursCount > 3 ? 0 : 1;
      } else {
        newCellValue = neighboursCount === 3 ? 1 : 0;
      }

      return newCellValue;
    })
  );
}
