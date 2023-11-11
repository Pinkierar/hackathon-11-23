import { Figure, Cell } from '#includes/graphics';
import { Labyrinth } from '#includes/Labyrinth';
import { Sketch } from '#components/P5Canvas';

export const sketch = (p: P5Type): Sketch => {
  let labyrinth!: Figure[][];
  const cellSize = p.createVector(70, 70);
  const labyrinthSize = p.createVector(10, 10);

  return {
    setup: () => {
      p.colorMode(p.HSL, 1, 1, 1, 1);
      p.strokeJoin(p.ROUND);

      const { rows } = new Labyrinth(labyrinthSize);
      labyrinth = rows.map((cells) =>
        cells.map(
          (cell) =>
            new Cell(cellSize, {
              top: cell[3],
              right: cell[2],
              bottom: cell[1],
              left: cell[0],
            }),
        ),
      );

      const color = p.color(p.random(), 0.5, 0.5, 1);
      for (let x = 0; x < labyrinth.length; x++) {
        for (let y = 0; y < labyrinth[x].length; y++) {
          labyrinth[x][y].setStyle({ strokeWidth: 4, stroke: color });
          labyrinth[x][y].setPosition(p.createVector(x, y).mult(cellSize));
        }
      }
    },
    draw: () => {
      const m = p.createVector(p.mouseX, p.mouseY); //.sub(hs);
      p.clear(0, 0, 0, 0);

      p.push();
      p.strokeWeight(2);
      p.stroke(p.color('purple'));
      p.beginShape(p.LINES);
      for (let x = 0; x < labyrinth.length; x++) {
        for (let y = 0; y < labyrinth[x].length; y++) {
          labyrinth[x][y].drawVertices(p.createVector(x, y).mult(cellSize));
        }
      }
      p.endShape();
      p.pop();

      // for (let x = 0; x < rows.length; x++) {
      //   for (let y = 0; y < rows[x].length; y++) {
      //     rows[x][y].draw();
      //   }
      // }

      p.push();
      p.stroke(p.color('green'));
      p.strokeWeight(4);
      p.point(m.x, m.y);
      p.pop();
    },
  };
};
