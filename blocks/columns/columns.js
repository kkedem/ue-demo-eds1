/**
 * Pearson Secondary Schools - Columns Block
 *
 * Flexible column layout for split content (text + image, etc.).
 *
 * Expected AEM block structure:
 * One row with N cells, each cell becomes a column.
 *
 * Variants:
 *   columns three-col    - 3 equal columns
 *   columns sixty-forty  - 60/40 split
 *   columns forty-sixty  - 40/60 split
 *   columns image-right  - hint for responsive reordering
 *   columns image-left   - hint for responsive reordering
 */

import { createOptimizedPicture } from '../../scripts/aem.js';

export default function decorate(block) {
  const rows = [...block.querySelectorAll(':scope > div')];

  block.innerHTML = '';

  rows.forEach((row) => {
    const wrapper = document.createElement('div');
    wrapper.className = 'columns-wrapper';

    const cols = [...row.querySelectorAll(':scope > div')];
    cols.forEach((col, i) => {
      const column = document.createElement('div');
      column.className = 'column';
      column.dataset.aueType = 'container';
      column.dataset.aueFilter = 'columns';
      column.dataset.aueLabel = `Column ${i + 1}`;

      // Optimize images
      col.querySelectorAll('img').forEach((img) => {
        const optimized = createOptimizedPicture(img.src, img.alt || '', false, [
          { media: '(min-width: 600px)', width: '800' },
          { width: '600' },
        ]);
        img.closest('picture')?.replaceWith(optimized) || img.replaceWith(optimized);
      });

      column.append(...col.childNodes);
      wrapper.appendChild(column);
    });

    block.appendChild(wrapper);
  });
}
