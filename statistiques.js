/* Mesure Cloudflare sans cookies. Exclusion locale facultative du propriétaire. */
(() => {
  const key = 'delorme-exclure-mes-visites';
  const url = new URL(location.href);
  const command = url.searchParams.get('stats');
  let excluded = false;
  try {
    if (command === 'exclure') localStorage.setItem(key, '1');
    if (command === 'inclure') localStorage.removeItem(key);
    excluded = localStorage.getItem(key) === '1';
  } catch (_) {
    // Si le stockage est indisponible, une exclusion demandée vaut pour cette page.
    excluded = command === 'exclure';
  }
  if (command === 'exclure' || command === 'inclure') {
    url.searchParams.delete('stats');
    history.replaceState(null, '', url.pathname + url.search + url.hash);
  }
  if (excluded || !['delormeproduction.com', 'www.delormeproduction.com'].includes(location.hostname)) return;
  const beacon = document.createElement('script');
  beacon.type = 'module';
  beacon.src = 'https://static.cloudflareinsights.com/beacon.min.js';
  beacon.setAttribute('data-cf-beacon', JSON.stringify({token:'c26a4632e2ef46ebb1dc7233427a5b17'}));
  document.body.append(beacon);
})();
