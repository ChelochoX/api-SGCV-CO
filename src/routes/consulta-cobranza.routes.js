import { Router } from "express";
import {
  cliente,
  cuentasPorPagarPorCodigo,
  cuentasPagadasPorCodigo,
  abonadas,
  pendientes,
  gestionarCobranza
} from "../controllers/consulta-cobranza.controller";

const router = Router()
//aqui obtenemos datos de clientes
//por Cedula,Nombre, Direccion
router.post("/cliente/datos", cliente);
//Aqui obtenemos las facturas de clientes
//que tengas cuotas pendientes a pagar
router.get("/cliente/factura:id", cuentasPorPagarPorCodigo);
//Aqui obtenemos las facturas de clientes
//que tienen cuotas ya abonadas
router.get("/cliente/factura/pagada/:id", cuentasPagadasPorCodigo);
//Aqui obtenemos las cuotas de clientes ya abonadas
router.get("/cliente/cuota/abonada/:facturaNRO", abonadas);
//Aqui obtenemos las cuotas de clientes pendientes a abonar
router.get("/cliente/cuota/pendiente/:facturaNRO", pendientes);
//Aqui Gestionamos los cobros a los clientes
router.post("/cliente/cuota/cobro/", gestionarCobranza);

export default router