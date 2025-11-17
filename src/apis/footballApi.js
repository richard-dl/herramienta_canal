// Cliente para API-Football (datos reales de fútbol)

import axios from 'axios';
import { config } from '../../config.js';

const API_BASE = 'https://v3.football.api-sports.io';

/**
 * Obtiene próximos partidos de una liga específica
 */
export async function obtenerProximosPartidos(leagueId, temporada = 2025, cantidad = 10) {
  const apiKey = config.footballApi.apiKey;

  if (!apiKey) {
    console.log('⚠️  API-Football key no configurada');
    return [];
  }

  try {
    const response = await axios.get(`${API_BASE}/fixtures`, {
      params: {
        league: leagueId,
        season: temporada,
        next: cantidad
      },
      headers: {
        'x-rapidapi-key': apiKey,
        'x-rapidapi-host': 'v3.football.api-sports.io'
      },
      timeout: 10000
    });

    if (response.data && response.data.response) {
      return response.data.response.map(fixture => ({
        id: fixture.fixture.id,
        fecha: fixture.fixture.date,
        estadio: fixture.fixture.venue?.name || 'Estadio por confirmar',
        equipoLocal: fixture.teams.home.name,
        equipoVisitante: fixture.teams.away.name,
        liga: fixture.league.name,
        pais: fixture.league.country,
        temporada: fixture.league.season,
        ronda: fixture.league.round
      }));
    }

    return [];
  } catch (error) {
    if (error.response?.status === 401) {
      console.error('❌ API-Football: API key inválida');
    } else if (error.response?.status === 429) {
      console.error('⚠️  API-Football: Límite de requests excedido');
    } else {
      console.error('Error en API-Football:', error.message);
    }
    return [];
  }
}

/**
 * Obtiene un partido aleatorio de los próximos
 */
export async function obtenerPartidoAleatorio(leagueId, temporada = 2025) {
  const partidos = await obtenerProximosPartidos(leagueId, temporada, 20);

  if (partidos.length === 0) {
    return null;
  }

  const indice = Math.floor(Math.random() * partidos.length);
  return partidos[indice];
}

/**
 * Formatea un partido para texto de WhatsApp
 */
export function formatearPartidoParaWhatsApp(partido, emojis = []) {
  if (!partido) return null;

  // Formatear fecha
  const fecha = new Date(partido.fecha);
  const opciones = {
    day: 'numeric',
    month: 'long',
    hour: '2-digit',
    minute: '2-digit'
  };
  const fechaTexto = fecha.toLocaleDateString('es-AR', opciones);

  // Crear texto atractivo
  const textos = [
    `Se viene ${partido.equipoLocal} vs ${partido.equipoVisitante} el ${fechaTexto}. ${partido.liga} promete un partidazo en ${partido.estadio}. ¿Quién se lo lleva?`,

    `Atentos: ${partido.equipoLocal} recibe a ${partido.equipoVisitante} este ${fechaTexto}. ${partido.liga} en vivo desde ${partido.estadio}. ¡Imperdible!`,

    `${fechaTexto}: ${partido.equipoLocal} vs ${partido.equipoVisitante} por ${partido.liga}. El partido será en ${partido.estadio}. ¿Ya tenés tu pronóstico?`,

    `Próximo partidazo: ${partido.equipoLocal} enfrentará a ${partido.equipoVisitante} el ${fechaTexto}. ${partido.liga} en directo. ¡Prepará las palomitas!`,

    `Agenda: ${partido.equipoLocal} vs ${partido.equipoVisitante}. Fecha: ${fechaTexto}. Lugar: ${partido.estadio}. ${partido.liga} que no te podés perder.`
  ];

  const textoBase = textos[Math.floor(Math.random() * textos.length)];

  // Agregar emojis si están disponibles
  let textoFinal = textoBase;
  if (emojis.length > 0) {
    const emoji1 = emojis[Math.floor(Math.random() * emojis.length)];
    const emoji2 = emojis[Math.floor(Math.random() * emojis.length)];
    textoFinal = `${emoji1} ${textoBase} ${emoji2}`;
  }

  return textoFinal;
}

/**
 * IDs de ligas populares
 */
export const LIGAS = {
  LIGA_ARGENTINA: 128,      // Liga Profesional Argentina
  PREMIER_LEAGUE: 39,        // Premier League
  LA_LIGA: 140,              // La Liga española
  CHAMPIONS: 2,              // Champions League
  COPA_LIBERTADORES: 13,     // Copa Libertadores
  SERIE_A: 135,              // Serie A italiana
  BUNDESLIGA: 78,            // Bundesliga alemana
  LIGUE_1: 61                // Ligue 1 francesa
};
