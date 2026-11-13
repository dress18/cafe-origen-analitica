import { ventas } from "./datos.js";

function imprimirCantidadRegistros(ventas) {
    return ventas.length;
}

function imprimirPrimerRegistro(ventas){
    return ventas[0];
}

function imprimirUltimoRegistro(ventas){
    return ventas[ventas.length - 1];
}

console.log("Cantidad de registros:", imprimirCantidadRegistros(ventas));
console.log("Primer registro:", imprimirPrimerRegistro(ventas));
console.log("Último registro:", imprimirUltimoRegistro(ventas));

console.log("Cuarto producto registrado:", ventas[3].producto);
console.table(ventas);