/**
 * Pearson Secondary Schools - Promo Banner Block
 *
 * Full-width CTA/promotional section.
 *
 * Expected AEM block structure:
 * Row 0, Col 0: Eyebrow (optional)
 * Row 0, Col 1: Title
 * Row 1, Col 0: Description paragraph(s)
 * Row 2, Col 0: Primary CTA link
 * Row 2, Col 1: Secondary CTA link (optional)
 *
 * Variants (via block classes):
 *   promo-banner navy        - dark navy background
 *   promo-banner light-blue  - light blue background
 *   promo-banner white       - white background
 *   promo-banner centered    - centered layout
 */

export default function decorate(block) {
  const rows = [...block.querySelectorAll(':scope > div')];
  const data = {
    eyebrow: '',
    title: '',
    description: '',
    primaryCTA: null,
    secondaryCTA: null,
  };

  rows.forEach((row, i) => {
    const cols = [...row.querySelectorAll(':scope > div')];

    if (i === 0) {
      if (cols[1]) {
        data.eyebrow = cols[0]?.textContent?.trim() || '';
        data.title = cols[1]?.innerHTML || '';
      } else {
        data.title = cols[0]?.innerHTML || '';
      }
    } else if (i === 1) {
      data.description = cols[0]?.innerHTML || '';
    } else if (i === 2) {
      const links = row.querySelectorAll('a');
      if (links[0]) data.primaryCTA = { text: links[0].textContent.trim(), href: links[0].href };
      if (links[1]) data.secondaryCTA = { text: links[1].textContent.trim(), href: links[1].href };
    }
  });

  block.innerHTML = '';

  const inner = document.createElement('div');
  inner.className = 'promo-banner-inner';

  // Content
  const content = document.createElement('div');
  content.className = 'promo-banner-content';

  if (data.eyebrow) {
    const eyebrow = document.createElement('p');
    eyebrow.className = 'promo-banner-eyebrow';
    eyebrow.textContent = data.eyebrow;
    eyebrow.dataset.aueType = 'text';
    eyebrow.dataset.aueProp = 'eyebrow';
    content.appendChild(eyebrow);
  }

  const title = document.createElement('h2');
  title.className = 'promo-banner-title';
  title.innerHTML = data.title || 'Ready to get started?';
  title.dataset.aueType = 'richtext';
  title.dataset.aueProp = 'title';
  content.appendChild(title);

  if (data.description) {
    const desc = document.createElement('div');
    desc.className = 'promo-banner-description';
    desc.innerHTML = data.description;
    desc.dataset.aueType = 'richtext';
    desc.dataset.aueProp = 'description';
    content.appendChild(desc);
  }

  inner.appendChild(content);

  // CTAs
  const ctas = document.createElement('div');
  ctas.className = 'promo-banner-ctas';

  const isOnDark = !block.classList.contains('light-blue') && !block.classList.contains('white');

  if (data.primaryCTA) {
    const btn = document.createElement('a');
    btn.href = data.primaryCTA.href;
    btn.className = isOnDark ? 'button white' : 'button primary';
    btn.textContent = data.primaryCTA.text;
    btn.dataset.aueType = 'text';
    btn.dataset.aueProp = 'ctaText';
    ctas.appendChild(btn);
  } else {
    const btn = document.createElement('a');
    btn.href = '/en-gb/contact-us.html';
    btn.className = isOnDark ? 'button white' : 'button primary';
    btn.textContent = 'Get in Touch';
    ctas.appendChild(btn);
  }

  if (data.secondaryCTA) {
    const btn2 = document.createElement('a');
    btn2.href = data.secondaryCTA.href;
    btn2.className = isOnDark ? 'button white-outline' : 'button secondary';
    btn2.textContent = data.secondaryCTA.text;
    btn2.dataset.aueType = 'text';
    btn2.dataset.aueProp = 'secondaryCtaText';
    ctas.appendChild(btn2);
  }

  inner.appendChild(ctas);
  block.appendChild(inner);
}
