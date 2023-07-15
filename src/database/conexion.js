const sql = require("mssql");
import config from "../config";

const dbSettingsCloud = {
  user: config.dbUser,
  server: config.dbServer,
  database: config.dbDatabase,
  password: config.dbPassword,
  dialect: "mssql",
  port: config.port,
  dialectOptions: {
    instanceName: config.dbInstanceName,
    options: {
      encrypt: false,
      trustServerCertificate: true,
      ssl: {
        ciphers: "TLSv1.2",
      },
      trustedConnection: true,
      useUTC: true
    },
  },
};

const dbSettingsLocal = {
  user: config.dbUser,
  password: config.dbPassword,
  server: config.dbServer,
  database: config.dbDatabase,
  port: 1433,
  instanceName: config.dbInstanceName,
  encrypt: false,
};


export async function getConnection() {
  try {
    const pool = await sql.connect((config.DB_INSTANCIA === "Cloud")
        ? dbSettingsCloud
        : dbSettingsLocal
    );
    //const result = await pool.request().query("select 1");
    console.log("Conexión exitosa");
    return pool;
  } catch (error) {
     console.error("Error al conectar a la base de datos:", error);
  }
}

getConnection();


/*async function connectToDatabase() {
  try {
    await sql.connect(dbSettings);
    console.log("Conexión exitosa");
  } catch (error) {
    console.error("Error al conectar a la base de datos:", error);
  }
}

connectToDatabase();*/

export default { sql };
