/* ====== ВСТАВЬ СЮДА URL ТВОЕГО GOOGLE APPS SCRIPT WEB APP ======
   Как получить — см. README.md и google-apps-script/Code.gs
   Выглядит так: https://script.google.com/macros/s/AKfycb.../exec        */
const GAS_ENDPOINT = "https://script.google.com/macros/s/AKfycbwTtQHyPHQce8ywOTM66DVv77sur33u8Vqb6K1PJEnLuz2GbIX9zgKRQdIJZfRGPh4qOA/exec";
/* ================================================================ */

// ---------- render text content from SITE (js/content.js) ----------
function renderContent(){
  const S = SITE;
  document.title = S.meta.title;

  text('gate-hint', S.gate.hint);

  text('hero-eyebrow', S.hero.eyebrow);
  html('hero-names', `<span class="script-name">${S.hero.groom}</span> <span class="amp">${S.hero.amp}</span> <span class="script-name">${S.hero.bride}</span>`);
  text('hero-date', `${S.hero.date} · ${S.hero.weekday}`);
  text('hero-place', S.hero.place);
  html('hero-cat-caption', S.hero.catCaption);
  text('hero-scroll-hint', `${S.hero.scrollHint} ↓`);

  html('intro-lead', S.intro.lead);
  text('intro-meow-label', S.intro.meowLabel);
  text('intro-meow', S.intro.meow);

  text('gallery-title', S.gallery.title);
  text('gallery-sub', S.gallery.sub);
  const grid = document.getElementById('gallery-grid');
  grid.innerHTML = S.gallery.images.map(img =>
    `<figure><img src="${img.src}" alt="${img.alt}" loading="lazy" decoding="async"></figure>`
  ).join('');

  text('dress-eyebrow', S.dress.eyebrow);
  text('dress-code', S.dress.code);
  text('dress-note', S.dress.note);
  text('dress-men-title', S.dress.men.title);
  text('dress-men-text', S.dress.men.text);
  text('dress-women-title', S.dress.women.title);
  text('dress-women-text', S.dress.women.text);
  document.getElementById('dress-swatches').innerHTML =
    S.dress.swatches.map(c => `<span class="sw" style="background:${c}"></span>`).join('');

  text('gifts-title', S.gifts.title);
  text('gifts-sub', S.gifts.sub);
  html('gifts-lead', S.gifts.lead);
  text('gifts-meow-label', S.gifts.meowLabel);
  text('gifts-meow', S.gifts.meow);
  html('gifts-lead2', S.gifts.lead2);
  text('gifts-btc-label', S.gifts.btcLabel);
  text('gifts-btc-address', S.gifts.btcAddress);

  text('timeline-title', S.timeline.title);
  text('timeline-sub', S.timeline.sub);
  document.getElementById('timeline-list').innerHTML = S.timeline.items.map(it => `
    <div class="tl-item">
      <div class="tl-time">${it.time}</div>
      <div class="tl-body"><h4>${it.title}</h4><p>${it.text}</p></div>
    </div>`).join('');

  text('loc-eyebrow', S.location.eyebrow);
  text('loc-venue', S.location.venue);
  document.getElementById('loc-addr').textContent = S.location.addressLines.join('\n');
  const locImg = document.getElementById('loc-photo-img');
  locImg.src = S.location.photo;
  locImg.alt = S.location.photoAlt;
  const routeLink = document.getElementById('loc-route-link');
  routeLink.href = S.location.routeLink;
  routeLink.textContent = S.location.routeLabel;
  const taxiLink = document.getElementById('loc-taxi-link');
  taxiLink.href = S.location.taxiLink;
  taxiLink.textContent = S.location.taxiLabel;

  text('rsvp-title', S.rsvp.title);
  text('rsvp-sub', S.rsvp.sub);
  const L = S.rsvp.labels;
  text('l-name', L.name);
  text('l-phone', L.phone);
  text('l-social', L.social);
  text('l-attending', L.attending);
  text('l-attending-yes', L.attendingYes);
  text('l-attending-no', L.attendingNo);
  text('l-guests', L.guests);
  text('l-transfer-to', L.transferTo);
  text('l-transfer-back', L.transferBack);
  text('l-cottage', L.cottage);
  text('l-yes-1', L.yes); text('l-no-1', L.no);
  text('l-yes-2', L.yes); text('l-no-2', L.no);
  text('l-yes-3', L.yes); text('l-no-3', L.no);
  text('l-alcohol', L.alcohol);
  text('l-food', L.food);
  document.getElementById('food').placeholder = L.foodPlaceholder;
  text('l-wish', L.wish);
  document.getElementById('wish').placeholder = L.wishPlaceholder;
  text('submitBtn', L.submit);
  text('rsvp-note', L.note);

  document.getElementById('guests').innerHTML =
    S.rsvp.guestOptions.map(g => `<option>${g}</option>`).join('');

  document.getElementById('alcohol-opts').innerHTML = S.rsvp.alcoholOptions.map((a, i) => `
    <span class="opt">
      <input type="checkbox" id="alc-${i}" name="Алкоголь" value="${a}">
      <label for="alc-${i}">${a}</label>
    </span>`).join('');

  text('success-emoji', S.rsvp.success.emoji);
  text('success-title', S.rsvp.success.title);
  text('success-text', S.rsvp.success.text);

  text('footer-names', S.footer.names);
  text('footer-sig', S.footer.sig);

  function text(id, val){ document.getElementById(id).textContent = val; }
  function html(id, val){ document.getElementById(id).innerHTML = val; }
}

// ---------- smooth scroll (Lenis, falls back to native) ----------
function setupSmoothScroll(){
  if(typeof Lenis === 'undefined') return;
  const lenis = new Lenis({ duration: 1.1, smoothWheel: true });
  window.__lenis = lenis;
  function raf(time){ lenis.raf(time); requestAnimationFrame(raf); }
  requestAnimationFrame(raf);
}

// ---------- reveal-on-scroll (GSAP if available, else CSS class) ----------
function setupReveal(){
  const els = document.querySelectorAll('.reveal');
  const useGsap = typeof gsap !== 'undefined';

  if(useGsap){
    els.forEach(el => gsap.set(el, { autoAlpha: 0, y: 28 }));
  }

  const reveal = el => {
    el.classList.add('in');
    if(useGsap){
      gsap.to(el, { autoAlpha: 1, y: 0, duration: 1, ease: 'power2.out' });
    }
  };

  if('IntersectionObserver' in window){
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => { if(e.isIntersecting){ reveal(e.target); io.unobserve(e.target); } });
    }, { threshold: .12 });
    els.forEach(el => io.observe(el));
  } else {
    els.forEach(reveal);
  }

  window.addEventListener('load', () => setTimeout(() => {
    els.forEach(el => { if(!el.classList.contains('in')) reveal(el); });
  }, 1500));
}

// ---------- hero entrance ----------
function setupHeroEntrance(){
  if(typeof gsap === 'undefined') return;
  gsap.from('.hero .eyebrow, .hero .names, .hero-date, .hero-place, .cat-hero, .cat-caption, .scroll-hint', {
    autoAlpha: 0, y: 24, duration: .9, stagger: .1, ease: 'power2.out', delay: .15
  });
}

// ---------- RSVP submit ----------
function setupForm(){
  const form = document.getElementById('rsvpForm');
  const btn = document.getElementById('submitBtn');
  const errMsg = document.getElementById('errMsg');
  const successBox = document.getElementById('successBox');
  const submitLabel = SITE.rsvp.labels.submit;
  const submittingLabel = SITE.rsvp.labels.submitting;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    errMsg.classList.remove('show');

    if(!GAS_ENDPOINT || GAS_ENDPOINT.includes('ВАШ_WEB_APP_URL')){
      errMsg.textContent = SITE.rsvp.notConfigured;
      errMsg.classList.add('show');
      return;
    }

    btn.disabled = true;
    btn.textContent = submittingLabel;
    try{
      const data = new FormData(form);
      const payload = {};
      data.forEach((value, key) => {
        if(payload[key] !== undefined){
          payload[key] = Array.isArray(payload[key]) ? [...payload[key], value] : [payload[key], value];
        } else {
          payload[key] = value;
        }
      });
      // Apps Script web apps don't send CORS headers back for fetch reads,
      // so we fire-and-forget with no-cors and treat any non-network-error as success.
      await fetch(GAS_ENDPOINT, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(payload)
      });
      form.style.display = 'none';
      successBox.classList.add('show');
      successBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }catch(err){
      errMsg.textContent = SITE.rsvp.error;
      errMsg.classList.add('show');
      btn.disabled = false;
      btn.textContent = submitLabel;
    }
  });
}

// ---------- intro gate (wax seal opening ritual) ----------
function setupIntroGate(){
  const gate = document.getElementById('introGate');
  const seal = document.getElementById('waxSeal');
  if(!gate || !seal){ setupHeroEntrance(); return; }

  document.body.style.overflow = 'hidden';

  seal.addEventListener('click', () => {
    seal.classList.add('breaking');
    gate.classList.add('closing');
    setTimeout(() => {
      gate.remove();
      document.body.style.overflow = '';
      setupHeroEntrance();
    }, 650);
  }, { once: true });
}

renderContent();
setupSmoothScroll();
setupReveal();
setupForm();
setupIntroGate();
