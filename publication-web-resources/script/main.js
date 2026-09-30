const videoUrls = [
  "https://www.youtube.com/embed/Z8yN9na2Vdk?si=kF77_Rel-zitpQgv",
  "https://www.youtube.com/embed/uo8sx6HxnMU?si=s4ggq_T3djfTUYij",
  "https://www.youtube.com/embed/Ei_qC6ZZE-U?si=QQfi3s9xqOvn-KQR" // Ajoute une URL YouTube par ligne pour insérer plusieurs vidéos.
];

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

const pages = [
  "publication.html",
  "publication-1.html",
  "publication-2.html",
  { videoUrl: getYouTubeEmbedUrl(videoUrls[0]) },
  "publication-3.html",
  // Deplace les entrees video dans cette liste pour changer leur position.
  { videoUrl: getYouTubeEmbedUrl(videoUrls[1]) },
  "publication-4.html",
  "publication-5.html",
  "publication-6.html",
  { videoUrl: getYouTubeEmbedUrl(videoUrls[2]) },
  "publication-7.html",
  "publication-8.html"
];

const portfolio = document.getElementById("portfolio");
const basePath = "publication-web-resources/html/";
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
  const isVideo = typeof page !== "string";
  const section = document.createElement("section");
  section.className = "portfolio-page";
  section.id = `page-${index + 1}`;
  section.setAttribute("aria-label", `Page ${index + 1}`);

  const iframe = document.createElement("iframe");
  iframe.src = isVideo ? page.videoUrl : basePath + page;
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
