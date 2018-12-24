import canvasSketch from "canvas-sketch";
import { lerp } from "canvas-sketch-util/math";
import { range } from "canvas-sketch-util/random";
import fractals from "./fractals";

const select = document.getElementById("fractal-select");
const width = 2048;

const settings = {
  animate: true,
  canvas: document.getElementById("sketch"),
  dimensions: [width, width]
};

const sketch = () => {
  let idPrevious;
  let points = [];
  let fractal;
  let x, y;
  let prevs = [];
  const nPrevs = 2; // track previous x points

  return ({ context, width, height }) => {
    const { polygon, index, id } = getFractal();

    if (id !== idPrevious) {
      context.fillStyle = "white";
      context.fillRect(0, 0, width, height);
      circle(context, width / 2, height / 2, width / 2, {
        strokeStyle: "#dfdfdf"
      });
      idPrevious = id;
      points = [];
      fractal = fractals[polygon][index];

      for (let i = 0; i < fractal.n; i += 1) {
        const angle = (i / fractal.n) * Math.PI * 2;
        const point = pointFromAngle(angle, width / 2, width / 2, width / 2);
        points.push(point);
      }

      context.strokeStyle = "#666";
      context.beginPath();
      context.moveTo(points[0].x, points[0].y);
      for (let i = 1; i < fractal.n; i += 1) {
        context.lineTo(points[i].x, points[i].y);
        context.stroke();
      }
      context.closePath();
      context.stroke();

      x = range(width);
      y = range(height);

      circle(context, x, y, 10, {
        strokeStyle: "#666",
        fillStyle: "#666"
      });
    }

    for (let i = 0; i < fractal.n * 25; i += 1) {
      const point = fractal.nextPoint(points, prevs);
      prevs.push(point);
      if (prevs.length > nPrevs) {
        prevs = prevs.slice(1);
      }
      x = lerp(x, point.x, fractal.fracDistance);
      y = lerp(y, point.y, fractal.fracDistance);
      circle(context, x, y, 2, {
        strokeStyle: "rgba(255, 105, 180, .5)",
        fillStyle: "rgba(255, 105, 180, .5)"
      });
    }
  };
};

canvasSketch(sketch, settings);

function getFractal() {
  const fractalId = select.value;
  const [polygon, index] = fractalId.split("-");
  return {
    id: fractalId,
    polygon,
    index: Number.parseInt(index, 10) - 1
  };
}

function pointFromAngle(angle, cx, cy, r) {
  return {
    x: cx + r * Math.cos(angle),
    y: cy + r * Math.sin(angle)
  };
}

function circle(context, x, y, r, options = {}) {
  const { strokeStyle = "black", fillStyle } = options;

  context.beginPath();
  context.arc(x, y, r, 0, Math.PI * 2, false);
  context.strokeStyle = strokeStyle;
  context.stroke();
  if (fillStyle) {
    context.fillStyle = fillStyle;
    context.fill();
  }
}
