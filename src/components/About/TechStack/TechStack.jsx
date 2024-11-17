import { FaReact, FaVuejs, FaGitAlt, FaNode } from "react-icons/fa";
import { SiTailwindcss, SiSass, SiMongodb, SiJavascript, SiExpress, SiPython, SiSqlite } from "react-icons/si"; 
import './index.scss'

export default function TechStack() {
  const techIcons = {
    ReactJS: <FaReact color="#61dafb" />,
    VueJS: <FaVuejs color="#4FC08D" />,
    ExpressJS: <SiExpress color="#000000" />,
    TailwindCSS: <SiTailwindcss color="#38BDF8" />,
    Sass: <SiSass color="#CD6799" />,
    Python: <SiPython color="#0576f7" />,
    MongoDB: <SiMongodb color="#47A248" />,
    JavaScript: <SiJavascript color="#F7DF1E" />,
    SQL: <SiSqlite color="#003B57" />,
    Git: <FaGitAlt color="#fc5908"/>,
    NodeJS: <FaNode color="green"/>
  };

  return (
    <div className="tech-stack">
      <h2>Tech Stack</h2>
      <ul className="tech-list">
        {["ReactJS", "VueJS", "ExpressJS", "TailwindCSS", "Sass", "Python", "MongoDB", "JavaScript", "SQL", "Git", "NodeJS"].map((tech, index) => (
          <li key={index} className="tech-item">
            <div className="tech-icon">{techIcons[tech]}</div>
            <p>{tech}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
