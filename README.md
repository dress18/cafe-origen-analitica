# Café Origen: analítica de ventas

Proyecto de práctica para analizar registros de ventas de Café Origen con
JavaScript. Incluye indicadores calculados con ciclos y métodos de arreglo,
agrupaciones por ciudad y producto, comparación de implementaciones y un reporte
en consola.

## Requisitos

- Node.js con soporte para módulos ECMAScript.
- No requiere instalar dependencias.

## Ejecución

Desde la raíz del proyecto:

```bash
node src/reporte.js
```

Para comparar los indicadores implementados con ciclos y con métodos:

```bash
node src/verificar.js
```

## Preguntas que responde

- ¿Cuánto se vendió en total y cuántas unidades se vendieron?
- ¿Cuál fue el ticket promedio y cuál registro tuvo el mayor valor?
- ¿Cuánto se vendió en cada ciudad, sin duplicar grupos por mayúsculas o
  espacios sobrantes?
- ¿Cuántas unidades se vendieron de cada producto y cuáles fueron los tres
  productos que más dinero generaron?
- ¿Qué ventas válidas hubo en una fecha determinada y cuál fue su total?

El reporte presenta el resumen de un día con ventas y otro sin ventas. Las
ventas con cantidad igual a cero no se consideran válidas para los indicadores.
