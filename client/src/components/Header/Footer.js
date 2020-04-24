import React from 'react';
// import { Link } from 'react-router-dom';
import './Footer.css';
// import './App.css'
import styled from 'styled-components'; 
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <FooterContainer className="main-footer">
            <div className="footer-middle">
                <div className="container">
                    <div className="row">
                        <div className="col-md-3">
                            <h6>Quick Menu</h6>
                            <ul className="list-unstyled">
                                <Link className="nav-link" to="/Home"><li>> Home</li></Link>
                                <Link className="nav-link" to="/Players"><li>> Players</li></Link>
                                <Link className="nav-link" to="/Teams"><li>> Teams</li></Link>
                                <Link className="nav-link" to="/Comparison Tool"><li>> Comparison Tool</li></Link>
                                
                            </ul>
                        </div>
                        
                        <div className="col-md-6">
                            <h6>Attributions</h6>
                            <p className="attribution">Photo by <a href="https://unsplash.com/@echaparro" target="_blank" rel="noopener noreferrer">Edgar Chaparro</a> on 
                                <a href="https://unsplash.com/photos/kB5DnieBLtM" target="_blank" rel="noopener noreferrer"> Unsplash</a><br/>
                                Icons made by <a href="https://www.flaticon.com/authors/nhor-phai" title="Nhor Phai" target="_blank" rel="noopener noreferrer">
                                    Nhor Phai</a> from <a href="https://www.flaticon.com/" title="Flaticon" target="_blank" rel="noopener noreferrer">www.flaticon.com</a><br/>
                                Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik" target="_blank" rel="noopener noreferrer">Freepik </a> 
                                    from <a href="https://www.flaticon.com/" title="Flaticon" target="_blank" rel="noopener noreferrer">www.flaticon.com</a><br/>
                                Icons made by <a href="https://www.flaticon.com/authors/nikita-golubev" title="Nikita Golubev" target="_blank" rel="noopener noreferrer">
                                    Nikita Golubev</a> from <a href="https://www.flaticon.com/" title="Flaticon" target="_blank" rel="noopener noreferrer">www.flaticon.com</a>
                            </p>                            
                        </div>

                        <div className="col-md-3">
                            <h6>Project For</h6>
                            <p>
                                CIS4301 - Information and Database Systems (Group 4).
                            </p>                       
                        </div>

                    </div>
                    
                    {/* Footer bottom */}
                    <div className="footer-bottom">
                        <p className="text-xs-center">
                            &copy;{new Date().getFullYear()} NBA Player and Wager Rankings - All Rights Reserved.
                        </p>
                    </div>
                </div>
            </div>
        </FooterContainer>
    )
}

export default Footer;

const FooterContainer = styled.footer`
    .footer-middle {
        background: #333;
        color: #fff; 
        padding-top: 2rem;
        padding-bottom: 2rem; 
    }
`;