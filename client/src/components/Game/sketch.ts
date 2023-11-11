import { Figure, Walls } from '#includes/graphics';
import { Labyrinth } from '#includes/Labyrinth';
import { Sketch } from '#components/P5Canvas';

export const sketch = (p: P5Type): Sketch => {
  let rows!: Figure[][];
  const cellSize = p.createVector(70, 70);
  const labyrinthSize = p.createVector(10, 10);

  return {
    setup: () => {
      p.colorMode(p.HSL, 1, 1, 1, 1);
      p.strokeJoin(p.ROUND);

      const { maze } = new Labyrinth(labyrinthSize);
      rows = maze.map((row) =>
        row.map((cell) => {
          return new Figure(
            new Walls(cellSize, {
              top: cell[3] === 0,
              right: cell[2] === 0,
              bottom: cell[1] === 0,
              left: cell[0] === 0,
            }),
          );
        }),
      );

      const color = p.color(p.random(), 0.5, 0.5, 1);
      for (let x = 0; x < rows.length; x++) {
        for (let y = 0; y < rows[x].length; y++) {
          rows[x][y].setStyle({ strokeWidth: 4, stroke: color });
          rows[x][y].setPosition(p.createVector(x, y).mult(cellSize));
        }
      }
    },
    draw: () => {
      const m = p.createVector(p.mouseX, p.mouseY); //.sub(hs);
      p.clear(0, 0, 0, 0);

      p.push();
      p.strokeWeight(2);
      p.stroke(p.color('purple'))
      p.beginShape(p.LINES);
      for (let x = 0; x < rows.length; x++) {
        for (let y = 0; y < rows[x].length; y++) {
          rows[x][y].drawVertices(p.createVector(x, y).mult(cellSize));
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
