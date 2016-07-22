import React, {Component} from 'react';
import {createContainer} from 'meteor/react-meteor-data';
import {papers_submit} from './../../imports/collections/papers';
import { Link } from 'react-router';

class MySubmissions extends Component {

  onPaperView(bin) {
    Meteor.call('bins.remove', bin);
  }

  renderList(){
    return this.props.papers.map(paper =>{
      const url =`/view/${paper._id}`;
      return(
        <li className="list-group-item" key={paper._id}>
          <Link to={url}> paper_submit {paper._id} </Link>
          <span className="pull-right">
            <button
              className="btn btn-danger">
              STATUS
            </button>
          </span>
        </li>
      );
    });
  }
  render(){
    return (
      <div>
        <label> My Submissions </label>

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
}, MySubmissions);
