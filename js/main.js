// ─── 부드러운 스크롤 + 활성 섹션 하이라이트 ──────────────────────
(() => {
  const links = document.querySelectorAll('.nav__links a[href^="#"]');
  const sections = Array.from(links)
    .map(a => document.querySelector(a.getAttribute('href')))
    .filter(Boolean);

  if (!('IntersectionObserver' in window)) return;

  const setActive = (id) => {
    links.forEach(a => {
      const isMatch = a.getAttribute('href') === '#' + id;
      a.style.color = isMatch ? 'var(--c-accent)' : '';
      a.style.fontWeight = isMatch ? '700' : '';
    });
  };

  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) setActive(e.target.id);
    });
  }, {
    rootMargin: '-40% 0px -55% 0px',
    threshold: 0,
  });

  sections.forEach(s => obs.observe(s));
})();

// ─── 카드 진입 애니메이션 (저성능 친화) ───────────────────────────
(() => {
  if (!('IntersectionObserver' in window)) return;
  const targets = document.querySelectorAll(
    '.about__card, .skill-group, .project, .trouble, .timeline__item'
  );
  targets.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(12px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  });
  const obs = new IntersectionObserver((entries, o) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.style.opacity = '1';
        e.target.style.transform = 'translateY(0)';
        o.unobserve(e.target);
      }
    });
  }, { threshold: 0.08 });
  targets.forEach(el => obs.observe(el));
})();

// ─── 외부 링크에 자동 rel="noopener" 보강 ───────────────────────
(() => {
  document.querySelectorAll('a[target="_blank"]').forEach(a => {
    if (!a.rel.includes('noopener')) a.rel = (a.rel + ' noopener').trim();
  });
})();
