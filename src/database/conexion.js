const sql = require("mssql");
import config from "../config";

const dbSettings = {
  user: config.dbUser,
  server: config.dbServer,
  database: config.dbDatabase,
  password: config.dbPassword,
  dialect: "mssql",
  //port: 1433,
  dialectOptions: {
    //instanceName : config.dbInstanceName
    options: {
      encrypt: true,
      trustServerCertificate: true,
      trustedConnection: true,
      useUTC: true,
    },
  },
};

export async function getConnection() {
  try {
    const pool = await sql.connect(dbSettings);
    return pool;
  } catch (error) {
    console.error(error);
  }
}

export default { sql };
