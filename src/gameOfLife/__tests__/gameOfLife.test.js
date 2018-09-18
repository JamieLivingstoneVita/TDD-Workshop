import {
  addLiveCellsToBoard,
  createBoard,
  liveNeighboursCount,
  regenerate
} from "../gameOfLife_Final";

/*
Game rules:
1.) Living cells die if they have fewer than 2 neighbours (underpopulation)
2.) Living cells die if they have more than 3 neighbours (overpopulation)
3.) Dead cells that have 3 neighbours become alive (reproduction)
4.) Otherwise, there is not change (whether cell is alive or dead)
*/

// Test helpers
const cellState = {
  dead: 0,
  alive: 1
};

// Tests
describe("game of life", () => {
  describe("create board", () => {
    it("should return an array", () => {
      // Act
      const board = createBoard(10);

      // Assert
      const isArray = Array.isArray(board);
      expect(isArray).toBeTruthy();
    });

    it("should create a board of the given size", () => {
      // Arrange
      const boardSize = 10;

      // Act
      const board = createBoard(boardSize);

      // Assert
      expect(board.length).toEqual(boardSize); // Assert Rows are created
      expect(board[0].length).toEqual(boardSize); // Assert columns are created within each row
    });

    it("should initialize all cells to the value zero", () => {
      // Act
      const board = createBoard(5);

      // Assert
      expect(board[0][0]).toEqual(0); // Check the first cell is equal to zero
      board.forEach(row =>
        row.forEach(cell => expect(cell).toEqual(cellState.dead))
      );
    });
  });

  describe("addLiveCellsToBoard", () => {
    it("should return an array", () => {
      // Arrange
      const board = createBoard(5);

      // Act
      const result = addLiveCellsToBoard(board, []);

      // Assert
      const isArray = Array.isArray(result);
      expect(isArray).toBeTruthy();
    });

    it("should map over coordinates and make the cell value to alive", () => {
      // Arrange
      const board = createBoard(10);
      const coordinates = [[0, 0], [2, 2], [5, 9]];

      // Act
      const result = addLiveCellsToBoard(board, coordinates);

      // Assert
      expect(result[1][1]).toEqual(cellState.dead);
      expect(result[0][3]).toEqual(cellState.dead);

      expect(result[0][0]).toEqual(cellState.alive);
      expect(result[2][2]).toEqual(cellState.alive);
      expect(result[5][9]).toEqual(cellState.alive);
    });
  });

  describe("liveNeighboursCount", () => {
    it("should return 0 if a cell has no live neighbours", () => {
      // Arrange
      const board = createBoard(10);
      const boardWithCells = addLiveCellsToBoard(board, []);

      // Act
      const result = liveNeighboursCount(boardWithCells, 2, 2);

      // Assert
      expect(result).toEqual(0);
    });

    it("should return the live neighbours count", () => {
      // Arrange
      const board = createBoard(10);
      const cells = [[2, 2], [2, 3], [2, 1], [1, 2]];
      const boardWithCells = addLiveCellsToBoard(board, cells);

      // Act
      const result = liveNeighboursCount(boardWithCells, 2, 2);

      // Assert
      expect(result).toEqual(3); // Cell to the right, left and top left
    });
  });

  describe("regenerate", () => {
    it("should update cell values based on the game rules", () => {
      // Arrange
      /*
        Before
        [0, 1, 0, 1]
        [0, 0, 1, 0]
        [0, 1, 0, 1]
        [0, 0, 0, 0]

        After
        [0, 0, 1, 0]
        [0, 1, 0, 1]
        [0, 0, 1, 0]
        [0, 0, 0, 0]
    */
      const board = createBoard(4);
      const cells = [[0, 1], [0, 3], [1, 2], [2, 1], [2, 3]];
      const expected = [[0, 0, 1, 0], [0, 1, 0, 1], [0, 0, 1, 0], [0, 0, 0, 0]];
      const boardWithCells = addLiveCellsToBoard(board, cells);

      // Act
      const result = regenerate(boardWithCells);

      // Assert
      expect(result).toEqual(expect.arrayContaining(expected));
    });
  });
});
