import { useEffect, useState, useRef } from "react";
import './index.scss';
import AnimatedLetters from "../../AnimatedLetters/AnimatedLetters.jsx";

const TechStack = () => {
  const [letterClass, setLetterClass] = useState('text-animate');
  const [techItemsLoaded, setTechItemsLoaded] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [animatingIndices, setAnimatingIndices] = useState(new Set());
  const [activePath, setActivePath] = useState(null);
  
  const currentPathIndexRef = useRef(0);
  const timeoutsRef = useRef([]);

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

    const startTimeout = setTimeout(animateNextPath, 1000);
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

  // Get center position of grid item accounting for grid gaps
  const getGridPosition = (index) => {
    const gridMap = {
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

    const pos = gridMap[index];
    const cellSize = 100 / 6; // 6 columns
    const gapSize = 2.86; // approximate gap in percentage
    
    // Center of the cell accounting for gap
    const x = (pos.col - 0.5) * cellSize + gapSize / 2;
    const y = (pos.row - 0.5) * cellSize + gapSize / 2;
    
    return { x, y };
  };

  // Generate quadratic bezier curve path
  const generateCurvePath = (fromPos, toPos) => {
    const dx = toPos.x - fromPos.x;
    const dy = toPos.y - fromPos.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    // Control point offset for curve - larger distance = bigger curve
    const offsetDistance = distance * 0.3;
    const angle = Math.atan2(dy, dx);
    const perpAngle = angle + Math.PI / 2;
    
    const controlX = (fromPos.x + toPos.x) / 2 + Math.cos(perpAngle) * offsetDistance;
    const controlY = (fromPos.y + toPos.y) / 2 + Math.sin(perpAngle) * offsetDistance;
    
    return `M ${fromPos.x} ${fromPos.y} Q ${controlX} ${controlY} ${toPos.x} ${toPos.y}`;
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

      <div className="floating-icons-container">
        <svg 
          className="connection-lines" 
          width="100%" 
          height="100%" 
          preserveAspectRatio="none"
          viewBox="0 0 100 100"
        >
          {animatedPath.map((path, idx) => {
            const fromPos = getGridPosition(path.from);
            const toPos = getGridPosition(path.to);
            const pathD = generateCurvePath(fromPos, toPos);
            
            return (
              <g key={idx}>
                {/* Only render when active */}
                {activePath === idx && (
                  <path
                    className="connection-line-animated active"
                    d={pathD}
                  />
                )}
              </g>
            );
          })}
        </svg>

        {technologiesData.map((tech, index) => (
          <div
            key={index}
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