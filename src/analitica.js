function valorVenta(venta) {
    return venta.cantidad * venta.precio;
}

function totalVendido(ventas) {
    let total = 0;

    for (const venta of ventas) {
        if (venta.cantidad > 0) {
            total += valorVenta(venta);
        }
    }

    return total;
}

function unidadesVendidas(ventas) {
    let unidades = 0;

    for (const venta of ventas) {
        if (venta.cantidad > 0) {
            unidades += venta.cantidad;
        }
    }

    return unidades;
}

function ventaMayor(ventas) {
    let mayor = null;

    for (const venta of ventas) {
        if (
            venta.cantidad > 0 &&
            (mayor === null || valorVenta(venta) > valorVenta(mayor))
        ) {
            mayor = venta;
        }
    }

    return mayor;
}

function ticketPromedio(ventas) {
    let total = 0;
    let cantidadValidas = 0;

    for (const venta of ventas) {
        if (venta.cantidad > 0) {
            total += valorVenta(venta);
            cantidadValidas += 1;
        }
    }

    if (cantidadValidas === 0) {
        return 0;
    }

    return total / cantidadValidas;
}

function ventasPorCiudad(ventas, ciudad) {
    const ciudadBuscada = ciudad.trim().toLowerCase();
    let total = 0;

    for (const venta of ventas) {
        if (
            venta.cantidad > 0 &&
            venta.ciudad.trim().toLowerCase() === ciudadBuscada
        ) {
            total += valorVenta(venta);
        }
    }

    return total;
}

export {
    valorVenta,
    totalVendido,
    unidadesVendidas,
    ventaMayor,
    ticketPromedio,
    ventasPorCiudad,
};