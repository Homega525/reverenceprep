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
    const viewport = document.querySelector('#newsGrid');
    const dotsWrap = document.querySelector('#newsDots');
    if (!viewport || !dotsWrap) return;

    const slides = Array.from(viewport.children);
    if (!slides.length) return;

    viewport.classList.add('news-carousel-track');
    dotsWrap.hidden = slides.length <= 1;
    dotsWrap.innerHTML = slides
      .map(
        (_, idx) =>
          `<button class="carousel-dot news-dot${idx === 0 ? ' active' : ''}" aria-label="News slide ${idx + 1}"></button>`
      )
      .join('');

    createScrollSnapCarousel({
      viewportSelector: '#newsGrid',
      dotSelector: '#newsDots .news-dot',
      autoMs: 5000,
    });
  }

  window.CarouselModule = {
    initHeroCarousel,
    initTestimonialsCarousel,
    initHomeNewsCarousel,
  };
})();
