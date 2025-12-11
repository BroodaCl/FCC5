'use strict';

const Translator = require('../components/translator.js');

module.exports = function (app) {
  
  const translator = new Translator();

  app.route('/api/translate')
    .post((req, res) => {
      const { text, locale } = req.body;

      // Validación de campos faltantes
      if (text === undefined || locale === undefined) {
        return res.json({ error: 'Required field(s) missing' });
      }

      // Validación de texto vacío
      if (text === '') {
        return res.json({ error: 'No text to translate' });
      }

      // Validación de locale
      if (locale !== 'american-to-british' && locale !== 'british-to-american') {
        return res.json({ error: 'Invalid value for locale field' });
      }

      // Realizar traducción
      const translation = translator.translate(text, locale);

      // Comprobar si hubo cambios
      if (translation === text) {
        return res.json({ text, translation: "Everything looks good to me!" });
      }

      return res.json({ text, translation });
    });
};