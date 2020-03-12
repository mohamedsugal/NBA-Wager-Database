import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';

const NavBar = () => {
    return (
        <div className = "header">
            <div class = "title"> 
                    NBA Player and Wager Rankings
            </div>
            {/* Logo */}
            <Link className = "nav-title" to="/">
                <img className = "nav-logo" src={ "/logo192.png" } alt="React logo" />
            </Link>

            {/* Page Links */}
            <div className = "nav-items">
                <Link className = "nav-link" to='/Home'>Home</Link>
                <Link className = "nav-link" to='/Data Visualization'>Data Visualization</Link>
                <Link className = "nav-link" to='/Comparison Tool'>Comparison Tool</Link>
            </div>

        </div>
    )
};

export default NavBar;
