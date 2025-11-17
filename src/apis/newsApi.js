// Cliente para NewsAPI (opcional, requiere API key)

import axios from 'axios';
import { config } from '../../config.js';

/**
 * Obtiene noticias de NewsAPI
 * Requiere API key gratuita de https://newsapi.org/
 */
export async function obtenerNoticiasNewsAPI(categoria, idioma = 'es') {
  const apiKey = config.newsApi.apiKey;

  if (!apiKey) {
    console.log('ℹ️  NewsAPI key no configurada, usando solo RSS feeds');
    return [];
  }

  // Mapeo de categorías a queries de NewsAPI
  const queries = {
    deportes: 'deportes OR fútbol OR sports',
    ligaArgentina: 'Boca Juniors OR River Plate OR Liga Argentina',
    cine: 'cine OR películas OR movies',
    series: 'series OR streaming OR Netflix',
    iptv: 'streaming OR IPTV OR televisión'
  };

  const query = queries[categoria] || categoria;

  try {
    const response = await axios.get(`${config.newsApi.baseUrl}/everything`, {
      params: {
        q: query,
        language: idioma,
        sortBy: 'publishedAt',
        pageSize: 10,
        apiKey: apiKey
      },
      timeout: 10000
    });

    if (response.data && response.data.articles) {
      return response.data.articles.map(article => ({
        titulo: article.title,
        descripcion: article.description || '',
        link: article.url,
        fecha: article.publishedAt,
        fuente: article.source?.name || 'NewsAPI'
      }));
    }

    return [];
  } catch (error) {
    if (error.response?.status === 401) {
      console.error('❌ NewsAPI: API key inválida o expirada');
    } else if (error.response?.status === 429) {
      console.error('⚠️  NewsAPI: Límite de requests excedido');
    } else {
      console.error('Error en NewsAPI:', error.message);
    }
    return [];
  }
}

/**
 * Obtiene noticias principales por categoría de NewsAPI
 */
export async function obtenerTopNewsAPI(categoria, pais = 'ar') {
  const apiKey = config.newsApi.apiKey;

  if (!apiKey) {
    return [];
  }

  // Mapeo de categorías
  const categoryMap = {
    deportes: 'sports',
    cine: 'entertainment',
    series: 'entertainment',
    ligaArgentina: 'sports'
  };

  const newsCategory = categoryMap[categoria] || 'general';

  try {
    const response = await axios.get(`${config.newsApi.baseUrl}/top-headlines`, {
      params: {
        category: newsCategory,
        country: pais,
        pageSize: 10,
        apiKey: apiKey
      },
      timeout: 10000
    });

    if (response.data && response.data.articles) {
      return response.data.articles.map(article => ({
        titulo: article.title,
        descripcion: article.description || '',
        link: article.url,
        fecha: article.publishedAt,
        fuente: article.source?.name || 'NewsAPI'
      }));
    }

    return [];
  } catch (error) {
    console.error('Error en NewsAPI top-headlines:', error.message);
    return [];
  }
}
