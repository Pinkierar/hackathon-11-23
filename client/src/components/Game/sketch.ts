import { Labyrinth } from '#includes/graphics';
import { Sketch } from '#components/P5Canvas';

export const sketch = (p: P5Type): Sketch => {
  let labyrinth!: Labyrinth;
  const labyrinthSegments = p.createVector(20, 20);

  return {
    setup: () => {
      p.colorMode(p.HSL, 1, 1, 1, 1);
      p.strokeJoin(p.ROUND);

      labyrinth = new Labyrinth(p.createVector(), labyrinthSegments, {
        strokeWidth: 2,
        stroke: p.color(0.8, 0.5, 0.5, 1),
      });
    },
    draw: () => {
      const canvasSize = p.createVector(p.width, p.height);
      const mousePosition = p.createVector(p.mouseX, p.mouseY);
      p.clear(0, 0, 0, 0);

      const smallestSide = Math.min(canvasSize.x, canvasSize.y);
      const greatestSegments = Math.max(
        labyrinthSegments.x,
        labyrinthSegments.y,
      );

      const strokeWidth = Math.max(smallestSide / greatestSegments / 10, 2);
      const twoStrokeWidth = strokeWidth * 2;

      labyrinth.setSize(
        p.createVector(
          canvasSize.x - twoStrokeWidth,
          canvasSize.y - twoStrokeWidth,
        ),
      );
      labyrinth.setPosition(p.createVector(strokeWidth, strokeWidth));
      labyrinth.setStyle({ strokeWidth });
      labyrinth.draw();
    },
  };
};
