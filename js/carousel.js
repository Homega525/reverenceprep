(function () {
  function createScrollSnapCarousel(config) {
    const viewport = document.querySelector(config.viewportSelector);
    const dots = Array.from(document.querySelectorAll(config.dotSelector));
    if (!viewport || !dots.length) return;

    const slides = Array.from(viewport.children);
    let active = 0;
    let interval = null;
    let paused = false;

    const updateDots = (index) => {
      dots.forEach((dot, idx) => {
        dot.classList.toggle('active', idx === index);
        dot.setAttribute('aria-current', idx === index ? 'true' : 'false');
      });
    };

    const goTo = (index, smooth = true) => {
      active = (index + slides.length) % slides.length;
      const left = slides[active].offsetLeft;
      viewport.scrollTo({ left, behavior: smooth ? 'smooth' : 'auto' });
      updateDots(active);
    };

    dots.forEach((dot, idx) => {
      dot.addEventListener('click', () => {
        goTo(idx);
      });
    });

    const syncFromScroll = () => {
      const viewportCenter = viewport.scrollLeft + viewport.clientWidth / 2;
      let nearest = 0;
      let minDistance = Number.POSITIVE_INFINITY;

      slides.forEach((slide, idx) => {
        const center = slide.offsetLeft + slide.clientWidth / 2;
        const distance = Math.abs(center - viewportCenter);
        if (distance < minDistance) {
          minDistance = distance;
          nearest = idx;
        }
      });

      if (nearest !== active) {
        active = nearest;
        updateDots(active);
      }
    };

    viewport.addEventListener('scroll', syncFromScroll, { passive: true });

    const startAuto = () => {
      if (!config.autoMs) return;
      clearInterval(interval);
      interval = setInterval(() => {
        if (!paused) goTo(active + 1);
      }, config.autoMs);
    };

    const pause = () => {
      paused = true;
    };

    const resume = () => {
      paused = false;
    };

    viewport.addEventListener('mouseenter', pause);
    viewport.addEventListener('mouseleave', resume);
    viewport.addEventListener('touchstart', pause, { passive: true });
    viewport.addEventListener('touchend', resume, { passive: true });

    goTo(0, false);
    startAuto();
  }

  function initHeroCarousel() {
    if (!window.matchMedia('(max-width: 767px)').matches) return;
    createScrollSnapCarousel({
      viewportSelector: '#heroCardsTrack',
      dotSelector: '.hero-dot',
      autoMs: 4000,
    });
  }

  function initTestimonialsCarousel() {
    createScrollSnapCarousel({
      viewportSelector: '#testimonialTrack',
      dotSelector: '.testimonial-dot',
      autoMs: 4000,
    });
  }

  function initHomeNewsCarousel() {
    const shell = document.querySelector('#newsCarousel');
    const viewport = document.querySelector('.news-carousel-viewport');
    const track = document.querySelector('#newsGrid');
    const dotsWrap = document.querySelector('#newsDots');
    const prevBtn = document.querySelector('#newsPrev');
    const nextBtn = document.querySelector('#newsNext');
    if (!shell || !viewport || !track || !dotsWrap || !prevBtn || !nextBtn) return;

    const slides = Array.from(track.children);
    if (!slides.length) return;

    track.classList.add('news-carousel-track');

    let active = 0;
    let timer = null;
    let resizeTimer = null;

    const getVisibleCount = () => {
      if (window.matchMedia('(max-width: 767px)').matches) return 1;
      if (window.matchMedia('(max-width: 900px)').matches) return 2;
      return 3;
    };

    const getMaxIndex = () => Math.max(0, slides.length - getVisibleCount());
    const getPageCount = () => getMaxIndex() + 1;
    const getStep = () => {
      const slideWidth = slides[0]?.getBoundingClientRect().width || 0;
      const gap = Number.parseFloat(window.getComputedStyle(track).gap || '0') || 0;
      return slideWidth + gap;
    };

    const updateDots = () => {
      const dots = Array.from(dotsWrap.querySelectorAll('.news-dot'));
      dots.forEach((dot, idx) => {
        dot.classList.toggle('active', idx === active);
        dot.setAttribute('aria-current', idx === active ? 'true' : 'false');
      });
    };

    const updateArrowState = () => {
      const disabled = getPageCount() <= 1;
      prevBtn.disabled = disabled;
      nextBtn.disabled = disabled;
    };

    const renderDots = () => {
      const count = getPageCount();
      dotsWrap.hidden = count <= 1;
      dotsWrap.innerHTML = Array.from({ length: count }, (_, idx) => {
        const isActive = idx === active ? ' active' : '';
        return `<button class="carousel-dot news-dot${isActive}" aria-label="News slide ${idx + 1}"></button>`;
      }).join('');

      dotsWrap.querySelectorAll('.news-dot').forEach((dot, idx) => {
        dot.addEventListener('click', () => goTo(idx));
      });
    };

    const updatePosition = (animate = true) => {
      const offset = getStep() * active;
      if (!animate) {
        track.style.transition = 'none';
        track.style.transform = `translateX(-${offset}px)`;
        requestAnimationFrame(() => {
          track.style.transition = '';
        });
      } else {
        track.style.transform = `translateX(-${offset}px)`;
      }
      updateDots();
    };

    const goTo = (index) => {
      const max = getMaxIndex();
      if (max <= 0) {
        active = 0;
        updatePosition();
        return;
      }
      if (index > max) {
        active = 0;
      } else if (index < 0) {
        active = max;
      } else {
        active = index;
      }
      updatePosition();
    };

    const startAuto = () => {
      clearInterval(timer);
      if (getPageCount() <= 1) return;
      timer = setInterval(() => {
        goTo(active + 1);
      }, 5000);
    };

    const pauseAuto = () => clearInterval(timer);
    const resumeAuto = () => startAuto();

    prevBtn.addEventListener('click', () => goTo(active - 1));
    nextBtn.addEventListener('click', () => goTo(active + 1));

    shell.addEventListener('mouseenter', pauseAuto);
    shell.addEventListener('mouseleave', resumeAuto);
    shell.addEventListener('touchstart', pauseAuto, { passive: true });
    shell.addEventListener('touchend', resumeAuto, { passive: true });

    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        const max = getMaxIndex();
        if (active > max) active = max;
        renderDots();
        updatePosition(false);
        updateArrowState();
        startAuto();
      }, 120);
    });

    renderDots();
    updatePosition(false);
    updateArrowState();
    startAuto();
  }

  window.CarouselModule = {
    initHeroCarousel,
    initTestimonialsCarousel,
    initHomeNewsCarousel,
  };
})();
