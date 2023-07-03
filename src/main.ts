import { cloneDeep } from "lodash";

const gameMap: number[][] = [];

for (let line = 0; line < 9; line++) {
  gameMap[line] = [];

  for (let column = 0; column < 9; column++) {
    gameMap[line][column] = 0;
  }
}

console.log({ initiaLGameMap: cloneDeep(gameMap) });

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

for (let line = 0; line < 9; line++) {
  for (let column = 0; column < 9; column++) {
    const currentNumbers = cloneDeep(NUMBERS);

    removeByLine(column, currentNumbers);
    removeByColumn(line, currentNumbers);
    removeByZone(line, column, currentNumbers);

    console.log({ line, column, currentNumbers2: cloneDeep(currentNumbers) });

    gameMap[line][column] = currentNumbers[0] ?? "--";
  }
}

console.log({ gameMap });

document.addEventListener("DOMContentLoaded", () => {
  const domGame = document.querySelector("#game") as HTMLTableElement;

  for (let line = 0; line < 9; line++) {
    const domRow = domGame.insertRow(line);

    for (let column = 0; column < 9; column++) {
      const domCell = domRow.insertCell(column);

      domCell.innerHTML += gameMap[line][column];
    }
  }
});

// DADO UMA POSICAO
// - PROUCRAR NA LINHA
// - PROCURAR NA COLUNA
// - PROCURAR NA ZONA

// https://pt.wikipedia.org/wiki/Algoritmo_de_sudoku#:~:text=O%20algoritmo%20de%20sudoku%20consiste,ligadas%20a%20%C3%A1rea%20de%20exatas.
