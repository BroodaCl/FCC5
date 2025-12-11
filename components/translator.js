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

  // Ayudante para encontrar y reemplazar manteniendo mayúsculas/minúsculas y agregando highlight
  replaceAll(text, matchesMap, titleMode = false) {
    const lowerText = text.toLowerCase();
    const sortedKeys = Object.keys(matchesMap).sort((a, b) => b.length - a.length); // Buscar frases largas primero

    // Reconstruimos el texto
    let tempText = text;

    sortedKeys.forEach(key => {
      const regex = new RegExp(`(?<=^|[\\s.,!?;])${key}(?=[\\s.,!?;]|$)`, 'gi');
      if (regex.test(tempText)) {
         const translation = matchesMap[key];
         // Si es título, capitalizar primera letra. Si no, usar valor del diccionario
         const replacement = titleMode 
            ? translation.charAt(0).toUpperCase() + translation.slice(1) 
            : translation;
         
         tempText = tempText.replace(regex, `<span class="highlight">${replacement}</span>`);
      }
    });
    return tempText;
  }

  translate(text, locale) {
    const lowerText = text.toLowerCase();
    let translatedText = text;

    // Diccionarios temporales según el sentido de la traducción
    let dictSpelling, dictTitles, dictOnly, timeRegex, timeReplacement;

    if (locale === 'american-to-british') {
      dictSpelling = americanToBritishSpelling;
      dictTitles = americanToBritishTitles;
      dictOnly = americanOnly;
      // Hora: 10:30 -> 10.30
      timeRegex = /([1-9]|1[0-2]):([0-5][0-9])/g;
      timeReplacement = '<span class="highlight">$1.$2</span>';

    } else if (locale === 'british-to-american') {
      dictSpelling = this.britishToAmericanSpelling;
      dictTitles = this.britishToAmericanTitles;
      dictOnly = britishOnly;
      // Hora: 10.30 -> 10:30
      timeRegex = /([1-9]|1[0-2])\.([0-5][0-9])/g;
      timeReplacement = '<span class="highlight">$1:$2</span>';
    } else {
      return null; // Locale inválido
    }

    // 1. Traducir Títulos (Mr. -> Mr)
    translatedText = this.replaceAll(translatedText, dictTitles, true);

    // 2. Traducir Ortografía y Palabras Únicas
    // Combinamos ambos diccionarios para buscar
    const combinedWords = { ...dictSpelling, ...dictOnly };
    translatedText = this.replaceAll(translatedText, combinedWords, false);

    // 3. Traducir Hora
    translatedText = translatedText.replace(timeRegex, timeReplacement);

    return translatedText;
  }
}

module.exports = Translator;