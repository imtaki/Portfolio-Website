import React, { useEffect, useState } from "react";
import { FaReact, FaVuejs, FaGitAlt, FaNode, FaLaravel, FaJava, FaPhp, FaAws } from "react-icons/fa";
import { RiNextjsFill } from "react-icons/ri";
import {
  SiTailwindcss,
  SiSass,
  SiMongodb,
  SiJavascript,
  SiExpress,
  SiPython,
  SiSqlite,
  SiTypescript,
  SiPostgresql,
  SiMysql,
  SiVercel,
  SiDocker
} from "react-icons/si";
import './index.scss';
import AnimatedLetters from "../../AnimatedLetters/AnimatedLetters.jsx";

const TechStack = () => {
  const [letterClass, setLetterClass] = useState('text-animate');

  useEffect(() => {
    const timer = setTimeout(() => {
      setLetterClass('text-animate-hover');
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  const technologies = [
    { name: "ReactJS", icon: <FaReact color="#61dafb" /> },
    { name: "NextJS", icon: <RiNextjsFill color="#181818" /> },
    { name: "VueJS", icon: <FaVuejs color="#4FC08D" /> },
    { name: "ExpressJS", icon: <SiExpress color="#000000" /> },
    { name: "TailwindCSS", icon: <SiTailwindcss color="#38BDF8" /> },
    { name: "Sass", icon: <SiSass color="#CD6799" /> },
    { name: "Python", icon: <SiPython color="#0576f7" /> },
    { name: "MongoDB", icon: <SiMongodb color="#47A248" /> },
    { name: "Postgres", icon: <SiPostgresql color="#7C757D" /> },
    { name: "MySQL", icon: <SiMysql color="#7C757D" /> },
    { name: "JavaScript", icon: <SiJavascript color="#F7DF1E" /> },
    { name: "TypeScript", icon: <SiTypescript color="#3178C6" /> },
    { name: "SQL", icon: <SiSqlite color="#003B57" /> },
    { name: "Git", icon: <FaGitAlt color="#fc5908" /> },
    { name: "NodeJS", icon: <FaNode color="green" /> },
    { name: "Laravel", icon: <FaLaravel color="#FF2D20" /> },
    { name: "Java", icon: <FaJava color="#007396" /> },
    { name: "PHP", icon: <FaPhp color="#777BB4" /> },
    { name: "Vercel", icon: <SiVercel color="#181818"/> },
    { name: "Docker", icon: <SiDocker color="#0576f7" /> },
    { name: "AWS", icon: <FaAws color="#7C757D" /> },
  ];


  const frontendTech = technologies.filter(tech =>
    ["ReactJS", "NextJS", "VueJS", "TailwindCSS", "Sass"].includes(tech.name)
  );


  const backendTech = technologies.filter(tech =>
    ["ExpressJS", "NodeJS", "Laravel"].includes(tech.name)
  );


  const databaseTech = technologies.filter(tech =>
    ["MongoDB", "Postgres", "MySQL"].includes(tech.name)
  );


  const languageTech = technologies.filter(tech =>
    ["JavaScript", "TypeScript", "Python", "Java", "PHP", "SQL"].includes(tech.name)
  );


  const toolsTech = technologies.filter(tech =>
    ["Git", "Vercel", "Docker", "AWS"].includes(tech.name)
  );

  return (
    <div className="tech-stack">
      <h1>
        <AnimatedLetters
          letterClass={letterClass}
          strArray={['T', 'e', 'c', 'h', ' ', 'S', 't', 'a', 'c', 'k']}
          idx={15}
        />
      </h1>

      <div className="tech-categories">
        <div className="tech-category">
          <h3>Frontend</h3>
          <ul className="tech-list">
            {frontendTech.map((tech, index) => (
              <li key={index} className="tech-item">
                <div className="tech-icon">{tech.icon}</div>
                <p>{tech.name}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className="tech-category">
          <h3>Backend</h3>
          <ul className="tech-list">
            {backendTech.map((tech, index) => (
              <li key={index} className="tech-item">
                <div className="tech-icon">{tech.icon}</div>
                <p>{tech.name}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className="tech-category">
          <h3>Database</h3>
          <ul className="tech-list">
            {databaseTech.map((tech, index) => (
              <li key={index} className="tech-item">
                <div className="tech-icon">{tech.icon}</div>
                <p>{tech.name}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className="tech-category">
          <h3>Languages</h3>
          <ul className="tech-list">
            {languageTech.map((tech, index) => (
              <li key={index} className="tech-item">
                <div className="tech-icon">{tech.icon}</div>
                <p>{tech.name}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className="tech-category">
          <h3>Tools</h3>
          <ul className="tech-list">
            {toolsTech.map((tech, index) => (
              <li key={index} className="tech-item">
                <div className="tech-icon">{tech.icon}</div>
                <p>{tech.name}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TechStack;