// Configuración de APIs y fuentes de noticias

import dotenv from 'dotenv';
dotenv.config();

export const config = {
  // API-Football - https://www.api-football.com/
  // Datos reales de partidos, ligas, equipos
  footballApi: {
    apiKey: process.env.FOOTBALL_API_KEY || 'aa5feb66df624d406d06d558b14afcb9',
    baseUrl: 'https://v3.football.api-sports.io'
  },

  // TheSportsDB - https://www.thesportsdb.com/
  // 100% GRATUITA - Información completa de deportes
  sportsDbApi: {
    apiKey: process.env.SPORTSDB_API_KEY || '3', // API key gratuita
    baseUrl: 'https://www.thesportsdb.com/api/v1/json'
  },

  // NewsAPI - Registrate gratis en https://newsapi.org/
  // Plan gratuito: 100 requests/día
  newsApi: {
    apiKey: process.env.NEWS_API_KEY || '', // Opcional, pero recomendado
    baseUrl: 'https://newsapi.org/v2'
  },

  // Feeds RSS públicos (no requieren API key)
  rssSources: {
    deportes: [
      // Google News Deportes (Argentina) - Principal
      'https://news.google.com/rss/search?q=deportes+fútbol+argentina&hl=es&gl=AR',
      'https://news.google.com/rss/search?q=champions+league+premier&hl=es&gl=AR',
      // Medios deportivos argentinos
      'https://www.ole.com.ar/rss/ultimas-noticias/',
      'https://www.tycsports.com/rss.xml',
      'https://www.espn.com.ar/rss/futbol/news',
      'https://www.lanacion.com.ar/deportes/rss',
      'https://www.clarin.com/rss/deportes/',
      'https://www.infobae.com/deportes/feed/'
    ],
    ligaArgentina: [
      // Google News Liga Argentina - Principal
      'https://news.google.com/rss/search?q=boca+river+racing&hl=es&gl=AR',
      'https://news.google.com/rss/search?q=liga+profesional+argentina&hl=es&gl=AR',
      // Medios especializados argentinos
      'https://www.ole.com.ar/rss/futbol-argentino/',
      'https://www.tycsports.com/rss.xml',
      'https://www.lanacion.com.ar/deportes/futbol/rss',
      'https://www.clarin.com/rss/lo-ultimo/'
    ],
    cine: [
      // Google News Cine - Simplificado
      'https://news.google.com/rss/search?q=cine+películas&hl=es&gl=AR',
      // Fuentes tradicionales
      'https://rss.nytimes.com/services/xml/rss/nyt/Movies.xml',
      'https://www.sensacine.com/rss/noticias.xml'
    ],
    series: [
      // Google News Series - Simplificado
      'https://news.google.com/rss/search?q=series+streaming&hl=es&gl=AR',
      // Fuentes tradicionales
      'https://rss.nytimes.com/services/xml/rss/nyt/Television.xml'
    ],
    tecnologia: [
      'https://www.wired.com/feed/rss'
    ]
  },

  // Configuración de caché
  cache: {
    enabled: true,
    duration: 3600000 // 1 hora en milisegundos
  },

  // Fallback a datos sintéticos si APIs fallan
  useFallback: true
};
