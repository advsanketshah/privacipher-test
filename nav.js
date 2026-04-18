(function () {

  /* ── Inject mobile nav styles directly into the document ──
     This runs after the linked CSS, so it always wins regardless
     of what nav.css says about .mobile-menu-btn or .nav-links.     */
  var style = document.createElement('style');
  style.id = 'nav-mobile-styles';
  style.textContent = [
    '@media(max-width:900px){',

    /* Show the hamburger button */
    '.mobile-menu-btn{',
      'display:flex!important;',
      'align-items:center;justify-content:center;',
      'background:none;border:none;cursor:pointer;',
      'color:var(--text-primary);padding:0.25rem;',
      '-webkit-tap-highlight-color:transparent;',
    '}',

    /* Mobile menu overlay — triggered by nav.menu-open */
    'nav.menu-open .nav-links{',
      'display:flex!important;',
      'flex-direction:column;',
      'position:fixed;top:57px;left:0;right:0;bottom:64px;',
      'background:#fff;overflow-y:auto;',
      'padding:0.75rem 1.25rem 1.5rem;',
      'z-index:998;gap:0.125rem;',
      'border-top:1px solid var(--border-color);',
      'box-shadow:0 8px 24px rgba(0,0,0,.08);',
    '}',

    /* Top-level items */
    'nav.menu-open .nav-links>li>a,',
    'nav.menu-open .nav-links>li>.dropdown-toggle{',
      'font-size:1rem;font-weight:600;',
      'padding:0.75rem 0.875rem;width:100%;',
      'text-align:left;border-radius:8px;',
      'display:flex;color:var(--text-primary);',
    '}',
    'nav.menu-open .nav-links>li>a:hover,',
    'nav.menu-open .nav-links>li>.dropdown-toggle:hover{',
      'background:#f1f5f9;',
    '}',

    /* Expand dropdowns inline — all sub-pages visible */
    'nav.menu-open .dropdown-menu{',
      'display:block!important;',
      'position:static!important;',
      'transform:none!important;',
      'padding:0;min-width:unset;',
    '}',
    'nav.menu-open .dropdown-menu::before{display:none;}',
    'nav.menu-open .dropdown-menu-inner{',
      'background:#f8fafc;',
      'border:none;border-radius:8px;',
      'box-shadow:none;',
      'margin:0 0 0.5rem 1rem;',
      'padding:0.25rem;',
    '}',
    'nav.menu-open .dropdown-menu a{',
      'font-size:0.9375rem;font-weight:500;',
      'padding:0.6rem 1rem;',
      'color:#475569;',
      'white-space:normal;',
      'border-radius:6px;',
    '}',
    'nav.menu-open .dropdown-menu a:hover{',
      'color:#2563EB;background:rgba(99,102,241,.07);',
    '}',
    'nav.menu-open .dropdown-toggle svg{transform:rotate(180deg);}',

    /* Book Consultation CTA at the bottom */
    'nav.menu-open .mobile-cta-wrapper{',
      'margin-top:0.75rem;padding-top:0.75rem;',
      'border-top:1px solid #e2e8f0;',
    '}',
    'nav.menu-open .mobile-cta-wrapper a.nav-cta{',
      'display:block;text-align:center;',
      'padding:0.875rem 1.75rem;border-radius:9999px;',
    '}',

    '}'
  ].join('');

  document.head.appendChild(style);

  /* ── Wire up the hamburger button ── */
  var btn = document.querySelector('.mobile-menu-btn');
  var navEl = document.querySelector('nav');
  if (!btn || !navEl) return;

  btn.addEventListener('click', function (e) {
    e.stopPropagation();
    navEl.classList.toggle('menu-open');
    btn.setAttribute('aria-expanded', navEl.classList.contains('menu-open') ? 'true' : 'false');
  });

  /* Close when any link inside the menu is tapped */
  navEl.querySelectorAll('.nav-links a').forEach(function (link) {
    link.addEventListener('click', function () {
      navEl.classList.remove('menu-open');
      btn.setAttribute('aria-expanded', 'false');
    });
  });

  /* Close on tap anywhere outside the nav */
  document.addEventListener('click', function (e) {
    if (!navEl.contains(e.target)) {
      navEl.classList.remove('menu-open');
      btn.setAttribute('aria-expanded', 'false');
    }
  });

})();
