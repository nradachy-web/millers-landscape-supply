// Mobile nav toggle
(function () {
  var btn = document.querySelector('.nav-toggle');
  var menu = document.getElementById('mobile-nav');
  if (!btn || !menu) return;
  btn.addEventListener('click', function () {
    var open = menu.classList.toggle('open');
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    if (open) menu.removeAttribute('hidden'); else menu.setAttribute('hidden', '');
  });
  // Close menu when a link is tapped
  menu.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', function () {
      menu.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
      menu.setAttribute('hidden', '');
    });
  });
})();

// Year
(function () {
  var yr = document.getElementById('yr');
  if (yr) yr.textContent = new Date().getFullYear();
})();

// Product slideshow + variety selector (works for any .product-card with [data-slideshow])
(function () {
  var INTERVAL = 3500;

  function initCard(card) {
    var slideshow = card.querySelector('[data-slideshow]');
    if (!slideshow) return;
    var slides = Array.prototype.slice.call(slideshow.querySelectorAll('.slide'));
    var chips = Array.prototype.slice.call(card.querySelectorAll('.variety-chip'));
    if (!slides.length) return;

    var idx = 0;
    var timer = null;

    function setActive(i) {
      idx = (i + slides.length) % slides.length;
      slides.forEach(function (s, n) {
        s.classList.toggle('is-active', n === idx);
      });
      if (!chips.length) return;
      var variety = slides[idx].getAttribute('data-variety');
      chips.forEach(function (c) {
        c.setAttribute('aria-selected', c.getAttribute('data-variety') === variety ? 'true' : 'false');
      });
    }

    function advance() { setActive(idx + 1); }
    function start() { stop(); timer = setInterval(advance, INTERVAL); }
    function stop() { if (timer) { clearInterval(timer); timer = null; } }

    function indexForVariety(variety) {
      for (var i = 0; i < slides.length; i++) {
        if (slides[i].getAttribute('data-variety') === variety) return i;
      }
      return -1;
    }

    chips.forEach(function (chip) {
      chip.addEventListener('click', function () {
        stop();
        var first = indexForVariety(chip.getAttribute('data-variety'));
        if (first >= 0) setActive(first);
      });
    });

    slideshow.addEventListener('mouseenter', stop);
    slideshow.addEventListener('mouseleave', start);

    setActive(0);
    start();
  }

  Array.prototype.slice
    .call(document.querySelectorAll('.product-card'))
    .filter(function (c) { return c.querySelector('[data-slideshow]'); })
    .forEach(initCard);
})();
