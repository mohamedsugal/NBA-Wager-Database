import React from "react";
import {useState,useEffect} from 'react';
import Jumbotron from "react-bootstrap/Jumbotron";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Jumbo from "./hero_image.jpg";
import players from "./compare-player.png"; 
import comparePlayer from "./compareP.png"; 
import compareTeam from "./team.png"; 
import teams from "./teams.png"; 
import { Link } from 'react-router-dom';
import AnchorLink from 'react-anchor-link-smooth-scroll';
import CountUp from 'react-countup';

import "./Home.css";



function Home() {

  return (
    <div className="App">
      <Jumbotron
        className="jumbo"
        style={{
          backgroundImage: `url(${Jumbo})`,
          backgroundSize: "cover",
          backgroundPosition: "center top"
        }}
        fluid
      >
        <Container className="jumbotext">
          <Row>
            <h1>NBA Player and Wager Rankings</h1>
          </Row>

          <Row>
            <p>
              Compare teams, check player stats, and bet on your favorite team
            </p>
          </Row>

          <Row>
          <AnchorLink offset='90' href='#visualization'><Button className="hero-btn">Start here</Button></AnchorLink>
          </Row>
          
        </Container >
        <Container className="container-fluid royalty">
          <p className="text-right text-white">Royalty-free stock photo ID: 1508680433</p>
        </Container>
      </Jumbotron>

      <CountUp end = {1888210} />
      
      <section id="visualization" class="visualization">
        <div class="container">

          <div class="row">
            <div class="col-lg-6 d-flex align-items-stretch" data-aos="fade-up">
              <div class="info-box">
                {/* <i class="bx bx-map"></i> */}
                <h3><img className="visIcon" src={players} alt=""/> Players</h3>
                <p>Complex visualizations that show a team or a player's performance over time. See which team
                  or player performed above or below average in a certain year.
                </p>
                <Button className="columns-btn"><Link to="/Players">Click Here</Link></Button>
              </div>
            </div>

            <div class="col-lg-6 d-flex align-items-stretch" data-aos="fade-up">
              <div class="info-box">
                {/* <i class="bx bx-map"></i> */}
                <h3><img className="visIcon" src={comparePlayer} alt=""/> Compare Playes</h3>
                <p>Compare players in terms of their physical ability, scoring, position, height, weight, agility, and 
                    many more. See how a player stacks against another player. 
                </p>
                <Button className="columns-btn"><Link to="/Comparison Tool">Click Here</Link></Button>
              </div>
            </div>

            <div class="col-lg-6 d-flex align-items-stretch" data-aos="fade-up">
              <div class="info-box">
                {/* <i class="bx bx-map"></i> */}
                <h3><img className="visIcon" src={compareTeam} alt=""/> Compare Teams</h3>
                <p>Compare two teams in terms of points per game, assists, rebounds, free throws, 3-points, field, goals, 
                  and many more. See the overall shooting performance of each team. 
                </p>
                <Button className="columns-btn"><Link to="/Comparison Tool">Click Here</Link></Button>
              </div>
            </div>

            <div class="col-lg-6 d-flex align-items-stretch" data-aos="fade-up">
              <div class="info-box">
                {/* <i class="bx bx-map"></i> */}
                <h3><img className="visIcon" src={teams} alt=""/> Teams</h3>
                <p>See the overall team stats, their total points, scores, and visualize the implied probability 
                  of your favorite team winning the championship.
                </p>
                <Button className="columns-btn"><Link to="/Teams">Click Here</Link></Button>
              </div>
            </div>

          </div>
        </div>
      </section>
      
      <header className="App-header"></header>
    </div>
  );
}


export default Home;
