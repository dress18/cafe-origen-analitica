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

## Plan de indicadores (pseudocódigo previo a la programación)

- **`valorVenta(venta)`**
  - Iniciar el resultado como `cantidad × precio`.
  - Devolver ese resultado. Es la función auxiliar de los indicadores monetarios.
- **`totalVendido(ventas)`**
  - Iniciar `total` en `0`.
  - Recorrer cada `venta` con `for...of`.
  - Si `cantidad > 0`, acumular `valorVenta(venta)` en `total`.
  - Devolver `total`.
- **`unidadesVendidas(ventas)`**
  - Iniciar `unidades` en `0`.
  - Recorrer cada `venta` con `for...of`.
  - Si `cantidad > 0`, acumular `cantidad` en `unidades`.
  - Devolver `unidades`.
- **`ventaMayor(ventas)`**
  - Iniciar `mayor` en `null`, porque todavía no hay un registro candidato.
  - Recorrer cada `venta` con `for...of`.
  - Si `cantidad > 0` y no hay candidato o `valorVenta(venta)` lo supera, guardar el registro completo en `mayor`.
  - Devolver `mayor`; para un arreglo vacío o sin ventas válidas se devuelve `null`.
- **`ticketPromedio(ventas)`**
  - Iniciar `total` y `cantidadValidas` en `0`.
  - Recorrer cada `venta` con `for...of`.
  - Si `cantidad > 0`, acumular `valorVenta(venta)` y aumentar `cantidadValidas` en `1`.
  - Si no hay ventas válidas, devolver `0`; en otro caso devolver `total / cantidadValidas`.
- **`ventasPorCiudad(ventas, ciudad)`**
  - Normalizar la ciudad solicitada quitando espacios al inicio/final y convirtiendo a minúsculas.
  - Iniciar `total` en `0` y recorrer cada `venta` con `for...of`.
  - Si la venta es válida (`cantidad > 0`) y su ciudad normalizada coincide, acumular `valorVenta(venta)`.
  - Devolver `total`.

**Decisiones para entradas vacías o sin ventas válidas:** los totales y unidades devuelven `0`; el ticket promedio devuelve `0` porque no hay divisor válido; `ventaMayor` devuelve `null`, ya que no existe un registro que pueda devolver. Una venta con cantidad igual a cero no suma unidades ni ingreso y no participa en el promedio ni en la búsqueda de la venta mayor.

## Pruebas de las funciones

Las funciones que reciben arreglos se probaron con `ventas` completo (12 registros), el arreglo de un registro `[ventas[0]]` y el arreglo vacío `[]`. Para `ventasPorCiudad` se usaron respectivamente `"  mEdElLíN "`, `"medellín"` y `"Medellín"` como ciudad solicitada. `valorVenta` recibe un registro, no un arreglo: se probó con el registro `id: 1` y el registro `id: 8` (cantidad cero).

| Función | Arreglo completo | Un registro (`id: 1`) | Arreglo vacío |
| :--- | ---: | ---: | ---: |
| `totalVendido` | `985000` | `84000` | `0` |
| `unidadesVendidas` | `21` | `2` | `0` |
| `ventaMayor` | Registro completo `id: 10` | Registro completo `id: 1` | `null` |
| `ticketPromedio` | `89545.45454545454` | `84000` | `0` |
| `ventasPorCiudad` | `476000` | `84000` | `0` |

Comprobaciones de `valorVenta`: para el registro `id: 1` devuelve `84000`, y para el registro `id: 8`, que tiene cantidad cero, devuelve `0`. Esta función recibe un registro y no un arreglo, por lo que las pruebas de arreglo completo, unitario y vacío no aplican. La prueba automatizada comparó los resultados con aserciones; todas pasaron.

## Trazas manuales

### Traza de `totalVendido(ventas)`

Se acumula el valor de cada venta válida (`cantidad > 0`); el registro `id: 8` se omite.

| ID | Cantidad × precio | Condición | Total acumulado |
| ---: | ---: | :--- | ---: |
| 1 | 2 × 42000 = 84000 | válida | 84000 |
| 2 | 1 × 26000 = 26000 | válida | 110000 |
| 3 | 1 × 95000 = 95000 | válida | 205000 |
| 4 | 1 × 42000 = 42000 | válida | 247000 |
| 5 | 3 × 45000 = 135000 | válida | 382000 |
| 6 | 2 × 26000 = 52000 | válida | 434000 |
| 7 | 1 × 120000 = 120000 | válida | 554000 |
| 8 | 0 × 42000 = 0 | omitida | 554000 |
| 9 | 2 × 45000 = 90000 | válida | 644000 |
| 10 | 4 × 42000 = 168000 | válida | 812000 |
| 11 | 1 × 95000 = 95000 | válida | 907000 |
| 12 | 3 × 26000 = 78000 | válida | 985000 |

Resultado manual: `985000`. Resultado del programa para `totalVendido(ventas)`: `985000`. Coinciden.

### Traza de `ventasPorCiudad(ventas, "Medellín")`

La comparación normaliza mayúsculas/minúsculas y quita espacios sobrantes. Solo se acumulan las ventas válidas de Medellín; `id: 5` coincide aunque el dato original diga `medellín`.

| ID | Ciudad registrada | ¿Coincide y la cantidad es mayor que 0? | Total acumulado |
| ---: | :--- | :--- | ---: |
| 1 | Medellín | Sí | 84000 |
| 2 | Bogotá | No | 84000 |
| 3 | Cali | No | 84000 |
| 4 | Medellín | Sí | 126000 |
| 5 | medellín | Sí | 261000 |
| 6 | Bogotá | No | 261000 |
| 7 | Medellín | Sí | 381000 |
| 8 | Cali (cantidad 0) | No | 381000 |
| 9 | Cali | No | 381000 |
| 10 | Pereira | No | 381000 |
| 11 | Medellín | Sí | 476000 |
| 12 | Bogotá | No | 476000 |

Resultado manual: `476000`. Resultado del programa para `ventasPorCiudad(ventas, "  mEdElLíN ")`: `476000`. Coinciden.

## Indicadores con métodos de arreglo y agrupaciones

Para documentar cada función, respondo las preguntas de la sesión:

- **`totalVendidoM(ventas)`**
  - ¿Qué recorro? El arreglo `ventas` con `reduce`.
  - ¿Qué filtro? Solo ventas con `cantidad > 0`.
  - ¿Qué transformo? Cada venta válida a su importe mediante `valorVenta`.
  - ¿Qué acumulo? Los importes en un total iniciado en `0`.
  - ¿Cómo agrupo? No agrupa; produce un único total.
- **`unidadesVendidasM(ventas)`**
  - ¿Qué recorro? El arreglo `ventas` con `reduce`.
  - ¿Qué filtro? Solo ventas con `cantidad > 0`.
  - ¿Qué transformo? No transforma registros; toma el campo `cantidad`.
  - ¿Qué acumulo? Unidades en un contador iniciado en `0`.
  - ¿Cómo agrupo? No agrupa; produce un único total de unidades.
- **`ventasPorCiudadM(ventas, ciudad)`**
  - ¿Qué recorro? El arreglo `ventas`, primero con `filter` y luego con `reduce`.
  - ¿Qué filtro? Ventas válidas de la ciudad solicitada, comparando nombres sin espacios sobrantes y sin distinguir mayúsculas.
  - ¿Qué transformo? La ciudad solicitada para compararla en minúsculas; convierto las ventas coincidentes a importes con `valorVenta`.
  - ¿Qué acumulo? El importe de las ventas coincidentes, iniciando en `0`.
  - ¿Cómo agrupo? No crea varios grupos; selecciona una ciudad y devuelve su total.
- **`totalPorCiudad(ventas)`**
  - ¿Qué recorro? El arreglo `ventas` con `reduce`.
  - ¿Qué filtro? Solo ventas con `cantidad > 0`.
  - ¿Qué transformo? Normalizo la ciudad con `trim().toLowerCase()` y obtengo el importe con `valorVenta`.
  - ¿Qué acumulo? Importes vendidos en un objeto acumulador.
  - ¿Cómo agrupo? La clave es el nombre normalizado de la ciudad; por ejemplo, `"Bogotá"` y `"Bogotá "` se suman bajo `bogotá`.
- **`unidadesPorProducto(ventas)`**
  - ¿Qué recorro? El arreglo `ventas` con `reduce`.
  - ¿Qué filtro? Solo ventas con `cantidad > 0`.
  - ¿Qué transformo? Tomo el producto como clave y la cantidad como unidades a sumar.
  - ¿Qué acumulo? Cantidades por producto en un objeto iniciado en `{}`.
  - ¿Cómo agrupo? Por el nombre de producto, conservando el texto tal como aparece en los datos.
- **`topProductosPorValor(ventas, k)`**
  - ¿Qué recorro? El arreglo `ventas` con `reduce`; después recorro los pares producto-total.
  - ¿Qué filtro? Solo ventas con `cantidad > 0`; si `k` no es entero positivo, no se selecciona ningún producto.
  - ¿Qué transformo? Cada venta válida a su importe; después ordeno los pares de productos por valor descendente y extraigo sus nombres.
  - ¿Qué acumulo? El importe generado por cada producto en un objeto iniciado en `{}`.
  - ¿Cómo agrupo? Por nombre de producto antes de ordenar y tomar los primeros `k`. `Object.entries` crea un arreglo nuevo para ordenar, sin modificar `ventas`.
- **`verificar.js`**
  - ¿Qué recorro? Calcula los tres pares de indicadores sobre el mismo arreglo importado desde `datos.js`.
  - ¿Qué filtro y transformo? No filtra ni transforma los datos directamente; invoca cada versión con ciclo y con métodos usando los mismos argumentos.
  - ¿Qué acumulo? No acumula ventas; compara cada par de resultados.
  - ¿Cómo agrupo? Presenta una línea por indicador, con `OK` si ambos resultados coinciden o `DIFERENTE` si no.

La verificación se ejecuta con `node src/verificar.js`. Para la muestra actual los tres pares deben coincidir: total vendido, unidades vendidas y total vendido en Medellín.

## Casos borde detectados

- **Ciudad con mayúsculas inconsistentes:** en el registro `id: 5` aparece `medellín`, mientras que en otros registros aparece `Medellín`. **Decisión:** normalizar espacios y mayúsculas/minúsculas para el análisis y unificar ambas variantes como `medellin`, sin modificar el dato original.
- **Cantidad igual a cero:** el registro `id: 8` tiene `cantidad: 0`, aunque está incluido como venta. **Decisión:** marcarlo para revisión y no contabilizarlo como unidades vendidas ni como ingreso hasta confirmar si fue una venta sin unidades o un error de captura.
- **Códigos de cliente repetidos y sin catálogo de referencia:** `C01`, `C02` y `C03` aparecen en varios registros; esto puede representar compras distintas del mismo cliente, no necesariamente duplicados. **Decisión:** conservar cada registro como una transacción independiente, agrupar clientes por su código y no eliminar filas solo porque compartan cliente; validar los códigos contra un catálogo si está disponible.
