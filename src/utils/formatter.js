// Utilidades para formatear textos y agregar emojis

/**
 * Selecciona un elemento aleatorio de un array
 */
export function aleatorio(array) {
  return array[Math.floor(Math.random() * array.length)];
}

/**
 * Selecciona N elementos aleatorios únicos de un array
 */
export function aleatoriosUnicos(array, cantidad) {
  const shuffled = [...array].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, cantidad);
}

/**
 * Agrega emojis al inicio y/o final del texto
 */
export function agregarEmojis(texto, emojisDisponibles) {
  const cantidad = Math.random() > 0.5 ? 2 : 1; // 1 o 2 emojis
  const emojis = aleatoriosUnicos(emojisDisponibles, cantidad);

  // Decisión aleatoria de dónde poner los emojis
  const posicion = Math.random();

  if (posicion < 0.33) {
    // Al inicio
    return `${emojis.join(' ')} ${texto}`;
  } else if (posicion < 0.66) {
    // Al final
    return `${texto} ${emojis.join(' ')}`;
  } else {
    // Uno al inicio y uno al final (si hay 2)
    if (emojis.length === 2) {
      return `${emojis[0]} ${texto} ${emojis[1]}`;
    } else {
      return `${texto} ${emojis[0]}`;
    }
  }
}

/**
 * Capitaliza la primera letra de un texto
 */
export function capitalizar(texto) {
  return texto.charAt(0).toUpperCase() + texto.slice(1);
}

/**
 * Formatea la fecha actual
 */
export function obtenerFechaActual() {
  const opciones = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  };
  return new Date().toLocaleDateString('es-AR', opciones);
}

/**
 * Genera un separador visual para la consola
 */
export function separador() {
  return '\n' + '='.repeat(60) + '\n';
}

/**
 * Formatea un texto para output con número
 */
export function formatearOutput(numero, tema, texto) {
  return `
${separador()}
📝 TEXTO #${numero}
🏷️  TEMA: ${tema}
${separador()}
${texto}
${separador()}
`;
}
