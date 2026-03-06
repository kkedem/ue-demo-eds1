/**
 * Pearson Secondary Schools - Header Block
 * Builds the site header with navigation, including mobile responsiveness.
 * Content can be driven by AEM navigation content fragment.
 */

/**
 * Creates the Pearson logo SVG.
 * @returns {string} SVG markup
 */
function getPearsonLogoSVG() {
  return `<svg class="header-brand-logo" viewBox="0 0 130 36" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Pearson">
    <rect width="130" height="36" rx="4" fill="#007FA3"/>
    <text x="10" y="24" font-family="Open Sans, Arial, sans-serif" font-size="16" font-weight="700" fill="white">Pearson</text>
  </svg>`;
}

/**
 * Navigation data structure.
 * In production this would be fetched from AEM navigation content fragment.
 */
const navData = [
  {
    label: 'For School',
    id: 'for-school',
    active: true,
    children: [
      { group: 'Educators', items: [] },
      { label: 'Primary Schools', href: '/en-gb/schools/primary.html' },
      { label: 'Secondary Schools', href: '/en-gb/schools/secondary.html' },
      { label: 'Independent Schools', href: '/en-gb/schools/independent.html' },
      { group: 'Resources', items: [] },
      { label: 'ActiveLearn', href: '/en-gb/schools/products/activelearn.html' },
      { label: 'Pearson Revise', href: '/en-gb/schools/products/revise.html' },
      { label: 'Onscreen Assessment', href: '/en-gb/schools/digital-assessment.html' },
      { label: 'Support & Resources', href: '/en-gb/schools/support.html' },
    ],
  },
  {
    label: 'For College',
    id: 'for-college',
    children: [
      { label: 'BTEC Qualifications', href: '/en-gb/colleges/btec.html' },
      { label: 'T Levels', href: '/en-gb/colleges/t-levels.html' },
      { label: 'Functional Skills', href: '/en-gb/colleges/functional-skills.html' },
    ],
  },
  {
    label: 'For University',
    id: 'for-university',
    children: [
      { label: 'Higher Education', href: '/en-gb/higher-education.html' },
      { label: 'MyLab & Mastering', href: '/en-gb/higher-education/mylab.html' },
    ],
  },
  {
    label: 'Qualifications',
    id: 'qualifications',
    children: [
      { label: 'GCSE', href: '/en-gb/qualifications/gcse.html' },
      { label: 'A Level', href: '/en-gb/qualifications/a-level.html' },
      { label: 'International GCSE', href: '/en-gb/qualifications/igcse.html' },
      { label: 'BTEC', href: '/en-gb/qualifications/btec.html' },
    ],
  },
  {
    label: 'Explore Pearson',
    id: 'explore',
    children: [
      { label: 'About Pearson', href: '/en-gb/about-us.html' },
      { label: 'News & Blog', href: '/en-gb/news.html' },
      { label: 'Careers', href: '/en-gb/careers.html' },
      { label: 'Contact Us', href: '/en-gb/contact-us.html' },
    ],
  },
];

/**
 * Builds a dropdown menu for a nav item.
 * @param {Object} navItem - Nav item with children
 * @returns {HTMLElement}
 */
function buildDropdown(navItem) {
  const dropdown = document.createElement('div');
  dropdown.className = 'header-dropdown';
  dropdown.setAttribute('role', 'menu');

  let currentGroup = null;

  navItem.children.forEach((child) => {
    if (child.group) {
      const groupTitle = document.createElement('div');
      groupTitle.className = 'header-dropdown-title';
      groupTitle.textContent = child.group;
      dropdown.appendChild(groupTitle);
      return;
    }

    const link = document.createElement('a');
    link.href = child.href;
    link.textContent = child.label;
    link.setAttribute('role', 'menuitem');
    dropdown.appendChild(link);
  });

  return dropdown;
}

/**
 * Builds the primary navigation list.
 * @returns {HTMLElement}
 */
function buildPrimaryNav() {
  const nav = document.createElement('ul');
  nav.className = 'header-nav-primary';
  nav.setAttribute('role', 'menubar');

  navData.forEach((item) => {
    const li = document.createElement('li');
    li.setAttribute('role', 'none');
    if (item.active) li.classList.add('active');

    const trigger = document.createElement('button');
    trigger.setAttribute('aria-haspopup', 'true');
    trigger.setAttribute('aria-expanded', 'false');
    trigger.setAttribute('aria-label', `${item.label} menu`);
    trigger.innerHTML = `
      ${item.label}
      <svg class="header-nav-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <polyline points="6 9 12 15 18 9"></polyline>
      </svg>
    `;

    const dropdown = buildDropdown(item);
    li.appendChild(trigger);
    li.appendChild(dropdown);

    trigger.addEventListener('click', () => {
      const isOpen = li.classList.contains('open');
      // Close all others
      nav.querySelectorAll('li.open').forEach((el) => {
        el.classList.remove('open');
        el.querySelector('button')?.setAttribute('aria-expanded', 'false');
      });
      if (!isOpen) {
        li.classList.add('open');
        trigger.setAttribute('aria-expanded', 'true');
      }
    });

    nav.appendChild(li);
  });

  // Close dropdowns on outside click
  document.addEventListener('click', (e) => {
    if (!nav.contains(e.target)) {
      nav.querySelectorAll('li.open').forEach((el) => {
        el.classList.remove('open');
        el.querySelector('button')?.setAttribute('aria-expanded', 'false');
      });
    }
  });

  return nav;
}

/**
 * Main header block decorator.
 * @param {HTMLElement} block - The header block element
 */
export default async function decorate(block) {
  block.closest('.header-wrapper')?.removeAttribute('style');

  // Build utility bar
  const utilityBar = document.createElement('div');
  utilityBar.className = 'header-utility-bar';
  utilityBar.innerHTML = `
    <a href="/en-gb/support.html">Support</a>
    <a href="/en-gb/contact-us.html">Contact Us</a>
    <a href="/en-gb/sign-in.html">Sign In</a>
    <div class="header-country-selector" aria-label="Select country">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="2" y1="12" x2="22" y2="12"></line>
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
      </svg>
      United Kingdom
    </div>
  `;

  // Build main nav bar
  const navBar = document.createElement('nav');
  navBar.className = 'header-nav';
  navBar.setAttribute('aria-label', 'Main navigation');

  // Brand / Logo
  const brand = document.createElement('a');
  brand.href = '/en-gb/';
  brand.className = 'header-brand';
  brand.setAttribute('aria-label', 'Pearson Home');
  brand.innerHTML = getPearsonLogoSVG();

  // Hamburger button
  const hamburger = document.createElement('button');
  hamburger.className = 'header-hamburger';
  hamburger.setAttribute('aria-label', 'Toggle navigation menu');
  hamburger.setAttribute('aria-expanded', 'false');
  hamburger.innerHTML = `
    <span></span>
    <span></span>
    <span></span>
  `;

  // Primary nav
  const primaryNav = buildPrimaryNav();

  // Header actions
  const actions = document.createElement('div');
  actions.className = 'header-actions';
  actions.innerHTML = `
    <button class="header-search-btn" aria-label="Search">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <circle cx="11" cy="11" r="8"></circle>
        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
      </svg>
    </button>
    <a href="/en-gb/shop/cart.html" class="header-cart-btn" aria-label="Shopping cart" style="position:relative; text-decoration:none;">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <circle cx="9" cy="21" r="1"></circle>
        <circle cx="20" cy="21" r="1"></circle>
        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
      </svg>
    </a>
  `;

  navBar.appendChild(brand);
  navBar.appendChild(primaryNav);
  navBar.appendChild(hamburger);
  navBar.appendChild(actions);

  // Hamburger toggle
  hamburger.addEventListener('click', () => {
    const isOpen = primaryNav.classList.toggle('is-open');
    hamburger.setAttribute('aria-expanded', String(isOpen));
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  // Assemble header
  block.innerHTML = '';
  block.appendChild(utilityBar);
  block.appendChild(navBar);

  // Wrap in semantic header if not already
  const header = block.closest('header') || block;
  header.className = 'header-wrapper';
}
