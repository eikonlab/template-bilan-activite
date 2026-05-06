/**
 * eleventy.config.js — Configuration principale d'Eleventy
 * ==========================================================
 * Ce fichier dit à Eleventy :
 *   - où trouver les fichiers source
 *   - où mettre le résultat du build
 *   - quels plugins utiliser
 */

import markdownIt from "markdown-it";

const md = markdownIt({ html: true });

export default function (eleventyConfig) {

  // --- Fichiers copiés tels quels dans le build ---
  eleventyConfig.addPassthroughCopy("src/public");
  eleventyConfig.addPassthroughCopy("src/admin");

  // --- Filtre markdown ---
  // Convertit du texte Markdown (produit par widget: markdown dans le CMS)
  // en HTML. Utilisation dans les templates : {{ champ | markdown | safe }}
  // Le filtre | safe est nécessaire pour que Nunjucks n'échappe pas le HTML généré.
  eleventyConfig.addFilter("markdown", (content) => md.render(content ?? ""));

  // --- Configuration des dossiers ---
  return {
    dir: {
      input:    "src",
      output:   "_site",
      includes: "_includes",
      layouts:  "_layouts",
      data:     "_data",
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine:     "njk",
  };
}
