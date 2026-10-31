function getYouTubeEmbedUrl(link) {
  let url;
  try {
    url = new URL(link);
  } catch {
    return link;
  }

  const videoId = url.hostname === "youtu.be"
    ? url.pathname.split("/")[1]
    : url.searchParams.get("v") || url.pathname.match(/^\/(?:embed|shorts)\/([^/]+)/)?.[1];

  return videoId ? `https://www.youtube.com/embed/${videoId}` : link;
}

const pages = indesignPages.flatMap((page, index) => [
  page,
  ...videos.filter(video => video.apresPage === index + 1)
    .map(video => ({ videoUrl: getYouTubeEmbedUrl(video.url) }))
]);

const portfolio = document.getElementById("portfolio");
const basePath = "export-indesign/publication-web-resources/html/";
const DESIGN_WIDTH = 1920;
const DESIGN_HEIGHT = 1080;

function fitPage(iframe) {
  const section = iframe.parentElement;
  if (!section || iframe.dataset.fullPageVideo === "true") return;

  const scale = Math.min(
    section.clientWidth / DESIGN_WIDTH,
    section.clientHeight / DESIGN_HEIGHT
  );

  iframe.style.transform = `translate(-50%, -50%) scale(${scale})`;
}

function createPage(page, index) {
  const isVideo = typeof page === "object" && Boolean(page.videoUrl);
  const section = document.createElement("section");
  section.className = "portfolio-page";
  section.id = `page-${index + 1}`;
  section.setAttribute("aria-label", `Page ${index + 1}`);

  const iframe = document.createElement("iframe");
  iframe.src = isVideo ? page.videoUrl : typeof page === "string" ? basePath + page : page.pageUrl;
  iframe.title = isVideo ? `Vidéo YouTube ${index + 1}` : `Portfolio page ${index + 1}`;
  iframe.setAttribute("scrolling", "no");
  iframe.loading = index === 0 ? "eager" : "lazy";
  if (isVideo) {
    iframe.dataset.fullPageVideo = "true";
    iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
    iframe.setAttribute("allowfullscreen", "");
  }

  section.appendChild(iframe);
  portfolio.appendChild(section);

  // L'iframe garde toujours le format exact d'InDesign (1920×1080).
  // Seule son échelle change selon la fenêtre du navigateur.
  requestAnimationFrame(() => fitPage(iframe));
  iframe.addEventListener("load", () => fitPage(iframe));

  return iframe;
}

const iframes = pages.map(createPage);
window.addEventListener("resize", () => {
  iframes.forEach(fitPage);
});
