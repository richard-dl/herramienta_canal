// Motor de generación de textos

import { temas } from './temas.js';
import { aleatorio, aleatoriosUnicos, agregarEmojis } from './utils/formatter.js';

/**
 * Reemplaza placeholders en una plantilla con valores aleatorios
 */
function llenarPlantilla(plantilla, dataTema) {
  let texto = plantilla;

  // Reemplazar cada placeholder
  const placeholders = texto.match(/\{(\w+\d?)\}/g);

  if (!placeholders) return texto;

  // Mapeo de conversiones especiales singular -> plural
  const pluralesEspeciales = {
    'director': 'directores',
    'actor': 'actores',
    'jugador': 'jugadores',
    'equipo': 'equipos',
    'canal': 'canales',
    'pelicula': 'peliculas',
    'serie': 'series',
    'genero': 'generos',
    'deporte': 'deportes',
    'estadio': 'estadios',
    'competicion': 'competiciones',
    'accion': 'acciones',
    'adjetivo': 'adjetivos',
    'caracteristica': 'caracteristicas',
    'ventaja': 'ventajas',
    'plataforma': 'plataformas',
    'estudio': 'estudios',
    'contenido': 'contenido'
  };

  placeholders.forEach(placeholder => {
    const key = placeholder.replace(/[{}]/g, ''); // Quitar llaves

    let valor;

    // Manejar casos especiales (equipo2, etc.)
    if (key === 'equipo2') {
      // Seleccionar otro equipo diferente
      const equiposTemp = [...dataTema.equipos];
      valor = aleatorio(equiposTemp);
    } else {
      // Intentar encontrar el valor con diferentes estrategias
      // 1. Buscar directamente
      if (dataTema[key]) {
        valor = aleatorio(dataTema[key]);
      }
      // 2. Intentar con plural especial
      else if (pluralesEspeciales[key] && dataTema[pluralesEspeciales[key]]) {
        valor = aleatorio(dataTema[pluralesEspeciales[key]]);
      }
      // 3. Intentar agregando 's' al final
      else if (dataTema[key + 's']) {
        valor = aleatorio(dataTema[key + 's']);
      }
      // 4. Intentar quitando 's' del final
      else if (key.endsWith('s') && dataTema[key.slice(0, -1)]) {
        valor = aleatorio(dataTema[key.slice(0, -1)]);
      }
      // 5. Si no se encuentra, mantener el placeholder
      else {
        valor = placeholder;
      }
    }

    // Reemplazar la primera ocurrencia
    texto = texto.replace(placeholder, valor);
  });

  return texto;
}

/**
 * Genera un texto para una temática específica
 */
export function generarTexto(nombreTema) {
  const tema = temas[nombreTema];

  if (!tema) {
    throw new Error(`Tema "${nombreTema}" no encontrado`);
  }

  // Seleccionar plantilla aleatoria
  const plantilla = aleatorio(tema.plantillas);

  // Llenar la plantilla con datos
  let texto = llenarPlantilla(plantilla, tema);

  // Agregar emojis
  texto = agregarEmojis(texto, tema.emojis);

  return {
    tema: tema.nombre,
    texto: texto
  };
}

/**
 * Genera N textos de temáticas aleatorias sin repetir
 */
export function generarTextos(cantidad = 3) {
  const temasDisponibles = Object.keys(temas);

  // Seleccionar temáticas únicas aleatorias
  const temasSeleccionados = aleatoriosUnicos(temasDisponibles, cantidad);

  // Generar un texto por cada tema seleccionado
  return temasSeleccionados.map(tema => generarTexto(tema));
}

/**
 * Genera textos asegurando variedad (sin repetir temas consecutivos)
 */
export function generarTextosVariados(cantidad = 3) {
  const textos = [];
  const temasDisponibles = Object.keys(temas);
  const temasUsados = [];

  for (let i = 0; i < cantidad; i++) {
    // Filtrar temas ya usados si hay suficientes disponibles
    let temasParaElegir = temasDisponibles;

    if (temasUsados.length < temasDisponibles.length) {
      temasParaElegir = temasDisponibles.filter(t => !temasUsados.includes(t));
    } else {
      // Si ya usamos todos, resetear
      temasUsados.length = 0;
    }

    const temaElegido = aleatorio(temasParaElegir);
    temasUsados.push(temaElegido);

    const resultado = generarTexto(temaElegido);
    textos.push(resultado);
  }

  return textos;
}
