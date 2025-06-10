function extractPathnameSegments(path) {
  const splitUrl = path.split('/').filter(segment => segment !== '');

  return {
    resource: splitUrl[0] || null,
    id: splitUrl[1] || null,       
  };
}

function constructRouteFromSegments(pathSegments) {
  let pathname = '';

  if (pathSegments.resource) {
    pathname = pathname.concat(`/${pathSegments.resource}`);
  }

  if (pathSegments.id) {
    if (pathSegments.resource === 'news-detail') {
      pathname = pathname.concat('/:id');
    } else {
      pathname = pathname.concat(`/${pathSegments.id}`);
    }
  }

  return pathname || '/';
}

export function getActivePathname() {
  return location.hash.replace('#', '') || '/';
}

export function getActiveRoute() {
  const pathname = getActivePathname();
  const urlSegments = extractPathnameSegments(pathname);
  const routeKey = constructRouteFromSegments(urlSegments);
  return routeKey;
}

export function parseActivePathname() {
  const pathname = getActivePathname();
  return extractPathnameSegments(pathname);
}

export function getRoute(pathname) {
  const urlSegments = extractPathnameSegments(pathname);
  return constructRouteFromSegments(urlSegments);
}

export function parsePathname(pathname) {
  return extractPathnameSegments(pathname);
}