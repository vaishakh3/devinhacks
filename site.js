(() => {
  'use strict';
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const header = document.querySelector('#site-header');
  const menu = document.querySelector('.menu-toggle');
  const mobileNav = document.querySelector('#mobile-nav');
  function setMenu(open, restoreFocus = false) {
    menu.setAttribute('aria-expanded', String(open));
    menu.querySelector('span').textContent = open ? 'Close' : 'Explore';
    mobileNav.hidden = !open;
    document.body.classList.toggle('menu-open', open);
    if (restoreFocus) menu.focus();
  }
  menu.addEventListener('click', () => setMenu(menu.getAttribute('aria-expanded') !== 'true'));
  mobileNav.addEventListener('click', e => { if (e.target.closest('a')) setMenu(false); });
  document.addEventListener('click', e => { if (!mobileNav.hidden && !header.contains(e.target)) setMenu(false); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && !mobileNav.hidden) setMenu(false, true); });
  // Keep keyboard focus within the expanded small-screen navigation.
  header.addEventListener('keydown', e => {
    if (e.key !== 'Tab' || mobileNav.hidden) return;
    const first = header.querySelector('.brand');
    const last = mobileNav.querySelector('a:last-child');
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  });
  function scrollHeader() { header.classList.toggle('is-scrolled', scrollY > 150); }
  addEventListener('scroll', scrollHeader, { passive: true });
  scrollHeader();

  if ('IntersectionObserver' in window && !reduced.matches) {
    document.documentElement.classList.add('motion-ready');
    const reveals = new IntersectionObserver(entries => {
      entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('is-visible'); reveals.unobserve(entry.target); } });
    }, { threshold: 0.09 });
    document.querySelectorAll('.reveal').forEach(el => reveals.observe(el));
    reduced.addEventListener('change', e => { if (e.matches) document.documentElement.classList.remove('motion-ready'); });
  }

  // Decorative film: play once, then hold. No on-screen playback controls.
  const hero = document.querySelector('.hero');
  const video = document.querySelector('#city-film');
  let loaded = false, resume = false, inView = true, manuallyPaused = false;
  let sourcePromise, fallbackSrc = '', usingEfficient = false, retried = false;
  async function chooseFilm() {
    const portrait = matchMedia('(max-width:900px) and (orientation:portrait)').matches;
    const base = portrait ? 'assets/kochi-mobile' : 'assets/kochi-hero';
    fallbackSrc = base + '.mp4?v=ac2';
    const contentType = 'video/mp4; codecs="hvc1.1.6.H120.90"';
    if (!video.canPlayType(contentType) || !navigator.mediaCapabilities?.decodingInfo) return fallbackSrc;
    try {
      const capability = await Promise.race([
        navigator.mediaCapabilities.decodingInfo({ type: 'file', video: {
          contentType, width: portrait ? 1080 : 1920, height: portrait ? 1920 : 1080,
          bitrate: 8000000, framerate: 24
        }}),
        new Promise(resolve => setTimeout(() => resolve(null), 350))
      ]);
      if (capability?.supported && capability.smooth && capability.powerEfficient) return base + '-hevc.mp4?v=ac2';
    } catch { /* Capability probing is optional; the H.264 fallback remains available. */ }
    return fallbackSrc;
  }
  const mayAnimate = () => !reduced.matches && !navigator.connection?.saveData;
  async function playFilm() {
    if (!mayAnimate() || document.hidden || !inView || manuallyPaused || video.ended) return;
    if (!loaded) {
      const source = await (sourcePromise ||= chooseFilm());
      if (!mayAnimate() || document.hidden || !inView || manuallyPaused) return;
      if (!loaded) {
        loaded = true;
        usingEfficient = source.includes('-hevc.mp4');
        video.src = source;
        video.load();
      }
    }
    try { await video.play(); hero.classList.add('has-video'); }
    catch { hero.classList.remove('has-video'); }
  }
  // Cheap diagnostics on stop/end, without a frame loop or scroll work.
  function recordPlaybackQuality() {
    const quality = video.getVideoPlaybackQuality?.();
    if (quality) {
      video.dataset.decodedFrames = String(quality.totalVideoFrames);
      video.dataset.droppedFrames = String(quality.droppedVideoFrames);
    }
  }
  video.addEventListener('ended', recordPlaybackQuality);
  video.addEventListener('pause', recordPlaybackQuality);
  video.addEventListener('error', () => {
    hero.classList.remove('has-video');
    if (usingEfficient && !retried) {
      retried = true; usingEfficient = false; loaded = false;
      sourcePromise = Promise.resolve(fallbackSrc);
      playFilm();
    }
  });
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) { resume = !video.paused; video.pause(); }
    else if (resume || !loaded) playFilm();
  });
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(entries => {
      inView = entries[0].isIntersecting;
      if (!inView) { resume = !video.paused; video.pause(); }
      else if (resume || !loaded) playFilm();
    }, { threshold: 0 }).observe(hero);
  }
  // Escape also stops decorative motion without adding controls over the city.
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && inView) { manuallyPaused = true; video.pause(); }
  });
  reduced.addEventListener('change', e => {
    if (e.matches) { video.pause(); resume = false; hero.classList.remove('has-video'); }
  });
  if (mayAnimate()) {
    if ('requestIdleCallback' in window) requestIdleCallback(playFilm, { timeout: 1200 });
    else setTimeout(playFilm, 300);
  }

  const application = window.DEVIN_EVENT?.registrationUrl;
  if (application) {
    try {
      const url = new URL(application);
      if (url.protocol !== 'https:') return;
      document.querySelectorAll('[data-registration-link]').forEach(a => {
        a.href = url.href;
        a.replaceChildren(document.createTextNode('Register now '));
        const arrow = document.createElement('span'); arrow.textContent = '↗'; arrow.setAttribute('aria-hidden', 'true'); a.append(arrow);
      });
      document.querySelector('#registration-answer').textContent = 'Registration is open. Use the application link to review the participation details and register.';
      document.querySelector('#registration-status').textContent = 'Your next build starts here. Registration is open.';
      document.querySelector('#registration-fact').textContent = 'Open now';
      const calendar = document.querySelector('#calendar-link');
      const register = calendar.cloneNode(true); register.removeAttribute('id'); register.removeAttribute('download'); register.href = url.href; register.innerHTML = 'Register now <span aria-hidden="true">↗</span>'; calendar.before(register);
      calendar.className = 'inline-link'; calendar.style.marginTop = '12px';
    } catch { /* Invalid configuration keeps the pre-registration state. */ }
  }
})();
