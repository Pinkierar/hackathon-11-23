import { Labyrinth, Parent, SpriteShape } from '#includes/graphics';
import { Sketch } from '#components/P5Canvas';

export const sketch = (p: P5Type): Sketch => {
  let labyrinth!: Labyrinth;
  let parent!: Parent;

  return {
    preload: () => {
      SpriteShape.images.set('parent', p.loadImage('parent.png'));
    },
    setup: () => {
      p.colorMode(p.HSL, 1, 1, 1, 1);
      p.strokeJoin(p.ROUND);

      labyrinth = new Labyrinth(p.createVector(), p.createVector(30, 30), {
        strokeWidth: 2,
        stroke: p.color(0.8, 0.5, 0.5, 0.1),
      });

      parent = new Parent(SpriteShape.images.get('parent'), 1);
    },
    draw: () => {
      const size = p.createVector(p.width, p.height);
      const mousePosition = p.createVector(p.mouseX, p.mouseY);

      p.clear(0, 0, 0, 0);

      const smallestSide = Math.min(size.x, size.y);

      const segments = labyrinth.getSegments();
      const greatestSegments = Math.max(segments.x, segments.y);

      const scale = Math.max(smallestSide / greatestSegments / 10, 2);
      const twoScale = scale * 2;

      labyrinth.setSize(p.createVector(size.x - twoScale, size.y - twoScale));
      labyrinth.setPosition(p.createVector(scale, scale));
      labyrinth.setStyle({ strokeWidth: scale });
      labyrinth.draw();

      const frame = Math.floor(p.millis() / 100) % 4;
      parent.setScale(scale * 0.16);
      parent.setView([64 * frame, 0, 64, 64]);
      parent.setPosition(mousePosition);
      parent.draw();

      p.push();
      p.stroke(p.color('green'));
      p.strokeWeight(6);
      p.point(mousePosition);
      p.pop();
    },
  };
};
