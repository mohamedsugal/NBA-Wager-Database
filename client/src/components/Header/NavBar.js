import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';

const NavBar = () => {
    return (
      // <div className = "header">
      //     <div class = "title">
      //             NBA Player and Wager Rankings
      //     </div>
      //     {/* Page Links */}
      //     <div className = "nav-items">
      //         <Link className = "nav-link" to='/Home'>Home</Link>
      //         <Link className = "nav-link" to='/Data Visualization'>Data Visualization</Link>
      //         <Link className = "nav-link" to='/Comparison Tool'>Comparison Tool</Link>
      //     </div>
      // </div>

      <nav className="navbar navbar-expand-lg navbar-light bg-dark">
        <Link className="navbar-brand" to="/Home">
          NBA Player and Wager Rankings
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item active">
              <Link className="nav-link" to="/Home">
                Home <span className="sr-only">(current)</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/Players">
                Players
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/Teams">
                Teams
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/Comparison Tool">
                Comparison Tool
              </Link>
            </li>
          </ul>

        </div>
      </nav>
    );
};

export default NavBar;
