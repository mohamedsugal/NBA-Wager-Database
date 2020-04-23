const path = require('path'),
    express = require('express'),
    mongoose = require('mongoose'),
    morgan = require('morgan'),
    //bodyParser = require('body-parser'),
    oracledb = require('oracledb')

oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;
    

module.exports.init = () => {

    
    mongoose.set('useCreateIndex', true);
    mongoose.set('useFindAndModify', false);
    

    // initialize app
    const app = express();
    let connection;
    let players;
    let bookies;
    let playerStats;
    let teams;
    let teamPoints;
    
    
    async function run(id) {

        try {
          connection = await oracledb.getConnection(  {
              user          : "*",
              password      : "*",
              connectString : "oracle.cise.ufl.edu:1521/orcl"
          });
      
          players = await connection.execute(
            `SELECT *
            FROM dferrer.player`
          );

          bookies = await connection.execute(
            `SELECT *
            FROM dferrer.bookie`
          );

          teams = await connection.execute(
            `SELECT *
            FROM dferrer.team`
          );

          playerStats = await connection.execute(
            `SELECT YEAR, 
            Player_name, 
            SUM(Points) AS Total_points,
            AVG(Points) AS Avg_points, 
            SUM(field_goals-THREE_POINT_FIELD_GOALS) AS Total_2FG, 
            SUM(THREE_POINT_FIELD_GOALS) AS Total_3FG,
            SUM(Blocks) AS Total_Blocks,
            SUM(Assists) AS Total_Assists,
            SUM(Steals) AS Total_Steals
            FROM dferrer.player_game_stats
            Where player_id = :id
            GROUP BY YEAR, Player_name
            ORDER BY Year ASC`, {id: id}
          );
            //not working?
            
          teamPoints = await connection.execute(
            `SELECT Season_Year as Year, SUM(POINTS)
            FROM MATCH
            WHERE team_id = :id
            GROUP BY Season_Year
            ORDER BY Season_Year ASC`,{id: id}
          );

            
        } catch (err) {
          console.error(err);
        } finally {
          if (connection) {
            try {
              await connection.close();
            } catch (err) {
              console.error(err);
            }
          }
        }
      }
    
      run();
    
    // enable request logging for development debugging
    app.use(morgan('dev'));

  
    app.get('/players',(req,res)=>{
        return res.send(players);
    })
    app.get('/bookies',(req,res)=>{
      return res.send(bookies);
  })

    app.get('/playerStats',(req,res)=>{
      // run the query by passing in the variable
      run(req.query.playerid);
      return res.send(playerStats);
  })
 
    app.get('/teams',(req,res)=>{
      return res.send(teams);
  })

    app.get('/teamPoints',(req,res)=>{
      // run the query by passing in the variable
      console.log(teamPoints);
      run(req.query.teamid);
      return res.send(teamPoints);
    })

    if (process.env.NODE_ENV === 'production') {
        // Serve any static files
        app.use(express.static(path.join(__dirname, '../../client/build')));

        // Handle React routing, return all requests to React app
        app.get('*', function(req, res) {
            res.sendFile(path.join(__dirname, '../../client/build', 'index.html'));
        });
    }

    return app
}

