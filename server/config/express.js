//+require('dotenv').config()
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
    let dummyPlayer;
    
    async function run(playerid) {

        try {
          connection = await oracledb.getConnection(  {
            user          : "*",
            password      : "*",
            connectString : "oracle.cise.ufl.edu:1521/orcl"
          });
      
          players = await connection.execute(
            `SELECT name, player_id
            FROM dferrer.player
            WHERE rownum <= 10
            ORDER BY NAME`
          );

          //an example of passing a variable to the query
          dummyPlayer = await connection.execute(
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
            ORDER BY Year ASC`, {id: playerid}
          );



          dummyPlayer = JSON.parse(dummyPlayer.rows);

          players = JSON.parse(players.rows);


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
    
      
    
    // enable request logging for development debugging
    app.use(morgan('dev'));

    // body parsing middleware
    //app.use(bodyParser.json());

    app.get('/players',(req,res)=>{
        run();
        return res.send(players);
    })

    app.get('/dummyPlayer',(req,res)=>{
      // run the query by passing in the variable
      run(req.query.playerid);
      return res.send(dummyPlayer);
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

