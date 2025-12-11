// main.js - safer dynamic loader that keeps visible URL as root '/'
(function () {
  const container = document.getElementById('main-content');
  if (!container) return;

  // Keep track of current loaded path (internal)
  let currentPath = 'index.html';

  async function loadPage(url, push = true) {
    try {
      // Normalize url: when user supplies '/about' or '/about.html', map to about.html
      const norm = normalizePath(url);
      const res = await fetch(norm, { cache: "no-store" });
      if (!res.ok) {
        console.error('Failed to load', norm, res.status);
        return;
      }
      const html = await res.text();
      const doc = new DOMParser().parseFromString(html, 'text/html');
      const newMain = doc.getElementById('main-content') || doc.querySelector('main') || doc.body;
      if (!newMain) {
        container.innerHTML = html;
      } else {
        container.innerHTML = newMain.innerHTML;
      }
      const title = doc.querySelector('title');
      if (title) document.title = title.textContent;
      updateActiveLink(norm);
      currentPath = norm;
      if (push) {
        // keep visible URL as root '/', but store the loaded path in history state
        history.pushState({ url: norm }, '', '/');
      }
    } catch (err) {
      console.error('Error loading page', err);
    }
  }

  function normalizePath(path) {
    if (!path) return 'index.html';
    // remove leading slash
    let p = path.replace(/^\//, '');
    // if path looks like '/about' -> treat as 'about.html'
    if (!p.includes('.') && p.length > 0) p = p + '.html';
    // default fallback
    if (p === '') p = 'index.html';
    return p;
  }

  function updateActiveLink(url) {
    document.querySelectorAll('.nav a').forEach(a => {
      const href = a.getAttribute('href');
      // normalize both
      const nh = normalizePath(href);
      const nu = normalizePath(url);
      a.classList.toggle('active', nh === nu);
    });
  }

  document.addEventListener('click', function (e) {
    const a = e.target.closest('a[data-ajax]');
    if (!a) return;
    const href = a.getAttribute('href');
    if (!href) return;
    e.preventDefault();
    loadPage(href, true);
  });

  // When user presses back/forward, load the correct path from state (if present)
  window.addEventListener('popstate', function (e) {
    const stateUrl = e.state && e.state.url;
    if (stateUrl) {
      loadPage(stateUrl, false);
    } else {
      // No state — if currentPath is not index, reload index content
      if (currentPath !== 'index.html') {
        loadPage('index.html', false);
      }
    }
  });

  // Only auto-load on first visit if the user actually opened a non-root path (deep link)
  (function handleInitialDirectLink() {
    const pathname = location.pathname || '';
    // If user opened root ('/' or '/index.html') do nothing
    if (pathname === '/' || pathname === '/index.html' || pathname.trim() === '') {
      // keep default home content; do NOT auto-load other pages
      currentPath = 'index.html';
      updateActiveLink('index.html');
      return;
    }
    // If user directly opened a non-root path like /about.html or /about, then load it into main-content
    const direct = pathname.replace(/^\//, '');
    const norm = normalizePath(direct);
    // Safety: avoid loading the page if it's the same as index (redundant)
    if (norm && norm !== 'index.html') {
      loadPage(norm, false);
    }
  })();

})();
