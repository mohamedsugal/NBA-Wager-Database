import React,{useState,useEffect} from 'react';
import {Bar,Legend,BarChart,AreaChart,Area,Line,CartesianGrid,XAxis,YAxis,Tooltip, LineChart} from 'recharts'
import './DummyPlayer.css';
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';



function DummyPlayer() {
    
  const [data, setData] = useState({rows:[]});
  const [loading, setLoading] = useState(true);
  async function fetchUrl() {

     const response = await fetch('http://localhost:5000/dummyPlayer');
     const json = await response.json();
     setData(json);
     setLoading(true);
      
    }

    useEffect(() => {
      fetchUrl();
    }, []);


    let rows = data.rows.map(row => 
    <tr>
    <td>{row.PLAYER_NAME}</td>
     </tr>)

    

    /*<Container>
                <LineChart width = {600} height = {300} data = {data}>
                    <Line type = "monotone" dataKey = ""/>
                </LineChart>
            </Container>*/


    return (
        

        <div className="App">
            
            
            <Container className="table-data" >
                <Table responsive size = "sm">
                    <thead>
                        <tr>
                        <th>Name</th>
                        </tr>
                    </thead>

                    <tbody>
                        {rows[0]} 
                    </tbody>
                </Table>
            </Container>

            <Container>
                <LineChart width = {600} height = {300} data = {data.rows} >
                    <Line type = "monotone" dataKey = "TOTAL_POINTS" stroke = "#8884d8"/>
                    <CartesianGrid stroke = "#ccc" strokeDasharray = " 5 5"/>
                    <XAxis dataKey = "YEAR"/>
                    <YAxis />
                    <Tooltip />
                </LineChart>
            </Container>

            

            <Container>
                <AreaChart width = {600} height = {300} data = {data.rows} >
                    <defs>
                        <linearGradient id = "2FGcolor" x1="0" y1="0" x2="0" y2="1">
                            <stop offset = "5%" stopColor = "#8884d8" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                        </linearGradient>
                        <linearGradient id = "3FGcolor" x1="0" y1="0" x2="0" y2="1">
                            <stop offset = "5%" stopColor = "#82ca9d" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor= "#82ca9d" stopOpacity={0}/>
                        </linearGradient>
                    </defs>
                    <XAxis dataKey = "YEAR"/>
                    <YAxis />
                    <CartesianGrid strokeDasharray = "3 3"/>
                    <Tooltip/>
                    <Area type="monotone" dataKey ="TOTAL_2FG" stroke="#8884d8" fillOpacity={1} fill="url(#2FGcolor)"/>
                    <Area type="monotone" dataKey ="TOTAL_3FG" stroke="#82ca9d" fillOpacity={1} fill="url(#3FGcolor)"/>
                </AreaChart>
            </Container>

            <Container>
                <BarChart width = {600} height = {300} data = {data.rows}>
                    <CartesianGrid strokeDasharray = "3 3" />
                    <XAxis dataKey = "YEAR"/>
                    <YAxis/>
                    <Tooltip/>
                    <Legend/>
                    <Bar dataKey = "TOTAL_ASSISTS" fill = "#82ca9d" />
                    <Bar dataKey = "TOTAL_STEALS" fill = "#26ca9d" />
                    <Bar dataKey = "TOTAL_BLOCKS" fill = "#4554d8"/>
                </BarChart>
            </Container>

        </div>
    );
  
}



export default DummyPlayer;