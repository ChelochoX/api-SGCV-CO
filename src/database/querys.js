
export const queries = {
  //DATOS DE CLIENTES
  consultaxcedula: "SELECT * FROM TP_CLIENTE T WHERE T.CI = ",
  consultaxnombre: "SELECT * FROM TP_CLIENTE T WHERE T.NOM_APE LIKE ",
  consultaxdireccion: "SELECT * FROM TP_CLIENTE T WHERE T.DIRECCION LIKE ",
  //FACTURAS PENDIENTES DE PAGO POR STORE PROCEDURE

};