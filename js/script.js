/* =========================================================
   mrfitnessvora — shared behaviour
   ========================================================= */

document.addEventListener('DOMContentLoaded', function () {

  /* --- Mobile nav toggle --- */
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('main-nav');

  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var isOpen = nav.getAttribute('data-open') === 'true';
      nav.setAttribute('data-open', String(!isOpen));
      toggle.setAttribute('aria-expanded', String(!isOpen));
    });

    // Close mobile nav when a link is chosen
    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        nav.setAttribute('data-open', 'false');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* --- FAQ accordion (services page) --- */
  var faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(function (item) {
    var q = item.querySelector('.faq-q');
    var a = item.querySelector('.faq-a');
    if (!q || !a) return;

    q.addEventListener('click', function () {
      var isOpen = item.getAttribute('data-open') === 'true';

      // Close all other items (single-open accordion)
      faqItems.forEach(function (other) {
        if (other !== item) {
          other.setAttribute('data-open', 'false');
          other.querySelector('.faq-a').style.maxHeight = null;
          other.querySelector('.faq-q').setAttribute('aria-expanded', 'false');
        }
      });

      item.setAttribute('data-open', String(!isOpen));
      q.setAttribute('aria-expanded', String(!isOpen));
      a.style.maxHeight = !isOpen ? a.scrollHeight + 'px' : null;
    });
  });

  /* --- Contact form (client-side only — no backend wired up) --- */
  var form = document.getElementById('contact-form');
  var status = document.getElementById('form-status');

  if (form && status) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var name = form.querySelector('#name');
      if (name && name.value.trim().length < 2) {
        status.textContent = 'Please enter your full name.';
        status.classList.remove('ok');
        name.focus();
        return;
      }

      var email = form.querySelector('#email');
      var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (email && !emailPattern.test(email.value.trim())) {
        status.textContent = 'Please enter a valid email address.';
        status.classList.remove('ok');
        email.focus();
        return;
      }

      // No backend is connected yet — replace this with a real endpoint.
      status.textContent = 'Thanks — your message is ready to send once a form endpoint is connected.';
      status.classList.add('ok');
      form.reset();
    });
  }

  /* --- Footer year --- */
  var yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

});
