import { FaReact, FaVuejs, FaGitAlt, FaNode } from "react-icons/fa";
import { RiNextjsFill } from "react-icons/ri";
import { SiTailwindcss, SiSass, SiMongodb, SiJavascript, SiExpress, SiPython, SiSqlite, SiTypescript } from "react-icons/si";
import './index.scss';

const TechStack = () => {
  const technologies = [
    { name: "ReactJS", icon: <FaReact color="#61dafb" /> },
    { name: "NextJS", icon: <RiNextjsFill color="#181818" /> },
    { name: "VueJS", icon: <FaVuejs color="#4FC08D" /> },
    { name: "ExpressJS", icon: <SiExpress color="#000000" /> },
    { name: "TailwindCSS", icon: <SiTailwindcss color="#38BDF8" /> },
    { name: "Sass", icon: <SiSass color="#CD6799" /> },
    { name: "Python", icon: <SiPython color="#0576f7" /> },
    { name: "MongoDB", icon: <SiMongodb color="#47A248" /> },
    { name: "JavaScript", icon: <SiJavascript color="#F7DF1E" /> },
    { name: "TypeScript", icon: <SiTypescript color="#3178C6" /> },
    { name: "SQL", icon: <SiSqlite color="#003B57" /> },
    { name: "Git", icon: <FaGitAlt color="#fc5908" /> },
    { name: "NodeJS", icon: <FaNode color="green" /> }
  ];

  return (
    <div className="tech-stack">
      <h2>Tech Stack</h2>
      <ul className="tech-list">
        {technologies.map((tech, index) => (
          <li key={index} className="tech-item">
            <div className="tech-icon">{tech.icon}</div>
            <p>{tech.name}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TechStack;