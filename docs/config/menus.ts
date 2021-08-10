import type { MakerMenu } from 'maker-ui'

export const menu: MakerMenu = [
  { label: 'Overview', path: '/docs/overview' },
  {
    label: 'Getting Started',
    path: '/docs/getting-started',
    openNested: true,
    submenu: [
      { label: 'NextJS', path: '/docs/next-js' },
      { label: 'Gatsby', path: '/docs/gatsby' },
      { label: 'Create React App', path: '/docs/create-react-app' },
    ],
  },
  { label: 'Styling Components', path: '/docs/styling-components' },
  { label: 'Primitives', path: '/docs/primitives' },
  { label: 'Maker UI Options', path: '/docs/maker-ui-options' },
  { label: 'Best Practices', path: '/docs/best-practices' },
  {
    label: 'Layout API',
    path: '/docs/layout-api',
    className: 'api-btn',
    openNested: false,
    submenu: [
      { label: 'Layout', path: '/docs/layout' },
      { label: 'Topbar', path: '/docs/topbar' },
      { label: 'Header', path: '/docs/header' },
      { label: 'Navbar', path: '/docs/navbar' },
      { label: 'MobileMenu', path: '/docs/mobile-menu' },
      { label: 'Content', path: '/docs/content' },
      { label: 'Main', path: '/docs/main' },
      { label: 'Section', path: '/docs/section' },
      { label: 'SideNav', path: '/docs/side-nav' },
      { label: 'Sidebar', path: '/docs/sidebar' },
      { label: 'Footer', path: '/docs/footer' },
    ],
  },
  {
    label: 'Elements API',
    path: '/docs/elements-api',
    className: 'api-btn',
    openNested: false,
    submenu: [
      { label: 'ColorButton', path: '/docs/color-button' },
      { label: 'CollapsibleMenu', path: '/docs/collapsible-menu' },
      { label: 'Accordion', path: '/docs/accordion' },
      { label: 'Announcement', path: '/docs/announcement' },
      { label: 'CookieNotice', path: '/docs/cookie-notice' },
      { label: 'Carousel', path: '/docs/carousel' },
      { label: 'Lightbox', path: '/docs/lightbox' },
      { label: 'Modal', path: '/docs/modal' },
      { label: 'Tabs', path: '/docs/tabs' },
      { label: 'TreeMenu', path: '/docs/tree-menu' },
      { label: 'TableofContents', path: '/docs/table-of-contents' },
      { label: 'PageTransition', path: '/docs/page-transition' },
      { label: 'Generate', path: '/docs/generate' },
      { label: 'Spinner', path: '/docs/spinner' },
      { label: 'Popover', path: '/docs/popover' },
      { label: 'Dropdown', path: '/docs/dropdown' },
      { label: 'Tooltip', path: '/docs/tooltip' },
    ],
  },
  { label: 'Hooks', path: '/docs/hooks' },
  { label: 'Utilities', path: '/docs/utilities' },
  { label: 'FAQs', path: '/faqs' },
  { label: 'Contribute', path: '/contribute' },
]
