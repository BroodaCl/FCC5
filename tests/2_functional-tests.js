const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', () => {

  // 2. Translation with text and locale fields: POST request to /api/translate
  test('Translation with text and locale fields: POST request to /api/translate', (done) => {
    chai.request(server)
      .post('/api/translate')
      .send({ text: 'Mangoes are my favorite fruit.', locale: 'american-to-british' })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.equal(res.body.text, 'Mangoes are my favorite fruit.');
        assert.include(res.body.translation, 'favourite');
        assert.include(res.body.translation, '<span class="highlight">'); // Check for highlight
        done();
      });
  });

  // Translation with text and invalid locale field
  test('Translation with text and invalid locale field: POST request to /api/translate', (done) => {
    chai.request(server)
      .post('/api/translate')
      .send({ text: 'Mangoes are my favorite fruit.', locale: 'french-to-spanish' })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.equal(res.body.error, 'Invalid value for locale field');
        done();
      });
  });

  // 6. Translation with missing text field
  test('Translation with missing text field: POST request to /api/translate', (done) => {
    chai.request(server)
      .post('/api/translate')
      .send({ locale: 'american-to-british' })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.equal(res.body.error, 'Required field(s) missing');
        done();
      });
  });

  // Translation with missing locale field
  test('Translation with missing locale field: POST request to /api/translate', (done) => {
    chai.request(server)
      .post('/api/translate')
      .send({ text: 'Mangoes are my favorite fruit.' })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.equal(res.body.error, 'Required field(s) missing');
        done();
      });
  });

  // 7. Translation with empty text
  test('Translation with empty text: POST request to /api/translate', (done) => {
    chai.request(server)
      .post('/api/translate')
      .send({ text: '  ', locale: 'american-to-british' }) // Usamos '  ' para asegurar que trim() funcione
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.equal(res.body.error, 'No text to translate');
        done();
      });
  });

  // 9. Translation with text that needs no translation
  test('Translation with text that needs no translation: POST request to /api/translate', (done) => {
    chai.request(server)
      .post('/api/translate')
      .send({ text: 'Hello, I am a test sentence.', locale: 'american-to-british' })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.equal(res.body.translation, 'Everything looks good to me!');
        done();
      });
  });

});