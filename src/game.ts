import { cloneDeep } from "lodash";

const gameMap: number[][] = [];

for (let line = 0; line < 9; line++) {
  gameMap[line] = [];

  for (let column = 0; column < 9; column++) {
    gameMap[line][column] = 0;
  }
}

const NUMBERS = [1, 2, 3, 4, 5, 6, 7, 8, 9];
type Numbers = typeof NUMBERS;

const ZONES = {
  1: { start: { line: 0, column: 0 }, end: { line: 2, column: 2 } },
  2: { start: { line: 0, column: 3 }, end: { line: 2, column: 5 } },
  3: { start: { line: 0, column: 6 }, end: { line: 2, column: 8 } },
  4: { start: { line: 3, column: 0 }, end: { line: 5, column: 2 } },
  5: { start: { line: 3, column: 3 }, end: { line: 5, column: 5 } },
  6: { start: { line: 3, column: 6 }, end: { line: 5, column: 8 } },
  7: { start: { line: 6, column: 0 }, end: { line: 8, column: 2 } },
  8: { start: { line: 6, column: 3 }, end: { line: 8, column: 5 } },
  9: { start: { line: 6, column: 6 }, end: { line: 8, column: 8 } },
};
type Zone = {
  start: { line: number; column: number };
  end: { line: number; column: number };
};
type ZonesIndex = keyof typeof ZONES;

const removeByLine = (currentColumn: number, currentNumbers: Numbers): void => {
  for (let line = 0; line < 9; line++) {
    if (gameMap[line][currentColumn] === 0) {
      continue;
    }

    const currentIndex = currentNumbers.indexOf(gameMap[line][currentColumn]);

    if (currentIndex > -1) {
      currentNumbers.splice(currentIndex, 1);
    }
  }
};
const removeByColumn = (currentLine: number, currentNumbers: Numbers): void => {
  for (let column = 0; column < 9; column++) {
    if (gameMap[currentLine][column] === 0) {
      continue;
    }

    const currentIndex = currentNumbers.indexOf(gameMap[currentLine][column]);

    if (currentIndex > -1) {
      currentNumbers.splice(currentIndex, 1);
    }
  }
};

const getcurrentZone = (
  currentLine: number,
  currentColumn: number
): Zone | undefined => {
  for (const key in ZONES) {
    const zoneindex = key as unknown as ZonesIndex;

    if (
      currentLine >= ZONES[zoneindex].start.line &&
      currentColumn >= ZONES[zoneindex].start.column &&
      currentLine <= ZONES[zoneindex].end.line &&
      currentColumn <= ZONES[zoneindex].end.column
    ) {
      return ZONES[zoneindex];
    }
  }
};

const removeByZone = (
  currentLine: number,
  currentColumn: number,
  currentNumbers: Numbers
): void => {
  const zone = getcurrentZone(currentLine, currentColumn)!;

  for (let line = zone.start.line; line <= zone.end.line; line++) {
    for (let column = zone.start.column; column <= zone.end.column; column++) {
      const currentIndex = currentNumbers.indexOf(gameMap[line][column]);

      if (currentIndex > -1) {
        currentNumbers.splice(currentIndex, 1);
      }
    }
  }
};

const n = 3;
const lines: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8];
const columns: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8];

function shuffle(array: number[]) {
  let currentIndex = array.length,
    randomIndex;

  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

console.log({ lines, columns });

/********* */
// TA ERRADO ISSO
/********* */

for (const line of shuffle(lines)) {
  for (const column of columns) {
    const currentNumbers = cloneDeep(NUMBERS);

    removeByLine(column, currentNumbers);
    removeByColumn(line, currentNumbers);
    removeByZone(line, column, currentNumbers);

    const originalValue = Math.floor(
      ((line * n + line / n + column) % (n * n)) + 1
      //((line + line / n + column) % (n * n)) + 1
    );

    gameMap[line][column] = currentNumbers.includes(originalValue)
      ? originalValue
      : currentNumbers[0];
  }
}

export default gameMap;
