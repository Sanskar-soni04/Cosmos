import React, { createContext, useContext, useState, useEffect } from 'react';

const RouterContext = createContext({
  path: '/',
  navigate: () => {},
  params: {}
});

export function RouterProvider({ children }) {
  const [path, setPath] = useState(() => {
    return window.location.pathname || '/';
  });

  useEffect(() => {
    const handlePopState = () => {
      setPath(window.location.pathname || '/');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (toPath) => {
    if (toPath !== path) {
      window.history.pushState({}, '', toPath);
      setPath(toPath);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <RouterContext.Provider value={{ path, navigate }}>
      {children}
    </RouterContext.Provider>
  );
}

export function useRouter() {
  return useContext(RouterContext);
}

export function Link({ to, children, className = '', ...props }) {
  const { navigate } = useRouter();

  const handleClick = (e) => {
    // allow ctrl+click / cmd+click for opening in new tab
    if (e.metaKey || e.ctrlKey || e.shiftKey) return;
    e.preventDefault();
    navigate(to);
  };

  return (
    <a href={to} onClick={handleClick} className={className} {...props}>
      {children}
    </a>
  );
}
