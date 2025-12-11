const americanOnly = require('./american-only.js');
const americanToBritishSpelling = require('./american-to-british-spelling.js');
const americanToBritishTitles = require("./american-to-british-titles.js");
const britishOnly = require('./british-only.js');

class Translator {

  constructor() {
    // Invertir diccionarios para la traducción Británico -> Americano
    this.britishToAmericanSpelling = this.invertDict(americanToBritishSpelling);
    this.britishToAmericanTitles = this.invertDict(americanToBritishTitles);
  }

  invertDict(obj) {
    return Object.assign({}, ...Object.entries(obj).map(([k, v]) => ({ [v]: k })));
  }

  /**
   * Reemplaza palabras o frases y agrega el highlight.
   * Maneja diccionarios de palabras/ortografía.
   */
  replaceAll(text, matchesMap) {
    let tempText = text;
    // Ordenar por longitud descendente para que las frases largas tengan prioridad (Ej: 'car boot sale' antes que 'car')
    const sortedKeys = Object.keys(matchesMap).sort((a, b) => b.length - a.length);

    sortedKeys.forEach(key => {
      // RegEx para buscar la palabra completa, respetando espacios o puntuación antes/después
      const regex = new RegExp(`(?<=^|[\\s.,!?;])${key}(?=[\\s.,!?;]|$)`, 'gi');
      
      if (regex.test(tempText)) {
         const translation = matchesMap[key];
         const replacement = `<span class="highlight">${translation}</span>`;
         
         tempText = tempText.replace(regex, replacement);
      }
    });
    return tempText;
  }
  
  /**
   * Maneja la traducción de títulos honoríficos (Dr. <-> Dr).
   */
  handleTitles(text, titlesMap) {
      let result = text;
      
      Object.keys(titlesMap).forEach(titleKey => {
          // Expresión regular para buscar el título seguido de un espacio o fin de texto.
          const regex = new RegExp(`(${titleKey})(?=\\s|$)`, 'gi');
          
          result = result.replace(regex, (match, p1) => {
              // p1 es el título coincidente (Ej: Mr.). Lo convertimos a minúsculas para buscar en el mapa.
              const translatedTitle = titlesMap[p1.toLowerCase()];
              
              // Capitalizar la primera letra de la traducción (Ej: 'dr' -> 'Dr')
              const capitalizedTranslation = translatedTitle.charAt(0).toUpperCase() + translatedTitle.slice(1);
              
              // Devolver la traducción envuelta en <span>
              return `<span class="highlight">${capitalizedTranslation}</span>`;
          });
      });
      return result;
  }

  /**
   * Maneja la traducción del formato de hora (10:30 <-> 10.30).
   */
  handleTime(text, locale) {
    if (locale === 'american-to-british') {
        // Buscar 00:00 y reemplazar por 00.00
        return text.replace(/(\d{1,2}):(\d{2})/g, '<span class="highlight">$1.$2</span>');
    } else if (locale === 'british-to-american') {
        // Buscar 00.00 y reemplazar por 00:00
        return text.replace(/(\d{1,2})\.(\d{2})/g, '<span class="highlight">$1:$2</span>');
    }
    return text;
  }


  translate(text, locale) {
    // Diccionarios temporales según el sentido de la traducción
    let dictSpelling, dictTitles, dictOnly;

    if (locale === 'american-to-british') {
      dictSpelling = americanToBritishSpelling;
      dictTitles = americanToBritishTitles;
      dictOnly = americanOnly;

    } else if (locale === 'british-to-american') {
      dictSpelling = this.britishToAmericanSpelling;
      dictTitles = this.britishToAmericanTitles;
      dictOnly = britishOnly;
    } else {
      return null; // Locale inválido (manejado en /api/translate)
    }

    let translatedText = text;

    // 1. Traducir Títulos
    translatedText = this.handleTitles(translatedText, dictTitles);

    // 2. Traducir Hora
    translatedText = this.handleTime(translatedText, locale);

    // 3. Traducir Ortografía y Palabras Únicas
    // Combinamos ambos diccionarios para buscar
    const combinedWords = { ...dictSpelling, ...dictOnly };
    // NOTA: 'combinedWords' debe ser un diccionario de minúsculas
    const lowerCombinedWords = Object.keys(combinedWords).reduce((acc, key) => {
        acc[key.toLowerCase()] = combinedWords[key];
        return acc;
    }, {});
    
    // Convertimos a minúsculas antes de buscar y reemplazar
    translatedText = this.replaceAll(translatedText, lowerCombinedWords);

    return translatedText;
  }
}

module.exports = Translator;