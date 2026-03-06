/**
 * Pearson Secondary Schools - Teaser Block
 *
 * Split-layout teaser with image and editorial content.
 *
 * Expected AEM block structure:
 * Row 0, Col 0: Image (picture/img)
 * Row 1, Col 0: Eyebrow text
 * Row 1, Col 1: Title (h2/h3)
 * Row 2, Col 0: Description paragraph(s)
 * Row 3, Col 0: CTA link
 *
 * Variants:
 *   teaser image-right  - image on the right
 *   teaser dark         - dark background
 *   teaser compact      - narrower image column
 */

import { createOptimizedPicture } from '../../scripts/aem.js';

export default function decorate(block) {
  const rows = [...block.querySelectorAll(':scope > div')];
  const data = { image: null, eyebrow: '', title: '', description: '', ctaText: '', ctaHref: '' };

  rows.forEach((row, i) => {
    const cols = [...row.querySelectorAll(':scope > div')];

    if (i === 0) {
      data.image = cols[0]?.querySelector('picture, img');
    } else if (i === 1) {
      if (cols[1]) {
        data.eyebrow = cols[0]?.textContent?.trim() || '';
        data.title = cols[1]?.innerHTML || '';
      } else {
        data.title = cols[0]?.innerHTML || '';
      }
    } else if (i === 2) {
      data.description = cols[0]?.innerHTML || '';
    } else if (i === 3) {
      const link = cols[0]?.querySelector('a');
      if (link) {
        data.ctaText = link.textContent.trim();
        data.ctaHref = link.href;
      }
    }
  });

  block.innerHTML = '';

  const inner = document.createElement('div');
  inner.className = 'teaser-inner';

  // Image
  const imgCol = document.createElement('div');
  imgCol.className = 'teaser-image';
  imgCol.dataset.aueType = 'media';
  imgCol.dataset.aueProp = 'image';

  if (data.image) {
    if (data.image.tagName === 'IMG') {
      const optimized = createOptimizedPicture(data.image.src, data.image.alt || '', false, [
        { media: '(min-width: 768px)', width: '800' },
        { width: '600' },
      ]);
      imgCol.appendChild(optimized);
    } else {
      imgCol.appendChild(data.image);
    }
  }

  // Content
  const contentCol = document.createElement('div');
  contentCol.className = 'teaser-content';

  if (data.eyebrow) {
    const eyebrow = document.createElement('p');
    eyebrow.className = 'teaser-eyebrow';
    eyebrow.textContent = data.eyebrow;
    eyebrow.dataset.aueType = 'text';
    eyebrow.dataset.aueProp = 'eyebrow';
    contentCol.appendChild(eyebrow);
  }

  if (data.title) {
    const title = document.createElement('h2');
    title.className = 'teaser-title';
    title.innerHTML = data.title;
    title.dataset.aueType = 'richtext';
    title.dataset.aueProp = 'title';
    contentCol.appendChild(title);
  }

  if (data.description) {
    const desc = document.createElement('div');
    desc.className = 'teaser-description';
    desc.innerHTML = data.description;
    desc.dataset.aueType = 'richtext';
    desc.dataset.aueProp = 'description';
    contentCol.appendChild(desc);
  }

  if (data.ctaHref) {
    const cta = document.createElement('a');
    cta.href = data.ctaHref;
    cta.className = 'teaser-cta';
    cta.dataset.aueType = 'text';
    cta.dataset.aueProp = 'ctaText';
    cta.innerHTML = `
      ${data.ctaText || 'Learn more'}
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <line x1="5" y1="12" x2="19" y2="12"></line>
        <polyline points="12 5 19 12 12 19"></polyline>
      </svg>
    `;
    contentCol.appendChild(cta);
  }

  inner.appendChild(imgCol);
  inner.appendChild(contentCol);
  block.appendChild(inner);
}
