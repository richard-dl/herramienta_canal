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
      'https://www.espn.com.ar/rss/futbol/news',
      'https://www.tycsports.com/rss.xml',
      'https://www.ole.com.ar/rss/ultimas-noticias/'
    ],
    ligaArgentina: [
      'https://www.tycsports.com/rss.xml',
      'https://www.ole.com.ar/rss/futbol-argentino/'
    ],
    cine: [
      'https://rss.nytimes.com/services/xml/rss/nyt/Movies.xml',
      'https://www.sensacine.com/rss/noticias.xml'
    ],
    series: [
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
