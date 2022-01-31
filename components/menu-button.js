import Link from 'next/link';

/**
 * MenuButton
 */
export const MenuButton = ({ href, children }) => (
  <Link href={href}>
    <button className="menu-button">{children}</button>
  </Link>
);
