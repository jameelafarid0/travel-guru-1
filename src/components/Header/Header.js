import React from 'react';
import './Header.css'
import { Link } from 'react-router-dom';
import logo from '../../images/Logo.png'

function Header() {
    return (
        <div className="header">
            <nav className="nav">
                <img className="logo" src={logo} alt="" />
                <ul>
                    <li>
                        <Link to="/news">News</Link>
                    </li>
                    <li>
                        <Link to="/destination">Destination</Link>
                    </li>
                    <li>
                        <Link to="/blog">Blog</Link>
                    </li>
                    <li>
                        <Link to="/contact">Contact</Link>
                    </li>
                    <button>Login</button>
                </ul>
            </nav>
        </div>
    );
}

export default Header;