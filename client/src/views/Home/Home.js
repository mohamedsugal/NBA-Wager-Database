import React from 'react';
import logo from '../../assets/logo.svg';
import Jumbotron from 'react-bootstrap/Jumbotron'
import Container from "react-bootstrap/Container"
import './Home.css';

function Home() {
    return (
        <div className="App">
            <Jumbotron fluid>
                <Container>
                    <h1>Fluid jumbotron</h1>
                    <p>
                    This is a modified jumbotron that occupies the entire horizontal space of
                    its parent.
                    </p>
                </Container>
            </Jumbotron>
            <header className="App-header">
            
            </header>
        </div>
    );
}

export default Home;
