function isActiveRoute(route, currentRoute) {
  return route === currentRoute ? "actve" : "";
}

module.exports = { isActiveRoute };
