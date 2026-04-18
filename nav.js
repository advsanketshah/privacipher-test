(function () {
  'use strict';

  /* ── Inject mobile nav styles after the linked CSS loads, so they win ── */
  var style = document.createElement('style');
  style.id = 'nav-mobile-styles';
  style.textContent = [
    '@media(max-width:900px){',

    /* Show the hamburger */
    '.mobile-menu-btn{',
      'display:flex!important;',
      'align-items:center;justify-content:center;',
      'background:none;border:none;cursor:pointer;',
      'color:var(--text-primary,#0F172A);padding:0.25rem;',
      '-webkit-tap-highlight-color:transparent;',
      'z-index:1001;position:relative;',
      'transition:transform 0.2s ease;',
    '}',
    'nav.menu-open .mobile-menu-btn{transform:rotate(90deg);}',

    /* Mobile overlay */
    'nav.menu-open{background:#fff!important;}',
    'nav.menu-open .nav-links{',
      'display:flex!important;',
      'flex-direction:column;',
      'position:fixed;top:56px;left:0;right:0;bottom:0;',
      'background:#fff;overflow-y:auto;',
      'padding:1.25rem 1.5rem 3rem;',
      'z-index:998;gap:0.125rem;',
      'animation:navOverlayFade 0.25s ease-out;',
    '}',
    '@keyframes navOverlayFade{',
      'from{opacity:0;transform:translateY(-4px);}',
      'to{opacity:1;transform:translateY(0);}',
    '}',

    /* Top-level items */
    'nav.menu-open .nav-links>li{width:100%;}',
    'nav.menu-open .nav-links>li>a,',
    'nav.menu-open .nav-links>li>.dropdown-toggle{',
      'font-size:1.0625rem;font-weight:600;',
      'padding:0.875rem 1rem;width:100%;',
      'text-align:left;border-radius:10px;',
      'display:flex;color:var(--text-primary,#0F172A);',
      'justify-content:space-between;',
    '}',
    'nav.menu-open .nav-links>li>a:active,',
    'nav.menu-open .nav-links>li>.dropdown-toggle:active{',
      'background:#f1f5f9;',
    '}',

    /* Expand dropdowns inline */
    'nav.menu-open .dropdown-menu{',
      'display:block!important;',
      'position:static!important;',
      'transform:none!important;',
      'padding:0;min-width:unset;',
    '}',
    'nav.menu-open .dropdown-menu::before{display:none;}',
    'nav.menu-open .dropdown-menu-inner{',
      'background:#f8fafc;',
      'border:none;border-radius:10px;',
      'box-shadow:none;',
      'margin:0.25rem 0 0.75rem 0;',
      'padding:0.5rem;',
    '}',
    'nav.menu-open .dropdown-menu a{',
      'font-size:0.9375rem;font-weight:500;',
      'padding:0.7rem 1rem;',
      'color:#475569;',
      'white-space:normal;',
      'border-radius:8px;',
    '}',
    'nav.menu-open .dropdown-menu a:active{',
      'color:#0F172A;background:rgba(15,23,42,0.06);',
    '}',
    'nav.menu-open .dropdown-toggle svg{transform:rotate(180deg);opacity:1;}',

    /* Book Consultation CTA at the bottom */
    'nav.menu-open .mobile-cta-wrapper{',
      'margin-top:1rem;padding-top:1rem;',
      'border-top:1px solid #e2e8f0;',
    '}',
    'nav.menu-open .mobile-cta-wrapper a.nav-cta{',
      'display:block;text-align:center;',
      'padding:1rem 1.75rem;border-radius:9999px;',
      'font-size:1rem;',
    '}',

    /* Lock body scroll when menu open */
    'body.nav-locked{overflow:hidden;}',

    '}'
  ].join('');

  document.head.appendChild(style);

  /* ── Wire up the hamburger ── */
  var btn = document.querySelector('.mobile-menu-btn');
  var navEl = document.querySelector('nav');
  if (!btn || !navEl) return;

  function closeMenu() {
    navEl.classList.remove('menu-open');
    document.body.classList.remove('nav-locked');
    btn.setAttribute('aria-expanded', 'false');
  }

  btn.addEventListener('click', function (e) {
    e.stopPropagation();
    var isOpen = navEl.classList.toggle('menu-open');
    document.body.classList.toggle('nav-locked', isOpen);
    btn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });

  /* Close when a real link (not a dropdown toggle) is tapped */
  navEl.querySelectorAll('.nav-links a').forEach(function (link) {
    link.addEventListener('click', closeMenu);
  });

  /* Tap outside to close */
  document.addEventListener('click', function (e) {
    if (!navEl.contains(e.target)) closeMenu();
  });

  /* Esc closes the menu */
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeMenu();
  });
})();
