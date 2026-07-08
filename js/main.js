/* ============================================
   ROTARY CLUB OF LAGOS — INTERACTIONS
   Mobile nav, fade-in animations
   ============================================ */

(function () {
  'use strict';

  /* --- Mobile Nav Toggle --- */
  var toggle = document.querySelector('.nav__toggle');
  var overlay = document.querySelector('.nav__overlay');
  var closeBtn = document.querySelector('.nav__close');
  var overlayLinks = document.querySelectorAll('.nav__overlay-links a');

  function openMenu() {
    overlay.classList.add('is-open');
    overlay.setAttribute('aria-hidden', 'false');
    toggle.setAttribute('aria-expanded', 'true');
    closeBtn.focus();
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    overlay.classList.remove('is-open');
    overlay.setAttribute('aria-hidden', 'true');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.focus();
    document.body.style.overflow = '';
  }

  if (toggle && overlay) {
    toggle.addEventListener('click', openMenu);
    closeBtn.addEventListener('click', closeMenu);
    overlayLinks.forEach(function (link) {
      link.addEventListener('click', closeMenu);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && overlay.classList.contains('is-open')) {
        closeMenu();
      }
    });
  }

  /* --- Intersection Observer for fade-in --- */
  if ('IntersectionObserver' in window) {
    var fadeEls = document.querySelectorAll('.fade-in');
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    fadeEls.forEach(function (el) {
      observer.observe(el);
    });

    /* --- Quote reveal: border draws in, then text fades --- */
    var quoteEl = document.querySelector('.quote');
    if (quoteEl) {
      var quoteObserver = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add('quote--reveal');
              quoteObserver.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.3 }
      );
      quoteObserver.observe(quoteEl);
    }
  }
})();
