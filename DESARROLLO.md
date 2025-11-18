# Generador de Textos para Canal de WhatsApp

## Desarrollo por Streampro 

---

## Descripción General

Herramienta automatizada en Node.js que genera **5 textos diarios** estilo WhatsApp sobre temáticas específicas, utilizando **fuentes de noticias reales** (RSS feeds y APIs). Los textos son breves (2-4 oraciones), atractivos, con emojis contextuales y 100% originales.

---

## Temáticas Cubiertas

1. **Deportes** - Fútbol internacional, Champions League, Premier League
2. **Liga Argentina** - Boca, River, Racing, Liga Profesional
3. **Cine** - Estrenos, películas, actores, directores
4. **Series** - Netflix, streaming, nuevas temporadas
5. **Sistemas IPTV** - Streaming, configuración, tutoriales, industria OTT

---

## Características Principales

### Generación de Contenido
- 5 textos aleatorios por ejecución
- Selección variada de categorías sin repetición excesiva
- Textos breves y atractivos para WhatsApp
- Emojis contextuales por temática

### Fuentes Reales
- **19 fuentes RSS** activas y verificadas
- Noticias de **últimas 48 horas** (parámetro `&when=2d`)
- Ordenamiento por fecha (más recientes primero)
- Sistema de caché de 1 hora para optimizar requests

### Procesamiento Inteligente
- **Traducción automática** inglés → español (API MyMemory)
- **Extracción de nombre del medio** desde Google News
- **Acortamiento de URLs** con is.gd
- **Extracción de imágenes** de los feeds RSS
- Limpieza de HTML y caracteres especiales

### Fallback Robusto
- Si fallan las fuentes reales → NewsAPI como backup
- Si falla NewsAPI → Generación sintética con plantillas
- Siempre genera contenido, nunca falla

---

## Arquitectura del Proyecto

```
herramienta_canal/
├── main.js                      # Punto de entrada principal
├── config.js                    # Configuración de APIs y fuentes RSS
├── package.json                 # Dependencias del proyecto
├── .env                         # Variables de entorno (API keys)
├── .gitignore                   # Archivos ignorados por Git
├── README.md                    # Documentación básica
├── DESARROLLO.md                # Este archivo
│
├── src/
│   ├── generador.js             # Generación sintética (fallback)
│   ├── generadorReal.js         # Generación desde fuentes reales
│   ├── temas.js                 # Datos y plantillas por temática
│   │
│   ├── apis/
│   │   ├── rssParser.js         # Parser de feeds RSS
│   │   ├── newsApi.js           # Integración con NewsAPI
│   │   ├── footballApi.js       # API-Football (desactivada)
│   │   └── sportsDbApi.js       # TheSportsDB (desactivada)
│   │
│   └── utils/
│       ├── formatter.js         # Formateo de textos y fechas
│       ├── translator.js        # Traducción automática
│       └── urlShortener.js      # Acortador de URLs
│
└── output/
    └── textos_YYYY-MM-DD_HH-MM-SS.txt  # Archivos generados
```

---

## Fuentes RSS por Categoría

### Deportes (4 fuentes)
| Fuente | URL |
|--------|-----|
| Google News Deportes Argentina | `news.google.com/rss/search?q=deportes+fútbol+argentina&when=2d` |
| Google News Champions/Premier | `news.google.com/rss/search?q=champions+league+premier&when=2d` |
| Olé Últimas Noticias | `ole.com.ar/rss/ultimas-noticias/` |
| Clarín Deportes | `clarin.com/rss/deportes/` |

### Liga Argentina (4 fuentes)
| Fuente | URL |
|--------|-----|
| Google News Boca/River/Racing | `news.google.com/rss/search?q=boca+river+racing&when=2d` |
| Google News Liga Profesional | `news.google.com/rss/search?q=liga+profesional+argentina&when=2d` |
| Olé Últimas Noticias | `ole.com.ar/rss/ultimas-noticias/` |
| Clarín Lo Último | `clarin.com/rss/lo-ultimo/` |

### Cine (3 fuentes)
| Fuente | URL |
|--------|-----|
| Google News Cine | `news.google.com/rss/search?q=cine+películas&when=2d` |
| NYT Movies | `rss.nytimes.com/services/xml/rss/nyt/Movies.xml` |
| SensaCine | `sensacine.com/rss/noticias.xml` |

### Series (2 fuentes)
| Fuente | URL |
|--------|-----|
| Google News Series | `news.google.com/rss/search?q=series+streaming&when=2d` |
| NYT Television | `rss.nytimes.com/services/xml/rss/nyt/Television.xml` |

### IPTV (6 fuentes)
| Fuente | Descripción |
|--------|-------------|
| Google News IPTV | Noticias generales de IPTV/streaming |
| TROYPOINT | Blog líder en IPTV, Firestick, streaming |
| IPTV Gateway | Blog con noticias sobre IPTV |
| TV4ONE | Expert tips, setup guides |
| Streaming Media Global | Noticias de la industria OTT/broadcasting |
| Segu-Info | Ciberseguridad y piratería IPTV (Argentina) |

---

## Tecnologías Utilizadas

### Runtime y Lenguaje
- **Node.js** v18+
- **JavaScript ES6** (módulos ESM)

### Dependencias Principales
```json
{
  "axios": "^1.6.0",      // HTTP requests
  "rss-parser": "^3.13.0", // Parser de feeds RSS
  "dotenv": "^16.3.1"      // Variables de entorno
}
```

### APIs Externas
| API | Uso | Costo |
|-----|-----|-------|
| **Google News RSS** | Fuente principal de noticias | Gratuito |
| **is.gd** | Acortamiento de URLs | Gratuito |
| **MyMemory Translation** | Traducción inglés→español | Gratuito (límite diario) |
| **NewsAPI** | Backup de noticias | Gratuito (100 req/día) |

### Herramientas de Desarrollo
- **Claude Code** - Asistente de desarrollo IA
- **Git** - Control de versiones
- **VS Code** - Editor recomendado

---

## Flujo de Funcionamiento

```
┌─────────────────┐
│   npm start     │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Seleccionar 5   │
│ temas aleatorios│
└────────┬────────┘
         │
         ▼
┌─────────────────┐     ┌─────────────────┐
│ Buscar noticias │────▶│   RSS Feeds     │
│ por categoría   │     │ (19 fuentes)    │
└────────┬────────┘     └─────────────────┘
         │
         ▼
┌─────────────────┐
│ ¿Encontró       │
│ noticias?       │
└────────┬────────┘
         │
    ┌────┴────┐
   Sí        No
    │         │
    ▼         ▼
┌─────────┐ ┌─────────────┐
│Procesar │ │ Fallback:   │
│noticia  │ │ NewsAPI o   │
│real     │ │ Sintético   │
└────┬────┘ └──────┬──────┘
     │             │
     └──────┬──────┘
            │
            ▼
┌─────────────────┐
│ Traducir si     │
│ está en inglés  │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Acortar URL     │
│ con is.gd       │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Agregar emojis  │
│ contextuales    │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Mostrar en      │
│ consola + archivo│
└─────────────────┘
```

---

## Formato de Salida

### En Consola
```
════════════════════════════════════════════════════════════

📝 TEXTO #1
🎬 CINE
📰 Nueva película de Nolan sorprende en Cannes

Texto de la noticia aquí con emojis contextuales... 🎥 ⭐

🔗 Link: https://is.gd/abc123
📺 Fuente: Infobae
🖼️ Imagen: https://imagen.jpg
```

### En Archivo (output/)
```
======================================================================
  TEXTOS GENERADOS PARA CANAL DE WHATSAPP
  Fecha: 17 de noviembre de 2025, 06:30 p. m.
  Modo: FUENTES REALES (RSS/APIs)
======================================================================

══════════════════════════════════════════════════════════════════════

TEXTO #1
🎬 CINE
📰 Nueva película de Nolan sorprende en Cannes

Texto de la noticia...

🔗 Link: https://is.gd/abc123
📺 Fuente: Infobae
🖼️ Imagen: https://imagen.jpg
```

---

## Instalación y Uso

### Requisitos Previos
- Node.js v18 o superior
- npm o yarn
- Conexión a internet

### Instalación
```bash
# Clonar repositorio
git clone [URL_REPOSITORIO]
cd herramienta_canal

# Instalar dependencias
npm install

# Configurar variables de entorno (opcional)
cp .env.example .env
# Editar .env con tus API keys
```

### Ejecución
```bash
# Generar textos
npm start

# O directamente
node main.js
```

### Salida
Los textos se muestran en consola y se guardan en:
```
output/textos_YYYY-MM-DD_HH-MM-SS.txt
```

---

## Configuración

### Variables de Entorno (.env)
```env
# NewsAPI - Backup de noticias (opcional pero recomendado)
NEWS_API_KEY=tu_api_key_aqui

# API-Football - Desactivada actualmente
# FOOTBALL_API_KEY=tu_api_key_aqui
```

### Ajustes en config.js

**Cantidad de textos:**
```javascript
// En main.js
const CANTIDAD_TEXTOS = 5; // Cambiar a 3, 7, 10, etc.
```

**Antigüedad de noticias:**
```javascript
// En URLs de Google News
'&when=2d'  // 2 días (actual)
'&when=1d'  // 1 día (más reciente)
'&when=7d'  // 1 semana (más contenido)
```

**Duración del caché:**
```javascript
cache: {
  enabled: true,
  duration: 3600000 // 1 hora en milisegundos
}
```

---

## Valor Agregado

### Para el Usuario Final
- **Contenido fresco** - Noticias de últimas 48 horas
- **100% en español** - Traducción automática
- **Listo para copiar** - Formato WhatsApp con emojis
- **Variedad garantizada** - 5 categorías diferentes
- **Imágenes incluidas** - URLs de imágenes para enriquecer posts

### Para el Administrador
- **Automatización completa** - Sin intervención manual
- **Fuentes verificadas** - 19 RSS feeds activos
- **Fallback robusto** - Siempre genera contenido
- **Logs limpios** - Sin errores de fuentes inactivas
- **Fácil mantenimiento** - Código modular y documentado

### Diferenciadores
- **No requiere APIs pagas** - 100% gratuito
- **Sin límites estrictos** - Google News RSS ilimitado
- **Código abierto** - Personalizable y extensible
- **Enfoque argentino** - Fuentes locales (Olé, Clarín)
- **Especialización IPTV** - 6 fuentes del FeedSpot Top 40

---

## Historial de Desarrollo

### Versión 1.0 - Base
- Generación sintética con plantillas
- 3 textos por ejecución
- 4 categorías (sin IPTV)

### Versión 2.0 - Fuentes Reales
- Integración de RSS feeds
- APIs deportivas (TheSportsDB, API-Football)
- NewsAPI como backup
- Sistema de caché

### Versión 2.1 - Mejoras
- Traducción automática inglés→español
- 5 textos por ejecución
- Google News como fuente principal

### Versión 2.2 - Optimización
- Acortamiento de URLs con is.gd
- Extracción de imágenes de RSS
- Formato mejorado con 3 secciones
- Extracción inteligente de nombre del medio

### Versión 2.3 - Limpieza (Actual)
- Eliminación de TheSportsDB y API-Football
- 8 fuentes deportivas argentinas
- Filtro de fecha (últimas 48 horas)
- Ordenamiento por fecha descendente
- Limpieza de fuentes con error 404/403
- 6 fuentes IPTV especializadas del FeedSpot Top 40
- Categoría IPTV activada

---

## Mantenimiento

### Verificar Fuentes RSS
Si aparecen errores 404 o 403, verificar en `config.js` y eliminar/reemplazar las fuentes inactivas.

### Actualizar Fuentes IPTV
Consultar FeedSpot Top 40 IPTV RSS Feeds para nuevas fuentes:
https://rss.feedspot.com/iptv_rss_feeds/

### Agregar Nueva Categoría
1. Agregar fuentes en `config.js` → `rssSources`
2. Agregar datos/plantillas en `src/temas.js`
3. Agregar al array en `src/generadorReal.js` → `temasDisponibles`
4. Agregar emoji en `main.js` → `obtenerEmojiTema()`

---

## Créditos

**Desarrollo:** Streampro 
**Fecha:** Noviembre 2025
**Licencia:** Uso privado

---

## Soporte

Para reportar problemas o solicitar mejoras, contactar al equipo de desarrollo.
