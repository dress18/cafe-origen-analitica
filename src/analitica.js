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

function totalVendidoM(ventas) {
    return ventas.reduce((total, venta) => {
        if (venta.cantidad > 0) {
            return total + valorVenta(venta);
        }

        return total;
    }, 0);
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

function unidadesVendidasM(ventas) {
    return ventas.reduce((unidades, venta) => {
        if (venta.cantidad > 0) {
            return unidades + venta.cantidad;
        }

        return unidades;
    }, 0);
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

function ventasPorCiudadM(ventas, ciudad) {
    const ciudadBuscada = ciudad.trim().toLowerCase();

    return ventas
        .filter(
            (venta) =>
                venta.cantidad > 0 &&
                venta.ciudad.trim().toLowerCase() === ciudadBuscada
        )
        .reduce((total, venta) => total + valorVenta(venta), 0);
}

function totalPorCiudad(ventas) {
    return ventas.reduce((totales, venta) => {
        if (venta.cantidad > 0) {
            const ciudad = venta.ciudad.trim().toLowerCase();
            totales[ciudad] = (totales[ciudad] || 0) + valorVenta(venta);
        }

        return totales;
    }, {});
}

function unidadesPorProducto(ventas) {
    return ventas.reduce((totales, venta) => {
        if (venta.cantidad > 0) {
            totales[venta.producto] =
                (totales[venta.producto] || 0) + venta.cantidad;
        }

        return totales;
    }, {});
}

function topProductosPorValor(ventas, k) {
    if (!Number.isInteger(k) || k <= 0) {
        return [];
    }

    const totales = ventas.reduce((acumulados, venta) => {
        if (venta.cantidad > 0) {
            acumulados[venta.producto] =
                (acumulados[venta.producto] || 0) + valorVenta(venta);
        }

        return acumulados;
    }, {});

    return Object.entries(totales)
        .sort((a, b) => b[1] - a[1])
        .slice(0, k)
        .map(([producto]) => producto);
}

function ventasDelDia(ventas, fecha) {
    return ventas.filter(
        (venta) => venta.fecha === fecha && venta.cantidad > 0
    );
}

export {
    valorVenta,
    totalVendido,
    totalVendidoM,
    unidadesVendidas,
    unidadesVendidasM,
    ventaMayor,
    ticketPromedio,
    ventasPorCiudad,
    ventasPorCiudadM,
    totalPorCiudad,
    unidadesPorProducto,
    topProductosPorValor,
    ventasDelDia,
};