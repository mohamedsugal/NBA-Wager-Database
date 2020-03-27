import React from "react";
// import logo from '../../assets/logo.svg';
import Jumbotron from "react-bootstrap/Jumbotron";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Jumbo from "./nba_ball.jpg";
import visualizationIcon from "./visual.png"; 
import comparePlayer from "./compare-player.png"; 
import team from "./team.png"; 
import bookie from "./bookie.png"; 
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
          <Button className="hero-btn">Start Here</Button>
          </Row>
        </Container>
      </Jumbotron>

      <section id="visualization" class="visualization">
        <div class="container">

          <div class="row">
            <div class="col-lg-6 d-flex align-items-stretch" data-aos="fade-up">
              <div class="info-box">
                {/* <i class="bx bx-map"></i> */}
                <h3><img className="visIcon" src={visualizationIcon}/> Data Visualization</h3>
                <p>Complex visualizations that show a team or a player's performance over time. See which team
                  or player performed above or below average in a certain year.
                </p>
                <Button className="columns-btn">Click Here</Button>
              </div>
            </div>

            <div class="col-lg-6 d-flex align-items-stretch" data-aos="fade-up">
              <div class="info-box">
                {/* <i class="bx bx-map"></i> */}
                <h3><img className="visIcon" src={comparePlayer}/> Compare Playes</h3>
                <p>Compare players in terms of their physical ability, scoring, position, height, weight, agility, and 
                    many more. See how a player stacks against another player. 
                </p>
                <Button className="columns-btn">Click Here</Button>
              </div>
            </div>

            <div class="col-lg-6 d-flex align-items-stretch" data-aos="fade-up">
              <div class="info-box">
                {/* <i class="bx bx-map"></i> */}
                <h3><img className="visIcon" src={team}/> Compare Teams</h3>
                <p>Compare two teams in terms of points per game, assists, rebounds, free throws, 3-points, field, goals, 
                  and many more. See the overall shooting performance of each team. 
                </p>
                <Button className="columns-btn">Click Here</Button>
              </div>
            </div>

            <div class="col-lg-6 d-flex align-items-stretch" data-aos="fade-up">
              <div class="info-box">
                {/* <i class="bx bx-map"></i> */}
                <h3><img className="visIcon" src={bookie}/> Compare Bookie</h3>
                <p>Don't bet on the wrong team and lose money. Compare bookie and see a visualization that predict which team could win the championship in a particular
                  year. 
                </p>
                <Button className="columns-btn">Click Here</Button>
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
