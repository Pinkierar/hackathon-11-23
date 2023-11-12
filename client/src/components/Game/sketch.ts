import { Labyrinth, Parent, SpriteShape } from '#includes/graphics';
import { Sketch } from '#components/P5Canvas';
import { Keyboard } from '#includes/Keyboard.ts';
import { Vector } from 'p5';

export const sketch = (p: P5Type): Sketch => {
  let labyrinth!: Labyrinth;
  let parent!: Parent;

  const parentSpeed = 0.02;

  const roomSize: Vector = p.createVector();

  return {
    preload: () => {
      SpriteShape.images.set('parent', p.loadImage('parent.png'));
    },
    setup: () => {
      p.colorMode(p.HSL, 1, 1, 1, 1);
      p.strokeJoin(p.ROUND);

      labyrinth = new Labyrinth(p.createVector(), p.createVector(10, 10), {
        strokeWidth: 2,
        stroke: p.color(0.8, 0.5, 0.5),
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
      const seconds = p.millis() / 1000;
      const deltaTime = p.deltaTime;

      labyrinth.setSize(p.createVector(size.x - scale * 2, size.y - scale * 2));
      labyrinth.setPosition(p.createVector(scale, scale));
      labyrinth.setStyle({ strokeWidth: scale });

      roomSize.set(labyrinth.getRoomSize());

      parent.setScale(scale * 0.16);
      const movement = p.createVector();
      if (Keyboard.isKeyPressed('KeyA')) movement.x -= 1;
      if (Keyboard.isKeyPressed('ArrowLeft')) movement.x -= 1;
      if (Keyboard.isKeyPressed('KeyS')) movement.y += 1;
      if (Keyboard.isKeyPressed('ArrowDown')) movement.y += 1;
      if (Keyboard.isKeyPressed('KeyD')) movement.x += 1;
      if (Keyboard.isKeyPressed('ArrowRight')) movement.x += 1;
      if (Keyboard.isKeyPressed('KeyW')) movement.y -= 1;
      if (Keyboard.isKeyPressed('ArrowUp')) movement.y -= 1;
      movement.normalize();

      let frame = 0;
      let frameSet = 1;
      if (movement.mag() > 0.001) {
        if (movement.x > 0) frameSet = 0;
        else if (movement.x < 0) frameSet = 2;
        else if (movement.y > 0) frameSet = 1;
        else if (movement.y < 0) frameSet = 3;
        frame = Math.floor(seconds * 5.5) % 4;
      }
      parent.setView([64 * frame, 64 * frameSet, 64, 64]);

      parent.move(movement.mult(deltaTime * scale * parentSpeed));

      labyrinth.draw();
      parent.draw();

      p.push();
      p.stroke(p.color('green'));
      p.strokeWeight(6);
      p.point(mousePosition);
      p.pop();
    },
    windowResized: () => {
      parent.setPosition(roomSize.copy().div(2).add(labyrinth.getPosition()));
    },
  };
};
