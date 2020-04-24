import React, { useState, useEffect } from "react";
import {
  LineChart,Line,CartesianGrid,XAxis,YAxis,ZAxis,Tooltip,Scatter,Legend,Brush
} from "recharts";

import Container from "react-bootstrap/Container";
import "./PlayerComparison.css";
import Button from 'react-bootstrap/Button';

import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import TableHead from '@material-ui/core/TableHead';


import Grid from '@material-ui/core/Grid';


const useStyles1 = makeStyles((theme) => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
  },
}));

function TablePaginationActions(props) {
  const classes = useStyles1();
  const theme = useTheme();
  const { count, page, rowsPerPage, onChangePage } = props;

  const handleFirstPageButtonClick = (event) => {
    onChangePage(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onChangePage(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onChangePage(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};



function PlayerComparison() {
  const [selected, setSelected] = useState(false);
  const [display, setDisplay] = useState("");
  const [data, setData] = useState({rows:[]});
  const [loaded,setLoaded] = useState(false);
  const [statData1, setstat1Data] = useState({});
  const [statData2, setstat2Data] = useState({});
  const [currentelement1,setCurrentelement1] = useState({});
  const [currentelement2,setCurrentelement2] = useState({});
  



  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  
  const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.rows.length - page * rowsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  async function fetchPlayers() {

    const response = await fetch("/players");
    const json = await response.json();
    setData(json);
   
   }

   async function getStats(id,int,string)
   {
     let json;
     if(string === "players"){
     const response = await fetch("/playerStats?playerid="+id);
      json = await response.json();
    }
     if(string === "teams"){
     const response = await fetch("/teamPoints?teamid="+id);
      json = await response.json();
    }
     
     
     if(int === 1)
     setstat1Data(json);
     if(int === 2)
     setstat2Data(json);
   }

   
 
   //get data based on which row the user clicked and set the state for use
   function getData(thisData,elementnum,string)
   {

    if(elementnum === 1 && string === "players")
    {
      setCurrentelement1(thisData);
      getStats(thisData.PLAYER_ID,1,string);
      
    }

    if(elementnum === 2 && string === "players")
    {
      setCurrentelement2(thisData);
      getStats(thisData.PLAYER_ID,2,string);
      
    }

    if(elementnum === 1 && string === "teams")
    {
      setCurrentelement1(thisData);
      getStats(thisData.TEAM_ID,1,string);
      
    }

    if(elementnum === 2 && string === "teams")
    {
      setCurrentelement2(thisData);
      getStats(thisData.TEAM_ID,2,string);
      
    }
 
   }

   async function fetchTeams() {

    const response = await fetch("/teams");
    const json = await response.json();
    setData(json);
    setLoaded(true);
   }


  function handlePlayers()
  {
      setDisplay("Players");
      setSelected(true);
      fetchPlayers();;
  }

  function handleTeams()
  {
      setDisplay("Teams");
      setSelected(true);
      fetchTeams();
  }


  if(!selected) {
    
      return(

            <div className = "Buttons">
            <Container >
              <h1> Please Select Entities to Compare: </h1>
              <Button variant="primary" size="lg" onClick = {()=> handlePlayers()} block>
              Players
              </Button>
        
              <Button variant="secondary" size="lg" onClick = {()=> handleTeams()} block>
              Teams
              </Button>
            </Container>
            </div>

          )
  }
    

if(display === "Players")
{
  return (

  
    <div className="App">
      <Container>
      <h1>{currentelement1.NAME}</h1>
      <LineChart width={730} height={250} data={statData1.rows}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="YEAR" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="AVG_POINTS" stroke="#8884d8" />
        <Line type="monotone" dataKey="TOTAL_BLOCKS" stroke="#82ca9d" />
        <Line type="monotone" dataKey="TOTAL_ASSISTS" stroke="#4554d8" />
        <Brush />
      </LineChart>
      <h1>{currentelement2.NAME}</h1>
      <LineChart width={730} height={250} data={statData2.rows}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="YEAR" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="AVG_POINTS" stroke="#8884d8" />
        <Line type="monotone" dataKey="TOTAL_BLOCKS" stroke="#82ca9d" />
        <Line type="monotone" dataKey="TOTAL_ASSISTS" stroke="#4554d8" />
        <Brush />
      </LineChart>
      </Container>

      <div className="container comparison-table">
        
        <Grid
            container
            direction="row"
            justify="space-evenly"
            alignItems="flex-start"
        >

          <Grid item> 
            <TableContainer component={Paper}>
                  <Table  size="small" aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell align="left">Name</TableCell>
                        <TableCell align="left">Position</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {(rowsPerPage > 0
                        ? data.rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        : data.rows
                      ).map((row) => (
                        <TableRow key = {row.PLAYER_ID} onClick = {()=> getData(row,1,"players")}>
                          <TableCell align="left">{row.NAME}</TableCell>
                          <TableCell align="left">{row.POSITION}</TableCell>
                        </TableRow>
                      ))}

                        {emptyRows > 0 && (
                        <TableRow style={{ height: 53 * emptyRows }}>
                          <TableCell colSpan={6} />
                        </TableRow>
                      )}
                    </TableBody>
                    <TableFooter>
                      <TableRow>
                        <TablePagination
                          rowsPerPageOptions={[50, 100, 500, { label: 'All', value: -1 }]}
                          colSpan={3}
                          count={data.rows.length}
                          rowsPerPage={rowsPerPage}
                          page={page}
                          SelectProps={{
                            inputProps: { 'aria-label': 'rows per page' },
                            native: true,
                          }}
                          onChangePage={handleChangePage}
                          onChangeRowsPerPage={handleChangeRowsPerPage}
                          ActionsComponent={TablePaginationActions}
                        />
                      </TableRow>
                    </TableFooter>
                  </Table>
                </TableContainer>
          </Grid>


          <Grid item> 
            <TableContainer component={Paper}>
                  <Table  size="small" aria-label="simple table">
                  <TableHead>
                      <TableRow>
                        <TableCell align="left">Name</TableCell>
                        <TableCell align="left">Position</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {(rowsPerPage > 0
                        ? data.rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        : data.rows
                      ).map((row) => (
                        <TableRow key = {row.PLAYER_ID} onClick = {()=>getData(row,2,"players")} >
                          <TableCell align="left">{row.NAME}</TableCell>
                          <TableCell align="left">{row.POSITION}</TableCell>
                        </TableRow>
                      ))}

                        {emptyRows > 0 && (
                        <TableRow style={{ height: 53 * emptyRows }}>
                          <TableCell colSpan={6} />
                        </TableRow>
                      )}
                    </TableBody>
                    <TableFooter>
                      <TableRow>
                        <TablePagination
                          rowsPerPageOptions={[50, 100, 500, { label: 'All', value: -1 }]}
                          colSpan={3}
                          count={data.rows.length}
                          rowsPerPage={rowsPerPage}
                          page={page}
                          SelectProps={{
                            inputProps: { 'aria-label': 'rows per page' },
                            native: true,
                          }}
                          onChangePage={handleChangePage}
                          onChangeRowsPerPage={handleChangeRowsPerPage}
                          ActionsComponent={TablePaginationActions}
                        />
                      </TableRow>
                    </TableFooter>
                  </Table>
                </TableContainer>
          </Grid>
        </Grid>
            
      </div>
    </div>
  );
}


if(display === "Teams")
{
  return (

  
    <div className="App">
      <Container>
      <h1>{currentelement1.TEAM_NAME}</h1>
      <LineChart width={730} height={250} data={statData1.rows}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="YEAR" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="TOTAL_POINTS" stroke="#8884d8" />
        <Line type="monotone" dataKey="EFGPERCENT" stroke="#82ca9d" />
        <Line type="monotone" dataKey="ORBPERCENT" stroke="#4554d8" />
        <Brush />
      </LineChart>
      <h1>{currentelement2.TEAM_NAME}</h1>
      <LineChart width={730} height={250} data={statData2.rows}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="YEAR" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="TOTAL_POINTS" stroke="#8884d8" />
        <Line type="monotone" dataKey="EFGPERCENT" stroke="#82ca9d" />
        <Line type="monotone" dataKey="ORBPERCENT" stroke="#4554d8" />
        <Brush />
      </LineChart>
      </Container>

      <div className="container comparison-table">
        
        <Grid
            container
            direction="row"
            justify="space-evenly"
            alignItems="flex-start"
        >

          <Grid item> 
          <TableContainer component={Paper}>
                
                <Table  size="small" aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>All Teams</TableCell>
                      <TableCell align="left">Name</TableCell>
                     
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {(rowsPerPage > 0
                      ? data.rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      : data.rows
                    ).map((row) => (
                      <TableRow key = {row.TEAM_ID} onClick = {()=>getData(row,1,"teams")}>
                        <TableCell component="th" scope="row">
                          {row.TEAM_ID}
                        </TableCell>
                        <TableCell align="left">{row.TEAM_NAME}</TableCell>
                        
                      </TableRow>
                    ))}

                      {emptyRows > 0 && (
                      <TableRow style={{ height: 53 * emptyRows }}>
                        <TableCell colSpan={6} />
                      </TableRow>
                    )}
                  </TableBody>
                  <TableFooter>
                    <TableRow>
                      <TablePagination
                        rowsPerPageOptions={[5, 10, 20, { label: 'All', value: -1 }]}
                        colSpan={3}
                        count={data.rows.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        SelectProps={{
                          inputProps: { 'aria-label': 'rows per page' },
                          native: true,
                        }}
                        onChangePage={handleChangePage}
                        onChangeRowsPerPage={handleChangeRowsPerPage}
                        ActionsComponent={TablePaginationActions}
                      />
                    </TableRow>
                  </TableFooter>
                </Table>
              </TableContainer>
          </Grid>


          <Grid item> 
          <TableContainer component={Paper}>
                
                <Table  size="small" aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>All Teams</TableCell>
                      <TableCell align="left">Name</TableCell>
                     
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {(rowsPerPage > 0
                      ? data.rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      : data.rows
                    ).map((row) => (
                      <TableRow key = {row.TEAM_ID} onClick = {()=>getData(row,2,"teams")}>
                        <TableCell component="th" scope="row">
                          {row.TEAM_ID}
                        </TableCell>
                        <TableCell align="left">{row.TEAM_NAME}</TableCell>
                        
                      </TableRow>
                    ))}

                      {emptyRows > 0 && (
                      <TableRow style={{ height: 53 * emptyRows }}>
                        <TableCell colSpan={6} />
                      </TableRow>
                    )}
                  </TableBody>
                  <TableFooter>
                    <TableRow>
                      <TablePagination
                        rowsPerPageOptions={[5, 10, 20, { label: 'All', value: -1 }]}
                        colSpan={3}
                        count={data.rows.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        SelectProps={{
                          inputProps: { 'aria-label': 'rows per page' },
                          native: true,
                        }}
                        onChangePage={handleChangePage}
                        onChangeRowsPerPage={handleChangeRowsPerPage}
                        ActionsComponent={TablePaginationActions}
                      />
                    </TableRow>
                  </TableFooter>
                </Table>
              </TableContainer>
          </Grid>
        </Grid>
            
      </div>
    </div>
  );
}
else
return(0);
}

export default PlayerComparison;
