import { cloneDeep } from "lodash";
import gameMap from "./game";

const currentGameMap = cloneDeep(gameMap);

const onClick = (
  domCell: HTMLTableCellElement,
  line: number,
  column: number
) => {
  domCell.addEventListener("click", (event: MouseEvent) => {
    event.stopPropagation;

    const input = parseInt(prompt("Informe o valor:", "0") ?? "0");

    if (input !== gameMap[line][column]) {
      alert("Valor inválido");
      return;
    }

    currentGameMap[line][column] = input;

    domCell.innerHTML = `${currentGameMap[line][column]}`;

    endGame();
  });
};

const endGame = () => {
  const invalidVelue = currentGameMap.some((lines) =>
    lines.some((value) => value === -1)
  );

  if (invalidVelue) {
    return;
  }

  alert("Fim do jogo!");
};

document.addEventListener("DOMContentLoaded", () => {
  const domGame = document.querySelector("#game") as HTMLTableElement;

  for (let line = 0; line < 9; line++) {
    const domRow = domGame.insertRow(line);

    for (let column = 0; column < 9; column++) {
      const columnToHidden = Math.floor(Math.random() * 9);

      const domCell = domRow.insertCell(column);

      if (columnToHidden === column) {
        currentGameMap[line][column] = -1;

        onClick(domCell, line, column);
      }

      domCell.innerHTML = `${
        currentGameMap[line][column] === -1 ? "" : currentGameMap[line][column]
      }`;
    }
  }
});
