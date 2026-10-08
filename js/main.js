// Lewis Kinoti — Portfolio interactions
(function () {
  'use strict';

  document.documentElement.classList.add('js');

  const $ = (sel, ctx) => (ctx || document).querySelector(sel);
  const $$ = (sel, ctx) => Array.from((ctx || document).querySelectorAll(sel));

  // 1. Mobile menu
  const burger = $('#burger');
  const navLinks = $('#navLinks');
  if (burger && navLinks) {
    const setMenu = (open) => {
      navLinks.classList.toggle('open', open);
      burger.setAttribute('aria-expanded', String(open));
      burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
      document.body.style.overflow = open ? 'hidden' : '';
    };
    burger.addEventListener('click', () => setMenu(!navLinks.classList.contains('open')));
    navLinks.addEventListener('click', (e) => {
      if (e.target.closest('a')) setMenu(false);
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navLinks.classList.contains('open')) {
        setMenu(false);
        burger.focus();
      }
    });
  }

  // 2. Active nav link (fallback for pages without aria-current)
  const here = location.pathname.split('/').pop() || 'index.html';
  $$('.nav-links a').forEach((a) => {
    const href = a.getAttribute('href');
    if (href === here && !a.hasAttribute('aria-current')) a.setAttribute('aria-current', 'page');
  });

  // 2b. Scroll-spy: highlight the nav item for the section in view
  const spyLinks = $$('.nav-links a[data-spy]');
  if (spyLinks.length && 'IntersectionObserver' in window) {
    const byId = {};
    spyLinks.forEach((a) => { byId[a.dataset.spy] = a; });
    const visible = new Set();

    const setCurrent = (id) => {
      spyLinks.forEach((a) => {
        if (a.dataset.spy === id) a.setAttribute('aria-current', 'page');
        else a.removeAttribute('aria-current');
      });
    };

    const sio = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) visible.add(entry.target.id);
        else visible.delete(entry.target.id);
      });
      // Pick the topmost section currently on screen.
      const order = Object.keys(byId);
      const active = order.filter((id) => visible.has(id))
        .sort((a, b) => byId[a].getBoundingClientRect().top - byId[b].getBoundingClientRect().top)[0];
      if (active) setCurrent(active);
      else if (window.scrollY < 80) setCurrent('home');
    }, { rootMargin: '-20% 0px -60% 0px', threshold: 0 });

    Object.keys(byId).forEach((id) => {
      const section = document.getElementById(id);
      if (section) sio.observe(section);
    });
  }

  // 2c. Smooth scroll for in-page anchors, with a fixed-header offset
  $$('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      const id = link.getAttribute('href');
      if (!id || id === '#') return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - 84;
      window.scrollTo({ top, behavior: 'smooth' });
      history.replaceState(null, '', id);
    });
  });

  // 3. Header background, scroll progress bar and back-to-top visibility
  const header = $('#header');
  const toTop = $('#toTop');
  const progress = $('#scrollProgress');
  const onScroll = () => {
    const y = window.scrollY;
    if (header) header.classList.toggle('scrolled', y > 40);
    if (toTop) {
      toTop.hidden = false;
      toTop.classList.toggle('show', y > 600);
    }
    if (progress) {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      progress.style.width = (max > 0 ? Math.min(100, (y / max) * 100) : 0) + '%';
    }
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });
  onScroll();

  if (toTop) {
    toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  // 4. Scroll-reveal animations
  const reveals = $$('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('visible');
        io.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px' });
    reveals.forEach((el) => io.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add('visible'));
  }

  // 4b. Toolkit horizontal marquees
  const toolViews = $$('.tool-viewport');

  if (toolViews.length) {
    toolViews.forEach((vp) => {
      const track = vp.querySelector('.tool-track');
      if (!track) return;
      const width = track.scrollWidth;
      if (!width) return;
      const clone = track.cloneNode(true);
      clone.setAttribute('aria-hidden', 'true');
      vp.appendChild(clone);
      vp.style.setProperty('--dur', Math.max(20, Math.round(width / 38)) + 's');
      vp.classList.add('is-marquee');

      let timer;
      const pause = () => {
        vp.classList.add('is-paused');
        clearTimeout(timer);
      };
      const resume = () => {
        clearTimeout(timer);
        timer = setTimeout(() => vp.classList.remove('is-paused'), 2500);
      };
      vp.addEventListener('touchstart', pause, { passive: true });
      vp.addEventListener('touchend', resume, { passive: true });
      vp.addEventListener('touchcancel', resume, { passive: true });
    });

    if ('IntersectionObserver' in window) {
      const tio = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle('is-live', entry.isIntersecting);
        });
      }, { rootMargin: '140px 0px' });
      toolViews.forEach((vp) => tio.observe(vp));
    } else {
      toolViews.forEach((vp) => vp.classList.add('is-live'));
    }
  }

  // 5. Animated stat counters
  const counters = $$('[data-count]');
  if ('IntersectionObserver' in window) {
    const cio = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = +el.dataset.count;
        const suffix = el.dataset.suffix || '';
        const prefix = el.dataset.prefix || '';
        let cur = 0;
        const step = Math.max(1, Math.round(target / 60));
        const tick = setInterval(() => {
          cur += step;
          if (cur >= target) {
            cur = target;
            clearInterval(tick);
          }
          el.innerHTML = prefix + cur + '<b>' + suffix + '</b>';
        }, 22);
        cio.unobserve(el);
      });
    }, { threshold: 0.5 });
    counters.forEach((c) => cio.observe(c));
  } else {
    counters.forEach((el) => {
      el.textContent = (el.dataset.prefix || '') + el.dataset.count + (el.dataset.suffix || '');
    });
  }

  // 6. Current year in footer
  const yearEl = $('#year');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  // 7. Contact form — client-side validation, then opens the user's mail client.
  //    For real server-side handling, point the form's `action` at Formspree,
  //    FormSubmit or Netlify Forms and delete the preventDefault block below.
  const form = $('#contactForm');
  if (form) {
    const status = $('#formStatus');
    const rules = {
      name: (v) => (v.trim().length >= 2 ? '' : 'Please enter your name.'),
      email: (v) => (/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) ? '' : 'Please enter a valid email address.'),
      message: (v) => (v.trim().length >= 10 ? '' : 'Please add a little more detail (at least 10 characters).'),
    };

    const showError = (input, msg) => {
      const field = input.closest('.field');
      const slot = $('.err[data-for="' + input.id + '"]', field);
      field.classList.toggle('invalid', Boolean(msg));
      input.setAttribute('aria-invalid', msg ? 'true' : 'false');
      if (slot) slot.textContent = msg;
    };

    Object.keys(rules).forEach((id) => {
      const input = $('#' + id, form);
      if (!input) return;
      input.addEventListener('blur', () => showError(input, rules[id](input.value)));
      input.addEventListener('input', () => {
        if (input.closest('.field').classList.contains('invalid')) {
          showError(input, rules[id](input.value));
        }
      });
    });

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      let firstBad = null;
      Object.keys(rules).forEach((id) => {
        const input = $('#' + id, form);
        if (!input) return;
        const msg = rules[id](input.value);
        showError(input, msg);
        if (msg && !firstBad) firstBad = input;
      });

      if (firstBad) {
        if (status) {
          status.textContent = 'Please fix the highlighted fields.';
          status.className = 'form-note bad';
        }
        firstBad.focus();
        return;
      }

      const data = new FormData(form);
      const subject = 'Portfolio inquiry — ' + (data.get('topic') || 'General');
      const body =
        'Name: ' + data.get('name') + '\n' +
        'Email: ' + data.get('email') + '\n' +
        'Needs: ' + (data.get('topic') || 'General enquiry') + '\n\n' +
        data.get('message') + '\n\n— Sent from kinoti.dev';

      const href =
        'mailto:lkinoti012@gmail.com?subject=' + encodeURIComponent(subject) +
        '&body=' + encodeURIComponent(body);

      if (status) {
        status.textContent = 'Opening your email app… If nothing happens, email lkinoti012@gmail.com directly.';
        status.className = 'form-note ok';
      }
      window.location.href = href;
      form.reset();
    });
  }
})();
