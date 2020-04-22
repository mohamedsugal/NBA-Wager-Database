import React,{useState,useEffect} from 'react';
import './Players.css';
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';



function Players() {
    
  const [data, setData] = useState({rows:[]});
  const [loading, setLoading] = useState(true);
  async function fetchUrl() {

     const response = await fetch('http://localhost:5000/players');
     const json = await response.json();
     setData(json);
     setLoading(true);
      
    }

    useEffect(() => {
      fetchUrl();
    }, []);

    
    
    
    let rows = data.rows.map(row => 
    <tr>
    <td>{row.NAME}</td>
    </tr>)

    

    return (
        

        <div className="App">

            <Container className="table-data" >
                <Table responsive>
                    <tbody>
                      {rows}
                    </tbody>
                </Table>
            </Container>

        </div>
    );
  
}



export default Players;