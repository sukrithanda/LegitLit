import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import App from './components/app';
import PaperReview from './components/my-reviews';
import PaperView from './components/my-papers';
import {papers_submit, papers_review} from './../imports/collections/papers';


const routes = (
  <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={App} />
        <Route path="review/:paperId" component={PaperReview} />
        <Route path="view/:paperId" component={PaperView} />
      </Route>
  </Router>
);

Meteor.startup(() => {
  ReactDOM.render(routes, document.querySelector('.render-target'));
});
