## Diccionario de datos

| Propiedad | Tipo de datos | Significado |
| :--- | :---: | ---: |
| id | int | Identificador único de cada registro de venta |
| fecha | string | Fecha de la venta en formato `AAAA-MM-DD` |
| cliente | string | Código del cliente asociado a la venta |
| producto | string | Nombre del producto vendido |
| ciudad | string | Ciudad registrada para la venta |
| cantidad | int | Cantidad de unidades registradas en la venta |
| precio | int | Precio unitario del producto, expresado en pesos colombianos |

## Casos borde detectados

- **Ciudad con mayúsculas inconsistentes:** en el registro `id: 5` aparece `medellín`, mientras que en otros registros aparece `Medellín`. **Decisión:** normalizar espacios y mayúsculas/minúsculas para el análisis y unificar ambas variantes como `medellin`, sin modificar el dato original.
- **Cantidad igual a cero:** el registro `id: 8` tiene `cantidad: 0`, aunque está incluido como venta. **Decisión:** marcarlo para revisión y no contabilizarlo como unidades vendidas ni como ingreso hasta confirmar si fue una venta sin unidades o un error de captura.
- **Códigos de cliente repetidos y sin catálogo de referencia:** `C01`, `C02` y `C03` aparecen en varios registros; esto puede representar compras distintas del mismo cliente, no necesariamente duplicados. **Decisión:** conservar cada registro como una transacción independiente, agrupar clientes por su código y no eliminar filas solo porque compartan cliente; validar los códigos contra un catálogo si está disponible.
