import { useEffect, useState, useRef } from "react";
import './index.scss';
import AnimatedLetters from "../../AnimatedLetters/AnimatedLetters.jsx";

const GRID_MAP = {
  0: { col: 1, row: 1 },
  1: { col: 2, row: 1 },
  2: { col: 3, row: 1 },
  3: { col: 4, row: 1 },
  4: { col: 5, row: 1 },
  5: { col: 6, row: 1 },
  6: { col: 1, row: 2 },
  7: { col: 2, row: 3 },
  8: { col: 3, row: 3 },
  9: { col: 4, row: 2 },
  10: { col: 5, row: 3 },
  11: { col: 6, row: 3 },
  12: { col: 4, row: 4 },
  13: { col: 5, row: 4 },
  14: { col: 6, row: 4 },
  15: { col: 4, row: 5 },
  16: { col: 5, row: 5 },
  17: { col: 5, row: 6 },
  18: { col: 6, row: 6 },
  19: { col: 1, row: 4 },
  20: { col: 1, row: 5 },
  21: { col: 2, row: 5 },
  22: { col: 1, row: 6 },
  23: { col: 2, row: 6 },
  24: { col: 3, row: 6 },
};

// Every cell that holds an icon. Lines must never cross these.
const OCCUPIED_CELLS = new Set(
  Object.values(GRID_MAP).map(({ col, row }) => `${col},${row}`)
);

const distance = (a, b) => Math.hypot(a.x - b.x, a.y - b.y);

// All cells a polyline passes through, excluding the starting cell.
const cellsAlong = (waypoints) => {
  const cells = [];
  for (let i = 0; i < waypoints.length - 1; i++) {
    const p = waypoints[i];
    const q = waypoints[i + 1];
    const dc = Math.sign(q.col - p.col);
    const dr = Math.sign(q.row - p.row);
    let col = p.col;
    let row = p.row;
    while (col !== q.col || row !== q.row) {
      col += dc;
      row += dr;
      cells.push({ col, row });
    }
  }
  return cells;
};

// A route is valid when it avoids every icon cell (the final destination
// icon is expected, so it is ignored).
const isRouteClear = (waypoints) => {
  const cells = cellsAlong(waypoints);
  return cells
    .slice(0, -1)
    .every(({ col, row }) => !OCCUPIED_CELLS.has(`${col},${row}`));
};

// Build an orthogonal (circuit-like) route between two icons, preferring the
// L-shaped path that does not pass over any other icon.
const buildRoute = (fromIndex, toIndex) => {
  const from = GRID_MAP[fromIndex];
  const to = GRID_MAP[toIndex];
  if (!from || !to) return null;

  const candidates = [];
  if (from.row === to.row || from.col === to.col) {
    candidates.push([from, to]);
  }
  candidates.push([from, { col: from.col, row: to.row }, to]);
  candidates.push([from, { col: to.col, row: from.row }, to]);

  return candidates.find(isRouteClear) || [from, to];
};

// Turn grid coordinates into a path string with softly rounded corners.
const buildPathD = (points, radius = 4) => {
  if (!points || points.length < 2) return "";
  if (points.length === 2) {
    return `M ${points[0].x} ${points[0].y} L ${points[1].x} ${points[1].y}`;
  }

  let d = `M ${points[0].x} ${points[0].y}`;
  for (let i = 1; i < points.length - 1; i++) {
    const prev = points[i - 1];
    const cur = points[i];
    const next = points[i + 1];
    const r = Math.min(radius, distance(prev, cur) / 2, distance(cur, next) / 2);
    const v1 = { x: prev.x - cur.x, y: prev.y - cur.y };
    const v2 = { x: next.x - cur.x, y: next.y - cur.y };
    const l1 = Math.hypot(v1.x, v1.y) || 1;
    const l2 = Math.hypot(v2.x, v2.y) || 1;
    const p1 = { x: cur.x + (v1.x / l1) * r, y: cur.y + (v1.y / l1) * r };
    const p2 = { x: cur.x + (v2.x / l2) * r, y: cur.y + (v2.y / l2) * r };
    d += ` L ${p1.x} ${p1.y} Q ${cur.x} ${cur.y} ${p2.x} ${p2.y}`;
  }
  const last = points[points.length - 1];
  d += ` L ${last.x} ${last.y}`;
  return d;
};

const TechStack = () => {
  const [letterClass, setLetterClass] = useState('text-animate');
  const [techItemsLoaded, setTechItemsLoaded] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [animatingIndices, setAnimatingIndices] = useState(new Set());
  const [activePath, setActivePath] = useState(null);
  const [positions, setPositions] = useState([]);

  const currentPathIndexRef = useRef(0);
  const timeoutsRef = useRef([]);
  const containerRef = useRef(null);
  const itemRefs = useRef([]);

  useEffect(() => {
    const letterTimer = setTimeout(() => {
      setLetterClass('text-animate-hover');
    }, 4000);

    const techTimer = setTimeout(() => {
      setTechItemsLoaded(true);
    }, 500);

    return () => {
      clearTimeout(letterTimer);
      clearTimeout(techTimer);
    };
  }, []);

  // Measure the real center of every icon so lines stay accurate at every
  // breakpoint (the CSS gap changes with viewport width).
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const measure = () => {
      const rect = container.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      const next = itemRefs.current.map((el) => {
        if (!el) return null;
        const r = el.getBoundingClientRect();
        return {
          x: ((r.left + r.width / 2 - rect.left) / rect.width) * 100,
          y: ((r.top + r.height / 2 - rect.top) / rect.height) * 100,
        };
      });
      setPositions(next);
    };

    measure();

    const resizeObserver = new ResizeObserver(measure);
    resizeObserver.observe(container);
    window.addEventListener('resize', measure);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, []);

  const animatedPath = [
    { from: 0, to: 1, duration: 4000 },    // React to NextJS
    { from: 1, to: 7, duration: 4000 },    // NextJS to CSS3
    { from: 7, to: 12, duration: 4000 },   // CSS3 to JavaScript
    { from: 12, to: 15, duration: 4000 },  // JavaScript to Git
    { from: 15, to: 17, duration: 4000 }   // Git to Laravel
  ];

  useEffect(() => {
    const clearAllTimeouts = () => {
      timeoutsRef.current.forEach(timeout => clearTimeout(timeout));
      timeoutsRef.current = [];
    };

    const animateNextPath = () => {
      const path = animatedPath[currentPathIndexRef.current];
      
      // Set active path and start animation
      setActivePath(currentPathIndexRef.current);
      setAnimatingIndices(new Set([path.from]));
      
      // Animate the destination node halfway through
      const midpointTimeout = setTimeout(() => {
        setAnimatingIndices(new Set([path.to]));
      }, path.duration / 2);
      timeoutsRef.current.push(midpointTimeout);
      
      // Clear animations and move to next path
      const endTimeout = setTimeout(() => {
        setActivePath(null);
        setAnimatingIndices(new Set());
        
        currentPathIndexRef.current = (currentPathIndexRef.current + 1) % animatedPath.length;
        
        // Small pause before next animation
        const nextTimeout = setTimeout(animateNextPath, 500);
        timeoutsRef.current.push(nextTimeout);
      }, path.duration);
      timeoutsRef.current.push(endTimeout);
    };

    const startTimeout = setTimeout(animateNextPath, 5500);
    timeoutsRef.current.push(startTimeout);

    return () => {
      clearAllTimeouts();
    };
  }, []);

  const technologiesData = [
    { name: "ReactJS", icon: <img src="https://cdn.simpleicons.org/react/61DAFB" alt="ReactJS" width="32" /> },
    { name: "NextJS", icon: <img src="https://cdn.simpleicons.org/nextdotjs/000000" alt="NextJS" width="32" /> },
    { name: "VueJS", icon: <img src="https://cdn.simpleicons.org/vuedotjs/4FC08D" alt="VueJS" width="32" /> },
    { name: "ExpressJS", icon: <img src="https://cdn.simpleicons.org/express/000000" alt="ExpressJS" width="32" /> },
    { name: "Tailwind", icon: <img src="https://cdn.simpleicons.org/tailwindcss/06B6D4" alt="Tailwind" width="32" /> },
    { name: "Sass", icon: <img src="https://cdn.simpleicons.org/sass/CC6699" alt="Sass" width="32" /> },
    { name: "HTML5", icon: <img src="https://cdn.simpleicons.org/html5/E34F26" alt="HTML5" width="32" /> },
    { name: "CSS3", icon: <img src="https://cdn.simpleicons.org/css/1572B6" alt="CSS" width="32" /> },
    { name: "Python", icon: <img src="https://cdn.simpleicons.org/python/3776AB" alt="Python" width="32" /> },
    { name: "MongoDB", icon: <img src="https://cdn.simpleicons.org/mongodb/47A248" alt="MongoDB" width="32" /> },
    { name: "Postgres", icon: <img src="https://cdn.simpleicons.org/postgresql/4169E1" alt="PostgreSQL" width="32" /> },
    { name: "MySQL", icon: <img src="https://cdn.simpleicons.org/mysql/4479A1" alt="MySQL" width="32" /> },
    { name: "JavaScript", icon: <img src="https://cdn.simpleicons.org/javascript/F7DF1E" alt="JavaScript" width="32" /> },
    { name: "TypeScript", icon: <img src="https://cdn.simpleicons.org/typescript/3178C6" alt="TypeScript" width="32" /> },
    { name: "SQL", icon: <img src="https://cdn.simpleicons.org/sqlite/003B57" alt="SQL" width="32" /> },
    { name: "Git", icon: <img src="https://cdn.simpleicons.org/git/F05032" alt="Git" width="32" /> },
    { name: "NodeJS", icon: <img src="https://cdn.simpleicons.org/nodedotjs/339933" alt="NodeJS" width="32" /> },
    { name: "Laravel", icon: <img src="https://cdn.simpleicons.org/laravel/FF2D20" alt="Laravel" width="32" /> },
    { name: "Spring", icon: <img src="https://cdn.simpleicons.org/springboot/6DB33F" alt="Spring" width="32" /> },
    { name: "PHP", icon: <img src="https://cdn.simpleicons.org/php/777BB4" alt="PHP" width="32" /> },
    { name: "Vercel", icon: <img src="https://cdn.simpleicons.org/vercel/000000" alt="Vercel" width="32" /> },
    { name: "Docker", icon: <img src="https://cdn.simpleicons.org/docker/2496ED" alt="Docker" width="32" /> },
    { name: "Figma", icon: <img src="https://cdn.simpleicons.org/figma/F24E1E" alt="Figma" width="32" /> },
  ];

  const gridAreas = [
    'div1', 'div2', 'div3', 'div4', 'div5', 'div6',
    'div7', 'div8', 'div9', 'div10', 'div11', 'div12',
    'div13', 'div14', 'div15', 'div16', 'div17', 'div18',
    'div19', 'div20', 'div21', 'div22', 'div23', 'div24',
    'div25'
  ];

  // Position of any grid cell center, interpolated from three measured
  // anchor icons so it stays exact on every breakpoint.
  const getCellPosition = (col, row) => {
    const origin = positions[0];
    const right = positions[5];
    const bottom = positions[22];
    if (!origin || !right || !bottom) return null;

    const pitchX = (right.x - origin.x) / (GRID_MAP[5].col - GRID_MAP[0].col);
    const pitchY = (bottom.y - origin.y) / (GRID_MAP[22].row - GRID_MAP[0].row);
    return {
      x: origin.x + (col - GRID_MAP[0].col) * pitchX,
      y: origin.y + (row - GRID_MAP[0].row) * pitchY,
    };
  };

  return (
    <div className="tech-stack">
      <h1>
        <AnimatedLetters
          letterClass={letterClass}
          strArray={['T', 'e', 'c', 'h', ' ', 'S', 't', 'a', 'c', 'k']}
          idx={15}
        />
      </h1>

      <div className="floating-icons-container" ref={containerRef}>
        <svg 
          className="connection-lines" 
          width="100%" 
          height="100%" 
          preserveAspectRatio="none"
          viewBox="0 0 100 100"
        >
          {positions.length > 0 && animatedPath.map((path, idx) => {
            const route = buildRoute(path.from, path.to);
            if (!route) return null;

            const points = route
              .map(({ col, row }) => getCellPosition(col, row))
              .filter(Boolean);
            if (points.length !== route.length) return null;

            const pathD = buildPathD(points);
            
            return (
              <g key={idx}>
                {/* Only render when active */}
                {activePath === idx && (
                  <path
                    className="connection-line-animated active"
                    d={pathD}
                    pathLength={100}
                  />
                )}
              </g>
            );
          })}
        </svg>

        {technologiesData.map((tech, index) => (
          <div
            key={index}
            ref={(el) => { itemRefs.current[index] = el; }}
            className={`tech-item ${gridAreas[index]} ${techItemsLoaded ? 'loaded' : ''} ${
              hoveredIndex === index ? 'hovered' : ''
            } ${animatingIndices.has(index) ? 'animating' : ''}`}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <div className="tech-icon">
              {tech.icon}
            </div>
            <p>{tech.name}</p>
            <div className="pulse-ring"></div>
            <div className="animate-dot"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TechStack;
