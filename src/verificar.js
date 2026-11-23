import { ventas } from "./datos.js";
import {
    totalVendido,
    totalVendidoM,
    unidadesVendidas,
    unidadesVendidasM,
    ventasPorCiudad,
    ventasPorCiudadM,
} from "./analitica.js";

function mostrarComparacion(nombre, resultadoCiclo, resultadoMetodo) {
    const estado =
        JSON.stringify(resultadoCiclo) === JSON.stringify(resultadoMetodo)
            ? "OK"
            : "DIFERENTE";

    console.log(`${nombre}: ${estado}`);
}

mostrarComparacion(
    "totalVendido",
    totalVendido(ventas),
    totalVendidoM(ventas)
);
mostrarComparacion(
    "unidadesVendidas",
    unidadesVendidas(ventas),
    unidadesVendidasM(ventas)
);
mostrarComparacion(
    "ventasPorCiudad (Medellín)",
    ventasPorCiudad(ventas, "Medellín"),
    ventasPorCiudadM(ventas, "Medellín")
);
