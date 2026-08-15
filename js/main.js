/* ============================================================
   AHMAD BOUHMOUCH — PORTFOLIO
   Vanilla JS · aucune dépendance / no dependency
   ============================================================ */
(function () {
  'use strict';

  var $  = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };

  /* ==========================================================
     1. LANGUE
     FR si navigateur francophone ou contexte marocain, EN sinon.
     Choix explicite mémorisé.
     ========================================================== */
  var STORE = 'ab-lang';
  var lang = 'fr';

  /* Pays/locales majoritairement francophones */
  var FR_LOCALES = /^(fr|wo)\b|-(FR|MA|DZ|TN|BE|CH|CA|LU|MC|SN|CI|ML|BF|NE|TD|CD|CG|GA|CM|BJ|TG|GN|MG|RW|BI|DJ|KM|SC|HT)\b/i;
  var FR_TIMEZONES = /^(Africa\/(Casablanca|El_Aaiun|Algiers|Tunis|Dakar|Abidjan|Bamako|Ouagadougou|Niamey|Ndjamena|Kinshasa|Brazzaville|Libreville|Douala|Porto-Novo|Lome|Conakry|Bangui|Djibouti)|Europe\/(Paris|Brussels|Zurich|Luxembourg|Monaco)|America\/(Montreal|Toronto)|Indian\/(Antananarivo|Comoro|Mahe))$/;

  function detectLang() {
    var saved = null;
    try { saved = localStorage.getItem(STORE); } catch (e) {}
    if (saved === 'fr' || saved === 'en') return saved;

    var list = navigator.languages && navigator.languages.length
      ? navigator.languages
      : [navigator.language || 'en'];

    for (var i = 0; i < list.length; i++) {
      var l = String(list[i]);
      if (/^fr\b/i.test(l)) return 'fr';
      if (FR_LOCALES.test(l)) return 'fr';
      /* une autre langue explicite l'emporte sur le fuseau */
      if (/^[a-z]{2}\b/i.test(l) && !/^fr/i.test(l)) break;
    }

    /* Repli : fuseau horaire (couvre le Maroc même si le navigateur est en anglais) */
    try {
      var tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
      if (tz && FR_TIMEZONES.test(tz)) return 'fr';
    } catch (e) {}

    return 'en';
  }

  function t(key) {
    var dict = I18N[lang] || I18N.fr;
    return dict[key] != null ? dict[key] : (I18N.fr[key] != null ? I18N.fr[key] : '');
  }

  function applyLang() {
    document.documentElement.lang = lang;

    $$('[data-i18n]').forEach(function (el) {
      el.textContent = t(el.getAttribute('data-i18n'));
    });
    $$('[data-i18n-content]').forEach(function (el) {
      el.setAttribute('content', t(el.getAttribute('data-i18n-content')));
    });
    $$('[data-i18n-html]').forEach(function (el) {
      el.innerHTML = t(el.getAttribute('data-i18n-html'));
    });
    $$('[data-i18n-alt]').forEach(function (el) {
      el.alt = t(el.getAttribute('data-i18n-alt'));
    });
    $$('[data-i18n-aria]').forEach(function (el) {
      el.setAttribute('aria-label', t(el.getAttribute('data-i18n-aria')));
    });

    document.title = t('meta.title');

    /* Bascule visuelle FR / EN */
    $$('.lang__opt').forEach(function (s) {
      s.classList.toggle('is-on', s.getAttribute('data-lang') === lang);
    });

    /* CV : bascule automatique dès que la version FR existe.
       Pour l'activer, déposer assets/cv/Ahmad-BOUHMOUCH-CV-FR.pdf
       et passer HAS_FR_CV à true. */
    var HAS_FR_CV = false;
    var cv = $('#cvLink');
    if (cv) {
      var file = (lang === 'fr' && HAS_FR_CV)
        ? 'Ahmad-BOUHMOUCH-CV-FR.pdf'
        : 'Ahmad-BOUHMOUCH-CV-EN.pdf';
      cv.href = 'assets/cv/' + file;
      cv.setAttribute('download', file);
    }
    var note = $('.btn__note');
    if (note) note.style.display = (lang === 'fr' && HAS_FR_CV) ? 'none' : '';

    renderAll();
  }

  function setLang(next) {
    lang = next;
    try { localStorage.setItem(STORE, lang); } catch (e) {}
    applyLang();
  }

  /* ==========================================================
     2. RENDU DES SECTIONS
     ========================================================== */
  var EDUCATION = [
    { date: 'edu.master.date',   title: 'edu.master.title',   org: 'edu.master.place' },
    { date: 'edu.bachelor.date', title: 'edu.bachelor.title', org: 'edu.bachelor.place' }
  ];

  var EXPERIENCE = [
    { id: 'options',  bullets: 4 },
    { id: 'urbaine',  bullets: 3 },
    { id: 'azal',     bullets: 4 },
    { id: 'chantier', bullets: 4 }
  ];

  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  }

  function renderTimelines() {
    var edu = $('#timelineEdu');
    if (edu) {
      edu.textContent = '';
      EDUCATION.forEach(function (e) {
        var li = el('li', 'tl reveal');
        li.appendChild(el('p', 'tl__date', t(e.date)));
        li.appendChild(el('h4', 'tl__title', t(e.title)));
        li.appendChild(el('p', 'tl__org', t(e.org)));
        edu.appendChild(li);
      });
    }

    var exp = $('#timelineExp');
    if (exp) {
      exp.textContent = '';
      EXPERIENCE.forEach(function (e) {
        var p = 'exp.' + e.id + '.';
        var li = el('li', 'tl reveal');
        li.appendChild(el('p', 'tl__date', t(p + 'date')));
        li.appendChild(el('h4', 'tl__title', t(p + 'title')));
        li.appendChild(el('p', 'tl__org', t(p + 'org')));
        li.appendChild(el('p', 'tl__place', t(p + 'place')));

        var ul = el('ul', 'tl__list');
        for (var i = 1; i <= e.bullets; i++) {
          var txt = t(p + 'b' + i);
          if (txt) ul.appendChild(el('li', null, txt));
        }
        li.appendChild(ul);
        exp.appendChild(li);
      });
    }
  }

  function renderSkills() {
    var box = $('#skills');
    if (!box) return;
    box.textContent = '';

    [['design', 'skills.design'], ['render', 'skills.render'], ['office', 'skills.office']]
      .forEach(function (pair) {
        var g = el('div', 'skills__group reveal');
        g.appendChild(el('h4', null, t(pair[1])));
        var tags = el('div', 'tags');
        SOFTWARE[pair[0]].forEach(function (name) {
          tags.appendChild(el('span', 'tag', name));
        });
        g.appendChild(tags);
        box.appendChild(g);
      });

    var soft = $('#soft');
    if (soft) {
      soft.textContent = '';
      for (var i = 1; i <= 6; i++) {
        soft.appendChild(el('li', 'reveal', t('soft.' + i)));
      }
    }

    var langs = $('#langs');
    if (langs) {
      langs.textContent = '';
      SPOKEN.forEach(function (l) {
        var li = el('li');
        var row = el('div', 'lang__row');
        row.appendChild(el('span', 'lang__name', t(l.key)));
        row.appendChild(el('span', 'lang__level', t(l.level)));
        li.appendChild(row);

        var bar = el('div', 'lang__bar');
        var fill = el('span');
        fill.style.setProperty('--w', (l.score / 5 * 100) + '%');
        bar.appendChild(fill);
        li.appendChild(bar);
        langs.appendChild(li);
      });
    }
  }

  function renderProjects() {
    var grid = $('#projectGrid');
    if (!grid) return;
    grid.textContent = '';

    PROJECTS.forEach(function (p, i) {
      var cover = p.images[0];
      var btn = el('button', 'card reveal');
      btn.type = 'button';
      btn.setAttribute('data-slug', p.slug);
      btn.setAttribute('aria-label', p.title[lang] + ' — ' + t('projects.view'));

      var media = el('div', 'card__media');
      var img = new Image();
      img.src = 'assets/projects/' + p.slug + '/' + cover.file;
      img.alt = cover.alt[lang];
      img.width = cover.w;
      img.height = cover.h;
      img.loading = i < 2 ? 'eager' : 'lazy';
      img.decoding = 'async';
      media.appendChild(img);
      media.appendChild(el('span', 'card__veil'));
      media.appendChild(el('span', 'card__num', String(i + 1).padStart(2, '0')));

      /* Pastille « agrandir » — affordance visible sans survol */
      var badge = el('span', 'card__badge');
      badge.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">' +
        '<path d="M14 4h6v6M10 20H4v-6M20 4l-7 7M4 20l7-7"/></svg>';
      media.appendChild(badge);
      btn.appendChild(media);

      var body = el('div', 'card__body');
      var left = el('div');
      left.appendChild(el('h3', 'card__title', p.title[lang]));
      left.appendChild(el('p', 'card__place', p.location[lang]));
      body.appendChild(left);
      body.appendChild(el('p', 'card__meta', p.year));
      btn.appendChild(body);

      /* Pied de carte : action explicite + nombre de vues */
      var foot = el('div', 'card__foot');
      var cta = el('span', 'card__cta');
      cta.appendChild(el('span', null, t('projects.view')));
      cta.insertAdjacentHTML('beforeend',
        '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M4 12h15m0 0l-6-6m6 6l-6 6"/></svg>');
      foot.appendChild(cta);
      foot.appendChild(el('span', 'card__count',
        p.images.length + ' ' + t('projects.images')));
      btn.appendChild(foot);

      btn.addEventListener('click', function () { openViewer(p.slug); });
      grid.appendChild(btn);
    });
  }

  function renderAll() {
    renderTimelines();
    renderSkills();
    renderProjects();
    observeReveals();
    if (viewerState.slug) fillViewer(viewerState.slug, viewerState.index);
  }

  /* ==========================================================
     3. NAVIGATION
     ========================================================== */
  var nav = $('#nav');
  var burger = $('#burger');
  var navLinks = $('#navLinks');

  function closeMenu() {
    if (!navLinks) return;
    navLinks.classList.remove('is-open');
    nav.classList.remove('is-menu-open');
    burger.setAttribute('aria-expanded', 'false');
    burger.setAttribute('aria-label', t('nav.menu'));
    document.body.classList.remove('is-locked');
  }

  if (burger) {
    burger.addEventListener('click', function () {
      var open = navLinks.classList.toggle('is-open');
      nav.classList.toggle('is-menu-open', open);
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
      burger.setAttribute('aria-label', t(open ? 'nav.close' : 'nav.menu'));
      document.body.classList.toggle('is-locked', open);

    });
  }

  $$('#navLinks a').forEach(function (a) {
    a.addEventListener('click', closeMenu);
  });

  /* La barre reste visible en permanence ; on ajoute seulement une
     ombre discrète dès que la page a défilé. */
  var ticking = false;

  function onScroll() {
    nav.classList.toggle('is-solid', window.pageYOffset > 40);
    ticking = false;
  }
  window.addEventListener('scroll', function () {
    if (!ticking) { ticking = true; window.requestAnimationFrame(onScroll); }
  }, { passive: true });
  onScroll();

  /* Lien actif selon la section visible */
  var sections = $$('main section[id]');
  if ('IntersectionObserver' in window && sections.length) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        var id = en.target.id;
        $$('#navLinks a').forEach(function (a) {
          a.classList.toggle('is-active', a.getAttribute('href') === '#' + id);
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    sections.forEach(function (s) { spy.observe(s); });
  }

  /* ==========================================================
     4. RÉVÉLATIONS AU DÉFILEMENT
     ========================================================== */
  var revealObserver = null;
  function observeReveals() {
    var items = $$('.reveal:not(.in)').concat($$('.langs'));
    if (!('IntersectionObserver' in window)) {
      items.forEach(function (n) { n.classList.add('in'); });
      return;
    }
    if (!revealObserver) {
      revealObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (!en.isIntersecting) return;
          var node = en.target;
          var siblings = node.parentNode ? $$('.reveal', node.parentNode) : [];
          var idx = siblings.indexOf(node);
          node.style.transitionDelay = (idx > 0 ? Math.min(idx, 6) * 70 : 0) + 'ms';
          node.classList.add('in');
          revealObserver.unobserve(node);
        });
      }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    }
    items.forEach(function (n) { revealObserver.observe(n); });
  }

  /* ==========================================================
     5. VISIONNEUSE DE PROJET
     ========================================================== */
  var viewer = $('#viewer');
  var carousel = $('#carousel');
  var dotsBox = $('#dots');
  var prevBtn = $('#prevBtn');
  var nextBtn = $('#nextBtn');
  var idxEl = $('#carouselIndex');
  var totalEl = $('#carouselTotal');
  var captionEl = $('#carouselCaption');

  var viewerState = { slug: null, index: 0, images: [], lastFocus: null };

  function projectBySlug(slug) {
    for (var i = 0; i < PROJECTS.length; i++) {
      if (PROJECTS[i].slug === slug) return PROJECTS[i];
    }
    return null;
  }

  function fillViewer(slug, startIndex) {
    var p = projectBySlug(slug);
    if (!p) return;

    viewerState.slug = slug;
    viewerState.images = p.images;

    $('#viewerYear').textContent = p.year;
    $('#viewerTitle').textContent = p.title[lang];

    var meta = $('#viewerMeta');
    meta.textContent = '';
    [[t('viewer.type'), p.type[lang]],
     [t('viewer.location'), p.location[lang]],
     [t('viewer.year'), p.year]].forEach(function (pair) {
      meta.appendChild(el('dt', null, pair[0]));
      meta.appendChild(el('dd', null, pair[1]));
    });

    var desc = $('#viewerDesc');
    desc.textContent = '';
    p.description[lang].forEach(function (para) {
      desc.appendChild(el('p', null, para));
    });

    /* Diapositives */
    carousel.textContent = '';
    p.images.forEach(function (im, i) {
      var fig = el('figure', 'slide');
      fig.setAttribute('role', 'group');
      fig.setAttribute('aria-label', (i + 1) + ' / ' + p.images.length);
      var img = new Image();
      img.src = 'assets/projects/' + p.slug + '/' + im.file;
      img.alt = im.alt[lang];
      img.width = im.w;
      img.height = im.h;
      img.loading = i === 0 ? 'eager' : 'lazy';
      img.decoding = 'async';
      fig.appendChild(img);
      carousel.appendChild(fig);
    });

    /* Points */
    dotsBox.textContent = '';
    p.images.forEach(function (im, i) {
      var d = el('button', 'dot');
      d.type = 'button';
      d.setAttribute('aria-label', (i + 1) + ' ' + t('viewer.of') + ' ' + p.images.length);
      d.addEventListener('click', function () { goTo(i); });
      dotsBox.appendChild(d);
    });

    totalEl.textContent = String(p.images.length).padStart(2, '0');
    goTo(startIndex || 0, true);
  }

  function slideWidth() {
    var first = carousel.querySelector('.slide');
    if (!first) return carousel.clientWidth;
    var gap = parseFloat(getComputedStyle(carousel).columnGap || '0') || 0;
    return first.getBoundingClientRect().width + gap;
  }

  function goTo(i, instant) {
    var total = viewerState.images.length;
    if (!total) return;
    i = Math.max(0, Math.min(i, total - 1));
    viewerState.index = i;

    var behavior = instant ? 'auto' : 'smooth';
    var target = carousel.querySelectorAll('.slide')[i];
    if (target) {
      var left = target.offsetLeft - (carousel.clientWidth - target.clientWidth) / 2;
      try { carousel.scrollTo({ left: left, behavior: behavior }); }
      catch (e) { carousel.scrollLeft = left; }
    }
    syncUI();
  }

  function syncUI() {
    var i = viewerState.index;
    var total = viewerState.images.length;
    idxEl.textContent = String(i + 1).padStart(2, '0');

    $$('.dot', dotsBox).forEach(function (d, k) {
      d.classList.toggle('is-on', k === i);
    });

    var im = viewerState.images[i];
    captionEl.textContent = im ? im.alt[lang] : '';

    prevBtn.disabled = i === 0;
    nextBtn.disabled = i === total - 1;
  }

  /* Suivi du défilement manuel (swipe) */
  var scrollTimer = null;
  if (carousel) {
    carousel.addEventListener('scroll', function () {
      if (scrollTimer) clearTimeout(scrollTimer);
      scrollTimer = setTimeout(function () {
        var slides = $$('.slide', carousel);
        if (!slides.length) return;
        var center = carousel.scrollLeft + carousel.clientWidth / 2;
        var best = 0, bestDist = Infinity;
        slides.forEach(function (s, k) {
          var mid = s.offsetLeft + s.clientWidth / 2;
          var d = Math.abs(mid - center);
          if (d < bestDist) { bestDist = d; best = k; }
        });
        if (best !== viewerState.index) {
          viewerState.index = best;
          syncUI();
        }
      }, 90);
    }, { passive: true });
  }

  if (prevBtn) prevBtn.addEventListener('click', function () { goTo(viewerState.index - 1); });
  if (nextBtn) nextBtn.addEventListener('click', function () { goTo(viewerState.index + 1); });

  function openViewer(slug) {
    viewerState.lastFocus = document.activeElement;
    fillViewer(slug, 0);
    viewer.hidden = false;
    document.body.classList.add('is-locked');
    /* force le reflow pour que la transition parte de l'état initial */
    void viewer.offsetWidth;
    viewer.classList.add('is-open');
    closeMenu();
    $('#viewerClose').focus();
  }

  function closeViewer() {
    viewer.classList.remove('is-open');
    document.body.classList.remove('is-locked');
    var done = function () {
      viewer.hidden = true;
      viewer.removeEventListener('transitionend', done);
    };
    viewer.addEventListener('transitionend', done);
    setTimeout(done, 500);

    if (viewerState.lastFocus && viewerState.lastFocus.focus) {
      viewerState.lastFocus.focus();
    }
    viewerState.slug = null;
  }

  $$('[data-close]', viewer).forEach(function (n) {
    n.addEventListener('click', closeViewer);
  });
  $('#viewerClose').addEventListener('click', closeViewer);

  /* Clavier */
  document.addEventListener('keydown', function (e) {
    if (viewer.hidden) {
      if (e.key === 'Escape') closeMenu();
      return;
    }
    if (e.key === 'Escape') { closeViewer(); return; }
    if (e.key === 'ArrowRight') { e.preventDefault(); goTo(viewerState.index + 1); }
    if (e.key === 'ArrowLeft')  { e.preventDefault(); goTo(viewerState.index - 1); }
    if (e.key === 'Home')       { e.preventDefault(); goTo(0); }
    if (e.key === 'End')        { e.preventDefault(); goTo(viewerState.images.length - 1); }

    /* Piège de focus */
    if (e.key === 'Tab') {
      var f = $$('a[href], button:not([disabled]), [tabindex="0"]', viewer)
        .filter(function (n) { return n.offsetParent !== null; });
      if (!f.length) return;
      var first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });

  /* Recentrage après redimensionnement */
  var resizeTimer = null;
  window.addEventListener('resize', function () {
    if (viewer.hidden) return;
    if (resizeTimer) clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () { goTo(viewerState.index, true); }, 150);
  });

  /* ==========================================================
     6. DÉMARRAGE
     ========================================================== */
  $('#langBtn').addEventListener('click', function () {
    setLang(lang === 'fr' ? 'en' : 'fr');
  });

  var y = $('#year');
  if (y) y.textContent = new Date().getFullYear();

  lang = detectLang();
  applyLang();
})();
