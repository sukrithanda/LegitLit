import React, {Component} from 'react';
import {createContainer} from 'meteor/react-meteor-data';
import {papers_submit} from './../../imports/collections/papers';
import { Link, browserHistory } from 'react-router';

class MyReviews extends Component {

  onReviewClick(event, review_url){
      //event.preventDefault();
      browserHistory.push(review_url);
  }

  renderList(){

    for(var i = this.props.papers1.length - 1; i >= 0; i--) {
      if(this.props.papers1[i].author === Meteor.userId()) {
       this.props.papers1.splice(i, 1);
      }
    }

    return this.props.papers1.map(paper =>{
      const view_url =`/view/${paper._id}`;
      const review_url =`/review/${paper._id}`;

      return(
        <li className="list-group-item" key={paper._id}>
          <a href={paper.fileobj}> paper {paper._id} </a>
          <span className="pull-right">

              <Link to={review_url}> REVIEW </Link>

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

  Meteor.subscribe('papers_review');

  return { papers1: papers_submit.find({ author:  {$ne: this.userId}
}).fetch()};
}, MyReviews);
