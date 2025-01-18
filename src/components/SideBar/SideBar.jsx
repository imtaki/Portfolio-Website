import './index.scss';
import { Link, NavLink } from 'react-router-dom';
import { FaHome, FaUser, FaEnvelope, FaGithubSquare, FaLinkedin, FaBars } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { IoFileTrayFull } from "react-icons/io5";
import Logo from '../../assets/images/logo.png';
import LogoSub from '../../assets/images/sub-logo.png'
import { useState } from 'react';


export default function SideBar () {
   const [showNav, setShowNav] = useState(false);
   return (
      <div className='nav-bar'>
         <Link className='logo' to="/">
            <img src={Logo} alt="logo" />
            <img className="sub-logo" src = {LogoSub} alt="dominik" />
         </Link>
         <nav className={showNav ? 'mobile-show' : ''}>
            <NavLink onClick={() => setShowNav(false)} activeClassName="active" to="/">
               <FaHome color='#4d4d4e'/>
            </NavLink>
            <NavLink onClick={() => setShowNav(false)} activeClassName="active" className="about-link" to="/about">
               <FaUser color='#4d4d4e'/>
            </NavLink>
            <NavLink onClick={() => setShowNav(false)} activeClassName="active" className="portfolio-link" to="/portfolio">
               <IoFileTrayFull color='#4d4d4e'/>
            </NavLink>
            <NavLink onClick={() => setShowNav(false)} activeClassName="active" className="contact-link" to="/contact">
               <FaEnvelope color='#4d4d4e'/>
            </NavLink>
            <IoMdClose onClick={() => setShowNav(false)} className='close-icon'/>
         </nav>
         <ul>
            <li>
                <a target='_blank' rel='noreferrer' href='https://www.linkedin.com/in/dominik-takáč-542666322/' >
                    <FaLinkedin color='#4d4d4e' />
                </a>
            </li>
            <li>
                <a target='_blank' rel='noreferrer' href='https://github.com/imtaki' >
                <FaGithubSquare color='#4d4d4e' />
                </a>
            </li>
         </ul>
         <FaBars size={30} className='hamburger-icon'
            onClick={() => setShowNav(true)}
         />
      </div>
   )
}
