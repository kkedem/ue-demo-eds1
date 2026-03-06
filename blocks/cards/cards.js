/**
 * Pearson Secondary Schools - Cards Block
 *
 * Displays a grid of product/feature cards.
 *
 * Expected AEM block structure (each row = one card):
 * Row N, Col 0: Card image (picture element or img)
 * Row N, Col 1: Card content:
 *   - First <p> with strong: treated as tag
 *   - h2/h3: Card title
 *   - p: Description
 *   - Last <a>: CTA link
 *
 * Variants (via block classes):
 *   cards four-col    - 4 column layout
 *   cards horizontal  - horizontal card layout
 *   cards icon-cards  - icon-based cards (no background images)
 *
 * Universal Editor:
 *   Each card is instrumented with data-aue-* attributes pointing
 *   to the corresponding AEM JCR node.
 */

import { createOptimizedPicture } from '../../scripts/aem.js';

/**
 * Creates a single card element from a block row.
 * @param {Element} row - The block row containing card data
 * @param {number} index - Card index for AUE resource path
 * @returns {HTMLElement} The card element
 */
function createCard(row, index) {
  const cols = [...row.querySelectorAll(':scope > div')];
  const imageCol = cols[0];
  const contentCol = cols[1] || cols[0];

  const card = document.createElement('div');
  card.className = 'card';
  card.dataset.aueResource = `urn:aemconnection:/content/pearson-secondary/en-gb/schools/secondary/jcr:content/root/container/cards/item${index}`;
  card.dataset.aueType = 'component';
  card.dataset.aueLabel = `Card ${index + 1}`;

  // Card image
  if (imageCol && imageCol !== contentCol) {
    const imgWrapper = document.createElement('div');
    imgWrapper.className = 'card-image';
    imgWrapper.dataset.aueType = 'media';
    imgWrapper.dataset.aueProp = 'image';

    const picture = imageCol.querySelector('picture');
    const img = imageCol.querySelector('img');

    if (picture) {
      imgWrapper.appendChild(picture);
    } else if (img) {
      const optimized = createOptimizedPicture(img.src, img.alt || '', false, [
        { media: '(min-width: 600px)', width: '800' },
        { width: '400' },
      ]);
      imgWrapper.appendChild(optimized);
    } else {
      // Placeholder gradient background
      imgWrapper.style.background = 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-navy) 100%)';
    }

    // Extract and render tag if present
    const tagEl = contentCol.querySelector('p > strong:first-child');
    if (tagEl) {
      const tagText = tagEl.closest('p')?.textContent?.trim();
      if (tagText) {
        const tag = document.createElement('span');
        tag.className = 'card-tag';
        tag.textContent = tagText;
        imgWrapper.appendChild(tag);
        tagEl.closest('p').remove();
      }
    }

    card.appendChild(imgWrapper);
  }

  // Card body
  const body = document.createElement('div');
  body.className = 'card-body';

  // Title (h2 or h3)
  const titleEl = contentCol.querySelector('h2, h3, h4');
  if (titleEl) {
    const title = document.createElement('h3');
    title.className = 'card-title';
    title.textContent = titleEl.textContent;
    title.dataset.aueType = 'text';
    title.dataset.aueProp = 'title';
    body.appendChild(title);
    titleEl.remove();
  }

  // Description
  const paras = [...contentCol.querySelectorAll('p')].filter(
    (p) => !p.querySelector('a') || p.textContent.trim() !== p.querySelector('a')?.textContent.trim(),
  );
  if (paras.length) {
    const desc = document.createElement('div');
    desc.className = 'card-description';
    desc.dataset.aueType = 'richtext';
    desc.dataset.aueProp = 'description';
    paras.forEach((p) => {
      desc.appendChild(p.cloneNode(true));
      p.remove();
    });
    body.appendChild(desc);
  }

  card.appendChild(body);

  // Card footer with CTA
  const ctaLink = contentCol.querySelector('a');
  if (ctaLink) {
    const footer = document.createElement('div');
    footer.className = 'card-footer';

    const link = document.createElement('a');
    link.href = ctaLink.href;
    link.className = 'card-link';
    link.dataset.aueType = 'text';
    link.dataset.aueProp = 'ctaText';
    link.innerHTML = `
      ${ctaLink.textContent.trim()}
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <line x1="5" y1="12" x2="19" y2="12"></line>
        <polyline points="12 5 19 12 12 19"></polyline>
      </svg>
    `;

    footer.appendChild(link);
    card.appendChild(footer);
  }

  return card;
}

/**
 * Main cards block decorator.
 * @param {HTMLElement} block - The cards block element
 */
export default function decorate(block) {
  const rows = [...block.querySelectorAll(':scope > div')];

  // Build grid container
  const grid = document.createElement('div');
  grid.className = 'cards-grid';
  grid.dataset.aueType = 'container';
  grid.dataset.aueFilter = 'cards';

  rows.forEach((row, i) => {
    const card = createCard(row, i);
    grid.appendChild(card);
  });

  block.innerHTML = '';
  block.appendChild(grid);
}
