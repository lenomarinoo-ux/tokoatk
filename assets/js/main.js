/* ==========================================================================
   TokoATK — main.js (vanilla JS, no dependencies beyond Bootstrap bundle)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', function () {

  /* ---- Sticky navbar shadow on scroll ---- */
  var header = document.querySelector('.atk-header');
  if (header) {
    var toggleShadow = function () {
      if (window.scrollY > 8) {
        header.style.boxShadow = '0 4px 20px rgba(48,10,10,.08)';
      } else {
        header.style.boxShadow = 'none';
      }
    };
    toggleShadow();
    window.addEventListener('scroll', toggleShadow, { passive: true });
  }

  /* ---- Scroll reveal ---- */
  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
  }

  /* ---- Auto-stagger reveal delay within a row ---- */
  document.querySelectorAll('[data-stagger]').forEach(function (group) {
    Array.prototype.forEach.call(group.children, function (child, i) {
      child.style.transitionDelay = (i * 90) + 'ms';
    });
  });

  /* ---- Collapse mobile menu after clicking a link ---- */
  var navCollapse = document.getElementById('atkNavbar');
  if (navCollapse) {
    navCollapse.querySelectorAll('.nav-link, .dropdown-item').forEach(function (link) {
      link.addEventListener('click', function () {
        if (window.innerWidth < 992 && navCollapse.classList.contains('show')) {
          var collapse = bootstrap.Collapse.getOrCreateInstance(navCollapse);
          collapse.hide();
        }
      });
    });
  }

  /* ---- Artikel: toggle Daftar Isi (TOC) di halaman detail blog ---- */
  document.querySelectorAll('.toc-toggle').forEach(function (toggle) {
    var targetId = toggle.getAttribute('aria-controls');
    var content = targetId ? document.getElementById(targetId) : null;
    if (!content) return;
    toggle.addEventListener('click', function () {
      var expanded = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!expanded));
      content.style.maxHeight = expanded ? '0px' : content.scrollHeight + 'px';
    });
  });

  /* ---- WhatsApp CTA: build prefilled message from data-wa-msg ---- */
  var WA_NUMBER = '6288989643555';
  document.querySelectorAll('[data-wa-msg]').forEach(function (btn) {
    var msg = btn.getAttribute('data-wa-msg');
    btn.setAttribute('href', 'https://wa.me/' + WA_NUMBER + '?text=' + encodeURIComponent(msg));
    btn.setAttribute('target', '_blank');
    btn.setAttribute('rel', 'noopener');
  });

  /* ---- Hero image slider ---- */
  var heroSlides = document.querySelectorAll('.hero-slide');
  var heroPrev = document.querySelector('.hero-slider__arrow--prev');
  var heroNext = document.querySelector('.hero-slider__arrow--next');
  if (heroSlides.length > 1) {
    var currentHeroSlide = 0;
    var heroInterval = 3000;
    var heroTimer;
    function showHeroSlide(index) {
      heroSlides[currentHeroSlide].classList.remove('is-active');
      currentHeroSlide = (index + heroSlides.length) % heroSlides.length;
      heroSlides[currentHeroSlide].classList.add('is-active');
    }
    function nextHeroSlide() {
      showHeroSlide(currentHeroSlide + 1);
    }
    function prevHeroSlide() {
      showHeroSlide(currentHeroSlide - 1);
    }
    function startHeroAutoplay() {
      clearInterval(heroTimer);
      heroTimer = setInterval(function () { nextHeroSlide(); }, heroInterval);
    }
    /* Tombol kanan */
    if (heroNext) {
      heroNext.addEventListener('click', function () {
        nextHeroSlide();
        startHeroAutoplay();
      });
    }
    /* Tombol kiri */
    if (heroPrev) {
      heroPrev.addEventListener('click', function () {
        prevHeroSlide();
        startHeroAutoplay();
      });
    }
    /* Autoplay — pause saat tab tidak aktif untuk hemat CPU */
    document.addEventListener('visibilitychange', function () {
      if (document.hidden) {
        clearInterval(heroTimer);
      } else {
        startHeroAutoplay();
      }
    });
    startHeroAutoplay();
  }

  /* =========================================================
   About — Depth Carousel (auto transisi)
   ========================================================= */

  var aboutCarousel = document.getElementById('aboutCarousel');
  var aboutStage = document.getElementById('aboutCarouselStage');
  var aboutDotsWrap = document.getElementById('aboutCarouselDots');

  if (aboutCarousel && aboutStage) {

    var aboutSlides = Array.prototype.slice.call(aboutStage.querySelectorAll('[data-slide]'));
    var aboutTotal = aboutSlides.length;
    var aboutVisibleDepth = 2; /* jumlah kartu terlihat di tiap sisi pusat */
    var aboutActive = 0;
    var aboutTimer;
    var aboutInterval = parseInt(aboutCarousel.getAttribute('data-autoplay'), 10) || 2600;

    /* Buat dot indikator */
    var aboutDots = [];
    if (aboutDotsWrap && aboutTotal > 1) {
      aboutSlides.forEach(function (_, i) {
        var dot = document.createElement('button');
        dot.type = 'button';
        dot.className = 'about-carousel__dot';
        dot.setAttribute('aria-label', 'Tampilkan slide ' + (i + 1));
        dot.addEventListener('click', function () {
          goToAboutSlide(i);
          startAboutAutoplay();
        });
        aboutDotsWrap.appendChild(dot);
        aboutDots.push(dot);
      });
    }

    function renderAboutCarousel() {
      aboutSlides.forEach(function (slide, i) {
        /* Jarak melingkar terpendek dari kartu aktif */
        var raw = i - aboutActive;
        var half = aboutTotal / 2;
        if (raw > half) raw -= aboutTotal;
        if (raw < -half) raw += aboutTotal;

        var abs = Math.abs(raw);
        var pos = raw === 0 ? 0 : (raw > 0 ? 1 : -1) * Math.min(abs, aboutVisibleDepth + 1);

        slide.style.setProperty('--pos', pos);
        slide.style.setProperty('--abs', Math.min(abs, aboutVisibleDepth + 1));
        slide.setAttribute('data-abs', Math.min(abs, aboutVisibleDepth + 1));

        if (abs === 0) {
          slide.setAttribute('data-active', 'true');
        } else {
          slide.removeAttribute('data-active');
        }

        if (abs > aboutVisibleDepth) {
          slide.setAttribute('data-hidden', 'true');
        } else {
          slide.removeAttribute('data-hidden');
        }
      });

      aboutDots.forEach(function (dot, i) {
        dot.classList.toggle('is-active', i === aboutActive);
      });
    }

    function goToAboutSlide(index) {
      aboutActive = (index + aboutTotal) % aboutTotal;
      renderAboutCarousel();
    }

    function nextAboutSlide() {
      goToAboutSlide(aboutActive + 1);
    }

    function startAboutAutoplay() {
      clearInterval(aboutTimer);
      if (aboutTotal > 1) {
        aboutTimer = setInterval(nextAboutSlide, aboutInterval);
      }
    }

    /* Klik kartu: jika kartu belum aktif (di samping), jadikan aktif & bawa ke tengah.
       Jika sudah aktif (di tengah), biarkan link terbuka ke halaman produk */
    aboutSlides.forEach(function (slide, i) {
      slide.addEventListener('click', function (e) {
        if (aboutActive !== i) {
          e.preventDefault();
          goToAboutSlide(i);
          startAboutAutoplay();
        }
      });
    });

    /* Jeda saat kursor di atas carousel */
    aboutCarousel.addEventListener('mouseenter', function () {
      clearInterval(aboutTimer);
    });
    aboutCarousel.addEventListener('mouseleave', function () {
      startAboutAutoplay();
    });

    renderAboutCarousel();
    startAboutAutoplay();

    /* Pause about carousel saat tab tidak aktif */
    document.addEventListener('visibilitychange', function () {
      if (document.hidden) {
        clearInterval(aboutTimer);
      } else {
        startAboutAutoplay();
      }
    });
  }

  /* =========================================================
   Category Cards — 3D Tilt
   ========================================================= */

  var categoryCards = document.querySelectorAll('.cat-scroller .cat-card');

  if (categoryCards.length) {

    categoryCards.forEach(function (card) {

      var isTouchDevice =
        window.matchMedia('(hover: none), (pointer: coarse)').matches;

      if (isTouchDevice) {
        return;
      }

      card.addEventListener('mousemove', function (event) {

        var rect = card.getBoundingClientRect();

        var x = event.clientX - rect.left;
        var y = event.clientY - rect.top;

        var centerX = rect.width / 2;
        var centerY = rect.height / 2;

        /*
         * Menghitung posisi mouse terhadap
         * titik tengah card.
         */

        var rotateY =
          ((x - centerX) / centerX) * 10;

        var rotateX =
          ((centerY - y) / centerY) * 10;

        /*
         * Batasi kemiringan agar tidak berlebihan.
         */

        rotateX = Math.max(-10, Math.min(10, rotateX));
        rotateY = Math.max(-10, Math.min(10, rotateY));

        card.style.transform =
          'perspective(1000px) ' +
          'rotateX(' + rotateX + 'deg) ' +
          'rotateY(' + rotateY + 'deg) ' +
          'translateZ(12px)';

      });


      card.addEventListener('mouseleave', function () {

        card.style.transform =
          'perspective(1000px) ' +
          'rotateX(0deg) ' +
          'rotateY(0deg) ' +
          'translateZ(0)';

      });


      card.addEventListener('mouseenter', function () {

        card.style.transition =
          'transform .12s ease-out, ' +
          'box-shadow .3s ease, ' +
          'border-color .3s ease';

      });

    });
  }

  /* ---- Back to Top ---- */
  var backToTopBtn = document.getElementById('backToTop');
  if (backToTopBtn) {
    var toggleBackToTop = function () {
      if (window.scrollY > 300) {
        backToTopBtn.classList.add('is-visible');
      } else {
        backToTopBtn.classList.remove('is-visible');
      }
    };
    toggleBackToTop();
    window.addEventListener('scroll', toggleBackToTop, { passive: true });
    backToTopBtn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

});