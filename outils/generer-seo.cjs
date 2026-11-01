// Regénère les pages indexables à partir des données utilisées par le portfolio.
const fs = require('fs');
const vm = require('vm');
const path = require('path');
const root = path.resolve(__dirname, '..');
const data = vm.runInNewContext(fs.readFileSync(path.join(root, 'projets.js'), 'utf8') + '\n' + fs.readFileSync(path.join(root, 'descriptions-indesign.js'), 'utf8') + '\n({projets, descriptionsInDesign})');
const slugs = ['wood-and-volume','generique-laylow','bic-brosse','exposition-tarantino','couloir-53','ravage','pochette-dvd'];
const origin = 'https://delormeproduction.com';
const escape = s => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const urls = [origin + '/'];
fs.mkdirSync(path.join(root, 'projets'), {recursive:true});
data.projets.forEach((p, i) => {
  const slug = slugs[i]; if (!slug) throw Error('Ajouter un slug pour ' + p.nom);
  const url = `${origin}/projets/${slug}.html`, image = `${origin}/moodboards/projet-${String(i+1).padStart(2,'0')}.jpg`;
  const desc = data.descriptionsInDesign[i].join(' ');
  const short = desc.length > 155 ? desc.slice(0,152).replace(/\s+\S*$/, '') + '…' : desc;
  const title = `${p.nom} — Delorme Production | Arthur Delorme`;
  const json = JSON.stringify({'@context':'https://schema.org','@type':'CreativeWork',name:p.nom,description:desc,url,image,creator:{'@type':'Person',name:'Arthur Delorme',url:origin+'/'}}).replace(/</g,'\\u003c');
  const video = p.video ? `<div class="project-page-video"><iframe src="https://www.youtube.com/embed/${escape(p.video)}" title="Vidéo : ${escape(p.nom)}" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe></div>` : '';
  const html = `<!doctype html>\n<html lang="fr"><head><meta charset="utf-8"><link rel="icon" type="image/png" sizes="48x48" href="/icones/favicon-48.png"><link rel="apple-touch-icon" sizes="180x180" href="/icones/apple-touch-icon.png"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${escape(title)}</title><meta name="description" content="${escape(short)}"><link rel="canonical" href="${url}"><meta property="og:type" content="article"><meta property="og:locale" content="fr_FR"><meta property="og:site_name" content="Delorme Production"><meta property="og:title" content="${escape(title)}"><meta property="og:description" content="${escape(short)}"><meta property="og:url" content="${url}"><meta property="og:image" content="${image}"><meta name="twitter:card" content="summary_large_image"><link rel="stylesheet" href="https://use.typekit.net/ech3qon.css"><link rel="stylesheet" href="../portfolio.css?v=seo-1"><script type="application/ld+json">${json}</script></head><body class="project-page"><header class="project-page-header"><a href="../#projets">← Tous les projets</a><a href="mailto:delormearthur@hotmail.com">CONTACT ↗</a></header><main class="project-page-content"><div class="project-page-media">${video}<img src="../moodboards/projet-${String(i+1).padStart(2,'0')}.jpg" alt="Moodboard du projet ${escape(p.nom)}" width="1440" loading="lazy"></div><article><p class="project-number">PROJET ${String(i+1).padStart(2,'0')} / ${String(data.projets.length).padStart(2,'0')}</p><h1>${escape(p.nom)}</h1>${data.descriptionsInDesign[i].map(t=>`<p>${escape(t)}</p>`).join('')}<a href="../#projets">Découvrir les autres projets →</a></article></main></body></html>\n`;
  fs.writeFileSync(path.join(root,'projets',slug+'.html'),html); urls.push(url);
});
fs.writeFileSync(path.join(root,'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map(url=>`  <url><loc>${url}</loc></url>`).join('\n')}\n</urlset>\n`);
console.log(`${data.projets.length} pages et sitemap générés.`);
