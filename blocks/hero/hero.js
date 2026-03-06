/**
 * Pearson Secondary Schools - Hero Block
 *
 * Expected AEM content structure (Universal Editor):
 * Row 0, Col 0: Background image (picture element)
 * Row 1, Col 0: Eyebrow text
 * Row 1, Col 1: Headline (h1)
 * Row 2, Col 0: Description paragraph(s)
 * Row 3, Col 0: Primary CTA link
 * Row 3, Col 1: Secondary CTA link (optional)
 *
 * Variants (via block class):
 *   hero centered    - center-aligned content
 *   hero light       - light background
 *   hero no-stats    - hides stats bar
 */

import { createOptimizedPicture } from '../../scripts/aem.js';

/**
 * Stats to display below hero content.
 * Typically editable via Universal Editor metadata.
 */
const HERO_STATS = [
  { value: '4,500+', label: 'Secondary schools supported' },
  { value: '1.5M+', label: 'Students using our resources' },
  { value: '30+', label: 'Subjects covered' },
  { value: '100+', label: 'Years of educational expertise' },
];

/**
 * Extracts data from the hero block's DOM structure.
 * @param {HTMLElement} block - The raw block element from AEM
 * @returns {Object} Structured hero data
 */
function extractHeroData(block) {
  const rows = [...block.querySelectorAll(':scope > div')];
  const data = {
    backgroundImage: null,
    eyebrow: '',
    headline: null,
    description: null,
    primaryCTA: null,
    secondaryCTA: null,
  };

  rows.forEach((row, i) => {
    const cols = [...row.querySelectorAll(':scope > div')];

    if (i === 0) {
      // Row 0: background image
      const picture = cols[0]?.querySelector('picture, img');
      if (picture) data.backgroundImage = picture;
    } else if (i === 1) {
      // Row 1: eyebrow + headline (or just headline)
      if (cols[1]) {
        data.eyebrow = cols[0]?.textContent?.trim() || '';
        data.headline = cols[1]?.querySelector('h1, h2') || cols[1];
      } else {
        data.headline = cols[0]?.querySelector('h1, h2') || cols[0];
      }
    } else if (i === 2) {
      // Row 2: description
      data.description = cols[0];
    } else if (i === 3) {
      // Row 3: CTA links
      const links = row.querySelectorAll('a');
      if (links[0]) data.primaryCTA = links[0];
      if (links[1]) data.secondaryCTA = links[1];
    }
  });

  return data;
}

/**
 * Main hero block decorator.
 * @param {HTMLElement} block - The hero block element
 */
export default function decorate(block) {
  const isNoStats = block.classList.contains('no-stats');
  const data = extractHeroData(block);

  // Build the hero structure
  block.innerHTML = '';

  // Background
  const bg = document.createElement('div');
  bg.className = 'hero-bg';
  if (data.backgroundImage) {
    if (data.backgroundImage.tagName === 'IMG') {
      const optimized = createOptimizedPicture(
        data.backgroundImage.src,
        data.backgroundImage.alt || 'Hero background',
        true,
        [
          { media: '(min-width: 1200px)', width: '2000' },
          { media: '(min-width: 768px)', width: '1200' },
          { width: '768' },
        ],
      );
      bg.appendChild(optimized);
    } else {
      bg.appendChild(data.backgroundImage);
    }
  }
  block.appendChild(bg);

  // Content area
  const content = document.createElement('div');
  content.className = 'hero-content';

  const inner = document.createElement('div');
  inner.className = 'hero-content-inner';

  // Eyebrow
  if (data.eyebrow) {
    const eyebrow = document.createElement('span');
    eyebrow.className = 'hero-eyebrow';
    eyebrow.textContent = data.eyebrow;
    // Universal Editor instrumentation
    eyebrow.dataset.aueType = 'text';
    eyebrow.dataset.aueProp = 'eyebrow';
    inner.appendChild(eyebrow);
  }

  // Headline
  if (data.headline) {
    const h = document.createElement('h1');
    h.innerHTML = data.headline.innerHTML || data.headline.textContent;
    h.dataset.aueType = 'richtext';
    h.dataset.aueProp = 'headline';
    inner.appendChild(h);
  }

  // Description
  if (data.description) {
    const desc = document.createElement('div');
    desc.className = 'hero-description';
    desc.innerHTML = data.description.innerHTML;
    desc.dataset.aueType = 'richtext';
    desc.dataset.aueProp = 'description';
    inner.appendChild(desc);
  }

  // CTAs
  const ctas = document.createElement('div');
  ctas.className = 'hero-ctas';

  if (data.primaryCTA) {
    data.primaryCTA.className = 'button primary white';
    data.primaryCTA.dataset.aueType = 'text';
    data.primaryCTA.dataset.aueProp = 'primaryCTAText';
    ctas.appendChild(data.primaryCTA);
  } else {
    // Fallback CTA
    const cta = document.createElement('a');
    cta.href = '/en-gb/schools/secondary.html#resources';
    cta.className = 'button primary white';
    cta.textContent = 'Explore Resources';
    ctas.appendChild(cta);
  }

  if (data.secondaryCTA) {
    data.secondaryCTA.className = 'button white-outline';
    ctas.appendChild(data.secondaryCTA);
  } else {
    const cta2 = document.createElement('a');
    cta2.href = '/en-gb/contact-us.html';
    cta2.className = 'button white-outline';
    cta2.textContent = 'Contact Us';
    ctas.appendChild(cta2);
  }

  inner.appendChild(ctas);
  content.appendChild(inner);
  block.appendChild(content);

  // Stats bar (unless no-stats variant)
  if (!isNoStats) {
    const statsEl = document.createElement('div');
    statsEl.className = 'hero-stats';
    const statsInner = document.createElement('div');
    statsInner.className = 'hero-stats-inner';

    HERO_STATS.forEach(({ value, label }) => {
      const stat = document.createElement('div');
      stat.className = 'hero-stat';
      stat.innerHTML = `
        <span class="hero-stat-value">${value}</span>
        <span class="hero-stat-label">${label}</span>
      `;
      statsInner.appendChild(stat);
    });

    statsEl.appendChild(statsInner);
    block.appendChild(statsEl);
  }
}
