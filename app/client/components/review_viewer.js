import React, {Component} from 'react';
import {markdown} from 'markdown';

class ReviewViewer extends Component {
  render(){

    const rawHTML = markdown.toHTML(this.props.paper.reviews);

    return(
      <div className="col-xs-4">
        <h5>Output</h5>
        <div dangerouslySetInnerHTML={{ __html: rawHTML}}></div>
      </div>
    );
  }
}

export default ReviewViewer;
