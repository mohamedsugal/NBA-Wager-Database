import React from 'react';
// import { Link } from 'react-router-dom';
import './Footer.css';
// import './App.css'
import styled from 'styled-components'; 

const Footer = () => {
    return (
        <FooterContainer className="main-footer">
            <div className="footer-middle">
                <div className="container">
                    <div className="row">
                        <div className="col-md-3 col-sm-6">
                            <h4>Lorem ipsum</h4>
                            <ul className="list-unstyled">
                                <li>Lorem ipsum</li>
                                <li>Lorem ipsum</li>
                                <li>Lorem ipsum</li>
                                <li>Lorem ipsum</li>
                            </ul>
                        </div>
                    </div>
                    {/* Footer bottom */}
                    <div className="footer-bottom">
                        <p className="text-xs-center">
                            &copy;{new Date().getFullYear()} NBA Player and Wager Rankings - All Rights Reserved.<br/>
                            <span>Photo by <a href="https://unsplash.com/@echaparro" target="_blank">Edgar Chaparro</a> on 
                                <a href="https://unsplash.com/photos/kB5DnieBLtM" target="_blank"> Unsplash</a></span>
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