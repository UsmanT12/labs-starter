import { describe, test, expect } from "vitest";
import { isFull, isLegalMove, getWinner, getBoardStr } from "../src/toDo.ts";

// Remember, you'll need to use "import" to bring in the
// functions you want to test from "../src/toDo.ts"
//
// Use the tests in introFunctions.test.ts as a guide.

describe("isFull", () => {
  test("1", () => {
    expect(
      isFull([
        ["X", "O", "X"],
        ["O", "X", "O"],
        ["O", "X", "O"],
      ]),
    ).toBe(true);
  });
  test("2", () => {
    expect(
      isFull([
        ["X", "O", "X"],
        ["O", null, "O"],
        ["O", "X", "O"],
      ]),
    ).toBe(false);
  });
  test("3", () => {
    expect(
      isFull([
        [null, null, null],
        [null, null, null],
        [null, null, null],
      ]),
    ).toBe(false);
  });
});

describe("isLegalMove", () => {
  test("1", () => {
    expect(
      isLegalMove(
        [
          [null, null, null],
          [null, null, null],
          [null, null, null],
        ],
        1,
        1,
      ),
    ).toBe(true);
  });
  test("2", () => {
    expect(
      isLegalMove(
        [
          ["X", null, null],
          [null, null, null],
          [null, null, null],
        ],
        0,
        0,
      ),
    ).toBe(false);
  });
  test("3", () => {
    expect(
      isLegalMove(
        [
          [null, null, null],
          [null, null, null],
          [null, null, null],
        ],
        3,
        0,
      ),
    ).toBe(false);
  });
});

describe("getWinner", () => {
  test("1", () => {
    expect(
      getWinner([
        ["X", "X", "X"],
        ["O", null, "O"],
        [null, null, null],
      ]),
    ).toBe("X");
  });
  test("2", () => {
    expect(
      getWinner([
        ["O", "X", null],
        ["X", "O", null],
        [null, null, "O"],
      ]),
    ).toBe("O");
  });
  test("3", () => {
    expect(
      getWinner([
        ["X", "O", "X"],
        ["O", null, null],
        [null, null, null],
      ]),
    ).toBe(null);
  });
});

describe("getBoardStr", () => {
  test("1", () => {
    expect(
      getBoardStr([
        [null, null, null],
        [null, null, null],
        [null, null, null],
      ]),
    ).toBe("BOARD - - -\r\n      - - -\r\n      - - -\r\n");
  });
  test("2", () => {
    expect(
      getBoardStr([
        ["X", null, null],
        [null, "X", "O"],
        ["O", null, null],
      ]),
    ).toBe("BOARD X - -\r\n      - X O\r\n      O - -\r\n");
  });
  test("3", () => {
    expect(
      getBoardStr([
        ["X", "O", "X"],
        ["O", "X", "O"],
        ["X", "O", "X"],
      ]),
    ).toBe("BOARD X O X\r\n      O X O\r\n      X O X\r\n");
  });
});
