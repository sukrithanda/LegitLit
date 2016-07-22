import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Dropzone from 'react-dropzone';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';


class PaperSubmit extends Component {


  constructor(props){
    super(props);

    this.state = {
      error: '',
      files: []
     };

  };

  onDrop(files) {
      console.log('Received files: ', files);

      this.setState({
        files: files
      });

    /*  Meteor.call('paper.insert', (files) => {
        browserHistory.push(`/views/${paperId}`);
      });*/

       Meteor.call('paper.insert', files);
  };



  render () {
    return (
      <div>
      <label> Paper Submission</label>

        <div className = "container">
          <div className = "span12">
           <Dropzone ref="dropzone" className= "rc-dropzone" multiple = {false} accept = "application/pdf" onDrop={this.onDrop.bind(this)}>
             <div className="dz-message">Drop your Research paper in PDF form</div>
           </Dropzone>


          </div>

        </div>
      </div>

    );
  };
}
/*{this.state.files.length > 0 ? <div>
       <h2>Uploading {this.state.files.length} file...</h2>
       <div>{this.state.files.map((file) => <img src={file.preview} /> )}</div>
       </div> : null} */
export default PaperSubmit;
