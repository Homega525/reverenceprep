(function () {
  function initAcademicsTabs() {
    const section = document.getElementById('subjects-section');
    if (!section) return;

    const tabs = Array.from(section.querySelectorAll('.tab-btn'));
    const panels = Array.from(section.querySelectorAll('.tab-panel'));
    if (!tabs.length || !panels.length) return;

    const getPanel = (id) => section.querySelector(`#${id}`);

    const setButtonState = (activeTab) => {
      tabs.forEach((tab) => {
        const isActive = tab === activeTab;
        tab.classList.toggle('active', isActive);
        tab.setAttribute('aria-selected', String(isActive));
        tab.setAttribute('tabindex', isActive ? '0' : '-1');
      });
    };

    const activateTab = (targetId, tab, immediate = false) => {
      const targetPanel = getPanel(targetId);
      if (!targetPanel) return;

      const activePanel = section.querySelector('.tab-panel.active');
      setButtonState(tab);

      if (window.matchMedia('(max-width: 768px)').matches) {
        tab.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }

      if (immediate || !activePanel || activePanel === targetPanel) {
        panels.forEach((panel) => panel.classList.remove('active', 'leaving'));
        targetPanel.classList.add('active');
        targetPanel.style.opacity = '';
        targetPanel.style.pointerEvents = '';
        return;
      }

      activePanel.classList.add('leaving');
      activePanel.style.opacity = '0';
      activePanel.style.pointerEvents = 'none';

      targetPanel.classList.add('active');
      targetPanel.style.opacity = '0';
      targetPanel.style.pointerEvents = 'none';

      requestAnimationFrame(() => {
        targetPanel.style.opacity = '1';
        targetPanel.style.pointerEvents = 'auto';
      });

      window.setTimeout(() => {
        activePanel.classList.remove('active', 'leaving');
        activePanel.style.opacity = '';
        activePanel.style.pointerEvents = '';
        targetPanel.style.opacity = '';
        targetPanel.style.pointerEvents = '';
      }, 260);
    };

    const initialTab = section.querySelector('.tab-btn.active') || tabs[0];
    if (!initialTab) return;

    activateTab(initialTab.dataset.tabTarget, initialTab, true);

    tabs.forEach((tab) => {
      tab.addEventListener('click', () => {
        activateTab(tab.dataset.tabTarget, tab);
      });

      tab.addEventListener('keydown', (event) => {
        const index = tabs.indexOf(tab);
        if (event.key === 'ArrowRight') {
          event.preventDefault();
          const nextTab = tabs[(index + 1) % tabs.length];
          nextTab.focus();
          activateTab(nextTab.dataset.tabTarget, nextTab);
        } else if (event.key === 'ArrowLeft') {
          event.preventDefault();
          const prevTab = tabs[(index - 1 + tabs.length) % tabs.length];
          prevTab.focus();
          activateTab(prevTab.dataset.tabTarget, prevTab);
        } else if (event.key === 'Home') {
          event.preventDefault();
          tabs[0].focus();
          activateTab(tabs[0].dataset.tabTarget, tabs[0]);
        } else if (event.key === 'End') {
          event.preventDefault();
          const lastTab = tabs[tabs.length - 1];
          lastTab.focus();
          activateTab(lastTab.dataset.tabTarget, lastTab);
        }
      });
    });
  }

  document.addEventListener('DOMContentLoaded', initAcademicsTabs);
})();
