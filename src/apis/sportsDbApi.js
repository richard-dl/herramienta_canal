// Cliente para TheSportsDB API (100% gratuita)
// Documentación: https://www.thesportsdb.com/api.php

import axios from 'axios';
import { config } from '../../config.js';

const API_BASE = 'https://www.thesportsdb.com/api/v1/json';

/**
 * Obtiene próximos eventos de una liga
 */
export async function obtenerProximosEventos(leagueId) {
  const apiKey = config.sportsDbApi.apiKey;

  try {
    const response = await axios.get(`${API_BASE}/${apiKey}/eventsnextleague.php`, {
      params: { id: leagueId },
      timeout: 10000
    });

    if (response.data && response.data.events) {
      return response.data.events
        .filter(event => event !== null)
        .map(event => ({
          id: event.idEvent,
          nombre: event.strEvent,
          fecha: event.dateEvent,
          hora: event.strTime,
          equipoLocal: event.strHomeTeam,
          equipoVisitante: event.strAwayTeam,
          liga: event.strLeague,
          temporada: event.strSeason,
          estadio: event.strVenue || 'Estadio por confirmar',
          ciudad: event.strCity || '',
          pais: event.strCountry || '',
          deporte: event.strSport,
          thumbnail: event.strThumb
        }));
    }

    return [];
  } catch (error) {
    console.error('Error en TheSportsDB:', error.message);
    return [];
  }
}

/**
 * Obtiene últimos resultados de una liga
 */
export async function obtenerUltimosResultados(leagueId, cantidad = 15) {
  const apiKey = config.sportsDbApi.apiKey;

  try {
    const response = await axios.get(`${API_BASE}/${apiKey}/eventspastleague.php`, {
      params: { id: leagueId },
      timeout: 10000
    });

    if (response.data && response.data.events) {
      return response.data.events
        .filter(event => event !== null)
        .slice(0, cantidad)
        .map(event => ({
          id: event.idEvent,
          nombre: event.strEvent,
          fecha: event.dateEvent,
          equipoLocal: event.strHomeTeam,
          equipoVisitante: event.strAwayTeam,
          marcadorLocal: event.intHomeScore,
          marcadorVisitante: event.intAwayScore,
          liga: event.strLeague,
          estadio: event.strVenue || '',
          deporte: event.strSport
        }));
    }

    return [];
  } catch (error) {
    console.error('Error obteniendo resultados:', error.message);
    return [];
  }
}

/**
 * Obtiene un evento aleatorio de los próximos
 */
export async function obtenerEventoAleatorio(leagueId) {
  const eventos = await obtenerProximosEventos(leagueId);

  if (eventos.length === 0) {
    return null;
  }

  const indice = Math.floor(Math.random() * eventos.length);
  return eventos[indice];
}

/**
 * Obtiene un resultado aleatorio de los últimos
 */
export async function obtenerResultadoAleatorio(leagueId) {
  const resultados = await obtenerUltimosResultados(leagueId);

  if (resultados.length === 0) {
    return null;
  }

  const indice = Math.floor(Math.random() * resultados.length);
  return resultados[indice];
}

/**
 * Formatea un evento próximo para texto de WhatsApp
 */
export function formatearEventoParaWhatsApp(evento, emojis = []) {
  if (!evento) return null;

  // Formatear fecha y hora
  const fecha = new Date(`${evento.fecha}T${evento.hora || '00:00:00'}`);
  const opciones = {
    day: 'numeric',
    month: 'long',
    hour: '2-digit',
    minute: '2-digit'
  };
  const fechaTexto = fecha.toLocaleDateString('es-AR', opciones);

  // Crear textos variados
  const textos = [
    `Próximo partidazo: ${evento.equipoLocal} vs ${evento.equipoVisitante} el ${fechaTexto}. ${evento.liga} en ${evento.estadio}. ¡No te lo pierdas!`,

    `Marcá tu agenda: ${evento.equipoLocal} enfrenta a ${evento.equipoVisitante} este ${fechaTexto}. ${evento.liga} promete un gran espectáculo.`,

    `Se viene el duelo: ${evento.equipoLocal} vs ${evento.equipoVisitante} por ${evento.liga}. Fecha: ${fechaTexto}. Lugar: ${evento.estadio}. ¿Quién gana?`,

    `Atención fanáticos: ${evento.equipoLocal} recibe a ${evento.equipoVisitante} el ${fechaTexto}. ${evento.liga} en vivo desde ${evento.estadio}.`,

    `${evento.equipoLocal} vs ${evento.equipoVisitante} - ${fechaTexto}. ${evento.liga} trae este partidazo en ${evento.estadio}. ¡Imperdible!`
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
 * Formatea un resultado para texto de WhatsApp
 */
export function formatearResultadoParaWhatsApp(resultado, emojis = []) {
  if (!resultado) return null;

  // Formatear fecha
  const fecha = new Date(resultado.fecha);
  const fechaTexto = fecha.toLocaleDateString('es-AR', { day: 'numeric', month: 'long' });

  // Determinar ganador o empate
  let comentario = '';
  if (resultado.marcadorLocal > resultado.marcadorVisitante) {
    comentario = `Victoria contundente de ${resultado.equipoLocal}!`;
  } else if (resultado.marcadorVisitante > resultado.marcadorLocal) {
    comentario = `Gran triunfo de ${resultado.equipoVisitante}!`;
  } else {
    comentario = 'Empate emocionante!';
  }

  // Crear textos variados
  const textos = [
    `Resultado ${resultado.liga}: ${resultado.equipoLocal} ${resultado.marcadorLocal}-${resultado.marcadorVisitante} ${resultado.equipoVisitante}. ${comentario} Partidazo el ${fechaTexto}.`,

    `${resultado.equipoLocal} y ${resultado.equipoVisitante} protagonizaron un gran partido en ${resultado.liga}. Final: ${resultado.marcadorLocal}-${resultado.marcadorVisitante}. ${comentario}`,

    `Revivilo: ${resultado.equipoLocal} ${resultado.marcadorLocal}-${resultado.marcadorVisitante} ${resultado.equipoVisitante} por ${resultado.liga} el ${fechaTexto}. ${comentario}`,

    `${resultado.liga}: Terminó ${resultado.equipoLocal} ${resultado.marcadorLocal}, ${resultado.equipoVisitante} ${resultado.marcadorVisitante}. ${comentario} Gran partido!`
  ];

  const textoBase = textos[Math.floor(Math.random() * textos.length)];

  // Agregar emojis
  let textoFinal = textoBase;
  if (emojis.length > 0) {
    const emoji1 = emojis[Math.floor(Math.random() * emojis.length)];
    const emoji2 = emojis[Math.floor(Math.random() * emojis.length)];
    textoFinal = `${emoji1} ${textoBase} ${emoji2}`;
  }

  return textoFinal;
}

/**
 * IDs de ligas principales en TheSportsDB
 * Lista completa: https://www.thesportsdb.com/api/v1/json/3/all_leagues.php
 */
export const LIGAS_SPORTSDB = {
  // Fútbol
  PREMIER_LEAGUE: '4328',           // Premier League
  LA_LIGA: '4335',                  // La Liga española
  SERIE_A: '4332',                  // Serie A italiana
  BUNDESLIGA: '4331',               // Bundesliga alemana
  LIGUE_1: '4334',                  // Ligue 1 francesa
  LIGA_ARGENTINA: '4406',           // Liga Profesional Argentina
  BRASILEIRAO: '4351',              // Brasileirão
  MLS: '4346',                      // MLS USA
  CHAMPIONS_LEAGUE: '4480',         // UEFA Champions League
  EUROPA_LEAGUE: '4481',            // UEFA Europa League
  COPA_LIBERTADORES: '4452',        // Copa Libertadores
  COPA_SUDAMERICANA: '4511',        // Copa Sudamericana

  // Otros deportes
  NBA: '4387',                      // NBA
  NFL: '4391',                      // NFL
  MLB: '4424',                      // MLB Baseball
  NHL: '4380',                      // NHL Hockey
  UFC: '4443',                      // UFC
  FORMULA_1: '4370'                 // Fórmula 1
};
