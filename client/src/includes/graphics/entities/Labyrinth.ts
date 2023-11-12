import { Room } from './Room';
import { Vector } from 'p5';
import { BoundingBox, Entity, Style, VoidShape } from '#includes/graphics';

export class Labyrinth extends Entity {
  private readonly rooms: ReadonlyArray<ReadonlyArray<Room>>;
  private readonly size: Vector = new Vector();
  private readonly roomSize: Vector = new Vector();
  private readonly segments: Vector = new Vector();

  public constructor(size: Vector, segments: Vector, style?: Style) {
    super(new VoidShape(), style);

    const roomSize = this.p.createVector();
    const config = this.createConfig(segments);
    this.rooms = config.map((rowConfig) =>
      rowConfig.map((roomConfig) => new Room(roomSize, roomConfig, style)),
    );

    this.segments.set(segments);

    this.setSize(size);
  }

  public setSize(size: Vector): void {
    this.size.set(size);

    this.applySize();
  }

  public getSegments(): Vector {
    return this.segments;
  }

  private applySize(): void {
    const { size, segments, roomSize } = this;

    roomSize.set(size.copy().div(segments));

    this.rooms.forEach((row, rowIndex) =>
      row.forEach((room, columnIndex) => {
        room.setSize(roomSize);
        room.setPosition(rowIndex * roomSize.x, columnIndex * roomSize.y);
      }),
    );
  }

  public override setStyle(style: Style) {
    super.setStyle(style);
    this.rooms.forEach((row) => row.forEach((room) => room.setStyle(style)));
  }

  public getSize(): Vector {
    return this.size;
  }

  public getRoomSize(): Vector {
    return this.roomSize;
  }

  public override draw(): void {
    const { p, position } = this;

    p.push();
    p.translate(position);
    this.rooms.forEach((row) => row.forEach((room) => room.draw()));
    p.pop();
  }

  public override isInside(point: Vector): boolean {
    const { p, size } = this;

    const boundingBox = new BoundingBox(p.createVector(), size);

    return boundingBox.isInside(point);
  }

  //

  private createConfig(size: Vector): Vector4b[][] {
    const { x: numberOfRows, y: numberOfColumns } = size;

    const totalCells = numberOfColumns * numberOfRows;

    const cells: Vector4b[][] = [];
    const unvis: boolean[][] = [];
    for (let y = 0; y < numberOfRows; y++) {
      cells[y] = [];
      unvis[y] = [];
      for (let x = 0; x < numberOfColumns; x++) {
        cells[y][x] = [true, true, true, true];
        unvis[y][x] = true;
      }
    }

    let currentCell = [
      Math.floor(Math.random() * numberOfRows),
      Math.floor(Math.random() * numberOfColumns),
    ];
    const path = [currentCell];
    unvis[currentCell[0]][currentCell[1]] = false;

    let visited = 1;
    while (visited < totalCells) {
      const pot: Vector4n[] = [
        [currentCell[0] - 1, currentCell[1], 0, 2],
        [currentCell[0], currentCell[1] + 1, 1, 3],
        [currentCell[0] + 1, currentCell[1], 2, 0],
        [currentCell[0], currentCell[1] - 1, 3, 1],
      ];
      const neighbors: Vector4n[] = [];

      for (let l = 0; l < 4; l++) {
        if (
          pot[l][0] > -1 &&
          pot[l][0] < numberOfRows &&
          pot[l][1] > -1 &&
          pot[l][1] < numberOfColumns &&
          unvis[pot[l][0]][pot[l][1]]
        ) {
          neighbors.push(pot[l]);
        }
      }

      if (neighbors.length) {
        const next = neighbors[Math.floor(Math.random() * neighbors.length)];

        cells[currentCell[0]][currentCell[1]][next[2]] = false;
        cells[next[0]][next[1]][next[3]] = false;

        unvis[next[0]][next[1]] = false;
        visited++;
        currentCell = [next[0], next[1]];
        path.push(currentCell);
      } else {
        currentCell = path.pop()!;
      }
    }

    cells.forEach((row) => row.forEach((cell) => cell.reverse()));

    return cells;
  }
}
