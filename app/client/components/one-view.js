import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {createContainer} from 'meteor/react-meteor-data';
import {papers_submit} from './../../imports/collections/papers';
import {markdown} from 'markdown';



class OneView extends Component{
    handleOpen() {
        window.open(this.props.paper.fileobj);
    }

    renderReviewList(){
        return this.props.paper.reviewArray.map(review =>{
          /*  return (
                <li key={review}>{review}</li>
            );*/

            const rawHTML = markdown.toHTML(review);

            return(
              <ul key={review}>
                <div className="col-xs-4">
                  <label>Review</label>

                  <div dangerouslySetInnerHTML={{ __html: rawHTML}}></div>
                </div>
              </ul>
            );
        });
    }


    renderStatus(){

      if(this.props.paper.accepts > 1){

            return(
              <div>
                <button type="button" className="btn btn-success btn-lg disabled">Approved</button>
              </div>

            );
        }
        else{
          return(
            <div>
              <button type="button" className="btn btn-danger btn-lg disabled">Reject</button>
            </div>

          );
        }
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
                        <h4>Rejected  <span className="badge">{this.props.paper.rejects}</span></h4>
                    </div>
                </div>

                <div>
                  <h4>Overall Status</h4>

                      {this.renderStatus()}



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
