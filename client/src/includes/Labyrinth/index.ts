import {Vector} from 'p5';

type Cell = [number, number, number, number]

export class Labyrinth {
  public readonly maze: Cell[][];

  public constructor(size: Vector) {
    this.maze = this.newMaze(size);
  }

  private newMaze({x, y}: Vector): Cell[][] {
    // Установите переменные и стартовую сетку
    const totalCells = x * y;
    const cells: Cell[][] = [];
    const unvisited: boolean[][] = [];
    for (let i = 0; i < y; i++) {
      cells[i] = [];
      unvisited[i] = [];
      for (let j = 0; j < x; j++) {
        cells[i][j] = [0, 0, 0, 0];
        unvisited[i][j] = true;
      }
    }

    // Установите случайную позицию, чтобы начать с
    const currentCell: Vector = new Vector(
      Math.floor(Math.random() * y),
      Math.floor(Math.random() * x),
    );
    const path = [currentCell];
    unvisited[currentCell.x][currentCell.y] = false;
    let visited = 1;

    // Перебрать все доступные позиции ячеек
    while (visited < totalCells) {
      // Определить соседние ячейки
      const pot: Cell[] = [
        [currentCell.x - 1, currentCell.y, 0, 2],
        [currentCell.x, currentCell.y + 1, 1, 3],
        [currentCell.x + 1, currentCell.y, 2, 0],
        [currentCell.x, currentCell.y - 1, 3, 1],
      ];
      const neighbors: Cell[] = [];

      // Определите, находится ли каждая соседняя ячейка в игровой сетке и проверена ли она уже
      for (let l = 0; l < 4; l++) {
        if (
          pot[l][0] > -1 &&
          pot[l][0] < y &&
          pot[l][1] > -1 &&
          pot[l][1] < x &&
          unvisited[pot[l][0]][pot[l][1]]
        ) {
          neighbors.push(pot[l]);
        }
      }

      // Если найдена хотя бы одна активная соседняя ячейка
      if (neighbors.length) {
        // Выберите случайным образом одного из соседей
        const next = neighbors[Math.floor(Math.random() * neighbors.length)];

        // Удалить стену между текущей ячейкой и выбранной соседней ячейкой
        cells[currentCell.x][currentCell.y][next[2]] = 1;
        cells[next[0]][next[1]][next[3]] = 1;

        // Отметьте соседа как посещенного и установите его в качестве текущей ячейки.
        unvisited[next[0]][next[1]] = false;
        visited++;
        currentCell.set(next[0], next[1]);
        path.push(currentCell);
      }
      // В противном случае вернитесь на шаг назад и продолжайте идти.
      else {
        const prev = path.pop();
        currentCell.set(prev!);
      }
    }

    return cells;
  }
}