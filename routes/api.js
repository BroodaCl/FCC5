'use strict';

const Translator = require('../components/translator.js');

module.exports = function (app) {
  
  const translator = new Translator();

  app.route('/api/translate')
    .post((req, res) => {
      const { text, locale } = req.body;

      // 6. Si uno o más de los campos requeridos falta
      if (text === undefined || locale === undefined) {
        return res.json({ error: 'Required field(s) missing' });
      }

      // 7. Si text es vacío
      if (text.trim() === '') {
        return res.json({ error: 'No text to translate' });
      }

      // 8. Locale inválido
      if (locale !== 'american-to-british' && locale !== 'british-to-american') {
        return res.json({ error: 'Invalid value for locale field' });
      }

      // Realizar traducción
      const translation = translator.translate(text, locale);

      // 9. Si el texto no requiere traducción
      if (translation === text) {
        return res.json({ text, translation: "Everything looks good to me!" });
      }
      
      // 2. Respuesta de traducción exitosa
      return res.json({ text, translation });
    });
};