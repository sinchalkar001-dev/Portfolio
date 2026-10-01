import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { hero, labels, projects, site } from "./src/data/portfolio.js";

const escapeHtml = (text) =>
  String(text).replace(/[&<>"']/g, (ch) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[ch]);

// Everything search engines and link previews need comes from src/data/portfolio.js:
//   - the {{placeholders}} in index.html (title, description, preview image, preloader letters)
//   - robots.txt and sitemap.xml, written into the build
function siteMeta() {
  const values = {
    name: site.name,
    title: site.title,
    description: site.description,
    url: site.url,
    ogImage: site.url + site.ogImage,
    ogImageAlt: site.ogImageAlt,
    email: site.email,
    heroPhoto: hero.photo.src,
    heroPhotoSrcSet: hero.photo.srcSet ?? "",
  };
  const letters = [...labels.preloader]
    .map((letter, i) => `<span style="--i:${i}">${escapeHtml(letter)}</span>`)
    .join("");
  const pages = ["/", ...projects.items.map((project) => `/projects/${project.slug}`)];

  return {
    name: "site-meta",
    transformIndexHtml: {
      order: "pre",
      handler: (html) =>
        html
          .replaceAll("{{preloaderLetters}}", letters)
          .replace(/\{\{(\w+)\}\}/g, (match, key) => (key in values ? escapeHtml(values[key]) : match)),
    },
    generateBundle() {
      this.emitFile({
        type: "asset",
        fileName: "robots.txt",
        source: `User-agent: *\nAllow: /\n\nSitemap: ${site.url}/sitemap.xml\n`,
      });
      this.emitFile({
        type: "asset",
        fileName: "sitemap.xml",
        source:
          `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
          pages.map((page) => `  <url><loc>${escapeHtml(site.url + page)}</loc></url>\n`).join("") +
          `</urlset>\n`,
      });
    },
  };
}

export default defineConfig({
  plugins: [siteMeta(), react(), tailwindcss()],
});
