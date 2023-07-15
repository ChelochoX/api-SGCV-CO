import { getConnection,sql,queries } from "../database";

//Consultamos Datos de Cliente
export const cliente = async (req, res) => {
  //BUSCAMOS POR CEDULA o NOMBRES o DIRECCION
  const { cedula, nombre_apellido, direccion,criteriobusqueda } = req.body;
  //settings
  let criterio_query
  let parametro_entrada
  const criteriobusquedaNumber = parseInt(criteriobusqueda);

  if (!cedula & !nombre_apellido & !direccion & !criteriobusqueda)
  {
    return res.status(400).json({msg: "Ninguno de los parametros de entrada tiene datos"});
  }
  if (criteriobusquedaNumber === 1) {
    criterio_query = queries.consultaxcedula;
    parametro_entrada = cedula;
  }
  // criterio 2 busqueda por nombre-apellido
  if (criteriobusquedaNumber === 2) {
    criterio_query = queries.consultaxnombre;
    parametro_entrada = "'%" + nombre_apellido + "%'";
  }
  //criterio 3 busqueda por direccion
  if (criteriobusquedaNumber === 3) {
    criterio_query = queries.consultaxdireccion;
    parametro_entrada = "'%" + direccion + "%'";
  }

try {
  const pool = await getConnection();
  const result = await pool
    .request()
    .query(criterio_query + parametro_entrada);
  res.json(result.recordset);
}
 catch (error) {
  res.status(500);
  res.send(error.message)
}
};
//BUSCAMOS FACTURAS POR PAGAR POR CODIGO DE CLIENTE
export const cuentasPorPagarPorCodigo = async (req,res) => {
  const { id } = req.params;
  //settings
  if (!id) {
    return res.status(400).json({ msg: "Parametros de entrada sin datos" });
  }
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("id", id)
      .execute("API_FACTURA_PENDIENTE");
    res.send(result.recordset);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

//BUSCAMOS FACTURAS PAGADAS POR CODIGO DE CLIENTE
export const cuentasPagadasPorCodigo = async (req, res) => {
  const { id } = req.params;
  //settings
  if (!id) {
    return res.status(400).json({ msg: "Parametros de entrada sin datos" });
  }
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("id", id)
      .execute("API_FACTURAS_PAGADAS");
    res.send(result.recordset);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

//BUSCAMOS LAS CUOTAS QUE YA FUERON ABONADAS
export const abonadas = async (req, res) => {
  const { facturaNRO } = req.params;
  //settings
  if (!facturaNRO) {
    return res.status(400).json({ msg: "Parametros de entrada sin datos" });
  }
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("facturaNRO", facturaNRO)
      .execute("API_CUOTAS_PAGADAS");
    res.send(result.recordset);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

//BUSCAMOS LAS CUOTAS PENDIENTES A PAGAR
export const pendientes = async (req, res) => {
  const { facturaNRO } = req.params;
  //settings
  if (!facturaNRO) {
    return res.status(400).json({ msg: "Parametros de entrada sin datos" });
  }
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("facturaNRO", facturaNRO)
      .execute("API_CUOTAS_PENDIENTES");
    res.send(result.recordset);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

//REALIZAMOS LA GESTION DE COBRANZA
//BUSCAMOS LAS CUOTAS PENDIENTES A PAGAR
export const gestionarCobranza = async (req, res) => {
  const { rangoCuotas,
  nroFactura,codigoCliente,montoPago, cobrador } = req.body;
  //settings
  if (!rangoCuotas || !nroFactura || !codigoCliente || !montoPago || !cobrador) {
    return res.status(400).json({ msg: "Parametros de entrada sin datos" });
  }
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("Cuotas", rangoCuotas)
      .input("FacturaNro", nroFactura)
      .input("CodigoCliente", codigoCliente)
      .input("MontoPago", montoPago)
      .input("Cobrador", cobrador)
      .execute("API_GESTIONAR_COBRO");
    res.send(result.recordset);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

