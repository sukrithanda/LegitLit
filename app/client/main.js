import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import App from './components/app';
import MainApp from './components/mainapp';
import PaperReview from './components/my-reviews';
import PaperView from './components/my-papers';
import OneView from './components/one-view';
import {papers_submit, papers_review} from './../imports/collections/papers';


const routes = (
  <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={MainApp} />
        <Route path="review/:paperId" component={PaperReview} />
        <Route path="view/:paperId" component={OneView} />
      </Route>
  </Router>
);

Meteor.startup(() => {
  ReactDOM.render(routes, document.querySelector('.render-target'));
});
