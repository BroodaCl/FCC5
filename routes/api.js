'use strict';

const Translator = require('../components/translator.js');

module.exports = function (app) {
  
  const translator = new Translator();

  app.route('/api/translate')
    .post((req, res) => {
      const { text, locale } = req.body;

      // Validación de campos faltantes (6)
      if (text === undefined || locale === undefined) {
        return res.json({ error: 'Required field(s) missing' });
      }

      // Validación de texto vacío (7)
      if (text.trim() === '') {
        return res.json({ error: 'No text to translate' });
      }

      // Validación de locale (8)
      if (locale !== 'american-to-british' && locale !== 'british-to-american') {
        return res.json({ error: 'Invalid value for locale field' });
      }

      // Realizar traducción
      const translation = translator.translate(text, locale);

      // Si el texto no requiere traducción (9)
      if (translation === text) {
        return res.json({ text, translation: "Everything looks good to me!" });
      }
      
      // Respuesta de traducción exitosa (2)
      return res.json({ text, translation });
    });
};