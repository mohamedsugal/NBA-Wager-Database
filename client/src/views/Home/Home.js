import React from 'react';
// import logo from '../../assets/logo.svg';
import Jumbotron from 'react-bootstrap/Jumbotron'
import Container from "react-bootstrap/Container"
import Button from "react-bootstrap/Button"
import Row from 'react-bootstrap/Row'
import Jumbo from './nba_hero.jpg'
import './Home.css';

function Home() {
    return (
        <div className="App">
            <Jumbotron className="jumbo" style={{ backgroundImage: `url(${Jumbo})`, backgroundSize: 'cover', backgroundPosition: 'center top'}} fluid>
                <Container className="jumbotext">
                    <Row>
                        <h1>NBA Player and Wager Rankings</h1>
                        
                    </Row>

                    <Row>
                    <p>Compare teams, check player stats, and bet on your favorite team</p>
                      
                    </Row>
                    <Row>
                    <Button>Start Here</Button>
                    </Row>
                    
                    
                </Container>
            </Jumbotron>
            <header className="App-header">
            
            </header>
        </div>
    );
}

export default Home;
