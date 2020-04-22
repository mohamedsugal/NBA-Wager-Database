+require('dotenv').config()
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
    
    async function run() {

        try {
          connection = await oracledb.getConnection(  {
            user          : "dferrer",
            password      : process.env.NODE_ORACLEDB_PASSWORD,
            connectString : "oracle.cise.ufl.edu:1521/orcl"
          });
      
          players = await connection.execute(
            `SELECT name, player_id
            FROM dferrer.player
            ORDER BY NAME`
          );

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
            Where player_id = 893
            GROUP BY YEAR, Player_name
            ORDER BY Year ASC`
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
    
      run();
    
    // enable request logging for development debugging
    app.use(morgan('dev'));

    // body parsing middleware
    //app.use(bodyParser.json());

    app.get('/players',(req,res)=>{
        res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
        return res.send(players);
    })

    app.get('/dummyPlayer',(req,res)=>{
      res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
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

