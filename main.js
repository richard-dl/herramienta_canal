#!/usr/bin/env node

// Punto de entrada principal de la herramienta

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { generarTextosVariados } from './src/generador.js';
import { generarTextosReales } from './src/generadorReal.js';
import { formatearOutput, obtenerFechaActual, separador } from './src/utils/formatter.js';

// Obtener __dirname en módulos ES
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuración
const CANTIDAD_TEXTOS = 3;
const CARPETA_OUTPUT = path.join(__dirname, 'output');

/**
 * Asegura que exista la carpeta de salida
 */
function asegurarCarpetaOutput() {
  if (!fs.existsSync(CARPETA_OUTPUT)) {
    fs.mkdirSync(CARPETA_OUTPUT, { recursive: true });
  }
}

/**
 * Guarda los textos en un archivo
 */
function guardarEnArchivo(textos, usandoFuentesReales = false) {
  const fecha = new Date();
  const timestamp = fecha.toISOString().replace(/[:.]/g, '-').split('T')[0];
  const hora = fecha.toTimeString().split(' ')[0].replace(/:/g, '-');
  const nombreArchivo = `textos_${timestamp}_${hora}.txt`;
  const rutaArchivo = path.join(CARPETA_OUTPUT, nombreArchivo);

  let contenido = `${'='.repeat(70)}\n`;
  contenido += `  TEXTOS GENERADOS PARA CANAL DE WHATSAPP\n`;
  contenido += `  Fecha: ${obtenerFechaActual()}\n`;
  contenido += `  Modo: ${usandoFuentesReales ? 'FUENTES REALES (RSS/APIs)' : 'SINTÉTICO'}\n`;
  contenido += `${'='.repeat(70)}\n\n`;

  textos.forEach((item, index) => {
    contenido += `${'─'.repeat(70)}\n`;
    contenido += `TEXTO #${index + 1} - TEMA: ${item.tema}\n`;
    if (item.fuente) {
      contenido += `FUENTE: ${item.fuente}\n`;
    }
    if (item.esReal !== undefined) {
      contenido += `TIPO: ${item.esReal ? '✓ Noticia Real' : '⚠ Generado Sintéticamente'}\n`;
    }
    contenido += `${'─'.repeat(70)}\n`;
    contenido += `${item.texto}\n`;
    if (item.link) {
      contenido += `\nLink: ${item.link}\n`;
    }
    contenido += `\n`;
  });

  contenido += `${'='.repeat(70)}\n`;
  contenido += `Total de textos generados: ${textos.length}\n`;
  contenido += `${'='.repeat(70)}\n`;

  fs.writeFileSync(rutaArchivo, contenido, 'utf-8');

  return nombreArchivo;
}

/**
 * Función principal
 */
async function main() {
  console.log('\n');
  console.log('╔════════════════════════════════════════════════════════════╗');
  console.log('║   GENERADOR DE TEXTOS PARA CANAL DE WHATSAPP              ║');
  console.log('║          CON FUENTES REALES (RSS + APIs)                  ║');
  console.log('╚════════════════════════════════════════════════════════════╝');
  console.log('\n');

  console.log(`📅 Fecha: ${obtenerFechaActual()}`);
  console.log(`🎯 Generando ${CANTIDAD_TEXTOS} textos desde fuentes reales...`);
  console.log('\n');

  try {
    // Asegurar carpeta de salida
    asegurarCarpetaOutput();

    // Generar textos desde fuentes reales
    const textos = await generarTextosReales(CANTIDAD_TEXTOS);

    console.log('\n' + '═'.repeat(60) + '\n');

    // Mostrar en consola
    textos.forEach((item, index) => {
      console.log(formatearOutput(index + 1, item.tema, item.texto));

      // Mostrar info de fuente
      if (item.fuente) {
        console.log(`   📰 Fuente: ${item.fuente}`);
      }
      if (item.esReal !== undefined) {
        const tipo = item.esReal ? '✓ Noticia Real' : '⚠ Generado Sintéticamente';
        console.log(`   📌 Tipo: ${tipo}`);
      }
      console.log('');
    });

    // Guardar en archivo
    const nombreArchivo = guardarEnArchivo(textos, true);

    console.log('✅ TEXTOS GENERADOS EXITOSAMENTE\n');
    console.log(`💾 Guardado en: output/${nombreArchivo}\n`);
    console.log('═'.repeat(60));
    console.log('\n');

  } catch (error) {
    console.error('\n❌ ERROR:', error.message);
    console.error(error);
    console.error('\n');
    process.exit(1);
  }
}

// Ejecutar
main();
