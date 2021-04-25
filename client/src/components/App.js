import React, { Suspense } from 'react';
import { Route, Switch } from "react-router-dom";
import Auth from "../hoc/auth";
import RoleCheck from "../hoc/role";
// pages for this product
import LandingPage from "./views/LandingPage/LandingPage.js";
import LoginPage from "./views/LoginPage/LoginPage.js";
import RegisterPage from "./views/RegisterPage/RegisterPage.js";
import NavBar from "./views/NavBar/NavBar";
import Footer from "./views/Footer/Footer"
import UploadProductPage from './views/UploadProductPage/UploadProductPage'
import DetailProductPage from './views/DetailProductPage/DetailProductPage';
import CartPage from './views/CartPage/CartPage';
import HistoryPage from './views/HistoryPage/HistoryPage';
import DhistoryPage from './views/DhistoryPage/DhistoryPage';
import Dashboard from './views/Dashboard/Dashboard';

import "bootstrap/dist/css/bootstrap.min.css";
import "../shards-dashboards.1.1.0.min.css";

function App() {
  return (
    <Suspense fallback={(<div>Loading...</div>)}>
      <NavBar />
      <div style={{ paddingTop: '75px', minHeight: 'calc(100vh - 80px)' }}>
        <Switch>
          <Route exact path="/" component={Auth(LandingPage, null)} />
          <Route exact path="/login" component={Auth(LoginPage, false)} />
          <Route exact path="/register" component={Auth(RegisterPage, false)} />
          <Route exact path="/product/upload" component={Auth(RoleCheck(UploadProductPage, 'designer'), true)} />
          <Route exact path="/product/:productId" component={Auth(DetailProductPage, null)} />
          <Route exact path="/user/cart" component={Auth(RoleCheck(CartPage, 'customer'), true)} />
          <Route exact path="/history" component={Auth(HistoryPage, true)} />
          <Route exact path="/dhistory" component={Auth(DhistoryPage, true)} />
          <Route exact path="/admin" component={Auth(RoleCheck(Dashboard, 'admin'), true)}/>
        </Switch>
      </div>
      <Footer />
    </Suspense>
  );
}

export default App;
