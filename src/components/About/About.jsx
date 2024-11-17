import { useEffect, useState } from 'react';
import Loader from 'react-loaders';
import AnimatedLetters from '../AnimatedLetters/AnimatedLetters';
import { FaReact, FaCss3, FaHtml5, FaPython, FaJava } from "react-icons/fa"
import { IoLogoJavascript } from "react-icons/io5";
import './index.scss';
import TechStack from './TechStack/TechStack';
import '../Layout/index.scss'
export default function About() {
    const [letterClass, setLetterClass] = useState('text-animate')

    useEffect(() => {
        const timer = setTimeout(() => {
            setLetterClass('text-animate-hover');
        }, 4000);

        return () => clearTimeout(timer); 
    }, []);

    return (
        <>
        <div className="container about-page">
            <div className="text-zone">
                <h1>
                    <AnimatedLetters  letterClass={letterClass} strArray={['A', 'b', 'o', 'u', 't', ' ', 'm', 'e']} 
                    idx={15}
                    />
                </h1>
                <p>I&apos;m a software engineer focused on full-stack and front-end development. 
                    I build responsive, user-friendly applications using modern tools and frameworks. 
                    I enjoy solving problems, working in a team, writing clean code, and learning new technologies to improve my skills.
                    <TechStack />
                </p>
                <br />
            </div>
            <div className="stage-cube-cont">
                <div className="cubespinner">
                    <div className="face1">
                        <FaReact color='#3cf3fe'/>
                    </div>
                    <div className="face2">
                        <FaHtml5 color='#F06529'/>
                    </div>
                    <div className="face3">
                        <FaCss3 color='#28A4D9'/>
                    </div>
                    <div className="face4">
                        <FaPython color='#fcff00'/>
                    </div>
                    <div className="face5">
                        <FaJava color='#ffa800'/>
                    </div>
                    <div className="face6">
                        <IoLogoJavascript color='#fffe00'/>
                    </div>
                </div>
            </div>
        </div>
        <Loader type='pacman' />
        </>
    )
}
