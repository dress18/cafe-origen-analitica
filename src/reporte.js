import { ventas } from "./datos.js";
import {
    valorVenta,
    totalVendido,
    ticketPromedio,
    unidadesVendidas,
    ventaMayor,
    totalPorCiudad,
    unidadesPorProducto,
    topProductosPorValor,
    ventasDelDia,
} from "./analitica.js";

const anchoEtiqueta = 30;

function formatoPesos(valor) {
    return `$ ${valor.toLocaleString("es-CO")}`;
}

function imprimirFila(etiqueta, valor) {
    console.log(`${etiqueta.padEnd(anchoEtiqueta)} ${valor}`);
}

function normalizarCiudad(ciudad) {
    return ciudad.trim().toLowerCase();
}

function imprimirResumenDia(fecha) {
    const ventasDelDiaValidadas = ventasDelDia(ventas, fecha);
    const unidades = unidadesVendidas(ventasDelDiaValidadas);
    const total = totalVendido(ventasDelDiaValidadas);

    console.log(`\n  ${fecha}`);
    imprimirFila("Registros válidos:", ventasDelDiaValidadas.length);
    imprimirFila("Unidades:", unidades);
    imprimirFila("Total vendido:", formatoPesos(total));
}

const ventasValidas = ventas.filter((venta) => venta.cantidad > 0);
const ciudadPorClave = new Map();
for (const venta of ventasValidas) {
    const clave = normalizarCiudad(venta.ciudad);
    if (!ciudadPorClave.has(clave)) {
        ciudadPorClave.set(clave, venta.ciudad.trim());
    }
}

const valoresPorProducto = ventasValidas.reduce((totales, venta) => {
    totales[venta.producto] =
        (totales[venta.producto] || 0) + valorVenta(venta);
    return totales;
}, {});
const mayorVenta = ventaMayor(ventas);

console.log("==============================================================");
console.log("             REPORTE DE ANALÍTICA - CAFÉ ORIGEN");
console.log("==============================================================");

console.log("\n1. RESUMEN GENERAL");
imprimirFila("Ventas válidas:", ventasValidas.length);
imprimirFila("Unidades vendidas:", unidadesVendidas(ventas));
imprimirFila("Total vendido:", formatoPesos(totalVendido(ventas)));
imprimirFila("Ticket promedio:", formatoPesos(ticketPromedio(ventas)));
imprimirFila(
    "Venta de mayor valor:",
    mayorVenta
        ? `${mayorVenta.producto} (${formatoPesos(
              mayorVenta.cantidad * mayorVenta.precio
          )})`
        : "Sin ventas válidas"
);

console.log("\n2. VENTAS POR CIUDAD");
const totalesPorCiudad = totalPorCiudad(ventas);
for (const [ciudad, total] of Object.entries(totalesPorCiudad)) {
    imprimirFila(ciudadPorClave.get(ciudad) ?? ciudad, formatoPesos(total));
}

console.log("\n3. UNIDADES POR PRODUCTO");
for (const [producto, unidades] of Object.entries(
    unidadesPorProducto(ventas)
)) {
    imprimirFila(producto, unidades);
}

console.log("\n4. TOP 3 DE PRODUCTOS POR VALOR");
for (const [indice, producto] of topProductosPorValor(ventas, 3).entries()) {
    imprimirFila(
        `${indice + 1}. ${producto}`,
        formatoPesos(valoresPorProducto[producto] ?? 0)
    );
}

console.log("\n5. RESUMEN DE VENTAS POR DÍA");
imprimirResumenDia("2026-09-01");
imprimirResumenDia("2026-09-07");

console.log("\n==============================================================");
