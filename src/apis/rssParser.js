// Parser de feeds RSS para noticias reales

import Parser from 'rss-parser';
import { config } from '../../config.js';

const parser = new Parser({
  timeout: 10000,
  headers: {
    'User-Agent': 'Mozilla/5.0 (compatible; NoticiasBot/1.0)'
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
    const feed = await parser.parseURL(url);
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
      titulo: item.title,
      descripcion: item.contentSnippet || item.description || '',
      link: item.link || '',
      fecha: item.pubDate || item.isoDate || new Date().toISOString(),
      fuente: item.creator || 'Fuente externa'
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
