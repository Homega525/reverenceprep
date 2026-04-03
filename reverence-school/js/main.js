(function () {
  const fallbackPartials = {
    navbar: `
      <nav class="site-navbar navbar" aria-label="Primary Navigation">
        <div class="container nav-inner">
          <a href="index.html" class="nav-logo" aria-label="Reverence Preparatory School Home"><span class="logo-wordmark">Reverence</span><span class="logo-sub">Preparatory School</span></a>
          <button class="menu-toggle" id="menuToggle" aria-label="Open menu" aria-expanded="false" aria-controls="mobileDrawer"><span aria-hidden="true">☰</span></button>
          <ul class="nav-links" id="desktopNav">
            <li><a data-page="home" href="index.html">Home</a></li>
            <li><a data-page="about" href="about.html">About</a></li>
            <li><a data-page="academics" href="academics.html">Academics</a></li>
            <li class="has-dropdown"><button class="dropdown-toggle" aria-haspopup="true" aria-expanded="false">Schools</button><ul class="dropdown-menu" aria-label="Schools submenu"><li><a data-page="shs" href="shs.html">SHS</a></li><li><a data-page="jhs" href="jhs.html">JHS</a></li><li><a data-page="primary" href="primary.html">Primary</a></li><li><a data-page="preschool" href="preschool.html">Pre-School</a></li></ul></li>
            <li><a data-page="gallery" href="gallery.html">Gallery</a></li>
            <li><a data-page="events" href="events.html">Events</a></li>
            <li><a data-page="blog" href="blog.html">Blog</a></li>
            <li><a data-page="contact" href="contact.html">Contact</a></li>
          </ul>
          <a class="btn btn-admissions btn-gold" data-page="admissions" href="admissions.html">Admissions</a>
        </div>
        <div class="drawer-backdrop" id="drawerBackdrop" hidden></div>
        <aside class="mobile-drawer" id="mobileDrawer" aria-label="Mobile Navigation" aria-hidden="true">
          <div class="drawer-head"><a href="index.html" class="nav-logo" aria-label="Reverence Preparatory School Home"><span class="logo-wordmark">Reverence</span><span class="logo-sub">Preparatory School</span></a><button class="drawer-close" id="drawerClose" aria-label="Close menu">✕</button></div>
          <ul class="drawer-links">
            <li><a data-page="home" href="index.html">Home</a></li>
            <li><a data-page="about" href="about.html">About</a></li>
            <li><a data-page="academics" href="academics.html">Academics</a></li>
            <li><button class="drawer-dropdown-toggle" id="drawerSchoolsToggle" aria-expanded="false">Schools ▾</button><ul class="drawer-dropdown" id="drawerSchoolsMenu" hidden><li><a data-page="shs" href="shs.html">SHS</a></li><li><a data-page="jhs" href="jhs.html">JHS</a></li><li><a data-page="primary" href="primary.html">Primary</a></li><li><a data-page="preschool" href="preschool.html">Pre-School</a></li></ul></li>
            <li><a data-page="gallery" href="gallery.html">Gallery</a></li>
            <li><a data-page="events" href="events.html">Events</a></li>
            <li><a data-page="blog" href="blog.html">Blog</a></li>
            <li><a data-page="contact" href="contact.html">Contact</a></li>
            <li><a data-page="admissions" class="btn btn-primary" href="admissions.html">Admissions</a></li>
          </ul>
        </aside>
      </nav>
    `,
    footer: `
      <div class="site-footer-wrap footer">
        <div class="container footer-grid">
          <div><div class="footer-logo"><a href="index.html" class="nav-logo" aria-label="Reverence Preparatory School Home"><span class="logo-wordmark">Reverence</span><span class="logo-sub">Preparatory School</span></a></div><p class="footer-tagline">A nurturing and academically excellent preparatory school in Offinso.</p><div class="social-row" aria-label="Social media links"><a href="#" aria-label="Facebook">Facebook</a><a href="#" aria-label="Instagram">Instagram</a><a href="#" aria-label="Twitter or X">Twitter/X</a><a href="#" aria-label="WhatsApp">WhatsApp</a></div></div>
          <div><h3>Activities</h3><ul><li><a href="academics.html">Academic</a></li><li><a href="events.html">News and Events</a></li><li><a href="about.html">Extra-Curricular Activities</a></li><li><a href="gallery.html">Gallery</a></li></ul></div>
          <div><h3>Quick Links</h3><ul><li><a href="terms.html">Terms &amp; Conditions</a></li><li><a href="privacy.html">Privacy Policy</a></li><li><a href="faq.html">FAQ</a></li><li><a href="contact.html">Contact</a></li></ul></div>
          <div><h3>Contact</h3><ul><li>Old Town, Offinso, Ashanti, Ghana</li><li><a href="tel:+233554019237">+233 554 019 237</a></li><li><a href="mailto:reverence475@gmail.com">reverence475@gmail.com</a></li></ul></div>
        </div>
        <div class="footer-bottom"><p>&copy; 2026 Reverence Preparatory School. All Rights Reserved.</p></div>
      </div>
    `,
  };

  const contentFiles = {
    blog: [
      'content/blog/2026-01-12-study-habits.md',
      'content/blog/2026-02-08-stem-fair.md',
      'content/blog/2026-03-03-parent-partnership.md',
    ],
    events: [
      'content/events/2026-01-20-open-day.md',
      'content/events/2026-02-14-sports-festival.md',
      'content/events/2026-03-10-cultural-week.md',
    ],
    news: [
      'content/news/2026-01-07-library-upgrade.md',
      'content/news/2026-02-02-scholarship-drive.md',
      'content/news/2026-03-18-exam-success.md',
    ],
    gallery: [
      'content/gallery/gallery-events-1.md',
      'content/gallery/gallery-campus-1.md',
      'content/gallery/gallery-students-1.md',
      'content/gallery/gallery-sports-1.md',
      'content/gallery/gallery-events-2.md',
      'content/gallery/gallery-campus-2.md',
    ],
  };

  async function loadPartial(targetSelector, path, fallbackKey) {
    const target = document.querySelector(targetSelector);
    if (!target) return;

    try {
      const response = await fetch(path);
      if (!response.ok) throw new Error('Failed to fetch partial');
      target.innerHTML = await response.text();
    } catch (error) {
      target.innerHTML = fallbackPartials[fallbackKey] || '';
    }
  }

  function initFadeIns() {
    const elements = document.querySelectorAll('[data-animate]');
    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('fade-in', 'visible');
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    elements.forEach((el) => {
      el.classList.add('fade-in');
      observer.observe(el);
    });
  }

  function initHeroCardReveal() {
    const cardsWrap = document.querySelector('.hero-cards-wrap');
    if (!cardsWrap) return;

    const cards = Array.from(cardsWrap.querySelectorAll('.hero-image-card'));
    if (!cards.length) return;

    cardsWrap.classList.add('cards-reveal-ready');

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      cards.forEach((card) => card.classList.add('in-view'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          cards.forEach((card, index) => {
            setTimeout(() => card.classList.add('in-view'), index * 120);
          });

          obs.unobserve(entry.target);
        });
      },
      { threshold: 0.24, rootMargin: '0px 0px -10% 0px' }
    );

    observer.observe(cardsWrap);
  }

  function initSmoothAnchorLinks() {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener('click', (event) => {
        const id = anchor.getAttribute('href');
        const target = id ? document.querySelector(id) : null;
        if (!target) return;
        event.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });
  }

  function initStatsCounter() {
    const statsBar = document.querySelector('.stats-bar');
    if (!statsBar) return;

    const statItems = Array.from(statsBar.querySelectorAll('.stat-item'));
    const statNumbers = Array.from(statsBar.querySelectorAll('.stat-number'));
    if (!statNumbers.length) return;

    const animateValue = (el, delayMs = 0) => {
      const target = Number.parseInt(el.dataset.count || '0', 10);
      const prefix = el.dataset.prefix || '';
      const suffix = el.dataset.suffix || '';
      const duration = 900;

      setTimeout(() => {
        const start = performance.now();
        el.classList.add('is-counting');

        const tick = (now) => {
          const elapsed = now - start;
          const progress = Math.min(elapsed / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 4);
          const current = Math.floor(target * eased);
          el.textContent = `${prefix}${current.toLocaleString()}${suffix}`;

          if (progress < 1) {
            requestAnimationFrame(tick);
          } else {
            el.textContent = `${prefix}${target.toLocaleString()}${suffix}`;
            el.classList.remove('is-counting');
            el.classList.add('counted');
          }
        };

        requestAnimationFrame(tick);
      }, delayMs);
    };

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          statItems.forEach((item, index) => {
            setTimeout(() => item.classList.add('in-view'), index * 100);
          });

          statNumbers.forEach((num, index) => {
            animateValue(num, index * 130);
          });

          obs.unobserve(entry.target);
        });
      },
      { threshold: 0.45 }
    );

    observer.observe(statsBar);
  }

  function parseFrontmatter(markdown) {
    const result = { body: markdown };
    if (!markdown.startsWith('---')) return result;

    const parts = markdown.split('---');
    if (parts.length < 3) return result;

    const frontmatter = parts[1].trim();
    const body = parts.slice(2).join('---').trim();

    frontmatter.split('\n').forEach((line) => {
      const idx = line.indexOf(':');
      if (idx === -1) return;
      const key = line.slice(0, idx).trim();
      const value = line.slice(idx + 1).trim().replace(/^"|"$/g, '');
      result[key] = value;
    });

    result.body = body;
    return result;
  }

  async function loadCollection(collectionName) {
    const files = contentFiles[collectionName] || [];
    const rows = await Promise.all(
      files.map(async (file) => {
        try {
          const response = await fetch(file);
          if (!response.ok) throw new Error('failed');
          const text = await response.text();
          return parseFrontmatter(text);
        } catch (error) {
          return null;
        }
      })
    );

    return rows.filter(Boolean);
  }

  function formatDate(value) {
    if (!value) return 'Date TBA';
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return value;
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  }

  function renderCard(data, type) {
    const title = data.title || 'Untitled';
    const image = data.image || 'assets/img/about/news-1.jpg';
    const excerpt = data.excerpt || data.body?.slice(0, 130) || 'Coming soon.';
    const date = formatDate(data.event_date || data.date);

    if (type === 'gallery') {
      return `
        <figure class="gallery-item" data-category="${(data.category || 'All').toLowerCase()}">
          <img src="${image}" alt="${title}">
          <figcaption>${title}</figcaption>
        </figure>
      `;
    }

    const articleClass = type === 'blog' ? 'blog-card' : type === 'events' ? 'event-card' : 'news-card';
    return `
      <article class="${articleClass}">
        <img src="${image}" alt="${title}">
        <span class="date-badge">${date}</span>
        <h3>${title}</h3>
        <p>${excerpt}</p>
        <a class="section-cta" href="#" aria-label="Read more about ${title}">Read More</a>
      </article>
    `;
  }

  async function renderDynamicContent() {
    const blogGrid = document.getElementById('blogGrid');
    const eventsGrid = document.getElementById('eventsGrid');
    const newsGrid = document.getElementById('newsGrid');
    const galleryGrid = document.getElementById('galleryGrid');

    if (blogGrid) {
      const entries = await loadCollection('blog');
      if (entries.length) {
        blogGrid.innerHTML = entries.map((entry) => renderCard(entry, 'blog')).join('');
      }
    }

    if (eventsGrid) {
      const entries = await loadCollection('events');
      if (entries.length) {
        eventsGrid.innerHTML = entries.map((entry) => renderCard(entry, 'events')).join('');
      }
    }

    if (newsGrid) {
      const entries = await loadCollection('news');
      if (entries.length) {
        newsGrid.innerHTML = entries.map((entry) => renderCard(entry, 'news')).join('');
      }
    }

    if (galleryGrid) {
      const entries = await loadCollection('gallery');
      if (entries.length) {
        galleryGrid.innerHTML = entries.map((entry) => renderCard(entry, 'gallery')).join('');
      }
      initGalleryFeatures();
    }
  }

  function initGalleryFeatures() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const items = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('galleryLightbox');
    const lightboxImage = document.getElementById('lightboxImage');
    const prevBtn = document.getElementById('lightboxPrev');
    const nextBtn = document.getElementById('lightboxNext');
    const closeBtn = document.getElementById('lightboxClose');

    if (!items.length) return;

    let activeItems = Array.from(items);
    let currentIndex = 0;

    filterButtons.forEach((button) => {
      button.addEventListener('click', () => {
        const filter = button.dataset.filter;
        filterButtons.forEach((btn) => btn.classList.remove('active'));
        button.classList.add('active');

        items.forEach((item) => {
          const category = item.dataset.category || '';
          const show = filter === 'all' || category === filter;
          item.style.display = show ? 'block' : 'none';
        });

        activeItems = Array.from(items).filter((item) => item.style.display !== 'none');
      });
    });

    const openLightbox = (index) => {
      if (!lightbox || !lightboxImage || !activeItems.length) return;
      currentIndex = (index + activeItems.length) % activeItems.length;
      const img = activeItems[currentIndex].querySelector('img');
      if (!img) return;
      lightboxImage.src = img.src;
      lightboxImage.alt = img.alt;
      lightbox.classList.add('open');
      document.body.style.overflow = 'hidden';
    };

    const closeLightbox = () => {
      if (!lightbox) return;
      lightbox.classList.remove('open');
      document.body.style.overflow = '';
    };

    const shift = (step) => openLightbox(currentIndex + step);

    activeItems.forEach((item, index) => {
      item.addEventListener('click', () => openLightbox(index));
    });

    prevBtn?.addEventListener('click', () => shift(-1));
    nextBtn?.addEventListener('click', () => shift(1));
    closeBtn?.addEventListener('click', closeLightbox);

    lightbox?.addEventListener('click', (event) => {
      if (event.target === lightbox) closeLightbox();
    });

    document.addEventListener('keydown', (event) => {
      if (!lightbox?.classList.contains('open')) return;
      if (event.key === 'Escape') closeLightbox();
      if (event.key === 'ArrowLeft') shift(-1);
      if (event.key === 'ArrowRight') shift(1);
    });
  }

  async function initIncludesAndFeatures() {
    await Promise.all([
      loadPartial('#site-header', 'partials/navbar.html', 'navbar'),
      loadPartial('#site-footer', 'partials/footer.html', 'footer'),
    ]);

    window.NavbarModule?.initNavbar();
    window.NavbarModule?.highlightActiveNav();
    window.CarouselModule?.initHeroCarousel();
    window.CarouselModule?.initTestimonialsCarousel();
    window.FormsModule?.initForms();

    initSmoothAnchorLinks();
    initFadeIns();
    initHeroCardReveal();
    initStatsCounter();
    renderDynamicContent();
  }

  document.addEventListener('DOMContentLoaded', initIncludesAndFeatures);
})();
