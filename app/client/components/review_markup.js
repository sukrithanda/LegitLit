import React, {Component} from 'react';
import CodeMirror from 'react-codemirror';
import 'codemirror/mode/markdown/markdown';


class ReviewMarkup extends Component {

  onEditorChange(content){
   Meteor.call('paper_review.update', this.props.paper, content);
  }
  render (){
    return(
      <div className = "col-xs-8">
        <h5> Input </h5>
        <CodeMirror
         value={this.props.paper.reviews}
         onChange={this.onEditorChange.bind(this)}
         options = {{mode: 'markdown', lineNumbers: true}} />
      </div>
    );
  }
}

export default ReviewMarkup;
