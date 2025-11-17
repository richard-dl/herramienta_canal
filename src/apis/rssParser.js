// Parser de feeds RSS para noticias reales

import Parser from 'rss-parser';
import { config } from '../../config.js';

// Parser general para la mayoría de feeds
const parser = new Parser({
  timeout: 10000,
  headers: {
    'User-Agent': 'Mozilla/5.0 (compatible; NoticiasBot/1.0)'
  }
});

// Parser específico para Reddit (requiere User-Agent personalizado)
const redditParser = new Parser({
  timeout: 10000,
  headers: {
    'User-Agent': 'HerramientaCanal/2.0 (RSS Reader para WhatsApp)'
  }
});

// Caché simple en memoria
const cache = {
  data: {},
  timestamp: {}
};

/**
 * Obtiene noticias de un feed RSS
 */
async function fetchRSS(url) {
  try {
    // Detectar si es una URL de Reddit
    const esReddit = url.includes('reddit.com');
    const parserAUsar = esReddit ? redditParser : parser;

    const feed = await parserAUsar.parseURL(url);
    return feed.items || [];
  } catch (error) {
    console.error(`Error fetching RSS ${url}:`, error.message);
    return [];
  }
}

/**
 * Obtiene noticias de múltiples feeds RSS con caché
 */
export async function obtenerNoticiasPorCategoria(categoria) {
  const cacheKey = categoria;
  const now = Date.now();

  // Verificar caché
  if (config.cache.enabled && cache.data[cacheKey] && cache.timestamp[cacheKey]) {
    const cacheAge = now - cache.timestamp[cacheKey];
    if (cacheAge < config.cache.duration) {
      console.log(`✓ Usando caché para ${categoria}`);
      return cache.data[cacheKey];
    }
  }

  // Obtener fuentes RSS para la categoría
  const sources = config.rssSources[categoria] || [];

  if (sources.length === 0) {
    console.warn(`No hay fuentes RSS configuradas para: ${categoria}`);
    return [];
  }

  console.log(`Obteniendo noticias de ${categoria}...`);

  // Fetch de todos los feeds en paralelo
  const promises = sources.map(url => fetchRSS(url));
  const results = await Promise.all(promises);

  // Combinar y limpiar resultados
  const noticias = results
    .flat()
    .filter(item => item && item.title)
    .map(item => ({
      titulo: extraerTituloLimpio(item.title),
      descripcion: item.contentSnippet || item.description || '',
      link: item.link || '',
      fecha: item.pubDate || item.isoDate || new Date().toISOString(),
      fuente: extraerFuente(item),
      imagen: extraerImagen(item) // Extraer imagen de la noticia
    }))
    .slice(0, 20); // Limitar a 20 noticias más recientes

  // Guardar en caché
  if (config.cache.enabled) {
    cache.data[cacheKey] = noticias;
    cache.timestamp[cacheKey] = now;
  }

  return noticias;
}

/**
 * Obtiene una noticia aleatoria de una categoría
 */
export async function obtenerNoticiaAleatoria(categoria) {
  const noticias = await obtenerNoticiasPorCategoria(categoria);

  if (noticias.length === 0) {
    return null;
  }

  const indice = Math.floor(Math.random() * noticias.length);
  return noticias[indice];
}

/**
 * Extrae el nombre de la fuente del título de Google News
 * Google News usa el formato: "Título - Nombre del Medio"
 */
function extraerFuente(item) {
  // Intentar primero con el campo creator
  if (item.creator && item.creator !== 'Google News') {
    return item.creator;
  }

  // Si es de Google News, extraer del título
  if (item.title) {
    // Google News usa formato: "Título - Nombre del Medio"
    const partes = item.title.split(' - ');
    if (partes.length >= 2) {
      // La última parte es el nombre del medio
      const fuente = partes[partes.length - 1].trim();
      // Limpiar caracteres especiales del final
      return fuente.replace(/\s*\.\s*$/, '');
    }
  }

  return 'Fuente externa';
}

/**
 * Extrae el título limpio sin el nombre del medio
 */
function extraerTituloLimpio(titulo) {
  if (!titulo) return '';

  // Si viene de Google News (formato "Título - Medio"), quitar el medio
  const partes = titulo.split(' - ');
  if (partes.length >= 2) {
    // Tomar todo excepto la última parte (que es el medio)
    return partes.slice(0, -1).join(' - ').trim();
  }

  return titulo.trim();
}

/**
 * Extrae la URL de imagen de un item RSS
 */
function extraerImagen(item) {
  // Intentar varias fuentes de imagen en orden de preferencia

  // 1. Media RSS (usado por muchos feeds de noticias)
  if (item['media:content'] && item['media:content'].$ && item['media:content'].$.url) {
    return item['media:content'].$.url;
  }

  if (item['media:thumbnail'] && item['media:thumbnail'].$ && item['media:thumbnail'].$.url) {
    return item['media:thumbnail'].$.url;
  }

  // 2. Enclosure (común en podcasts y feeds con imágenes)
  if (item.enclosure && item.enclosure.url) {
    const url = item.enclosure.url;
    // Verificar que sea una imagen
    if (/\.(jpg|jpeg|png|gif|webp)/i.test(url)) {
      return url;
    }
  }

  // 3. Buscar en el contenido HTML
  if (item.content || item['content:encoded']) {
    const content = item.content || item['content:encoded'];
    const imgMatch = content.match(/<img[^>]+src=["']([^"']+)["']/i);
    if (imgMatch && imgMatch[1]) {
      return imgMatch[1];
    }
  }

  // 4. Buscar en la descripción
  if (item.description) {
    const imgMatch = item.description.match(/<img[^>]+src=["']([^"']+)["']/i);
    if (imgMatch && imgMatch[1]) {
      return imgMatch[1];
    }
  }

  // No se encontró imagen
  return null;
}

/**
 * Limpia el texto de HTML y caracteres especiales
 */
export function limpiarTexto(texto) {
  if (!texto) return '';

  return texto
    .replace(/<[^>]*>/g, '') // Remover HTML
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, ' ') // Normalizar espacios
    .trim();
}
