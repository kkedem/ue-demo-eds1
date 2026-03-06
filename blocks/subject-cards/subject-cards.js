/**
 * Pearson Secondary Schools - Subject Cards Block
 *
 * Displays a grid of subject area navigation cards.
 *
 * Expected AEM block structure (each row = one subject):
 * Row N, Col 0: Subject name (text)
 * Row N, Col 1: Subject link URL (or anchor element)
 * Row N, Col 2: Accent color (hex) - optional, uses default
 *
 * OR auto-builds from embedded data if no rows provided.
 *
 * Universal Editor:
 *   Block container is a container with subject-card filter.
 *   Each card is instrumented for inline editing.
 */

/** Default subject data (used when no AEM content provided) */
const DEFAULT_SUBJECTS = [
  {
    name: 'English',
    slug: 'english',
    href: '/en-gb/schools/secondary/english.html',
    icon: 'book-open',
  },
  {
    name: 'Maths',
    slug: 'maths',
    href: '/en-gb/schools/secondary/maths.html',
    icon: 'hash',
  },
  {
    name: 'Science',
    slug: 'science',
    href: '/en-gb/schools/secondary/science.html',
    icon: 'zap',
  },
  {
    name: 'History',
    slug: 'history',
    href: '/en-gb/schools/secondary/history.html',
    icon: 'clock',
  },
  {
    name: 'Geography',
    slug: 'geography',
    href: '/en-gb/schools/secondary/geography.html',
    icon: 'globe',
  },
  {
    name: 'Languages',
    slug: 'languages',
    href: '/en-gb/schools/secondary/modern-languages.html',
    icon: 'message-circle',
  },
  {
    name: 'Computing',
    slug: 'computing',
    href: '/en-gb/schools/secondary/computing.html',
    icon: 'monitor',
  },
  {
    name: 'Art & Design',
    slug: 'arts',
    href: '/en-gb/schools/secondary/art-design.html',
    icon: 'pen-tool',
  },
  {
    name: 'Drama & Music',
    slug: 'drama',
    href: '/en-gb/schools/secondary/drama-music.html',
    icon: 'music',
  },
  {
    name: 'PE & Sport',
    slug: 'pe',
    href: '/en-gb/schools/secondary/pe.html',
    icon: 'activity',
  },
  {
    name: 'PSHE',
    slug: 'pshe',
    href: '/en-gb/schools/secondary/pshe.html',
    icon: 'heart',
  },
  {
    name: 'Business',
    slug: 'business',
    href: '/en-gb/schools/secondary/business.html',
    icon: 'briefcase',
  },
];

/**
 * Returns inline SVG for a Feather icon name.
 * @param {string} icon - Feather icon name (simplified set)
 * @returns {string} SVG markup
 */
function getIconSVG(icon) {
  const paths = {
    'book-open': '<path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>',
    hash: '<line x1="4" y1="9" x2="20" y2="9"></line><line x1="4" y1="15" x2="20" y2="15"></line><line x1="10" y1="3" x2="8" y2="21"></line><line x1="16" y1="3" x2="14" y2="21"></line>',
    zap: '<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>',
    clock: '<circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline>',
    globe: '<circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>',
    'message-circle': '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>',
    monitor: '<rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line>',
    'pen-tool': '<path d="M12 19l7-7 3 3-7 7-3-3z"></path><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"></path><path d="M2 2l7.586 7.586"></path><circle cx="11" cy="11" r="2"></circle>',
    music: '<path d="M9 18V5l12-2v13"></path><circle cx="6" cy="18" r="3"></circle><circle cx="18" cy="16" r="3"></circle>',
    activity: '<polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>',
    heart: '<path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>',
    briefcase: '<rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>',
    grid: '<rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect>',
    'arrow-right': '<line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline>',
  };
  return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths[icon] || paths.grid}</svg>`;
}

/**
 * Creates a subject card element.
 * @param {Object} subject - Subject data
 * @param {number} index - Index for UE instrumentation
 * @returns {HTMLElement}
 */
function createSubjectCard(subject, index) {
  const card = document.createElement('a');
  card.href = subject.href || '#';
  card.className = 'subject-card';
  card.dataset.subject = subject.slug;
  card.dataset.aueResource = `urn:aemconnection:/content/pearson-secondary/en-gb/schools/secondary/jcr:content/root/container/subjects/item${index}`;
  card.dataset.aueType = 'component';
  card.dataset.aueLabel = subject.name;

  if (subject.color) {
    card.style.backgroundColor = subject.color;
  }

  card.innerHTML = `
    <div class="subject-card-icon">
      ${getIconSVG(subject.icon || 'grid')}
    </div>
    <span class="subject-card-name">${subject.name}</span>
  `;

  return card;
}

/**
 * Parses subject data from block rows (when authored in AEM).
 * @param {HTMLElement} block - The block element
 * @returns {Array} Array of subject objects
 */
function parseSubjectsFromBlock(block) {
  const rows = [...block.querySelectorAll(':scope > div')];
  if (!rows.length) return [];

  return rows.map((row) => {
    const cols = [...row.querySelectorAll(':scope > div')];
    const name = cols[0]?.textContent?.trim() || '';
    const link = cols[1]?.querySelector('a')?.href || cols[1]?.textContent?.trim() || '#';
    const color = cols[2]?.textContent?.trim() || '';
    const slug = name.toLowerCase().replace(/[^a-z0-9]/g, '-');

    return {
      name, href: link, color, slug, icon: 'grid',
    };
  }).filter((s) => s.name);
}

/**
 * Main subject cards block decorator.
 * @param {HTMLElement} block - The subject-cards block element
 */
export default function decorate(block) {
  // Try to parse subjects from AEM content; fall back to defaults
  const subjectsFromBlock = parseSubjectsFromBlock(block);
  const subjects = subjectsFromBlock.length ? subjectsFromBlock : DEFAULT_SUBJECTS;

  block.innerHTML = '';

  const grid = document.createElement('div');
  grid.className = 'subject-cards-grid';
  grid.dataset.aueType = 'container';
  grid.dataset.aueFilter = 'subject-cards';

  subjects.forEach((subject, i) => {
    grid.appendChild(createSubjectCard(subject, i));
  });

  // "View all subjects" card
  const viewAll = document.createElement('a');
  viewAll.href = '/en-gb/schools/secondary/subjects.html';
  viewAll.className = 'subject-card view-all';
  viewAll.innerHTML = `
    <div class="subject-card-icon">
      ${getIconSVG('grid')}
    </div>
    <span class="subject-card-name">All Subjects</span>
  `;
  grid.appendChild(viewAll);

  block.appendChild(grid);
}
