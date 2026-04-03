(function () {
  function initNavbar() {
    const navbar = document.querySelector('.site-navbar');
    if (!navbar) return;

    const body = document.body;
    const hasHero = body.classList.contains('has-hero');

    const setNavbarState = () => {
      if (!hasHero) {
        navbar.classList.add('nav-solid');
        navbar.classList.add('scrolled');
        return;
      }
      if (window.scrollY > 80) {
        navbar.classList.add('nav-solid');
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('nav-solid');
        navbar.classList.remove('scrolled');
      }
    };

    setNavbarState();
    window.addEventListener('scroll', setNavbarState, { passive: true });

    const dropdownHost = navbar.querySelector('.has-dropdown');
    const dropdownToggle = navbar.querySelector('.dropdown-toggle');
    if (dropdownHost && dropdownToggle) {
      dropdownToggle.addEventListener('click', function () {
        const isOpen = dropdownHost.classList.toggle('open');
        dropdownToggle.setAttribute('aria-expanded', String(isOpen));
      });

      document.addEventListener('click', function (event) {
        if (!dropdownHost.contains(event.target)) {
          dropdownHost.classList.remove('open');
          dropdownToggle.setAttribute('aria-expanded', 'false');
        }
      });
    }

    const drawer = document.getElementById('mobileDrawer');
    const drawerToggle = document.getElementById('menuToggle');
    const drawerClose = document.getElementById('drawerClose');
    const drawerBackdrop = document.getElementById('drawerBackdrop');
    const drawerSchoolsToggle = document.getElementById('drawerSchoolsToggle');
    const drawerSchoolsMenu = document.getElementById('drawerSchoolsMenu');

    const openDrawer = () => {
      if (!drawer || !drawerToggle || !drawerBackdrop) return;
      drawer.classList.add('open');
      drawer.setAttribute('aria-hidden', 'false');
      drawerToggle.setAttribute('aria-expanded', 'true');
      drawerBackdrop.hidden = false;
      document.body.style.overflow = 'hidden';
      if (drawerSchoolsToggle && drawerSchoolsMenu) {
        drawerSchoolsToggle.setAttribute('aria-expanded', 'false');
        drawerSchoolsMenu.hidden = true;
      }
    };

    const closeDrawer = () => {
      if (!drawer || !drawerToggle || !drawerBackdrop) return;
      drawer.classList.remove('open');
      drawer.setAttribute('aria-hidden', 'true');
      drawerToggle.setAttribute('aria-expanded', 'false');
      drawerBackdrop.hidden = true;
      document.body.style.overflow = '';
      if (drawerSchoolsToggle && drawerSchoolsMenu) {
        drawerSchoolsToggle.setAttribute('aria-expanded', 'false');
        drawerSchoolsMenu.hidden = true;
      }
    };

    if (drawerToggle) drawerToggle.addEventListener('click', openDrawer);
    if (drawerClose) drawerClose.addEventListener('click', closeDrawer);
    if (drawerBackdrop) drawerBackdrop.addEventListener('click', closeDrawer);

    if (drawerSchoolsToggle && drawerSchoolsMenu) {
      drawerSchoolsToggle.addEventListener('click', function () {
        if (!window.matchMedia('(max-width: 767px)').matches) return;
        const expanded = drawerSchoolsToggle.getAttribute('aria-expanded') === 'true';
        drawerSchoolsToggle.setAttribute('aria-expanded', String(!expanded));
        drawerSchoolsMenu.hidden = expanded;
      });
    }

    drawer?.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeDrawer));

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') {
        closeDrawer();
        if (dropdownHost && dropdownHost.classList.contains('open')) {
          dropdownHost.classList.remove('open');
          dropdownToggle?.setAttribute('aria-expanded', 'false');
        }
      }
    });
  }

  function highlightActiveNav() {
    const page = document.body.dataset.page;
    if (!page) return;

    document.querySelectorAll('[data-page]').forEach((item) => {
      if (item.dataset.page === page) {
        item.classList.add('active');
      }
    });
  }

  window.NavbarModule = {
    initNavbar,
    highlightActiveNav,
  };
})();
