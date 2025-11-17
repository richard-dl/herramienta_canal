// Generador de textos usando fuentes reales (RSS + APIs)

import { obtenerNoticiaAleatoria, limpiarTexto } from './apis/rssParser.js';
import { obtenerNoticiasNewsAPI } from './apis/newsApi.js';
import { obtenerPartidoAleatorio, formatearPartidoParaWhatsApp, LIGAS } from './apis/footballApi.js';
import { generarTexto as generarTextoSintetico } from './generador.js';
import { agregarEmojis } from './utils/formatter.js';
import { temas } from './temas.js';
import { config } from '../config.js';

/**
 * Convierte una noticia real en texto estilo WhatsApp
 */
function convertirNoticiaATexto(noticia, categoria) {
  if (!noticia) return null;

  const tema = temas[categoria];
  let texto = '';

  // Limpiar título y descripción
  const titulo = limpiarTexto(noticia.titulo);
  const descripcion = limpiarTexto(noticia.descripcion);

  // Crear texto conciso (2-4 oraciones)
  if (descripcion && descripcion.length > 50) {
    // Usar descripción si es buena
    const oraciones = descripcion.split(/[.!?]+/).filter(s => s.trim().length > 20);

    if (oraciones.length >= 2) {
      // Tomar 2-3 oraciones
      texto = oraciones.slice(0, Math.min(3, oraciones.length)).join('. ') + '.';
    } else {
      // Usar título + descripción resumida
      texto = `${titulo}. ${descripcion.substring(0, 150)}`;
    }
  } else {
    // Solo título disponible
    texto = titulo;
  }

  // Limpiar y normalizar
  texto = texto
    .replace(/\.\./g, '.')
    .replace(/\s+/g, ' ')
    .trim();

  // Limitar longitud
  if (texto.length > 280) {
    texto = texto.substring(0, 277) + '...';
  }

  // Agregar emojis contextualmente
  if (tema && tema.emojis) {
    texto = agregarEmojis(texto, tema.emojis);
  }

  return {
    tema: tema ? tema.nombre : categoria,
    texto: texto,
    fuente: noticia.fuente,
    link: noticia.link,
    esReal: true
  };
}

/**
 * Genera un texto usando fuentes reales
 */
export async function generarTextoReal(nombreTema) {
  try {
    // Para deportes y liga argentina, usar API-Football
    if (nombreTema === 'deportes' || nombreTema === 'ligaArgentina') {
      console.log(`⚽ Buscando próximo partido de ${nombreTema}...`);

      const liga = nombreTema === 'ligaArgentina' ? LIGAS.LIGA_ARGENTINA : LIGAS.CHAMPIONS;
      const partido = await obtenerPartidoAleatorio(liga);

      if (partido) {
        const tema = temas[nombreTema];
        const texto = formatearPartidoParaWhatsApp(partido, tema?.emojis || []);

        if (texto) {
          console.log(`✓ Partido real obtenido de API-Football`);
          return {
            tema: tema ? tema.nombre : nombreTema,
            texto: texto,
            fuente: 'API-Football (datos reales)',
            link: `https://www.api-football.com/`,
            esReal: true
          };
        }
      }
    }

    // Para otras categorías, intentar obtener noticia de RSS
    console.log(`📡 Buscando noticia real de ${nombreTema}...`);
    let noticia = await obtenerNoticiaAleatoria(nombreTema);

    // Si falla RSS y hay NewsAPI configurada, intentar con NewsAPI
    if (!noticia && config.newsApi.apiKey) {
      const noticias = await obtenerNoticiasNewsAPI(nombreTema);
      if (noticias.length > 0) {
        noticia = noticias[Math.floor(Math.random() * noticias.length)];
      }
    }

    // Si tenemos noticia, convertirla
    if (noticia) {
      const textoGenerado = convertirNoticiaATexto(noticia, nombreTema);
      if (textoGenerado && textoGenerado.texto) {
        console.log(`✓ Noticia real obtenida de ${noticia.fuente}`);
        return textoGenerado;
      }
    }

    // Fallback a generación sintética
    if (config.useFallback) {
      console.log(`⚠️  No se encontraron noticias reales, usando generación sintética`);
      const textoSintetico = generarTextoSintetico(nombreTema);
      return {
        ...textoSintetico,
        esReal: false,
        fuente: 'Generado sintéticamente'
      };
    }

    throw new Error(`No se pudieron obtener noticias para ${nombreTema}`);

  } catch (error) {
    console.error(`Error generando texto para ${nombreTema}:`, error.message);

    // Fallback
    if (config.useFallback) {
      const textoSintetico = generarTextoSintetico(nombreTema);
      return {
        ...textoSintetico,
        esReal: false,
        fuente: 'Generado sintéticamente (error en APIs)'
      };
    }

    throw error;
  }
}

/**
 * Genera N textos usando fuentes reales
 */
export async function generarTextosReales(cantidad = 3) {
  const temasDisponibles = ['deportes', 'ligaArgentina', 'cine', 'series'];
  const textos = [];

  // Seleccionar temas aleatorios sin repetir
  const temasSeleccionados = [];
  while (temasSeleccionados.length < cantidad && temasSeleccionados.length < temasDisponibles.length) {
    const tema = temasDisponibles[Math.floor(Math.random() * temasDisponibles.length)];
    if (!temasSeleccionados.includes(tema)) {
      temasSeleccionados.push(tema);
    }
  }

  // Si necesitamos más textos que temas, permitir repetición
  while (temasSeleccionados.length < cantidad) {
    const tema = temasDisponibles[Math.floor(Math.random() * temasDisponibles.length)];
    temasSeleccionados.push(tema);
  }

  // Generar textos en paralelo para mayor velocidad
  console.log(`\n🔄 Generando ${cantidad} textos desde fuentes reales...\n`);

  const promesas = temasSeleccionados.map(tema => generarTextoReal(tema));
  const resultados = await Promise.all(promesas);

  return resultados.filter(r => r !== null);
}
