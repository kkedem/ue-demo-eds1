/**
 * Pearson Secondary Schools - Footer Block
 * Builds the site footer with navigation columns, social links, and legal links.
 */

/**
 * Footer navigation data.
 * In production, fetched from AEM navigation fragment.
 */
const footerData = {
  brand: {
    description: 'Pearson is the world\'s leading learning company. Our purpose is to help people make progress through access to better learning.',
    social: [
      { platform: 'Twitter', href: 'https://twitter.com/pearsonschools', icon: 'twitter' },
      { platform: 'LinkedIn', href: 'https://linkedin.com/company/pearson', icon: 'linkedin' },
      { platform: 'Facebook', href: 'https://facebook.com/pearsonlearning', icon: 'facebook' },
      { platform: 'YouTube', href: 'https://youtube.com/pearsonuk', icon: 'youtube' },
    ],
  },
  columns: [
    {
      title: 'Schools',
      links: [
        { label: 'Secondary Schools', href: '/en-gb/schools/secondary.html' },
        { label: 'Primary Schools', href: '/en-gb/schools/primary.html' },
        { label: 'Independent Schools', href: '/en-gb/schools/independent.html' },
        { label: 'SEND Support', href: '/en-gb/schools/send.html' },
        { label: 'Schools Blog', href: '/en-gb/schools/blog.html' },
      ],
    },
    {
      title: 'Products',
      links: [
        { label: 'ActiveLearn', href: '/en-gb/schools/products/activelearn.html' },
        { label: 'Pearson Revise', href: '/en-gb/schools/products/revise.html' },
        { label: 'Onscreen Assessment', href: '/en-gb/schools/digital-assessment.html' },
        { label: 'PD Academy', href: '/en-gb/schools/pd-academy.html' },
        { label: 'Shop', href: '/en-gb/shop.html' },
      ],
    },
    {
      title: 'Qualifications',
      links: [
        { label: 'GCSE', href: '/en-gb/qualifications/gcse.html' },
        { label: 'A Level', href: '/en-gb/qualifications/a-level.html' },
        { label: 'BTEC', href: '/en-gb/qualifications/btec.html' },
        { label: 'International GCSE', href: '/en-gb/qualifications/igcse.html' },
        { label: 'Functional Skills', href: '/en-gb/qualifications/functional-skills.html' },
      ],
    },
    {
      title: 'Support',
      links: [
        { label: 'Help Centre', href: '/en-gb/support.html' },
        { label: 'Contact Us', href: '/en-gb/contact-us.html' },
        { label: 'Accessibility', href: '/en-gb/accessibility.html' },
        { label: 'Safeguarding', href: '/en-gb/safeguarding.html' },
        { label: 'CPD Training', href: '/en-gb/schools/cpd.html' },
      ],
    },
  ],
  legal: {
    copyright: `© ${new Date().getFullYear()} Pearson Education Limited. All rights reserved.`,
    links: [
      { label: 'Privacy Policy', href: '/en-gb/legal/privacy-policy.html' },
      { label: 'Cookie Policy', href: '/en-gb/legal/cookie-policy.html' },
      { label: 'Terms & Conditions', href: '/en-gb/legal/terms.html' },
      { label: 'Accessibility', href: '/en-gb/accessibility.html' },
      { label: 'Modern Slavery Act', href: '/en-gb/legal/modern-slavery.html' },
    ],
  },
};

/**
 * Creates a social media icon SVG.
 * @param {string} platform - Social platform name
 * @returns {string} SVG markup
 */
function getSocialIcon(platform) {
  const icons = {
    twitter: `<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg>`,
    linkedin: `<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>`,
    facebook: `<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>`,
    youtube: `<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.97C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="white"/></svg>`,
  };
  return icons[platform.toLowerCase()] || '';
}

/**
 * Main footer block decorator.
 * @param {HTMLElement} block - The footer block element
 */
export default async function decorate(block) {
  block.innerHTML = '';

  // Main footer section
  const mainSection = document.createElement('div');
  mainSection.className = 'footer-main';

  // Brand column
  const brandCol = document.createElement('div');
  brandCol.className = 'footer-brand';
  brandCol.innerHTML = `
    <a href="/en-gb/" aria-label="Pearson Home">
      <svg class="footer-brand-logo" viewBox="0 0 120 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="120" height="32" rx="4" fill="#007FA3"/>
        <text x="8" y="22" font-family="Open Sans, Arial, sans-serif" font-size="14" font-weight="700" fill="white">Pearson</text>
      </svg>
    </a>
    <p class="footer-brand-description">${footerData.brand.description}</p>
    <div class="footer-social">
      ${footerData.brand.social.map(({ platform, href, icon }) => `
        <a href="${href}" class="footer-social-link" aria-label="${platform}" target="_blank" rel="noopener noreferrer">
          ${getSocialIcon(platform)}
        </a>
      `).join('')}
    </div>
  `;
  mainSection.appendChild(brandCol);

  // Navigation columns
  footerData.columns.forEach((col) => {
    const colEl = document.createElement('div');
    colEl.className = 'footer-nav-column';
    colEl.innerHTML = `
      <h3>${col.title}</h3>
      <ul>
        ${col.links.map(({ label, href }) => `
          <li><a href="${href}">${label}</a></li>
        `).join('')}
      </ul>
    `;
    mainSection.appendChild(colEl);
  });

  // Bottom bar
  const bottomBar = document.createElement('div');
  bottomBar.className = 'footer-bottom';
  bottomBar.innerHTML = `
    <div class="footer-bottom-inner">
      <p class="footer-copyright">${footerData.legal.copyright}</p>
      <ul class="footer-legal-links">
        ${footerData.legal.links.map(({ label, href }) => `
          <li><a href="${href}">${label}</a></li>
        `).join('')}
      </ul>
    </div>
  `;

  block.appendChild(mainSection);
  block.appendChild(bottomBar);

  const footer = block.closest('footer') || block;
  footer.className = 'footer-wrapper';
}
