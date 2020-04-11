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
    
    async function run() {

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

