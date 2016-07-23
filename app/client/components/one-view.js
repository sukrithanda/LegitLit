import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {createContainer} from 'meteor/react-meteor-data';
import {papers_submit} from './../../imports/collections/papers';


class OneView extends Component{


    render() {
      console.log(this.props.paper);
      if(!this.props.paper){
        return (<div> Loading... </div>);
      }
      else{

        window.open(this.props.paper.fileobj);

        //  return (<PDF data= {this.props.paper.fileObj} />);
          return(
            <div>hello</div>


          );

      }
    }

}

export default createContainer( (props) => {

    const {paperId} = props.params;

    Meteor.subscribe('papers_submit');

    return { paper: papers_submit.findOne(paperId)};
}, OneView);
