import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { papers_submit } from './../../imports/collections/papers';
import ReviewMarkup from './review_markup';
import ReviewViewer from './review_viewer';



class ReviewEditor extends Component {
  render(){

    if(!this.props.paper){
      return (<div> Loading... </div>);
    }
    return (
      <div>
        <ReviewMarkup paper={this.props.paper} />
        <ReviewViewer paper={this.props.paper} />
      </div>
    );
  }
}


export default createContainer((props) => {
  const {paperId} = props.params;
  Meteor.subscribe('papers_review');

  return {paper: papers_submit.findOne(paperId)}
}, ReviewEditor);
