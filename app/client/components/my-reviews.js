import React, {Component} from 'react';
import {createContainer} from 'meteor/react-meteor-data';
import {papers_submit} from './../../imports/collections/papers';
import { Link } from 'react-router';

class MyReviews extends Component {

  onPaperReview(bin) {
    this.transitionTo('pages');
  }

  renderList(){
    return this.props.papers.map(paper =>{
      const view_url =`/view/${paper._id}`;
      const review_url =`/review/${paper._id}`;

      return(
        <li className="list-group-item" key={paper._id}>
          <Link to={view_url}> paper {paper._id} </Link>
          <span className="pull-right">
            <span className="input-group-btn">
                <Link to={review_url} >Review Paper</Link>
            </span>
          </span>
        </li>
      );
    });
  }
  render(){
    return (
      <div>
      <label>My Reviews</label>

      <ul className="list-group">
        {this.renderList()}
      </ul>
    </div>
    );
  }
}


export default createContainer(() => {

  Meteor.subscribe('papers_submit');


  return { papers: papers_submit.find({}).fetch()};
}, MyReviews);
