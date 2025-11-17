// Acortador de URLs para hacer los enlaces más legibles

import axios from 'axios';

/**
 * Acorta una URL usando el servicio is.gd (gratuito, sin API key)
 */
export async function acortarURL(urlLarga) {
  if (!urlLarga || urlLarga.length < 50) {
    return urlLarga; // No acortar URLs que ya son cortas
  }

  try {
    // Usar is.gd - servicio gratuito de acortamiento
    const response = await axios.get('https://is.gd/create.php', {
      params: {
        format: 'simple',
        url: urlLarga
      },
      timeout: 5000
    });

    if (response.data && typeof response.data === 'string' && response.data.startsWith('http')) {
      return response.data.trim();
    }

    // Si falla, devolver URL truncada
    return truncarURL(urlLarga);
  } catch (error) {
    // En caso de error, devolver URL truncada
    return truncarURL(urlLarga);
  }
}

/**
 * Trunca una URL larga mostrando inicio y final
 */
function truncarURL(url) {
  if (!url || url.length <= 60) {
    return url;
  }

  // Mostrar primeros 40 caracteres + ... + últimos 15 caracteres
  const inicio = url.substring(0, 40);
  const final = url.substring(url.length - 15);

  return `${inicio}...${final}`;
}

/**
 * Acorta múltiples URLs en paralelo
 */
export async function acortarURLs(urls) {
  const promesas = urls.map(url => acortarURL(url));
  return await Promise.all(promesas);
}
