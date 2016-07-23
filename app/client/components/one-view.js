import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {createContainer} from 'meteor/react-meteor-data';
import {papers_submit} from './../../imports/collections/papers';


class OneView extends Component{
    handleOpen() {
        window.open(this.props.paper.fileobj);
    }

    renderReviewList(){
        return this.props.paper.reviews.map(review =>{
            return (
                <li key={review}>{review}</li>
            );
        });
    }

    render() {
      //console.log(this.props.paper);
      if(!this.props.paper){
        return (<div> Loading... </div>);
      }
      else{
        //  return (<PDF data= {this.props.paper.fileObj} />);
          return(
            <div>
                <br/>
                <button className="btn btn-primary" onClick={this.handleOpen.bind(this)}>View Paper</button>
                <br/>
                <br/>
                <h2>Reviews</h2>
                <ul>
                    {this.renderReviewList()}
                </ul>
                <div className="row">
                    <div className="col-sm-6">
                        <h4>Accepted  <span className="badge">{this.props.paper.accepts}</span></h4>
                    </div>
                    <div className="col-sm-6">
                        <h4>Rejected  <span className="badge">{this.props.paper.accepts}</span></h4>
                    </div>
                </div>
            </div>

          );

      }
    }

}

export default createContainer( (props) => {

    const {paperId} = props.params;

    Meteor.subscribe('papers_submit');

    return { paper: papers_submit.findOne(paperId)};
}, OneView);
