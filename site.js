/* «Что хочется сегодня?» — подсвечивает подходящие строки прейскуранта и выбирает программу в форме. */
(function () {
  'use strict';
  var matrix = document.querySelector('.matrix');
  var chips = document.querySelectorAll('[data-want]');
  var select = document.getElementById('f-program');
  if (!matrix || !chips.length) return;

  // Какой пункт формы соответствует строке прейскуранта.
  var FORM = {
    back40: 'Массаж спины, 40 минут',
    body60: 'Массаж всего тела, 60 минут',
    barrel90: 'Массаж и парение в кедровой бочке, 90 минут',
    pair: 'Ритуал «Парный» для двоих'
  };

  chips.forEach(function (chip) {
    chip.addEventListener('click', function () {
      var on = chip.getAttribute('aria-pressed') !== 'true';
      chips.forEach(function (c) { c.setAttribute('aria-pressed', 'false'); });
      matrix.querySelectorAll('.is-match').forEach(function (r) { r.classList.remove('is-match'); });
      if (!on) { matrix.removeAttribute('data-filter'); return; }
      chip.setAttribute('aria-pressed', 'true');
      var ids = chip.getAttribute('data-want').split(' ');
      matrix.setAttribute('data-filter', ids.join(' '));
      ids.forEach(function (id) {
        var row = matrix.querySelector('[data-program="' + id + '"]');
        if (row) row.classList.add('is-match');
      });
      if (select && FORM[ids[0]]) select.value = FORM[ids[0]];
    });
  });
})();
