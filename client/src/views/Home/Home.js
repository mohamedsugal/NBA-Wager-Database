import React from 'react';
import logo from '../../assets/logo.svg';
import Jumbotron from 'react-bootstrap/Jumbotron'
import Container from "react-bootstrap/Container"
import Button from "react-bootstrap/Button"
import Row from 'react-bootstrap/Row'
import Jumbo from './jumbo.jpg'
import './Home.css';

function Home() {
    return (
        <div className="App">
            <Jumbotron className="jumbo" style={{ backgroundImage: `url(${Jumbo})`, backgroundSize: 'cover' }} fluid>
                <Container className="jumbotext">
                    <Row>
                        <h1>Welcome</h1>
                    </Row>

                    <Row>
                       <p>
                            <Button variant="success">Start Here</Button>
                        </p> 
                    </Row>
                    
                    
                </Container>
            </Jumbotron>
            <header className="App-header">
            
            </header>
        </div>
    );
}

export default Home;
