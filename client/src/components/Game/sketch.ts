import {Figure, Line} from '#includes/graphics';
import {Labyrinth} from '#includes/Labyrinth';

export const sketch = (p: P5Type) => {
  const lines: Figure[] = [];

  return {
    setup: () => {
      p.colorMode(p.HSL, 1, 1, 1, 1);

      const cellSize = p.createVector(30, 30);

      const {maze} = new Labyrinth(p.createVector(10, 10));
      maze.forEach((row, rowIndex) => row.forEach((cell, cellIndex) => {
        const x = cellIndex * cellSize.x;
        const y = rowIndex * cellSize.y;

        if (cell[0] === 0) lines.push(new Figure(new Line( // top
          p.createVector(x, y),
          p.createVector(x + cellSize.x, y),
        )));
        if (cell[1] === 0) lines.push(new Figure(new Line( // ri
          p.createVector(x + cellSize.x, y),
          p.createVector(x + cellSize.x, y + cellSize.y),
        )));
        if (cell[2] === 0) lines.push(new Figure(new Line( // bot
          p.createVector(x, y + cellSize.y),
          p.createVector(x + cellSize.x, y + cellSize.y),
        )));
        if (cell[3] === 0) lines.push(new Figure(new Line( // left
          p.createVector(x, y),
          p.createVector(x, y + cellSize.y),
        )));
      }));

      const color = p.color(p.random(), 0.5, 0.5, 1);
      for (let i = 0; i < lines.length; i++) {
        // lines[i].setPosition()
        lines[i].setStyle({strokeWidth: 2, stroke: color});
      }
    },
    draw: () => {
      const m = p.createVector(p.mouseX, p.mouseY);
      p.background(0);

      p.push();
      p.translate(20, 20);
      for (let i = 0; i < lines.length; i++) {
        lines[i].draw();
      }
      p.pop();

      p.push();
      p.stroke(p.color('lime'));
      p.strokeWeight(10);
      p.point(m.x, m.y);
      p.stroke(p.color('black'));
      p.strokeWeight(7);
      p.point(m.x, m.y);
      p.pop();
    },
  };
};