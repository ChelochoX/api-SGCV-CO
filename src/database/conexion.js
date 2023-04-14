import sql from 'mssql'
import config from '../config'

const dbSettings = {
  user     : 'sa',
  server   :  'DESKTOP-EPTCAVH',
  database :  'lj comercial',
  password : 'Cesar1983',
  dialect : 'mssql',
  dialectOptions : {
    instanceName : 'SQL08R2'
  },
  options : {
    encrypt : false,
    trustServerCertificate: true,
  }
};

export async function getConnection(){
  try {
    const pool = await sql.connect(dbSettings)
    return pool
  } catch (error) {
    console.error(error)
  }
};

export default { sql }