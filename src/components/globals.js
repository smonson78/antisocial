const routePrefix = process.env.NEXT_PUBLIC_ROUTE_PREFIX || '/';

const pathPrefix = routePrefix + 'preview';

const globals = {
  routePrefix,
  pathPrefix,
  staticDir: `${routePrefix}resource/img`,
  webServicesBase: process.env.NEXT_PUBLIC_WEBSERVICES_BASE,
  endpointList: process.env.NEXT_PUBLIC_WEBSERVICES_BASE + 'list.cgi',
  endpointUpdate: process.env.NEXT_PUBLIC_WEBSERVICES_BASE + 'update.cgi',
  endpointInventory: process.env.NEXT_PUBLIC_WEBSERVICES_BASE + 'sitedata.cgi',
  endpointExecuteOrder: process.env.NEXT_PUBLIC_WEBSERVICES_BASE + 'execute.cgi',
  imageUrlBase: process.env.NEXT_PUBLIC_IMAGE_URL_BASE,
};

export default globals;
