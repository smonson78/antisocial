import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Preview from '../Preview/Preview';
import Homepage from '../Homepage/Homepage';
import CategoryPage from '../CategoryPage/CategoryPage';
import LoginPage from '../LoginPage/LoginPage';
import ShoppingCartPage from '../ShoppingCartPage/ShoppingCartPage';
import OrderPage from '../OrderPage/OrderPage';
import OrderConfirmPage from '../OrderConfirmPage/OrderConfirmPage';
import AdminPage from '../AdminPage/AdminPage';

import globals from '../globals';

const NotFoundPage = () => {
  return <div><p>Page Not Found</p></div>
};

export default () => (
  <main>
    <Switch>
      <Route exact path={globals.routePrefix} component={Preview} />
      <Route exact path={`${globals.pathPrefix}`} component={Homepage} />
      <Route exact path={`${globals.pathPrefix}/login`} component={LoginPage} />
      <Route exact path={`${globals.pathPrefix}/cart`} component={ShoppingCartPage} />
      <Route exact path={`${globals.pathPrefix}/order`} component={OrderPage} />
      <Route exact path={`${globals.pathPrefix}/order/:id`} component={OrderPage} />
      <Route exact path={`${globals.pathPrefix}/order-confirm`} component={OrderConfirmPage} />
      <Route path={`${globals.pathPrefix}/category/:number`} component={CategoryPage}/>
      <Route exact path={`${globals.pathPrefix}/admin`} component={AdminPage} />
      <Route path="*" component={NotFoundPage} />
    </Switch>
  </main>
);
