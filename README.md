# Generador de Textos para Canal de WhatsApp

Herramienta automática para generar textos originales y atractivos estilo "publicación de canal de WhatsApp" sobre diversas temáticas.

## Características

- **5 Temáticas disponibles**: Deportes, Liga Argentina, Cine, Series, Sistemas IPTV
- **Generación automática**: 3 textos únicos por ejecución
- **Textos variados**: Nunca se repite el mismo formato
- **Incluye emojis**: Emojis contextuales según la temática
- **100% local**: No requiere APIs externas ni conexión a internet
- **Salida dual**: Muestra en consola y guarda en archivo `.txt`

## Requisitos

- Node.js 16 o superior

## Instalación

1. Clona o descarga este repositorio
2. Navega a la carpeta del proyecto:

```bash
cd herramienta_canal
```

3. Instala las dependencias (no hay dependencias externas, pero es buena práctica):

```bash
npm install
```

## Uso

### Opción 1: Con npm (recomendado)

```bash
npm start
```

o

```bash
npm run generate
```

### Opción 2: Directamente con Node

```bash
node main.js
```

## Estructura del Proyecto

```
herramienta_canal/
├── main.js                 # Punto de entrada principal
├── package.json            # Configuración del proyecto
├── README.md              # Documentación
├── src/
│   ├── generador.js       # Motor de generación de textos
│   ├── temas.js           # Datos y plantillas por temática
│   └── utils/
│       └── formatter.js   # Utilidades de formato y emojis
└── output/                # Carpeta con archivos de salida
    └── textos_YYYY-MM-DD_HH-MM-SS.txt
```

## Temáticas Incluidas

### 1. Deportes
Noticias sobre fútbol internacional, fichajes, competiciones europeas y jugadores destacados.

### 2. Liga Argentina
Actualidad del fútbol argentino: Boca, River, Racing, competiciones locales y Libertadores.

### 3. Cine
Estrenos, taquilla, actores, directores y películas destacadas.

### 4. Series
Plataformas de streaming, series populares, renovaciones y nuevos lanzamientos.

### 5. Sistemas IPTV
Servicios IPTV, características, deportes en vivo y contenido disponible.

## Ejemplo de Salida

```
============================================================
📝 TEXTO #1
🏷️  TEMA: Liga Argentina
============================================================
⚽ Boca Juniors sacó un histórico triunfo ante Racing en La Bombonera.
Cavani marcó el gol del partido y se llevó todos los aplausos. 🏆
============================================================

============================================================
📝 TEXTO #2
🏷️  TEMA: Cine
============================================================
🎬 ¡Confirmado! Christopher Nolan dirigirá la nueva película de suspenso
protagonizada por Timothée Chalamet. El estreno será el próximo año
y promete ser impresionante. 🔥
============================================================

============================================================
📝 TEXTO #3
🏷️  TEMA: Series
============================================================
📺 Estreno destacado en Netflix: The Last of Us llega con todo.
Drama brillante que promete ser el hit del mes. ¡No te la pierdas! ⭐
============================================================
```

## Personalización

### Agregar Nuevos Temas

Edita `src/temas.js` y agrega un nuevo objeto con la estructura:

```javascript
nuevoTema: {
  nombre: 'Nombre del Tema',
  emojis: ['🎯', '⚡', '🔥'],
  // Datos específicos del tema
  equipos: [...],
  jugadores: [...],
  // Plantillas de texto
  plantillas: [
    'Plantilla 1 con {placeholder}',
    'Plantilla 2 con {otroPlaceholder}'
  ]
}
```

### Cambiar Cantidad de Textos

Edita la constante en `main.js`:

```javascript
const CANTIDAD_TEXTOS = 5; // Genera 5 textos en lugar de 3
```

## Características Técnicas

- **Módulos ES6**: Código moderno con imports/exports
- **Sin dependencias**: No requiere paquetes externos
- **Generación aleatoria inteligente**: Evita repeticiones
- **Sistema de plantillas**: Flexible y expandible
- **Salida formateada**: Archivos .txt bien estructurados
- **Cross-platform**: Funciona en Windows, macOS y Linux

## Ventajas

- **100% Offline**: No necesita internet
- **Rápido**: Genera textos en segundos
- **Ligero**: Sin dependencias pesadas
- **Personalizable**: Fácil de modificar y expandir
- **Profesional**: Código limpio y comentado

## Solución de Problemas

### Error: "Cannot find module"

Asegúrate de estar en la carpeta correcta del proyecto.

### Los textos se repiten

La herramienta genera textos aleatorios cada vez. Si ejecutas muchas veces, puede haber similitudes, pero nunca serán idénticos gracias al sistema de variación.

### Permisos de escritura

Si tienes problemas creando archivos, verifica los permisos de la carpeta `output/`.

## Licencia

MIT

## Autor

Desarrollado para automatizar la creación de contenido para canales de WhatsApp.

---

**Nota**: Esta herramienta genera textos de manera local sin utilizar APIs externas. Los textos son creados mediante un sistema de plantillas y combinaciones aleatorias.
