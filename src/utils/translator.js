// Traductor automático de textos

import axios from 'axios';

/**
 * Detecta si un texto está mayormente en inglés
 */
export function esIngles(texto) {
  if (!texto) return false;

  // Palabras comunes en inglés que no existen en español
  const palabrasIngles = [
    'the', 'and', 'for', 'are', 'with', 'that', 'this', 'from', 'have', 'has',
    'will', 'what', 'when', 'where', 'who', 'which', 'their', 'there', 'they',
    'was', 'were', 'been', 'being', 'about', 'against', 'between', 'into',
    'through', 'during', 'before', 'after', 'above', 'below', 'under', 'again',
    'further', 'then', 'once', 'here', 'only', 'own', 'same', 'than', 'too',
    'very', 'can', 'just', 'should', 'now', 'said', 'says', 'new', 'news',
    'today', 'tomorrow', 'week', 'month', 'year', 'latest', 'released', 'upcoming'
  ];

  const textoLower = texto.toLowerCase();
  const palabras = textoLower.split(/\s+/).filter(p => p.length > 2);

  if (palabras.length === 0) return false;

  // Contar cuántas palabras en inglés encontramos
  let contadorIngles = 0;
  palabras.forEach(palabra => {
    const palabraLimpia = palabra.replace(/[.,!?;:()]/g, '');
    if (palabrasIngles.includes(palabraLimpia)) {
      contadorIngles++;
    }
  });

  const porcentaje = (contadorIngles / palabras.length);

  // Debug: mostrar detección
  if (contadorIngles > 0) {
    console.log(`   🔍 Detectadas ${contadorIngles}/${palabras.length} palabras en inglés (${Math.round(porcentaje * 100)}%)`);
  }

  // Si más del 15% son palabras en inglés (bajado de 20%), consideramos que el texto está en inglés
  return porcentaje > 0.15;
}

/**
 * Traduce texto de inglés a español usando MyMemory Translation API
 * API gratuita sin necesidad de registro
 */
export async function traducirTexto(texto, idiomaOrigen = 'en', idiomaDestino = 'es') {
  if (!texto) return texto;

  try {
    // MyMemory Translation API - Gratuita, 10000 palabras/día
    const response = await axios.get('https://api.mymemory.translated.net/get', {
      params: {
        q: texto,
        langpair: `${idiomaOrigen}|${idiomaDestino}`
      },
      timeout: 10000
    });

    if (response.data && response.data.responseData && response.data.responseData.translatedText) {
      const traduccion = response.data.responseData.translatedText;

      // Verificar que la traducción no sea igual al original (a veces la API devuelve lo mismo)
      if (traduccion.toLowerCase() !== texto.toLowerCase()) {
        return traduccion;
      }
    }

    // Si la API no pudo traducir, intentar traducción manual básica
    return traducirManual(texto);

  } catch (error) {
    console.error('Error en traducción automática:', error.message);
    // Fallback a traducción manual
    return traducirManual(texto);
  }
}

/**
 * Traducción manual básica de palabras clave comunes
 */
function traducirManual(texto) {
  const traducciones = {
    // Deportes
    'match': 'partido',
    'game': 'partido',
    'vs': 'vs',
    'versus': 'contra',
    'team': 'equipo',
    'player': 'jugador',
    'goal': 'gol',
    'score': 'marcador',
    'win': 'victoria',
    'winner': 'ganador',
    'lose': 'derrota',
    'draw': 'empate',
    'league': 'liga',
    'championship': 'campeonato',
    'cup': 'copa',
    'final': 'final',
    'season': 'temporada',
    'stadium': 'estadio',

    // Fechas y tiempos
    'today': 'hoy',
    'tomorrow': 'mañana',
    'yesterday': 'ayer',
    'next': 'próximo',
    'last': 'último',
    'week': 'semana',
    'month': 'mes',
    'year': 'año',

    // Cine y series
    'movie': 'película',
    'film': 'película',
    'series': 'serie',
    'episode': 'episodio',
    'season': 'temporada',
    'trailer': 'tráiler',
    'premiere': 'estreno',
    'release': 'lanzamiento',
    'director': 'director',
    'actor': 'actor',
    'actress': 'actriz',

    // Generales
    'new': 'nuevo',
    'latest': 'último',
    'upcoming': 'próximo',
    'live': 'en vivo',
    'now': 'ahora',
    'available': 'disponible',
    'watch': 'ver',
    'streaming': 'streaming'
  };

  let textoTraducido = texto;

  // Reemplazar palabras conocidas (case insensitive)
  Object.entries(traducciones).forEach(([ingles, espanol]) => {
    const regex = new RegExp(`\\b${ingles}\\b`, 'gi');
    textoTraducido = textoTraducido.replace(regex, (match) => {
      // Mantener capitalización
      if (match[0] === match[0].toUpperCase()) {
        return espanol.charAt(0).toUpperCase() + espanol.slice(1);
      }
      return espanol;
    });
  });

  return textoTraducido;
}

/**
 * Traduce texto automáticamente si no está en español
 */
export async function traducirSiEsNecesario(texto) {
  if (!texto) return texto;

  // Detectar si está en inglés
  if (esIngles(texto)) {
    console.log('   🌐 Texto en inglés detectado, traduciendo...');

    try {
      // Intentar traducción con API primero
      const traduccion = await traducirTexto(texto);

      // Verificar que la traducción sea válida
      if (traduccion && traduccion !== texto && traduccion.length > 10) {
        console.log('   ✓ Texto traducido con API');
        return traduccion;
      } else {
        // Si la API no funcionó bien, usar traducción manual
        console.log('   → Usando traducción manual de palabras clave');
        const traduccionManual = traducirManual(texto);
        return traduccionManual;
      }
    } catch (error) {
      // Si falla completamente, usar traducción manual
      console.log('   ⚠️  API falló, usando traducción manual');
      return traducirManual(texto);
    }
  }

  // Si ya está en español, devolver tal cual
  return texto;
}
