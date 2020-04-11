const oracledb = require('oracledb');

oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;



async function run() {

  let connection;

  try {
    connection = await oracledb.getConnection(  {
        user          : "mohamed",
        password      : "dajiya18",
        connectString : "oracle.cise.ufl.edu:1521/orcl"
    });

    const result = await connection.execute(
      `SELECT Name 
      FROM dferrer.player`
      
    );
    console.log(result.rows);

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