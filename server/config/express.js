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
    let custom;
    
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

          bookies = await connection.execute(
            `SELECT *
            FROM dferrer.bookie`
          );

          

          players = JSON.parse(players.rows);
          bookie = JSON.parse(player.JSON)


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
    app.get('/bookies',(req,res)=>{
      res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
      return res.send(bookies);
  })
    //this is where the dynamic query from the front end will be recieved
    app.get('/custom',(req,res)=>{
      res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
     

      custom = JSON.parse(custom.JSON);

      return res.send(custom);
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

