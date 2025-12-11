const chai = require('chai');
const assert = chai.assert;

const Translator = require('../components/translator.js');
const translator = new Translator();

suite('Unit Tests', () => {

  // American to British
  suite('American to British English', () => {
    test('Translate Mangoes are my favorite fruit.', (done) => {
      const input = 'Mangoes are my favorite fruit.';
      const output = translator.translate(input, 'american-to-british');
      assert.include(output, 'favourite');
      done();
    });

    test('Translate I ate yogurt for breakfast.', (done) => {
      const input = 'I ate yogurt for breakfast.';
      const output = translator.translate(input, 'american-to-british');
      assert.include(output, 'yoghurt');
      done();
    });

    test("Translate We had a party at my friend's condo.", (done) => {
      const input = "We had a party at my friend's condo.";
      const output = translator.translate(input, 'american-to-british');
      assert.include(output, 'flat');
      done();
    });

    test('Translate Can you toss this in the trashcan for me?', (done) => {
      const input = 'Can you toss this in the trashcan for me?';
      const output = translator.translate(input, 'american-to-british');
      assert.include(output, 'bin');
      done();
    });

    test('Translate The parking lot was full.', (done) => {
      const input = 'The parking lot was full.';
      const output = translator.translate(input, 'american-to-british');
      assert.include(output, 'car park');
      done();
    });

    test('Translate Like a high tech Rube Goldberg machine.', (done) => {
      const input = 'Like a high tech Rube Goldberg machine.';
      const output = translator.translate(input, 'american-to-british');
      assert.include(output, 'Heath Robinson device');
      done();
    });

    test('Translate To play hooky means to skip class or work.', (done) => {
      const input = 'To play hooky means to skip class or work.';
      const output = translator.translate(input, 'american-to-british');
      assert.include(output, 'bunk off');
      done();
    });

    test('Translate No Mr. Bond, I expect you to die.', (done) => {
      const input = 'No Mr. Bond, I expect you to die.';
      const output = translator.translate(input, 'american-to-british');
      assert.include(output, 'Mr'); // Sin punto
      done();
    });

    test('Translate Dr. Grosh will see you now.', (done) => {
      const input = 'Dr. Grosh will see you now.';
      const output = translator.translate(input, 'american-to-british');
      assert.include(output, 'Dr'); // Sin punto
      done();
    });

    test('Translate Lunch is at 12:15 today.', (done) => {
      const input = 'Lunch is at 12:15 today.';
      const output = translator.translate(input, 'american-to-british');
      assert.include(output, '12.15');
      done();
    });
  });

  // British to American
  suite('British to American English', () => {
    test('Translate We watched the footie match for a while.', (done) => {
      const input = 'We watched the footie match for a while.';
      const output = translator.translate(input, 'british-to-american');
      assert.include(output, 'soccer');
      done();
    });

    test('Translate Paracetamol takes up to an hour to work.', (done) => {
      const input = 'Paracetamol takes up to an hour to work.';
      const output = translator.translate(input, 'british-to-american');
      assert.include(output, 'Tylenol');
      done();
    });

    test('Translate First, caramelise the onions.', (done) => {
      const input = 'First, caramelise the onions.';
      const output = translator.translate(input, 'british-to-american');
      assert.include(output, 'caramelize');
      done();
    });

    test('Translate I spent the bank holiday at the funfair.', (done) => {
      const input = 'I spent the bank holiday at the funfair.';
      const output = translator.translate(input, 'british-to-american');
      assert.include(output, 'public holiday');
      assert.include(output, 'carnival');
      done();
    });

    test('Translate I had a bicky then went to the chippy.', (done) => {
      const input = 'I had a bicky then went to the chippy.';
      const output = translator.translate(input, 'british-to-american');
      assert.include(output, 'cookie');
      assert.include(output, 'fish-and-chip shop');
      done();
    });

    test("Translate I've just got bits and bobs in my bum bag.", (done) => {
      const input = "I've just got bits and bobs in my bum bag.";
      const output = translator.translate(input, 'british-to-american');
      assert.include(output, 'odds and ends');
      assert.include(output, 'fanny pack');
      done();
    });

    test('Translate The car boot sale at Boxted Airfield was called off.', (done) => {
      const input = 'The car boot sale at Boxted Airfield was called off.';
      const output = translator.translate(input, 'british-to-american');
      assert.include(output, 'swap meet');
      done();
    });

    test('Translate Have you met Mrs Kalyani?', (done) => {
      const input = 'Have you met Mrs Kalyani?';
      const output = translator.translate(input, 'british-to-american');
      assert.include(output, 'Mrs.');
      done();
    });

    test("Translate Prof Joyner of King's College, London.", (done) => {
      const input = "Prof Joyner of King's College, London.";
      const output = translator.translate(input, 'british-to-american');
      assert.include(output, 'Prof.');
      done();
    });

    test('Translate Tea time is usually around 4 or 4.30.', (done) => {
      const input = 'Tea time is usually around 4 or 4.30.';
      const output = translator.translate(input, 'british-to-american');
      assert.include(output, '4:30');
      done();
    });
  });

  // Highlight Tests
  suite('Highlight Translations', () => {
    test('Highlight translation in Mangoes are my favorite fruit.', (done) => {
      const input = 'Mangoes are my favorite fruit.';
      const output = translator.translate(input, 'american-to-british');
      assert.include(output, '<span class="highlight">favourite</span>');
      done();
    });

    test('Highlight translation in I ate yogurt for breakfast.', (done) => {
      const input = 'I ate yogurt for breakfast.';
      const output = translator.translate(input, 'american-to-british');
      assert.include(output, '<span class="highlight">yoghurt</span>');
      done();
    });

    test('Highlight translation in We watched the footie match for a while.', (done) => {
      const input = 'We watched the footie match for a while.';
      const output = translator.translate(input, 'british-to-american');
      assert.include(output, '<span class="highlight">soccer</span>');
      done();
    });

    test('Highlight translation in Paracetamol takes up to an hour to work.', (done) => {
      const input = 'Paracetamol takes up to an hour to work.';
      const output = translator.translate(input, 'british-to-american');
      assert.include(output, '<span class="highlight">Tylenol</span>');
      done();
    });
  });

});