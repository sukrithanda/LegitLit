import React, {Component} from 'react';
import {createContainer} from 'meteor/react-meteor-data';
import {papers_submit} from './../../imports/collections/papers';
import { Link } from 'react-router';

class MySubmissions extends Component {

  onPaperView(bin) {
    Meteor.call('bins.remove', bin);
  }

  handleSubmit(id){
      console.log("submit");
      Meteor.call('paper.submit', id)
  }

  handleRemove(id){
      console.log("remove");
      Meteor.call('paper.remove', id);
  }

  handleStatus(url){
      console.log("status");
      location.href = url;
  }

  renderList(){
    return this.props.papers.map(paper =>{
      const url =`/view/${paper._id}`;

      var button1;
      var button2;
      if (paper.submitted){
          button1 = <button className="btn btn-primary" onClick={this.handleStatus.bind(this, url)}>Status</button>
      }
      else{
          button1 = <button className="btn btn-success" onClick={this.handleSubmit.bind(this, paper._id)}>Submit</button>
          button2 = <button className="btn btn-danger" onClick={this.handleRemove.bind(this, paper._id)}>Remove</button>
      }

      return(
        <li className="list-group-item" key={paper._id}>
          <Link to={url}> View {paper._id} </Link>
          <span className="pull-right">
              {button1}
              {button2}
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
