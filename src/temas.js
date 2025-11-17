// Datos y plantillas para cada temática

export const temas = {
  deportes: {
    nombre: 'Deportes',
    emojis: ['⚽', '🏆', '🔥', '💪', '⭐', '🎯', '👏', '🏅', '⚡'],

    // Datos variables
    equipos: ['Real Madrid', 'Barcelona', 'Manchester City', 'PSG', 'Bayern Munich', 'Liverpool', 'Inter Miami', 'Milan', 'Juventus'],
    jugadores: ['Messi', 'Cristiano', 'Haaland', 'Mbappé', 'Neymar', 'Vinicius', 'Bellingham', 'De Bruyne', 'Lewandowski'],
    competiciones: ['Champions League', 'Premier League', 'La Liga', 'Copa del Rey', 'Mundial de Clubes', 'Supercopa'],
    acciones: ['goleada histórica', 'remontada épica', 'triplete increíble', 'jugada magistral', 'hat-trick', 'victoria agónica'],
    adjetivos: ['espectacular', 'impresionante', 'histórica', 'increíble', 'magistral', 'épica', 'brutal'],

    // Plantillas de estructura
    plantillas: [
      '{jugador} está en su mejor momento: {accion} en el partido de ayer. {adjetivo} desempeño que lo pone en la mira de grandes clubes.',
      'El {equipo} no para de sorprender. {accion} en {competicion} y los aficionados enloquecen. ¿Candidatos al título?',
      'Noticia de último momento: {jugador} cerca de fichar por {equipo}. La operación podría cerrarse esta semana. ¡Se viene algo grande!',
      '{competicion}: {equipo} venció con una {accion}. {jugador} fue la estrella de la noche con un partido {adjetivo}.',
      'Sorpresa en el mundo del fútbol: {equipo} busca a {jugador} para reforzar su plantilla. ¿Se concretará el fichaje?'
    ]
  },

  ligaArgentina: {
    nombre: 'Liga Argentina',
    emojis: ['🇦🇷', '⚽', '🏆', '💙', '❤️', '🔥', '⭐', '👏', '💪'],

    equipos: ['Boca Juniors', 'River Plate', 'Racing', 'Independiente', 'San Lorenzo', 'Estudiantes', 'Vélez', 'Talleres', 'Argentinos Juniors'],
    jugadores: ['Cavani', 'Merentiel', 'Borja', 'Solari', 'Medina', 'Romero', 'Zenón', 'Barco', 'Saracchi'],
    estadios: ['La Bombonera', 'El Monumental', 'El Cilindro', 'El Nuevo Gasómetro', 'Libertadores de América'],
    competiciones: ['Liga Profesional', 'Copa Argentina', 'Copa Libertadores', 'Copa Sudamericana', 'Trofeo de Campeones'],
    acciones: ['goleada', 'clásico electrizante', 'triunfo agónico', 'remontada increíble', 'victoria contundente'],
    adjetivos: ['histórico', 'emocionante', 'espectacular', 'vibrante', 'apasionante', 'inolvidable'],

    plantillas: [
      '{equipo} sacó un {adjetivo} triunfo ante {equipo2} en {estadio}. {jugador} marcó el gol del partido y se llevó todos los aplausos.',
      'Se viene el clásico: {equipo} vs {equipo2}. Ambos llegan con todo para este partidazo de {competicion}. ¿Quién se lo lleva?',
      '{jugador} está en racha: dos goles más para {equipo} en la {competicion}. El delantero no para de brillar y ya suma varios tantos.',
      'Bombazo en el mercado: {equipo} busca cerrar el fichaje de {jugador}. Los hinchas esperan ansiosos la confirmación oficial.',
      '{equipo} sigue firme en la punta de {competicion}. {accion} ante {equipo2} y los dirige hacia un nuevo título argentino.'
    ]
  },

  cine: {
    nombre: 'Cine',
    emojis: ['🎬', '🍿', '🎥', '⭐', '🔥', '👏', '🎭', '🌟', '📽️'],

    generos: ['acción', 'suspenso', 'terror', 'comedia', 'ciencia ficción', 'drama', 'thriller'],
    actores: ['Tom Cruise', 'Margot Robbie', 'Ryan Gosling', 'Florence Pugh', 'Timothée Chalamet', 'Zendaya', 'Ana de Armas'],
    directores: ['Christopher Nolan', 'Denis Villeneuve', 'Greta Gerwig', 'James Cameron', 'Tarantino', 'Scorsese'],
    peliculas: ['Dune 3', 'Misión Imposible', 'Barbie 2', 'Deadpool & Wolverine', 'Oppenheimer', 'Avatar 3'],
    estudios: ['Warner', 'Marvel', 'Universal', 'Paramount', 'Disney', 'Netflix'],
    adjetivos: ['impresionante', 'explosiva', 'emocionante', 'magistral', 'épica', 'inolvidable', 'fascinante'],

    plantillas: [
      '¡Confirmado! {director} dirigirá la nueva película de {genero} protagonizada por {actor}. El estreno será el próximo año y promete ser {adjetivo}.',
      '{pelicula} arrasa en taquilla: ya superó los 500 millones de dólares a nivel mundial. {actor} brilla en cada escena.',
      'Trailer oficial de {pelicula} ya disponible. {genero} pura con efectos {adjetivos} que te dejarán sin aliento. ¿Ya lo viste?',
      '{actor} confirmado para la nueva producción de {estudio}. La película de {genero} promete romperla en cines el próximo año.',
      'Se viene {pelicula}: {director} al mando de una historia {adjetivo}. Las críticas anticipadas son excelentes y ya genera expectativa.'
    ]
  },

  series: {
    nombre: 'Series',
    emojis: ['📺', '🎬', '🔥', '⭐', '👀', '🍿', '💥', '🎭', '📽️'],

    plataformas: ['Netflix', 'Prime Video', 'Disney+', 'HBO Max', 'Apple TV+', 'Paramount+', 'Star+'],
    generos: ['thriller', 'drama', 'comedia', 'ciencia ficción', 'terror', 'acción', 'misterio'],
    series: ['Stranger Things', 'The Crown', 'The Last of Us', 'Wednesday', 'The Boys', 'House of the Dragon', 'Succession'],
    actores: ['Pedro Pascal', 'Jenna Ortega', 'Millie Bobby Brown', 'Anya Taylor-Joy', 'Henry Cavill', 'Jason Momoa'],
    adjetivos: ['adictiva', 'impactante', 'emocionante', 'épica', 'brillante', 'fascinante', 'sorprendente'],
    acciones: ['nueva temporada confirmada', 'final de temporada impactante', 'renovación oficial', 'spin-off en desarrollo'],

    plantillas: [
      '¡{accion}! {serie} en {plataforma} ya tiene fecha de estreno. Los fans esperan ansiosos este {genero} {adjetivo}.',
      '{actor} será la estrella de la nueva serie de {genero} en {plataforma}. La producción promete ser {adjetivo} y ya genera hype.',
      '{serie} rompe récords: la serie más vista de {plataforma} en su primera semana. ¿Ya la viste? El {genero} {adjetivo} que todos hablan.',
      'Oficial: {serie} tendrá una nueva temporada en {plataforma}. {actor} regresa en esta historia {adjetivo} que nos tiene enganchados.',
      'Estreno destacado en {plataforma}: {serie} llega con todo. {genero} {adjetivo} que promete ser el hit del mes. ¡No te la pierdas!'
    ]
  },

  iptv: {
    nombre: 'Sistemas IPTV',
    emojis: ['📡', '📺', '🔥', '⚡', '💻', '🎯', '✨', '🚀', '💪'],

    caracteristicas: ['HD y 4K', 'más de 10.000 canales', 'deportes en vivo', 'películas y series ilimitadas', 'sin cortes ni buffering', 'EPG completo'],
    deportes: ['fútbol', 'NBA', 'NFL', 'UFC', 'tenis', 'boxeo', 'F1'],
    canales: ['ESPN', 'Fox Sports', 'TNT Sports', 'HBO', 'Cinecanal', 'Universal', 'AXN'],
    contenido: ['estrenos', 'clásicos del cine', 'series completas', 'documentales', 'anime', 'infantil'],
    ventajas: ['precio accesible', 'instalación simple', 'soporte 24/7', 'actualización constante', 'compatibilidad total'],

    plantillas: [
      'IPTV Premium: {caracteristica}. Incluye {deporte} y todos los canales de {canal}. {ventaja} y calidad garantizada.',
      '¿Buscás ver {deporte} en vivo? Con nuestro servicio IPTV tenés acceso a {caracteristica}. {ventaja} y sin sorpresas.',
      'IPTV 2025: {caracteristica}, {contenido} y mucho más. Todo el entretenimiento que necesitás con {ventaja}. ¡Consultá planes!',
      'Mirá {deporte} y tus {contenido} favoritos en {caracteristica}. Servicio IPTV estable con {ventaja}. ¡Probá sin compromiso!',
      'IPTV Full: acceso a {canal}, {caracteristica} y {contenido}. {ventaja} que hace la diferencia. ¡Tu mejor opción de streaming!'
    ]
  }
};
