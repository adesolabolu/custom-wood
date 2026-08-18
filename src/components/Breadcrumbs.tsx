import { Link, useLocation } from 'react-router-dom';

interface BreadcrumbsProps {
  theme?: 'dark' | 'light';
}

export function Breadcrumbs({ theme = 'dark' }: BreadcrumbsProps = {}) {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  if (pathnames.length === 0 || pathnames[0] === 'admin') {
    return null;
  }

  const textColor = theme === 'light' ? 'text-white/70' : 'text-brand-dark/60';
  const textActiveColor = theme === 'light' ? 'text-white' : 'text-brand-dark';
  const hoverColor = theme === 'light' ? 'hover:text-white' : 'hover:text-brand-brown';

  return (
    <div className={`flex items-center gap-2 text-xs font-semibold uppercase tracking-wider ${textColor} mb-8 md:mb-12 overflow-x-auto whitespace-nowrap hide-scrollbar`}>
      <Link to="/" className={`${hoverColor} transition-colors`}>
        Home
      </Link>
      {pathnames.map((name, index) => {
        const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
        const isLast = index === pathnames.length - 1;
        // Decode URI component to handle spaces in URLs properly, and format
        const decodedName = decodeURIComponent(name);
        const formattedName = decodedName.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

        return (
          <div key={name} className="flex items-center gap-2 shrink-0">
            <span>/</span>
            {isLast ? (
              <span className={`${textActiveColor}`}>{formattedName}</span>
            ) : (
              <Link to={routeTo} className={`${hoverColor} transition-colors`}>
                {formattedName}
              </Link>
            )}
          </div>
        );
      })}
    </div>
  );
}
