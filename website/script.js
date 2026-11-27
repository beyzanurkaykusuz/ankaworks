document.addEventListener('DOMContentLoaded', () => {
  // Cinematic opening splash
  const introSplash = document.getElementById('introSplash');
  const introSkipBtn = document.getElementById('introSkipBtn');

  const closeIntro = () => {
    if (!introSplash || introSplash.classList.contains('is-hidden')) return;
    introSplash.classList.add('is-hidden');
    document.body.classList.remove('intro-active');
  };

  if (introSplash) {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      closeIntro();
    } else {
      const autoTimer = setTimeout(closeIntro, 2000);
      if (introSkipBtn) {
        introSkipBtn.addEventListener('click', () => {
          clearTimeout(autoTimer);
          closeIntro();
        });
      }
    }
  } else {
    document.body.classList.remove('intro-active');
  }

  // Dynamic footer year
  const yearEl = document.getElementById('currentYear');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Interactive mouse-follow copper spotlight on metal cards
  document.querySelectorAll('.metal-card').forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      card.style.setProperty('--mx', `${e.clientX - rect.left}px`);
      card.style.setProperty('--my', `${e.clientY - rect.top}px`);
    });
  });

  // Top scroll progress bar & Back-to-Top ring
  const scrollProgress = document.getElementById('scrollProgress');
  const backToTop = document.getElementById('backToTop');
  const backToTopArc = document.getElementById('backToTopArc');
  const circumference = 2 * Math.PI * 19;

  window.addEventListener(
    'scroll',
    () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const ratio = docHeight > 0 ? Math.min(1, Math.max(0, scrollTop / docHeight)) : 0;

      if (scrollProgress) {
        scrollProgress.style.width = `${ratio * 100}%`;
      }
      if (backToTop && backToTopArc) {
        backToTop.classList.toggle('visible', scrollTop > 320);
        backToTopArc.style.strokeDashoffset = `${circumference * (1 - ratio)}`;
      }
    },
    { passive: true }
  );

  if (backToTop) {
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Mobile menu toggle
  const menuBtn = document.getElementById('mobileMenuBtn');
  const mobileDrawer = document.getElementById('mobileDrawer');
  if (menuBtn && mobileDrawer) {
    menuBtn.addEventListener('click', () => {
      const isOpen = mobileDrawer.classList.toggle('open');
      menuBtn.setAttribute('aria-expanded', String(isOpen));
    });
    mobileDrawer.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        mobileDrawer.classList.remove('open');
        menuBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Section 03: Rail Tabs Switcher (Sektörler / Aylık Plan / Kalite)
  const railTabs = document.querySelectorAll('.rail-tab');
  const tabPanels = document.querySelectorAll('.tab-panel');
  railTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const targetId = tab.getAttribute('data-panel');
      railTabs.forEach((t) => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      tabPanels.forEach((p) => p.classList.remove('active'));

      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');
      const targetPanel = document.getElementById(targetId);
      if (targetPanel) targetPanel.classList.add('active');
    });
  });

  // Interactive calendar day click
  const calendarDays = document.querySelectorAll('#calendarGrid span[title]');
  const calendarNote = document.getElementById('calendarNote');
  if (calendarDays.length && calendarNote) {
    calendarDays.forEach((dayEl) => {
      dayEl.addEventListener('click', () => {
        calendarNote.textContent = `${dayEl.textContent}. Gün: ${dayEl.getAttribute('title')}`;
      });
    });
  }

  // Section 04: Meta Ads & Google Ads Dashboard Switcher
  const platformData = {
    meta: {
      metrics: [
        { label: 'Erişim (Reach)', val: '1.2M', delta: '+18%' },
        { label: 'Gösterim (Impressions)', val: '3.6M', delta: '+22%' },
        { label: 'Bağlantı Tıklamaları', val: '45.2K', delta: '+14%' },
        { label: 'Dönüşüm (Conversions)', val: '2.7K', delta: '+24%' },
      ],
      bars: [
        { label: 'Reels Yerleşimi', pct: '84%' },
        { label: 'Akış (Feed)', pct: '72%' },
        { label: 'Hikâye (Stories)', pct: '65%' },
      ],
    },
    google: {
      metrics: [
        { label: 'Arama Gösterimi', val: '2.4M', delta: '+26%' },
        { label: 'Nitelikli Tıklama', val: '68.5K', delta: '+19%' },
        { label: 'Dönüşüm Oranı (CVR)', val: '%6.4', delta: '+15%' },
        { label: 'Ortalama ROAS', val: '5.8x', delta: '+29%' },
      ],
      bars: [
        { label: 'Arama Ağı (Search)', pct: '88%' },
        { label: 'Performance Max (PMax)', pct: '79%' },
        { label: 'Alışveriş & Görüntülü', pct: '68%' },
      ],
    },
  };

  const platformTabs = document.querySelectorAll('.platform-tab');
  platformTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const key = tab.getAttribute('data-platform');
      const data = platformData[key];
      if (!data) return;

      platformTabs.forEach((t) => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');

      data.metrics.forEach((m, idx) => {
        const i = idx + 1;
        const lbl = document.getElementById(`m${i}Label`);
        const val = document.getElementById(`m${i}Val`);
        const dlt = document.getElementById(`m${i}Delta`);
        if (lbl) lbl.textContent = m.label;
        if (val) val.textContent = m.val;
        if (dlt) dlt.textContent = m.delta;
      });

      data.bars.forEach((b, idx) => {
        const i = idx + 1;
        const lbl = document.getElementById(`b${i}Label`);
        const pct = document.getElementById(`b${i}Pct`);
        const fill = document.getElementById(`b${i}Fill`);
        if (lbl) lbl.textContent = b.label;
        if (pct) pct.textContent = `%${b.pct.replace('%', '')}`;
        if (fill) {
          fill.style.setProperty('--target-width', b.pct);
          fill.classList.add('animate');
        }
      });
    });
  });

  // Scoped Accordions (Process & FAQ)
  document.querySelectorAll('.accordion-list').forEach((accordion) => {
    const items = accordion.querySelectorAll('.acc-item');
    items.forEach((item) => {
      const trigger = item.querySelector('.acc-trigger');
      if (!trigger) return;
      trigger.addEventListener('click', () => {
        const isOpen = item.classList.contains('open');
        items.forEach((el) => {
          el.classList.remove('open');
          const btn = el.querySelector('.acc-trigger');
          if (btn) btn.setAttribute('aria-expanded', 'false');
        });
        if (!isOpen) {
          item.classList.add('open');
          trigger.setAttribute('aria-expanded', 'true');
        }
      });
    });
  });

  // Scroll reveal, KPI counters & bar animation
  const revealItems = document.querySelectorAll('.reveal');
  const barFills = document.querySelectorAll('.bar-fill');

  const animateKpiCounters = (container) => {
    const counters = container.querySelectorAll('.kpi-num');
    counters.forEach((counter) => {
      const target = parseFloat(counter.getAttribute('data-target') || '0');
      const suffix = counter.getAttribute('data-suffix') || '';
      const decimals = parseInt(counter.getAttribute('data-decimals') || '0', 10);
      const duration = 900;
      const startTime = performance.now();

      const step = (now) => {
        const elapsed = Math.min((now - startTime) / duration, 1);
        const eased = 1 - Math.pow(1 - elapsed, 3);
        counter.textContent = `${(target * eased).toFixed(decimals)}${suffix}`;
        if (elapsed < 1) requestAnimationFrame(step);
        else counter.textContent = `${target.toFixed(decimals)}${suffix}`;
      };
      requestAnimationFrame(step);
    });
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          if (entry.target.querySelector('.bar-fill')) {
            barFills.forEach((bar) => bar.classList.add('animate'));
            animateKpiCounters(entry.target);
          }
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  revealItems.forEach((el) => observer.observe(el));

  // Netlify Forms AJAX submission
  const contactForm = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');
  if (contactForm && formStatus) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalHTML = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.textContent = 'Gönderiliyor...';
      formStatus.textContent = '';

      try {
        const formData = new FormData(contactForm);
        const response = await fetch('https://formsubmit.co/ajax/info@ankaworks.com.tr', {
          method: 'POST',
          headers: { Accept: 'application/json' },
          body: formData,
        });
        if (response.ok) {
          formStatus.textContent =
            'Talebiniz başarıyla alındı. Müşteri temsilcimiz en kısa sürede sizinle iletişime geçecektir.';
          contactForm.reset();
        } else {
          throw new Error('Form submission error');
        }
      } catch (_err) {
        formStatus.textContent =
          'Gönderim sırasında bir sorun oluştu. Lütfen WhatsApp üzerinden bizimle iletişime geçin.';
      } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalHTML;
      }
    });
  }
});
