import React ,{ useState, useEffect } from "react"
import {RadarChart,PolarGrid,PolarAngleAxis,PolarRadiusAxis,Radar,Legend} from 'recharts'
import Table from 'react-bootstrap/Table'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
//A = player 1 , B = player 2
const data = [
    {
      "stat": "Points",
      "A": 120,
      "B": 110,
      "max": 150
    },
    {
      "stat": "Passes",
      "A": 98,
      "B": 130,
      "max": 150
    },
    {
      "stat": "Assists",
      "A": 86,
      "B": 130,
      "max": 150
    },
    {
      "stat": "Steals",
      "A": 99,
      "B": 100,
      "max": 150
    },
    {
      "stat": "Blocks",
      "A": 85,
      "B": 90,
      "max": 150
    },
    {
      "stat": "Games",
      "A": 65,
      "B": 85,
      "max": 150
    }
  ]
function Home() {

    const [playername, setPlayername] = useState("");
    const [dob, setDob] = useState("");
    const [weight, setWeight] = useState("");
    const [height, setHeight] = useState("");
    const [college, setCollege] = useState("");
    const [teams, setTeams] = useState("");

    const handleClick = async (event) => {
       
        //set variables from the table to the state here
    }

    return (
        <div className="App">
            
            <RadarChart outerRadius={90} width={730} height={250} data={data}>
                <PolarGrid />
                    <PolarAngleAxis dataKey="stat" />
                    <PolarRadiusAxis angle={30} domain={[0, 150]} />
                    <Radar name="Player 1" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                    <Radar name="Player 2" dataKey="B" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6} />
                <Legend />
            </RadarChart>
            
            <Container>
                <Row>
                    <Col>
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
                                <td>1</td>
                                <td>Mark</td>
                                <td>Otto</td>
                                <td>@mdo</td>
                                </tr>
                            </tbody>
                        </Table>
                    </Col>

                    <Col>
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
                                <td>1</td>
                                <td>Mark</td>
                                <td>Otto</td>
                                <td>@mdo</td>
                                </tr>
                            </tbody>
                        </Table>
                    </Col>
                    
                </Row>
            </Container>

        </div>
    );
}

export default Home;
