import React, { useState, useEffect } from "react";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Legend
} from "recharts";
import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";
import "./PlayerComparison.css";
//A = player 1 , B = player 2

const data = [
  {
    stat: "Points",
    A: 120,
    B: 110,
    max: 150
  },
  {
    stat: "Passes",
    A: 98,
    B: 130,
    max: 150
  },
  {
    stat: "Assists",
    A: 86,
    B: 130,
    max: 150
  },
  {
    stat: "Steals",
    A: 99,
    B: 100,
    max: 150
  },
  {
    stat: "Blocks",
    A: 85,
    B: 90,
    max: 150
  },
  {
    stat: "Games",
    A: 65,
    B: 85,
    max: 150
  }
];
function PlayerComparison() {
  const [playername, setPlayername] = useState("");
  const [dob, setDob] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [college, setCollege] = useState("");
  const [teams, setTeams] = useState("");

  const handleClick = async event => {
    //set variables from the table to the state here
  };

  return (
    <div className="App">
      <Container>
        <RadarChart outerRadius={90} width={730} height={250} data={data}>
          <PolarGrid />
          <PolarAngleAxis dataKey="stat" />
          <PolarRadiusAxis angle={30} domain={[0, 150]} />
          <Radar
            name="Player 1"
            dataKey="A"
            stroke="#8884d8"
            fill="#8884d8"
            fillOpacity={0.6}
          />
          <Radar
            name="Player 2"
            dataKey="B"
            stroke="#82ca9d"
            fill="#82ca9d"
            fillOpacity={0.6}
          />
          <Legend />
        </RadarChart>
      </Container>

      <div className="container comparison-table">
        <div class="row">

            <div class="col-lg-6 d-flex align-items-stretch" data-aos="fade-up">
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>DOB</th>
                      <th>Weight</th>
                      <th>Height</th>
                      <th>College</th>
                      <th>Team(s)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>James, Lebron</td>
                      <td>12/30/84</td>
                      <td>250</td>
                      <td>6'9"</td>
                      <td>N/A</td>
                      <td>CLE,MIA,LAL</td>
                    </tr>
                  </tbody>
                </Table>
            </div>

            <div class="col-lg-6 d-flex align-items-stretch" data-aos="fade-up">
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>DOB</th>
                      <th>Weight</th>
                      <th>Height</th>
                      <th>College</th>
                      <th>Team(s)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Curry, Stephen</td>
                      <td>3/14/88</td>
                      <td>185</td>
                      <td>6'3"</td>
                      <td>Charlotte Christian</td>
                      <td>GSW</td>
                    </tr>
                  </tbody>
                </Table>
            </div>
          
        </div>
      </div>
    </div>
  );
}

export default PlayerComparison;
