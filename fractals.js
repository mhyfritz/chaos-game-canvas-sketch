import { mod } from "canvas-sketch-util/math";
import { pick } from "canvas-sketch-util/random";

export default {
  triangle: [
    {
      n: 3,
      fracDistance: 0.5,
      nextPoint: points => pick(points)
    }
  ],
  square: [
    {
      n: 4,
      fracDistance: 0.5,
      nextPoint: (points, prevs) => {
        if (prevs.length > 0) {
          return pick(points.filter(p => p !== prevs[prevs.length - 1]));
        }
        return pick(points);
      }
    },
    {
      n: 4,
      fracDistance: 0.5,
      nextPoint: (points, prevs) => {
        if (prevs.length > 0) {
          const indexPrev = points.findIndex(
            p => p === prevs[prevs.length - 1]
          );
          const indexTaboo = mod(indexPrev - 1, points.length);
          return pick(points.filter((_, i) => i !== indexTaboo));
        }
        return pick(points);
      }
    },
    {
      n: 4,
      fracDistance: 0.5,
      nextPoint: (points, prevs) => {
        if (prevs.length > 0) {
          const indexPrev = points.findIndex(
            p => p === prevs[prevs.length - 1]
          );
          const indexTaboo = (indexPrev + 2) % points.length;
          return pick(points.filter((_, i) => i !== indexTaboo));
        }
        return pick(points);
      }
    }
  ],
  pentagon: [
    {
      n: 5,
      fracDistance: 0.5,
      nextPoint: (points, prevs) => {
        if (prevs.length > 0) {
          return pick(points.filter(p => p !== prevs[prevs.length - 1]));
        }
        return pick(points);
      }
    }
  ]
};
