import './index.scss';
import Logo from '../../assets/images/logo.png'
import BigLogo from './Logo/Logo'
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import AnimatedLetters from '../AnimatedLetters/AnimatedLetters';
export default function Home () {
    const [letterClass, setLetterClass] = useState('text-animate')
    const nameArray = ['o', 'm', 'i', 'n', 'i', 'k']
    const hobbyArray = ['s', 'o', 'f', 't', 'w', 'a', 'r', 'e', ' ', 'e', 'n', 'g', 'i', 'n', 'e', 'e', 'r']

    useEffect(() => {
        const timer = setTimeout(() => {
            setLetterClass('text-animate-hover');
        }, 4000);

        return () => clearTimeout(timer); 
    }, []);

    return (
        <>
       <div className="container home-page">
            <div className="text-zone"> 
                <h1> 
                <span className={letterClass}>H</span>
                <span className={`${letterClass} _12`}>i,</span>
                <br />
                <span className={`${letterClass} _13`}>I</span>
                <span className={`${letterClass} _14`}>&apos;m</span>
                <img src={Logo} alt="developer"/>
                <AnimatedLetters letterClass={letterClass} strArray={nameArray} idx={15} />
                <br />
                <AnimatedLetters letterClass={letterClass} strArray={hobbyArray} idx={21} />
                </h1>
                <h3> Bc. Student/Full-Stack Software Engineer</h3>
                <h2>Computer Engineering MSc, 2028 at University of Technology and Economics in Budapest (BME)</h2>
                <Link to="/contact" className='flat-button'>CONTACT ME</Link>
            </div>
            <BigLogo />
       </div>
       </>
    )
}
