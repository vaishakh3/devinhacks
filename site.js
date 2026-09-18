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

// Decorative arcade lane: time-based travel, synchronized pellets, no external assets.
(() => {
  const canvas = document.querySelector('#footer-arcade');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  let width = 0, height = 0, travel = 370, last = 0, raf = 0, visible = false, stopped = false;
  function pacman(x, y, unit, open) {
    ctx.fillStyle = '#ffff00';
    // Draw on a 16 × 16 pixel grid; the mouth has three arcade frames.
    for (let row = 0; row < 16; row++) for (let col = 0; col < 16; col++) {
      const dx = col - 7.5, dy = row - 7.5;
      if (dx * dx + dy * dy > 59) continue;
      if (dx > 0 && Math.abs(dy) < dx * open) continue;
      ctx.fillRect(Math.round(x + dx * unit), Math.round(y + dy * unit), unit, unit);
    }
  }
  const ghostRows = [
    '0000011111100000','0001111111111000','0011111111111100',
    '0111111111111110','0111111111111110','1111111111111111',
    '111WW1111WW11111','11WWWW11WWWW1111','11WWBB11WWBB1111',
    '111WBB111WBB1111','1111111111111111','1111111111111111',
    '1111111111111111','1111111111111111','1110011110011110','1100001100000110'
  ];
  function ghost(x, y, unit, color, frame) {
    ghostRows.forEach((line, row) => [...line].forEach((pixel, col) => {
      if (row > 13 && frame) pixel = (col % 6 < 4) ? '1' : '0';
      if (pixel === '0') return;
      ctx.fillStyle = pixel === 'W' ? '#fff' : pixel === 'B' ? '#1749d1' : color;
      ctx.fillRect(Math.round(x + (col - 8) * unit), Math.round(y + (row - 8) * unit), unit, unit);
    }));
  }
  function maze(y) {
    ctx.lineJoin = 'round'; ctx.lineCap = 'round';
    const paths = [];
    for (let left = -70; left < width; left += 430) {
      paths.push([[left,y-39],[left+130,y-39],[left+130,y-31],[left+141,y-31],[left+141,y-50],[left,y-50]]);
      paths.push([[left+200,y-50],[left+305,y-50],[left+305,y-39],[left+200,y-39],[left+200,y-50]]);
      paths.push([[left,y+44],[left+100,y+44],[left+100,y+94],[left+165,y+94],[left+165,y+44],[left+270,y+44],[left+270,y+84],[left+330,y+84],[left+330,y+44],[left+430,y+44]]);
    }
    function stroke() { paths.forEach(points => {ctx.beginPath();points.forEach(([x,y],i)=>i?ctx.lineTo(x,y):ctx.moveTo(x,y));ctx.stroke();}); }
    ctx.strokeStyle = '#124be130'; ctx.lineWidth = 7; stroke();
    ctx.strokeStyle = '#2866ff'; ctx.lineWidth = 2; stroke();
  }
  function draw(staticFrame = false) {
    const unit = width < 541 ? 2 : 3;
    const y = width < 541 ? 98 : 110;
    const spacing = width < 541 ? 26 : 35;
    const cycle = width + 600;
    const x = staticFrame ? width * .38 : travel % cycle - 230;
    const frame = staticFrame ? 1 : Math.floor(travel / 12) % 3;
    ctx.clearRect(0, 0, width, height);
    for (let i = 0; i < Math.ceil(width / 12); i++) {
      const sx = (i * 137.51 + 17) % width, sy = (i * 71.37 + 11) % height;
      if (Math.abs(sy - y) < 24) continue;
      ctx.fillStyle = i % 3 ? '#7790c1' : '#dde8ff';
      ctx.fillRect(Math.floor(sx), Math.floor(sy), i % 7 ? 1 : 2, i % 7 ? 1 : 2);
    }
    maze(y);
    ctx.fillStyle = '#fff0c9';
    for (let px = spacing / 2; px < width; px += spacing) {
      if (px <= x + 8 * unit) continue;
      ctx.fillRect(Math.round(px - 2), y - 2, 4, 4);
    }
    // Four ghosts trail Pac-Man through the same clear corridor.
    ['#ff3035','#ffb8df','#00d9ed','#ffad16'].forEach((color, i) => {
      ghost(x - (i + 1) * (width < 541 ? 43 : 62), y, unit, color, frame % 2);
    });
    pacman(x, y, unit, [.05,.5,1][frame]);
  }
  function tick(now) {
    raf = 0;
    if (!visible || document.hidden || motion.matches || stopped) { last = 0; return; }
    if (last) travel += Math.min(now - last, 50) * .095;
    last = now;
    if (travel > width + 600) travel = 0;
    draw(); raf = requestAnimationFrame(tick);
  }
  function sync() {
    if (raf) cancelAnimationFrame(raf);
    raf = 0; last = 0;
    if (motion.matches) { draw(true); return; }
    if (visible && !document.hidden && !stopped) raf = requestAnimationFrame(tick);
  }
  new ResizeObserver(() => {
    const oldWidth = width;
    width = canvas.clientWidth; height = canvas.clientHeight;
    if (oldWidth) travel *= width / oldWidth;
    const dpr = Math.min(devicePixelRatio || 1, 2);
    canvas.width = Math.round(width * dpr); canvas.height = Math.round(height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0); draw(motion.matches); sync();
  }).observe(canvas);
  new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; sync(); }, {threshold: 0}).observe(canvas);
  document.addEventListener('visibilitychange', sync);
  motion.addEventListener('change', sync);
  document.addEventListener('keydown', event => { if (event.key === 'Escape') { stopped = true; sync(); } });
})();
