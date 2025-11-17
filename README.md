# Generador de Textos para Canal de WhatsApp (CON FUENTES REALES)

Herramienta automática que genera textos originales y atractivos estilo "publicación de canal de WhatsApp" usando **fuentes reales de noticias** (RSS feeds + APIs).

## Características

- **✅ FUENTES REALES**: Obtiene noticias de feeds RSS y APIs reales
- **4 Temáticas**: Deportes, Liga Argentina, Cine, Series
- **Generación automática**: 3 textos únicos por ejecución
- **RSS Feeds Públicos**: ESPN, TyC Sports, Olé, NYT, SensaCine
- **NewsAPI (opcional)**: Soporte para NewsAPI con 100 requests/día gratis
- **Fallback inteligente**: Si las APIs fallan, usa generación sintética
- **Caché integrado**: Reduce llamadas a APIs (1 hora)
- **100% código abierto**: Sin dependencias pagas

## Requisitos

- Node.js 16 o superior
- Conexión a internet (para obtener noticias)

## Instalación

### 1. Clonar o descargar el proyecto

```bash
git clone https://github.com/richard-dl/herramienta_canal.git
cd herramienta_canal
git checkout claude/whatsapp-text-generator-01UZ4JGx5t334NRSFMBHwrrj
```

### 2. Instalar dependencias

```bash
npm install
```

Esto instalará:
- `axios`: Cliente HTTP para APIs
- `rss-parser`: Parser de feeds RSS
- `dotenv`: Manejo de variables de entorno

### 3. Configuración (Opcional pero Recomendado)

#### Opción A: Sin API Key (Solo RSS)

Funciona inmediatamente usando solo feeds RSS públicos. No necesitas configurar nada.

```bash
npm start
```

#### Opción B: Con NewsAPI (Recomendado)

Para obtener más variedad de noticias:

1. **Registrate gratis** en [NewsAPI.org](https://newsapi.org/)
   - Plan gratuito: 100 requests/día
   - No requiere tarjeta de crédito

2. **Copia tu API key**

3. **Crea un archivo `.env`** en la raíz del proyecto:

```bash
cp .env.example .env
```

4. **Edita `.env`** y agrega tu API key:

```env
NEWS_API_KEY=tu_api_key_aqui
```

## Uso

### Generar textos

```bash
npm start
```

o

```bash
node main.js
```

### Ejemplo de Salida

```
╔════════════════════════════════════════════════════════════╗
║   GENERADOR DE TEXTOS PARA CANAL DE WHATSAPP              ║
║          CON FUENTES REALES (RSS + APIs)                  ║
╚════════════════════════════════════════════════════════════╝

📅 Fecha: 17 de noviembre de 2025
🎯 Generando 3 textos desde fuentes reales...

📡 Buscando noticia real de deportes...
✓ Noticia real obtenida de ESPN
📡 Buscando noticia real de ligaArgentina...
✓ Noticia real obtenida de TyC Sports
📡 Buscando noticia real de cine...
✓ Noticia real obtenida de NYT Movies

============================================================
📝 TEXTO #1
🏷️  TEMA: Deportes
============================================================
⚽ Manchester City empató 1-1 ante Liverpool en un partido
emocionante en el Etihad. Haaland abrió el marcador pero
Salah igualó en el segundo tiempo. 🔥

   📰 Fuente: ESPN
   📌 Tipo: ✓ Noticia Real

============================================================
```

## Estructura del Proyecto

```
herramienta_canal/
├── main.js                      # Punto de entrada principal
├── config.js                    # Configuración de APIs y RSS
├── package.json                 # Dependencias
├── .env.example                 # Ejemplo de configuración
├── README.md                    # Documentación
├── src/
│   ├── generador.js            # Generador sintético (fallback)
│   ├── generadorReal.js        # Generador con fuentes reales
│   ├── temas.js                # Datos y plantillas
│   ├── apis/
│   │   ├── rssParser.js        # Parser de feeds RSS
│   │   └── newsApi.js          # Cliente NewsAPI
│   └── utils/
│       └── formatter.js        # Utilidades de formato
└── output/                      # Archivos generados
```

## Fuentes de Noticias Configuradas

### Deportes
- ESPN Argentina
- TyC Sports
- Diario Olé

### Liga Argentina
- TyC Sports
- Olé - Fútbol Argentino

### Cine
- New York Times - Movies
- SensaCine

### Series
- New York Times - Television

**Todas estas fuentes son públicas y no requieren API key.**

## Configuración Avanzada

### Modificar Cantidad de Textos

Edita `main.js` línea 16:

```javascript
const CANTIDAD_TEXTOS = 5; // Cambia de 3 a lo que quieras
```

### Agregar Nuevas Fuentes RSS

Edita `config.js` y agrega URLs a `rssSources`:

```javascript
deportes: [
  'https://www.espn.com.ar/rss/futbol/news',
  'https://tu-nueva-fuente.com/rss' // Agregar aquí
]
```

### Deshabilitar Fallback Sintético

Si solo quieres noticias reales (sin fallback):

Edita `config.js`:

```javascript
useFallback: false // Cambia de true a false
```

## Caché

La herramienta usa un sistema de caché en memoria:
- **Duración**: 1 hora
- **Ventaja**: Reduce llamadas a APIs
- **Límite**: Se reinicia al cerrar el programa

Para modificar la duración, edita `config.js`:

```javascript
cache: {
  enabled: true,
  duration: 7200000 // 2 horas en milisegundos
}
```

## Características Técnicas

- **Async/Await**: Manejo moderno de promesas
- **Parallel Fetching**: Obtiene noticias de múltiples fuentes en paralelo
- **Error Handling**: Manejo robusto de errores
- **Fallback System**: Nunca falla, siempre genera contenido
- **Clean Text**: Limpia HTML y caracteres especiales
- **Cross-platform**: Windows, macOS, Linux

## Ventajas vs Versión Sintética

| Característica | Versión Sintética | Con Fuentes Reales |
|---|---|---|
| Noticias reales | ❌ | ✅ |
| Conexión a internet | No necesita | Necesita |
| Velocidad | Instantáneo | 2-5 segundos |
| Variedad | Limitada | Infinita |
| Links a fuentes | ❌ | ✅ |
| Requiere setup | ❌ | Mínimo (opcional) |

## Solución de Problemas

### Error: "Cannot find module"

```bash
npm install
```

### No se obtienen noticias reales

Verifica tu conexión a internet y revisa que los feeds RSS estén disponibles.

### Error 401 en NewsAPI

API key inválida. Verifica tu `.env` file.

### Error 429 en NewsAPI

Límite de requests excedido (100/día en plan gratuito). La herramienta usará solo RSS hasta mañana.

## Limitaciones

- **Plan gratuito NewsAPI**: 100 requests/día
- **RSS feeds**: Dependen de disponibilidad de terceros
- **Idioma**: Principalmente español (configurable)
- **Categorías**: Limitadas a las fuentes configuradas

## Próximas Mejoras

- [ ] Integración con más APIs de noticias
- [ ] Soporte para más idiomas
- [ ] Sistema de programación (cron jobs)
- [ ] Envío automático a WhatsApp Business API
- [ ] Base de datos para historial
- [ ] Dashboard web

## Licencia

MIT

## Autor

Desarrollado para automatizar la creación de contenido real para canales de WhatsApp.

---

**Nota Importante**: Esta herramienta obtiene noticias de fuentes públicas mediante RSS feeds y APIs. Siempre verifica la precisión de la información antes de compartirla. Los textos son reales pero se reformatean para estilo WhatsApp.

## Preguntas Frecuentes

### ¿Es gratis?

Sí, 100% gratis. NewsAPI tiene un plan gratuito de 100 requests/día.

### ¿Necesito tarjeta de crédito?

No. NewsAPI free tier no requiere tarjeta.

### ¿Funciona sin NewsAPI?

Sí, usa feeds RSS públicos sin necesidad de registro.

### ¿Puedo comercializar el contenido?

Verifica los términos de uso de cada fuente RSS que uses.

### ¿Los textos son 100% reales?

Se basan en noticias reales pero se reformatean para ser concisos y agregar emojis.
