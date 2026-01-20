import { useEffect, useState } from "react";
import './index.scss';
import AnimatedLetters from "../../AnimatedLetters/AnimatedLetters.jsx";

const TechStack = () => {
  const [letterClass, setLetterClass] = useState('text-animate');
  const [techItemsLoaded, setTechItemsLoaded] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [animatingIndices, setAnimatingIndices] = useState(new Set());
  const [activeLines, setActiveLines] = useState(new Set());

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
    { from: 0, to: 1, duration: 4000 },  // React to NextJS
    { from: 1, to: 7, duration: 4000 },  // NextJS to CSS3
    { from: 7, to: 12, duration: 4000 }, // CSS3 to JavaScript
    { from: 12, to: 17, duration: 4000 } // JavaScript to Laravel
  ];

  
  useEffect(() => {
    let currentPathIndex = 0;
    let animationTimeout;

    const animateNextPath = () => {
      const path = animatedPath[currentPathIndex];
      
      setActiveLines(new Set([currentPathIndex]));
      
      setAnimatingIndices(new Set([path.from]));
      
    
      setTimeout(() => {
        setAnimatingIndices(new Set([path.to]));
      }, path.duration / 2);
      
      
      animationTimeout = setTimeout(() => {
        setAnimatingIndices(new Set());
        setActiveLines(new Set());
        
        
        currentPathIndex = (currentPathIndex + 1) % animatedPath.length;
        
        
        setTimeout(animateNextPath, 500);
      }, path.duration);
    };

    // Start the animation cycle
    const startTimeout = setTimeout(animateNextPath, 1000);

    return () => {
      clearTimeout(startTimeout);
      clearTimeout(animationTimeout);
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

  const getGridPosition = (index) => {
  // Map based on the actual grid-area definitions
  const gridMap = {
    0: { col: 1, row: 1 },   // div1
    1: { col: 2, row: 1 },   // div2
    2: { col: 3, row: 1 },   // div3
    3: { col: 4, row: 1 },   // div4
    4: { col: 5, row: 1 },   // div5
    5: { col: 6, row: 1 },   // div6
    6: { col: 1, row: 2 },   // div7
    7: { col: 2, row: 3 },   // div8
    8: { col: 3, row: 3 },   // div9
    9: { col: 4, row: 2 },   // div10
    10: { col: 5, row: 3 },  // div11
    11: { col: 6, row: 3 },  // div12
    12: { col: 4, row: 4 },  // div13
    13: { col: 5, row: 4 },  // div14
    14: { col: 6, row: 4 },  // div15
    15: { col: 4, row: 5 },  // div16
    16: { col: 5, row: 5 },  // div17
    17: { col: 5, row: 6 },  // div18
    18: { col: 6, row: 6 },  // div19
    19: { col: 1, row: 4 },  // div20
    20: { col: 1, row: 5 },  // div21
    21: { col: 2, row: 5 },  // div22
    22: { col: 1, row: 6 },  // div23
    23: { col: 2, row: 6 },  // div24
    24: { col: 3, row: 6 },  // div25
  };
  
  const pos = gridMap[index];
  return {
    x: (pos.col / 7) * 100,  // 7 because grid is 1-6, normalize to 0-100%
    y: (pos.row / 7) * 100   // 7 because grid is 1-6
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

      <div className="floating-icons-container">
        <svg className="connection-lines" width="100%" height="100%" preserveAspectRatio="none">
          {animatedPath.map((path, idx) => {
            const fromPos = getGridPosition(path.from);
            const toPos = getGridPosition(path.to);
            return (
              <g key={idx}>
                {/* Animated flowing line - only shows when active */}
                <line
                  className={`connection-line-animated ${activeLines.has(idx) ? 'active' : ''}`}
                  x1={`${fromPos.x}%`}
                  y1={`${fromPos.y}%`}
                  x2={`${toPos.x}%`}
                  y2={`${toPos.y}%`}
                />
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