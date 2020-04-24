import React,{useState,useEffect} from 'react';
import {AreaChart,Area, LineChart,Line,BarChart,CartesianGrid,XAxis,YAxis,Tooltip,Legend,Bar,Brush} from 'recharts'
import './Teams.css';
import Container from 'react-bootstrap/Container'

import Button from 'react-bootstrap/Button'

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
import Row from 'react-bootstrap/Row';


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

function Teams() {
    
  const [data, setData] = useState({rows:[]});
  const [statData, setstatData] = useState({rows:[]});
  const [wlData, setWlData] = useState({rows:[]});
  const [ipData, setIpData] = useState({rows:[]});
  const [loading, setLoading] = useState(true);
  const [currentTeam,setCurrentteam] = useState({});
  const [currentdataKey,setCurrentdatakey] = useState("");
  
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

  //this function is called when one of the buttons are clicked and accepts the datakey as a string 
  function handlekeySelection (selection){

    //the string passed in gets set to the state and should update the chart
    setCurrentdatakey(selection);
  }

  
  async function fetchUrl(url) {

     setLoading(true);
     const response = await fetch(url);
     const json = await response.json();
     setData(json);
      
    }

  async function getPoints(id)
  {
    
    setLoading(true);
    const response = await fetch("/teamPoints?teamid="+id);
    const json = await response.json();
    await sleep(200);
    setstatData(json);
  }

   

  async function getTeamWL(id)
  {
    setLoading(true);
    const response = await fetch("/teamWL?teamid="+id);
    const json = await response.json();
    await sleep(200);
    setWlData(json);
  }

  async function getImpliedProb(id)
  {
    setLoading(true);
    const response = await fetch("/impliedProb?teamid="+id);
    const json = await response.json();
    await sleep(200);
    setIpData(json);
  }
  
  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  //get data based on which row the user clicked and set the state for use
  // you could probably pass parameters here to specify which data you want to get in respect to the query options
  async function getData(teamData)
  {
    setCurrentteam(teamData);
    getPoints(teamData.TEAM_ID);
    await sleep(200);
    getTeamWL(teamData.TEAM_ID);
    await sleep(200);
    getImpliedProb(teamData.TEAM_ID);
  }

    useEffect(() => {
      fetchUrl();
    }, []);
    
   

    return (
        

        <div className="App">
             <Row>
              <Container>
                  <h1>{currentTeam.TEAM_NAME}</h1>
                  <h2>{currentdataKey}</h2>
                  <LineChart width = {800} height = {400} data = {statData.rows} >
                      <Line type = "monotone" dataKey = {currentdataKey} stroke = "#8884d8"/>
                      <CartesianGrid stroke = "#ccc" strokeDasharray = " 5 5"/>
                      <XAxis dataKey = "YEAR"/>
                      <YAxis />
                      <Tooltip />
                      <Brush/>
                  </LineChart>
                  <Button onClick = {()=> handlekeySelection("TOTAL_POINTS")}>Total Points</Button>
                  
                  

                  <BarChart width = {800} height = {400} data = {statData.rows}>
                          <CartesianGrid strokeDasharray = "3 3" />
                          <XAxis dataKey = "YEAR"/>
                          <YAxis/>
                          <Tooltip/>
                          <Legend/>
                          <Brush/>
                          <Bar dataKey = "EFG_PERCENT" fill = "#82ca9d" />
                          <Bar dataKey = "TOV_PERCENT" fill = "#26ca9d" />
                          <Bar dataKey = "ORB_PERCENT" fill = "#d8ff61" />
                          <Bar dataKey = "DRB_PERCENT" fill = "#86a626" />
                          <Bar dataKey = "FT_FACTOR" fill = "#86a626" />
                 </BarChart>

                 
                  <AreaChart width = {800} height = {400} data = {wlData.rows} >
                      <CartesianGrid stroke = "#ccc" strokeDasharray = " 5 5"/>
                    
                      <XAxis dataKey = "YEAR" />
                      <YAxis />
                      <Tooltip />
                      <Brush/>
                      <Area type = 'monotone' dataKey = "WINS"  stroke = "#82ca9d" fill = "#82ca9d"/>
                      <Area type = 'monotone' dataKey = "LOSSES"  stroke = "#8884d8" fill = "#8884d8"/>
                  </AreaChart>

                  <BarChart width = {800} height = {400} data = {ipData.rows}>
                          <CartesianGrid strokeDasharray = "3 3" />
                          <XAxis dataKey = "YEAR"/>
                          <YAxis/>
                          <Tooltip/>
                          <Legend/>
                          <Brush/>
                          <Bar dataKey = "IMPLIED_PROBABILITY_OF_WINNING" fill = "#82ca9d" />
                 </BarChart>
              </Container>
          </Row>


          
              <TableContainer component={Paper}>
                <Button onClick = {()=> fetchUrl('/teams')}>Load</Button>
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
                      <TableRow key = {row.TEAM_ID} onClick = {() => getData(row)}>
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

        </div>
    );
  
}



export default Teams;
