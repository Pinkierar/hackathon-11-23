import {
  CircleShape,
  Entity,
  Labyrinth,
  Parent,
  SpriteShape,
} from '#includes/graphics';
import { Sketch } from '#components/P5Canvas';
import { Keyboard } from '#includes/Keyboard.ts';
import { Vector } from 'p5';
import { circleLine } from 'intersects';

export const sketch = (p: P5Type): Sketch => {
  let labyrinth!: Labyrinth;
  let parent!: Parent<CircleShape>;
  let parentHitboxShape!: CircleShape;
  let parentHitbox!: Entity<CircleShape>;

  const parentSpeed: number = 0.01;
  const padding: Vector = p.createVector(20, 40);
  const offset: Vector = p.createVector(10, 30);

  let prevMovement: Vector = p.createVector(0, 1);
  const roomSize: Vector = p.createVector();
  let scale: number = 1;

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

      parentHitboxShape = new CircleShape(16);

      parentHitbox = new Entity<CircleShape>(parentHitboxShape, {
        strokeWidth: 2,
        stroke: p.color('red'),
      });

      parent = new Parent(SpriteShape.images.get('parent'), 1, parentHitbox);
    },
    draw: () => {
      const mousePosition = p.createVector(p.mouseX, p.mouseY).sub(offset);
      const seconds = p.millis() / 1000;
      const deltaTime = p.deltaTime;

      p.clear(0, 0, 0, 0);
      p.translate(offset);

      roomSize.set(labyrinth.getRoomSize());

      {
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

        let frame = 0;
        let frameSet = 1;
        if (movement.mag() > 0.001) {
          if (movement.x > 0) frameSet = 0;
          else if (movement.x < 0) frameSet = 2;
          else if (movement.y > 0) frameSet = 1;
          else if (movement.y < 0) frameSet = 3;
          frame = Math.floor(seconds * 5.5) % 4;
          prevMovement = movement;
        } else {
          if (prevMovement.x > 0) frameSet = 0;
          else if (prevMovement.x < 0) frameSet = 2;
          else if (prevMovement.y > 0) frameSet = 1;
          else if (prevMovement.y < 0) frameSet = 3;
        }
        parent.setView([64 * frame, 64 * frameSet, 64, 64]);

        const offset = movement
          .copy()
          .normalize()
          .mult(deltaTime * scale * parentSpeed);

        {
          const position = labyrinth.getPosition();

          const hitboxRadius = parentHitboxShape.getRadius();
          const hitboxPosition = parentHitbox.getPosition();

          const room = labyrinth.getRoomByPosition(
            hitboxPosition.copy().sub(position),
          );
          if (room) {
            const roomPosition = room.getPosition().copy().add(position);

            const isIntersecting = (v: Vector4n) =>
              circleLine(
                hitboxPosition.x,
                hitboxPosition.y,
                hitboxRadius,
                v[0] + roomPosition.x,
                v[1] + roomPosition.y,
                v[2] + roomPosition.x,
                v[3] + roomPosition.y,
              );

            const top: Vector4n = [0, 0, roomSize.x, 0];
            const right: Vector4n = [roomSize.x, 0, roomSize.x, roomSize.y];
            const bottom: Vector4n = [roomSize.x, roomSize.y, 0, roomSize.y];
            const left: Vector4n = [0, roomSize.y, 0, 0];

            const config = room.getConfig();
            if (offset.y < 0 && config[0] && isIntersecting(top)) offset.y = 0;
            if (offset.x > 0 && config[1] && isIntersecting(right))
              offset.x = 0;
            if (offset.y > 0 && config[2] && isIntersecting(bottom))
              offset.y = 0;
            if (offset.x < 0 && config[3] && isIntersecting(left)) offset.x = 0;
          }
        }

        parent.move(offset.normalize().mult(deltaTime * scale * parentSpeed));
      }
      parentHitboxShape.setRadius(scale * 2.5);
      parentHitbox.setPosition(
        parent
          .getPosition()
          .copy()
          .add(scale * 0.2, scale * 1.5),
      );

      labyrinth.draw();
      parent.draw();

      p.push();
      p.stroke(p.color('green'));
      p.strokeWeight(6);
      p.point(mousePosition);
      p.pop();
    },
    windowResized: () => {
      const size: Vector = p.createVector(p.width, p.height).sub(padding);

      const segments = labyrinth.getSegments();
      const greatestSegments = Math.max(segments.x, segments.y);
      const smallestSide = Math.min(size.x, size.y);
      scale = Math.max(smallestSide / greatestSegments / 10, 2);

      labyrinth.setSize(size);
      labyrinth.setStyle({ strokeWidth: scale });

      parent.setPosition(roomSize.copy().div(2).add(labyrinth.getPosition()));
    },
  };
};
