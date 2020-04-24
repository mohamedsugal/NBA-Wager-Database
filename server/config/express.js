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

    let loaded = false;
    
    
    async function run(id,string) {

        try {
          connection = await oracledb.getConnection(  {
              user          : "",
              password      : "",
              connectString : "oracle.cise.ufl.edu:1521/orcl"
          });
          if(string === "all" || id === 0)
          players = await connection.execute(
            `SELECT p.Player_id, p.Name, p.Weight, p.Height, p.College, p.Position, SUM(pgs.POINTS) as Total_Points
            FROM dferrer.Player p JOIN dferrer.Player_Game_Stats pgs ON p.player_id = pgs.player_id
            GROUP BY p.Player_id, p.Name, p.Weight, p.Height, p.College, p.Position
            ORDER BY  SUM(pgs.POINTS) DESC`
          );
            /*
          bookies = await connection.execute(
            `SELECT *
            FROM dferrer.bookie`
          );*/

          if(string === "all" || id === 0)
          teams = await connection.execute(
            `SELECT *
            FROM dferrer.team
            WHERE TEAM_NAME IS NOT NULL`
          );
          
          if(string === "playerStats" || id === 0)
          playerStats = await connection.execute(
            `SELECT Year, 
            SUM(pgs.POINTS) as Total_Points,
            AVG(pgs.POINTS) as Avg_points,
            SUM(pgs.FIELD_GOALS-pgs.THREE_POINT_FIELD_GOALS) as Total_2FG,
            SUM(pgs.THREE_POINT_FIELD_GOALS) as Total_3FG,
            SUM(pgs.Blocks) as Total_Blocks,
            SUM(pgs.Assists) as Total_Assists,
            SUM(pgs.STEALS) as Total_steals,
            NVL(100*AVG((pgs.FIELD_GOALS-pgs.THREE_POINT_FIELD_GOALS)/NULLIF((pgs.FIELD_GOAL_ATTEMPTS-pgs.THREE_POINT_FIELD_GOAL_ATTEMPTS),0)),0) as P2percent, 
            NVL(100*AVG((pgs.THREE_POINT_FIELD_GOALS)/NULLIF((pgs.THREE_POINT_FIELD_GOAL_ATTEMPTS),0)),0) as P3percent, 
            NVL(AVG(100*(pgs.Assists)/NULLIF(((((pgs.Minutes_Played)/((m.Minutes_Played)/5))*(m.FIELD_GOALS))-(pgs.FIELD_GOALS)),0)),0) as ASTpercent,
            NVL(AVG(100*((pgs.Blocks)*((m.Minutes_Played)/5))/NULLIF(((pgs.Minutes_Played)*(mo.FIELD_GOAL_ATTEMPTS-mo.THREE_POINT_FIELD_GOAL_ATTEMPTS)),0)),0) as BLKpercent,
            NVL(AVG(100*((pgs.DEFENSIVE_REBOUNDS)*((m.Minutes_Played)/5))/NULLIF(((pgs.Minutes_Played)*(m.DEFENSIVE_REBOUNDS+mo.OFFENSIVE_REBOUNDS)),0)),0) as DRBpercent,
            NVL(AVG(100*((pgs.OFFENSIVE_REBOUNDS)*(m.Minutes_Played)/5)/NULLIF(((pgs.Minutes_Played)*(m.OFFENSIVE_REBOUNDS+mo.DEFENSIVE_REBOUNDS)),0)),0) as ORBpercent,
            NVL(100*AVG(((pgs.FIELD_GOALS) + 0.5*(pgs.THREE_POINT_FIELD_GOALS))/NULLIF((pgs.FIELD_GOAL_ATTEMPTS),0)),0) as eFGpercent,
            NVL(100*AVG((pgs.FIELD_GOALS)/NULLIF((pgs.FIELD_GOAL_ATTEMPTS),0)),0) as FGpercent,
            NVL(100*AVG((pgs.FREE_THROWS)/NULLIF((pgs.FREE_THROW_ATTEMPTS),0)),0) as FTpercent,
            NVL(AVG((100*((pgs.STEALS)*(m.Minutes_Played)/5)/NULLIF(((pgs.Minutes_Played)*(0.5*((mo.FIELD_GOAL_ATTEMPTS + 0.4 * mo.FREE_THROW_ATTEMPTS - 1.07 * (mo.OFFENSIVE_REBOUNDS/(mo.OFFENSIVE_REBOUNDS + m.DEFENSIVE_REBOUNDS)) * (mo.FIELD_GOAL_ATTEMPTS - mo.FIELD_GOALS) + mo.TURNOVERS) + (m.FIELD_GOAL_ATTEMPTS + 0.4* m.FREE_THROW_ATTEMPTS - 1.07 * (m.OFFENSIVE_REBOUNDS/(m.OFFENSIVE_REBOUNDS + mo.DEFENSIVE_REBOUNDS)) * (m.FIELD_GOAL_ATTEMPTS - m.FIELD_GOALS) + m.TURNOVERS)))),0))),0) as STLpercent,
            NVL(AVG((100*((pgs.REBOUNDS)*(m.Minutes_Played)/5)/NULLIF(((pgs.Minutes_Played)*(m.REBOUNDS + mo.REBOUNDS)),0))),0) as TRBpercent,
            NVL(AVG(pgs.POINTS + 0.4 * pgs.FIELD_GOALS - 0.7 * pgs.FIELD_GOAL_ATTEMPTS - 0.4 * (pgs.FREE_THROW_ATTEMPTS - pgs.FREE_THROWS) + 0.7 * pgs.OFFENSIVE_REBOUNDS + 0.3 * pgs.DEFENSIVE_REBOUNDS + pgs.STEALS + 0.7 * pgs.Assists + 0.7 * pgs.Blocks - 0.4 * pgs.PERSONAL_FOULS - pgs.TURNOVERS),0) as GameScore
            FROM dferrer.Player_game_stats pgs JOIN dferrer.MATCH m ON pgs.game_id = m.game_id AND pgs.team_id = m.team_id JOIN dferrer.MATCH mo ON mo.game_id = m.game_id AND mo.team_id = m.a_team_id
            WHERE player_id = :id
            GROUP BY Year
            ORDER BY Year ASC`, {id: id}
          );
            //not working?
            
          if(string === "teamPoints" || id === 0)
          teamPoints = await connection.execute(
              `SELECT Year, 
                      SUM(Points) as Total_points,
                      NVL(100*AVG((FG + 0.5 * P3)/NULLIF(FGA,0)),0) as eFGpercent,
                      NVL((100*AVG(TOV/NULLIF(FGA + 0.44 * FTA + TOV,0))),0) as TOVpercent,
                      NVL(100*AVG(ORB/(NULLIF(ORB + OppORB,0))), 0) as ORBpercent,
                      NVL(100*AVG(DRB/(NULLIF(DRB + OppDRB,0))), 0) as DRBpercent,
                      NVL(AVG(FT/NULLIF(FGA,0)),0) as FTfactor
              FROM
              (
                  SELECT m.SEASON_YEAR as Year,
                        m.points as Points,
                        m.Field_Goals as FG, 
                        m.Free_throws as FT,
                        m.THREE_POINT_FIELD_GOALS as P3, 
                        m.FIELD_GOAL_ATTEMPTS as FGA,
                        m.FREE_THROW_ATTEMPTS as FTA,
                        m.TURNOVERS as TOV,
                        m.OFFENSIVE_REBOUNDS as ORB,
                        m.defensive_rebounds as DRB,
                        mo.defensive_rebounds as OppDRB,
                        mo.OFFENSIVE_REBOUNDS as OppORB
                        FROM  dferrer.MATCH m  JOIN (SELECT * FROM dferrer.MATCH)mo ON mo.game_id = m.game_id AND mo.team_id = m.a_team_id
                        WHERE m.team_id = :id AND m.FIELD_GOAL_ATTEMPTS IS NOT NULL AND m.THREE_POINT_FIELD_GOALS IS NOT NULL AND m.TURNOVERS IS NOT NULL AND m.OFFENSIVE_REBOUNDS IS NOT NULL AND mo.OFFENSIVE_REBOUNDS IS NOT NULL
              )
              GROUP BY Year
              ORDER BY Year ASC`,{id: id}
            );

            if(string === "teamWL"|| id === 0)
            teamWL = await connection.execute(
              `SELECT w.SEASON_YEAR as Year, w.Wins as Wins, l.Losses as Losses
              FROM
              (
                      SELECT  team_id,SEASON_YEAR, COUNT(WL) as WINS
                      FROM dferrer.MATCH
                      WHERE team_id = :id AND WL = 'W'
                      GROUP BY SEASON_YEAR, team_id
                      ORDER BY SEASON_YEAR ASC
              ) w
              JOIN
              (
                      SELECT team_id, SEASON_YEAR , COUNT(WL) as Losses
                      FROM dferrer.MATCH
                      WHERE team_id = :id AND WL = 'L'
                      GROUP BY SEASON_YEAR, team_id
                      ORDER BY SEASON_YEAR ASC
              ) l
              ON w.team_id = l.team_id AND w.SEASON_YEAR = l.SEASON_YEAR
              ORDER BY w.SEASON_YEAR ASC`,{id: id}
            );

            if(string === "impliedProb" || id === 0)
            impliedProb = await connection.execute(
              `SELECT m.team_id, m.SEASON_YEAR as Year,
              ROUND(100*AVG(CASE
                  WHEN Price1 > 0 THEN (100/(ml.Price1 + 100)) 
                  WHEN Price1 < 0 THEN ((-1*ml.Price1)/((-1*ml.Price1)+100)) 
              END),2) AS Implied_Probability_of_Winning
              FROM dferrer.MATCH m JOIN dferrer.HAS_BETS hb ON m.game_id = hb.game_id AND m.team_id = hb.team_id JOIN dferrer.Money_Lines ml ON hb.game_id = ml.game_id AND hb.team_id = ml.team_id
              WHERE m.team_id = :id
              GROUP BY m.SEASON_YEAR, m.team_id
              ORDER BY m.SEASON_YEAR ASC`,{id: id}
            )

          loaded = true;
            
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

      if(!loaded)
      run(0,"null");
    
      
    
    // enable request logging for development debugging
    app.use(morgan('dev'));

  
    app.get('/players',(req,res)=>{
        run(0,"all");
        return res.send(players);
    })
    /*app.get('/bookies',(req,res)=>{
      return res.send(bookies);
  })*/

    app.get('/playerStats',(req,res)=>{
      // run the query by passing in the variable
      run(req.query.playerid,"playerStats");
      return res.send(playerStats);
  })
 
    app.get('/teams',(req,res)=>{
      run(0,"all");
      return res.send(teams);
  })

    app.get('/teamPoints',(req,res)=>{
      // run the query by passing in the variable
      run(req.query.teamid, "teamPoints");
      return res.send(teamPoints);
    })

    app.get('/teamWL', (req,res)=>{
      run(req.query.teamid, "teamWL");
      return res.send(teamWL);
    })

    app.get('/impliedProb', (req,res)=>{
      run(req.query.teamid, "impliedProb");
      return res.send(impliedProb);
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

