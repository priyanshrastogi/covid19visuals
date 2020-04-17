import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import reducers from './reducers';
import Home from './pages/Home';
import IndiaCovid from './pages/IndiaCovid';
import Page404 from './pages/Page404';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import NavBar from './components/NavBar';
import CountryCovid from './pages/CountryCovid';
import CovidCurve from './pages/CovidCurve';

function App() {
  return (
    <Provider store={createStore(reducers, applyMiddleware(thunk))}>
      <BrowserRouter>
        <div>
          <NavBar/>
          <ScrollToTop>
            <Switch>
              <Route exact path='/' component={Home}/>
              <Route exact path='/curve' component={CovidCurve}/>
              <Route exact path='/india' component={IndiaCovid} />
              <Route exact path='/:countryCode' component={CountryCovid} />
              <Route component={Page404} />
            </Switch>
          </ScrollToTop>
          <Footer/>
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;