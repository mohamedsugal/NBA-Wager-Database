import React,{useState,useEffect} from 'react';
import {BarChart,CartesianGrid,XAxis,YAxis,Tooltip,Legend,Bar} from 'recharts'
import './Dvi.css';
import Container from 'react-bootstrap/Container'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'



function Dvi() {
    
  const [data, setData] = useState({rows:[]});
  const [loading, setLoading] = useState(true);
  async function fetchUrl(url) {

     const response = await fetch(url);
     const json = await response.json();
     setData(json);
     setLoading(false);
      
    }

    useEffect(() => {
      fetchUrl();
    }, []);

    
    
    let rows = data.rows.map(row => 
    <tr>
    <td>{row.NAME}</td>
    <td>{row.WEIGHT}</td>
    <td>{row.HEIGHT}</td>
    <td>{row.COLLEGE}</td>
    <td>{row.POSITION}</td>
    </tr>)

    return (
        

        <div className="App">
            <Container fluid className="table-graph">
                <BarChart width={1100} height={350}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="pv" fill="#8884d8" />
                    <Bar dataKey="uv" fill="#82ca9d" />
                </BarChart>
            </Container>  

            <Container className="table-data" >
              <Button onClick = {()=> fetchUrl('http://localhost:5000/players')}>

              </Button>
                <Table responsive>
                    <thead>
                        <tr>
                        <th>Name</th>
                        <th>Weight</th>
                        <th>Height</th>
                        <th>College</th>
                        <th>Position</th>
                        </tr>
                    </thead>

                    <tbody>
                      {rows}
                    </tbody>

                </Table>
            </Container>

        </div>
    );
  
}



export default Dvi;
