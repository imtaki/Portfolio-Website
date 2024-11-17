import './index.scss';
import { useState, useEffect } from 'react';
import { FaLinkedin } from "react-icons/fa";
import Loader from 'react-loaders';
import { FaSquareEnvelope } from "react-icons/fa6";
import AnimatedLetters from '../AnimatedLetters/AnimatedLetters';

export default function Contact() {
    const [letterClass, setLetterClass] = useState('text-animate');

    useEffect(() => {
        const timer = setTimeout(() => {
            setLetterClass('text-animate-hover');
        }, 4000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            <div className="container contact-page">
                <div className="text-zone">
                    <h1>
                        <AnimatedLetters 
                            letterClass={letterClass} 
                            strArray={['C', 'o', 'n', 't', 'a', 'c', 't', ' ', 'm', 'e']} 
                            idx={15} 
                        />
                    </h1>
                    <p>
                        I’d love to hear from you! Whether you have a question, want to collaborate, or just want to say hello, feel free to reach out.
                    </p>
                    <div className="icon-links">
                        <a 
                            target="_blank" 
                            rel="noreferrer" 
                            href="https://www.linkedin.com/in/dominik-takáč-542666322/"
                        >
                            <FaLinkedin className="contact-icon" />
                        </a>
                        <a 
                            target="_blank" 
                            rel="noreferrer" 
                            href="mailto:dominik.takac1337@gmail.com"
                        >
                            <FaSquareEnvelope  className="contact-icon" />
                        </a>
                    </div>
                </div>
            </div>
            <Loader type="pacman" />
        </>
    );
}
