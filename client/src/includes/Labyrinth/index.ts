import { Vector } from 'p5';

type Cell = [number, number, number, number];

export class Labyrinth {
  public readonly maze: Cell[][];

  public constructor(size: Vector) {
    this.maze = this.newMaze(size);
  }

  private newMaze({ x, y }: Vector): Cell[][] {
    const totalCells = x * y;
    const cells: Cell[][] = [];
    const unvis: boolean[][] = [];
    for (let i = 0; i < y; i++) {
      cells[i] = [];
      unvis[i] = [];
      for (let j = 0; j < x; j++) {
        cells[i][j] = [0, 0, 0, 0];
        unvis[i][j] = true;
      }
    }

    let currentCell = [
      Math.floor(Math.random() * y),
      Math.floor(Math.random() * x),
    ];
    const path = [currentCell];
    unvis[currentCell[0]][currentCell[1]] = false;

    let visited = 1;
    while (visited < totalCells) {
      const pot: Cell[] = [
        [currentCell[0] - 1, currentCell[1], 0, 2],
        [currentCell[0], currentCell[1] + 1, 1, 3],
        [currentCell[0] + 1, currentCell[1], 2, 0],
        [currentCell[0], currentCell[1] - 1, 3, 1],
      ];
      const neighbors: Cell[] = [];

      for (let l = 0; l < 4; l++) {
        if (
          pot[l][0] > -1 &&
          pot[l][0] < y &&
          pot[l][1] > -1 &&
          pot[l][1] < x &&
          unvis[pot[l][0]][pot[l][1]]
        ) {
          neighbors.push(pot[l]);
        }
      }

      if (neighbors.length) {
        const next = neighbors[Math.floor(Math.random() * neighbors.length)];

        cells[currentCell[0]][currentCell[1]][next[2]] = 1;
        cells[next[0]][next[1]][next[3]] = 1;

        unvis[next[0]][next[1]] = false;
        visited++;
        currentCell = [next[0], next[1]];
        path.push(currentCell);
      } else {
        currentCell = path.pop()!;
      }
    }

    return cells;
  }
}
