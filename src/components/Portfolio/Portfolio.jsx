import "./index.scss";
import { useState, useEffect } from "react";
import AnimatedLetters from "../AnimatedLetters/AnimatedLetters";
import Loader from "react-loaders";
import portfolioData from "../../data/portfolio.json"

export default function Portfolio() {
    const [letterClass, setLetterClass] = useState("text-animate");
    useEffect(() => {
        const timer = setTimeout(() => {
            setLetterClass("text-animate-hover");
        }, 4000);

        return () => clearTimeout(timer);
    }, []);
    
    const renderPortfolio = (portfolio) => {
        return (
            <div className="images-container">
                {
                    portfolio.map((port, idx) => {
                        return (
                            <div className="image-box" key={idx}>
                                    <img src={port.cover} className="portfolio-image" alt="image" />
                                    <div className="content">
                                        <p className="title">{port.title}</p>
                                        <h4 className="description">{port.description}</h4>
                                        <button className="btn"
                                        onClick={() => window.open(port.url)}>
                                            View
                                        </button>
                                    </div>
                            </div>
                        )
                    })
                }
            </div>
        )
    }

    return (
        <>
            <div className="container portfolio-page">
                <div>
                    <h1 className="page-title">
                        <AnimatedLetters
                            strArray={["P", "o", "r", "t", "f", "o", "l", "i", "o"]}
                            letterClass={letterClass}
                            idx={15}
                        />
                    </h1>
                    <div>{renderPortfolio(portfolioData.portfolio)}</div>
                </div>
            </div>
            <Loader type="pacman" />
        </>
    );
}

